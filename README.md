# Anton Malienko - Personal Website

A personal website built with [Astro](https://astro.build) showcasing SEO expertise, publications, case studies, and projects.

## 🚀 Features

- **Homepage** - Professional introduction and industry experience
- **Publications** - Research interests and academic publications
- **Case Studies** - Real-world SEO project examples and results
- **Projects** - Personal tools and applications for SEO automation
- **Responsive Design** - Clean, minimal design that works on all devices
- **Fast Performance** - Built with Astro for optimal loading speed

## 🛠️ Technology Stack

- **Framework:** Astro 5.1.5
- **Language:** TypeScript (strict mode)
- **Styling:** Vanilla CSS
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- A [GitHub](https://github.com/) account

## 🏃 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/malienko/malienko.git
cd malienko
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Your site will be available at `http://localhost:4321`

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## 🌐 Deploying to GitHub Pages

This guide will walk you through deploying your website to GitHub Pages, even if you're new to web deployment.

### Step 1: Update Configuration

Before deploying, you need to update the site configuration in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  base: '/YOUR-REPO-NAME',
});
```

Replace:
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPO-NAME` with your repository name

**Example:** If your GitHub username is `johndoe` and your repo is named `my-website`:
```javascript
export default defineConfig({
  site: 'https://johndoe.github.io',
  base: '/my-website',
});
```

**Note:** If you're using a custom domain or deploying to `username.github.io`, set `base: '/'`

### Step 2: Set Up GitHub Repository

#### Option A: If You Don't Have a Repository Yet

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `malienko` or `personal-website`)
5. Choose "Public" (required for free GitHub Pages)
6. Click "Create repository"

#### Option B: If You Already Have This Code Locally

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Astro personal website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" (tab at the top)
3. In the left sidebar, click "Pages" (under "Code and automation")
4. Under "Source", select "GitHub Actions"
5. Click "Save"

### Step 4: Deploy Your Site

The website will automatically deploy when you push changes to the `main` branch. The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles the build and deployment process.

To trigger the first deployment:

```bash
# Make sure all changes are committed
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### Step 5: Monitor Deployment

1. Go to your repository on GitHub
2. Click the "Actions" tab
3. You'll see the deployment workflow running
4. Wait for it to complete (usually takes 1-2 minutes)
5. Once complete, your site will be live!

### Step 6: Access Your Website

Your website will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

For example: `https://malienko.github.io/malienko/`

## 🔄 Updating Your Website

Whenever you want to update your website:

1. Make your changes locally
2. Test them with `npm run dev`
3. Commit and push:

```bash
git add .
git commit -m "Description of your changes"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy your site!

## 📝 Customizing Content

### Updating Homepage
Edit `src/pages/index.astro` to update your bio and experience.

### Updating Publications
Edit `src/pages/publications.astro` to add or modify your publications.

### Updating Case Studies
Edit `src/pages/case-studies.astro` to showcase your SEO work.

### Updating Projects
Edit `src/pages/projects.astro` to display your personal projects.

### Changing Site Title/Name
Edit `src/layouts/Layout.astro` to update the site header and title.

## 🎨 Customizing Design

All styles are in `src/layouts/Layout.astro`. The design uses vanilla CSS with CSS variables for easy customization:

- Change colors by modifying the CSS
- Adjust spacing, fonts, and other design elements
- The design is minimal and professional by default

## 🔧 Troubleshooting

### Build Fails
- Run `npm run build` locally to see errors
- Check that all files are properly formatted
- Ensure Node.js version is 18 or higher

### Site Not Appearing
- Verify GitHub Pages is enabled in repository settings
- Check that the workflow completed successfully in Actions tab
- Ensure `astro.config.mjs` has correct `site` and `base` values
- Wait a few minutes - deployment can take time

### Links Not Working
- Make sure `base` in `astro.config.mjs` matches your repo name
- Use relative links in your pages (e.g., `/publications` not `publications`)

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)

## 📫 Contact

- **Email:** antonmalienko@gmail.com
- **Twitter:** [@_Malienko_](https://twitter.com/_Malienko_)
- **LinkedIn:** [linkedin.com/in/malienko](https://www.linkedin.com/in/malienko/)

## 📄 License

This project is open source and available for personal use.
