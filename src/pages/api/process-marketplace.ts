import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return new Response(JSON.stringify({ error: 'No image provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Convert image to base64
    const arrayBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = image.type;

    // Call Anthropic Claude API with vision
    const anthropicApiKey = import.meta.env.ANTHROPIC_API_KEY;

    if (!anthropicApiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mimeType,
                  data: base64Image
                }
              },
              {
                type: 'text',
                text: `Analyze this Facebook Marketplace screenshot and extract all the listed items. For each item, extract:
- name: the product title
- price: the price (with currency symbol)
- location: the city/location where it's listed

Return ONLY a valid JSON array with this structure:
[
  {
    "name": "Product Name",
    "price": "$100",
    "location": "City, State/Province"
  }
]

Important:
- Extract the exact location text shown (e.g., "Montreal, QC" or "Laval, Quebec")
- Include all items visible in the screenshot
- Return ONLY the JSON array, no additional text`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return new Response(JSON.stringify({ error: 'Failed to process image' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    const extractedText = data.content[0].text;

    // Parse the JSON from Claude's response
    let items;
    try {
      // Try to extract JSON from the response
      const jsonMatch = extractedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        items = JSON.parse(jsonMatch[0]);
      } else {
        items = JSON.parse(extractedText);
      }
    } catch (e) {
      console.error('Failed to parse JSON:', extractedText);
      return new Response(JSON.stringify({ error: 'Failed to parse extracted data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Geocode locations to get lat/lng
    const itemsWithCoordinates = await Promise.all(
      items.map(async (item: any) => {
        const coords = await geocodeLocation(item.location);
        return {
          ...item,
          lat: coords.lat,
          lng: coords.lng,
          image: '' // Will be populated from original screenshot extraction
        };
      })
    );

    return new Response(JSON.stringify({ items: itemsWithCoordinates }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing marketplace image:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Simple geocoding using OpenStreetMap Nominatim (free, no API key needed)
async function geocodeLocation(location: string): Promise<{ lat: number; lng: number }> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'Marketplace-Map-App/1.0'
        }
      }
    );

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }

  // Default to Montreal if geocoding fails
  return { lat: 45.5017, lng: -73.5673 };
}
