# Caleb Aguirre-Leon's Blog

A personal blog showcasing my journey in software engineering, internships, and technical leadership. Built with Hugo and deployed to Firebase Hosting.

**Live Site**: [calebaguirreleon.com](https://calebaguirreleon.com/)

---

## 🚀 Quick Start

### Prerequisites
- Hugo Extended v0.151.0+
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/Lementknight/blog.git
cd blog

# Install theme submodule
git submodule update --init --recursive

# Start local development server
make dev
```

### Common Commands
```bash
make dev              # Local development (includes drafts)
make new_post         # Create a new blog post (interactive)
make preview          # Preview production build
make debug            # Rebuild with cache disabled (troubleshooting)
```

---

## 📁 Project Structure

```
blog/
├── content/              # Blog posts and pages
│   ├── aboutMe.md
│   ├── contact.md
│   ├── archive.md
│   └── posts/            # Blog posts directory
├── layouts/              # Custom Hugo templates
│   ├── _default/
│   ├── partials/         # Reusable template components
│   └── shortcodes/       # Custom markdown shortcodes
├── assets/css/extended/  # Custom CSS
│   ├── chroma-light.css  # Light mode syntax highlighting
│   ├── chroma-dark.css   # Dark mode syntax highlighting
│   ├── custom.css        # Code block styling
│   └── extended.css      # CSS imports
├── static/               # Static files (images, favicons)
├── archetypes/           # Content templates
├── themes/PaperMod/      # Hugo theme (submodule)
├── hugo.yml              # Site configuration
├── Makefile              # Task automation
└── .claude/              # AI assistant context (development)
```

---

## ✍️ Writing Posts

### Create a New Post
```bash
make new_post
# Prompts: "Post title (e.g. my-new-post): "
# Creates: content/posts/my-new-post.md
```

### Post Front Matter
Posts use YAML front matter. Example:
```yaml
---
title: 'My Post Title'
description: 'Brief description for SEO meta tag'
date: '2026-04-12T15:30:00-04:00'
tags: ['python', 'tutorial']
draft: false
---

# Post content starts here...
```

**Front Matter Fields:**
- `title` (required) - Post title
- `description` (required) - SEO meta description
- `date` (required) - ISO 8601 format (YYYY-MM-DDTHH:MM:SS±HH:MM)
- `tags` (optional) - Array of tags for categorization
- `draft` (optional) - Set to `true` to hide from published site

See [CONTENT_GUIDELINES.md](./CONTENT_GUIDELINES.md) for detailed guidelines.

---

## 🎨 Styling & Customization

### Theme
- **Theme**: PaperMod (custom fork)
- **Features**: Dark/Light mode toggle, responsive design, code syntax highlighting

### Custom CSS
Custom styles are organized in `assets/css/extended/`:
- `chroma-light.css` - Light mode syntax highlighting (Catppuccin Latte)
- `chroma-dark.css` - Dark mode syntax highlighting (Catppuccin Mocha)
- `custom.css` - Code block backgrounds and custom styles
- `profile.css` - Profile section styling
- `alerts.css` - Alert/callout styling

**Important**: Use theme selectors (`[data-theme="light"]` / `[data-theme="dark"]`) to prevent CSS conflicts between themes.

---

## 🚢 Deployment

### Automatic Deployment
The site auto-deploys to Firebase Hosting on every push to `main` via GitHub Actions.

**Workflow**: 
1. Push to `feature/website-refresh` → PR to `main`
2. GitHub Actions runs tests (`test-hugo-build.yml`)
3. Merge to `main` → Firebase deploy (`firebase-hosting-merge.yml`)

### Manual Deployment
```bash
# Build for production
hugo

# Deploy to Firebase (requires authentication)
firebase deploy
```

### Preview Deployments
Pull requests automatically get preview deployments via `firebase-hosting-pull-request.yml`.

---

## 🔍 Development Tips

### Local Development
```bash
make dev
# Opens http://localhost:1313/
# Watches for changes and rebuilds automatically
# Includes draft posts
```

### Production Preview
```bash
make preview
# Simulates production build locally
# Useful for testing before merging to main
```

### Troubleshooting CSS Changes
If CSS changes aren't appearing:
```bash
make debug
# Clears cache and rebuilds from scratch
# Use when normal dev server doesn't reflect changes
```

### Inspect Generated Site
```bash
# View production-ready output
ls public/
```

---

## 📝 Configuration

### Site Configuration
Edit `hugo.yml` for:
- `baseURL` - Your domain
- `title` - Site title
- `theme` - Hugo theme (PaperMod)
- `params.profileMode` - Hero section content
- `params.socialIcons` - Social media links
- `menu.main` - Navigation menu

### Comments
Comments are powered by Giscus (GitHub Discussions). Configuration in `hugo.yml`:
```yaml
params:
  comments:
    giscus:
      repo: "Lementknight/blog"
      repoId: "R_kgDONw3w3A"
      category: "General"
      categoryId: "DIC_kwDONw3w3M4CuwJI"
```

---

## 🔐 Security

- **CodeQL Scanning**: Enabled via GitHub Actions
- **No Secrets in Repo**: Firebase config in `.firebaserc` (gitignored)
- **Content Security**: Posts are Markdown-based, no arbitrary code execution

---

## 📊 Build Info

- **Build Tool**: Hugo v0.151.0
- **Language**: Go (Hugo is written in Go)
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions
- **Domain**: calebaguirreleon.com

---

## 🤝 Contributing

To contribute improvements to this blog:

1. Create a feature branch: `git checkout -b feature/my-improvement`
2. Make changes and test locally: `make dev`
3. Commit with clear messages
4. Push and create a Pull Request

See [CONTENT_GUIDELINES.md](./CONTENT_GUIDELINES.md) for content standards.

---

## 📚 Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [PaperMod Theme](https://github.com/adityatelange/hugo-PaperMod)
- [Markdown Guide](https://www.markdownguide.org/)
- [Catppuccin Color Scheme](https://catppuccin.com/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## 📄 License

This project is open source. The blog content and custom code are available under the same license as specified in the repository.

---

## 📞 Contact

- **Contact Form**: [calebaguirreleon.com/contact](https://calebaguirreleon.com/contact)
- **GitHub**: [@Lementknight](https://github.com/Lementknight)
- **LinkedIn**: [Caleb Aguirre-Leon](https://www.linkedin.com/in/caleb-aguirre-leon/)

---

**Last Updated**: April 12, 2026
