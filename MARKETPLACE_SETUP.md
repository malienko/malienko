# Marketplace Map AI Setup Guide

This guide explains how to set up AI-powered OCR for extracting Facebook Marketplace items from screenshots.

## 🔐 Secure API Key Setup

### 1. Choose an AI Vision Provider

You have several options:

#### Option A: Anthropic Claude (Recommended)
- **Best for**: Structured data extraction, reliable output
- **Cost**: ~$3 per 1000 API calls (very affordable)
- **Sign up**: https://console.anthropic.com/
- Get your API key from the dashboard

#### Option B: OpenAI GPT-4 Vision
- **Best for**: If you already use OpenAI
- **Cost**: Variable pricing
- **Sign up**: https://platform.openai.com/
- Get your API key from API settings

#### Option C: Google Cloud Vision
- **Best for**: OCR-focused tasks
- **Cost**: Free tier available
- **Sign up**: https://cloud.google.com/vision

### 2. Set Up Environment Variables

**Local Development:**

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Add your API key to `.env`:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

3. ⚠️ **IMPORTANT**: The `.env` file is already in `.gitignore` and will NOT be committed to GitHub

**GitHub Pages Deployment:**

Since GitHub Pages is static hosting, you have two options:

1. **Use GitHub Actions Secrets** (if deploying with Actions):
   - Go to your repo Settings → Secrets and variables → Actions
   - Add `ANTHROPIC_API_KEY` as a repository secret
   - The build process will use it

2. **Use Netlify/Vercel instead** (recommended for API routes):
   - Deploy to Netlify or Vercel (they support Astro server features)
   - Add environment variables in their dashboard
   - API routes will work seamlessly

## 🚀 How It Works

### Architecture

```
User uploads screenshot
       ↓
Frontend (marketplace.astro)
       ↓
API Route (api/process-marketplace.ts) ← Your API key (server-side only)
       ↓
Claude Vision API
       ↓
Extracts: names, prices, locations
       ↓
Geocodes locations to coordinates
       ↓
Returns structured JSON
       ↓
Frontend displays on map
```

### Data Flow

1. **Image Upload**: User selects Facebook Marketplace screenshot
2. **Server Processing**: Image sent to `/api/process-marketplace`
3. **AI Vision**: Claude analyzes the image and extracts:
   - Product names
   - Prices
   - Locations (cities)
4. **Geocoding**: Locations converted to lat/lng coordinates
5. **Map Display**: Items plotted on OpenStreetMap

## 📝 API Security Best Practices

✅ **What's Safe:**
- API keys in `.env` files (not committed)
- API keys in GitHub Actions secrets
- API keys in Netlify/Vercel environment variables
- Server-side API routes (keys never exposed to browser)

❌ **Never Do This:**
- Put API keys directly in code files
- Commit `.env` files to Git
- Use API keys in client-side JavaScript
- Share API keys in screenshots or documentation

## 🧪 Testing

1. **Test with demo data** (no API key needed):
   - Click "Load Demo Data" button
   - Verify map and items display correctly

2. **Test with real API**:
   - Add your API key to `.env`
   - Upload a Facebook Marketplace screenshot
   - Click "Process Screenshot"
   - Check browser console for any errors

## 💰 Cost Estimates

Based on Claude API pricing:

- Per screenshot: ~$0.003 (less than a penny)
- 1000 screenshots: ~$3
- Monthly budget of $10: ~3,300 screenshots

OpenStreetMap geocoding is free and unlimited.

## 🔧 Customization

### Modify the AI Prompt

Edit `src/pages/api/process-marketplace.ts` to customize what data is extracted:

```typescript
text: `Your custom instructions here...
Extract additional fields like:
- condition (new/used)
- category
- seller name
etc.`
```

### Change AI Model

In `process-marketplace.ts`, update the model:

```typescript
model: 'claude-3-5-sonnet-20241022',  // Current
// or
model: 'claude-3-opus-20240229',      // More accurate, more expensive
// or
model: 'claude-3-haiku-20240307',     // Faster, cheaper
```

## 🐛 Troubleshooting

### "API key not configured" error
- Check `.env` file exists and has correct key name
- Restart dev server after adding `.env`
- Verify key is valid on Anthropic dashboard

### "Failed to process image" error
- Check browser console for detailed error
- Verify image is a valid screenshot
- Try a smaller/clearer image
- Check API quota/billing on Anthropic

### Items not appearing on map
- Check browser console for geocoding errors
- Verify locations are in correct format
- Some obscure locations may fail geocoding

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
```bash
# Deploy with environment variables
netlify deploy --prod
# Set env var in Netlify dashboard
```

### Option 2: Vercel
```bash
# Deploy
vercel --prod
# Add env var: vercel env add ANTHROPIC_API_KEY
```

### Option 3: GitHub Pages + Separate API Server
- Deploy static site to GitHub Pages
- Host API routes on separate service (Railway, Render, etc.)
- Update fetch URL in marketplace.astro

## 📚 Additional Resources

- [Anthropic API Docs](https://docs.anthropic.com/)
- [Astro API Routes](https://docs.astro.build/en/core-concepts/endpoints/)
- [OpenStreetMap Nominatim](https://nominatim.org/release-docs/develop/api/Overview/)

## ✅ Security Checklist

Before committing code:
- [ ] `.env` is in `.gitignore`
- [ ] No API keys in code files
- [ ] API routes use `import.meta.env` for secrets
- [ ] Tested that `.env` is not committed
- [ ] Environment variables set in deployment platform
