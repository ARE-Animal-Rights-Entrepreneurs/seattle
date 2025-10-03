# Animal Rights Entrepreneurs Seattle - Landing Page

A modern, responsive landing page for the Animal Rights Entrepreneurs community in Seattle.

## Features

- Clean, professional design
- Fully responsive (mobile, tablet, desktop)
- Information about the group and projects
- Meeting details
- Call-to-action for Slack community
- Smooth scrolling animations
- Zero dependencies

## Setup

### Important: Update Slack Link

Before deploying, update the Slack invite URL in `index.html`:

1. Open `index.html`
2. Find the "Join Our Slack" button (around line 72)
3. Replace the `#` in `href="#"` with your actual Slack invite URL
4. Remove or update the `onclick` alert and `cta-note` paragraph

Example:
```html
<a href="https://join.slack.com/t/your-workspace/..." class="cta-button primary">Join Our Slack</a>
```

## Deployment Options

### Option 1: GitHub Pages (Recommended)

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/are-seattle.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Select "main" branch as source
5. Your site will be live at `https://yourusername.github.io/are-seattle/`

### Option 2: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop your project folder to Netlify dashboard
3. Your site will be live instantly with a custom URL
4. Optional: Add a custom domain in site settings

### Option 3: Vercel

1. Sign up at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in your project directory
4. Follow the prompts to deploy

### Option 4: Surge

1. Install Surge: `npm install -g surge`
2. Run `surge` in your project directory
3. Follow the prompts to deploy
4. Your site will be live at `projectname.surge.sh`

## Local Development

Simply open `index.html` in your browser to preview locally. No build process required!

## Customization

### Colors
Edit CSS variables in `styles.css` (lines 9-17) to change the color scheme:
```css
:root {
    --primary-color: #2d5a3d;  /* Main green */
    --accent-color: #f4a261;   /* Orange accent */
    /* ... */
}
```

### Content
All content is in `index.html`. Simply edit the text in each section to customize.

### Projects
Add or modify project cards in the "Projects Section" of `index.html` (around lines 34-50).

## License

Feel free to modify and use this template for your organization.

## Support

For questions or issues, contact the Animal Rights Entrepreneurs Seattle team.
