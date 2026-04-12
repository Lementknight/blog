# Content Guidelines

This document outlines standards for creating and maintaining content on the blog.

---

## 📋 Front Matter Template

All posts must include the following YAML front matter:

```yaml
---
title: 'Your Post Title Here'
description: 'Brief description (50-160 characters) that appears in search results and social media'
date: '2026-04-12T15:30:00-04:00'
tags: ['tag1', 'tag2', 'tag3']
draft: false
---
```

### Field Descriptions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | String | ✅ | Main heading of your post |
| `description` | String | ✅ | SEO meta description (50-160 chars recommended) |
| `date` | ISO 8601 | ✅ | Use format: `YYYY-MM-DDTHH:MM:SS±HH:MM` |
| `tags` | Array | ✅ | At least one tag; use lowercase with hyphens |
| `draft` | Boolean | ✅ | Set to `false` when ready to publish |

### Date Format Examples

```yaml
# US Eastern Time (UTC-4 in summer, UTC-5 in winter)
date: '2026-04-12T15:30:00-04:00'

# UTC
date: '2026-04-12T19:30:00Z'

# US Pacific Time (UTC-7 in summer, UTC-8 in winter)
date: '2026-04-12T12:30:00-07:00'
```

---

## 📁 File Naming

Use **kebab-case** (lowercase with hyphens) for all post filenames:

✅ **Good Examples:**
- `my-first-post.md`
- `how-to-build-a-hugo-blog.md`
- `python-tutorial-for-beginners.md`
- `docker-vs-kubernetes.md`

❌ **Avoid:**
- `MyFirstPost.md` (CamelCase)
- `my_first_post.md` (snake_case)
- `My First Post.md` (spaces)
- `post1.md` (unclear)

**Why**: URLs are generated from filenames. Kebab-case is SEO-friendly and readable in URLs.

---

## 🏷️ Tag Conventions

Use consistent, lowercase tags with hyphens:

### Recommended Tags by Category

**Languages & Frameworks:**
- `python`
- `javascript`
- `golang`
- `rust`
- `react`
- `django`
- `hugo`

**Practices & Concepts:**
- `ci-cd`
- `github-actions`
- `testing`
- `debugging`
- `web-development`
- `automation`
- `devops`

**Topics & Domains:**
- `internship`
- `career`
- `tutorial`
- `troubleshooting`
- `best-practices`
- `case-study`

**Environment & Tools:**
- `docker`
- `kubernetes`
- `git`
- `shell-script`
- `macos`
- `linux`

### Tag Guidelines

- Use **2-4 tags per post** (too many dilutes meaning)
- Use **existing tags** when possible (don't create variants)
- Keep tags **specific** - "web-development" not "web", "development", or "coding"
- Use **hyphens** not underscores or camelCase

---

## ✍️ Content Standards

### Structure

Every post should follow this structure:

```markdown
---
title: 'Post Title'
description: 'SEO description'
date: '2026-04-12T15:30:00-04:00'
tags: ['tag1', 'tag2']
draft: false
---

## Introduction

Start with a compelling introduction explaining:
- What the post is about
- Why it matters
- What readers will learn

## Main Content

Use clear headings and logical flow:
- Break content into sections with ## headings
- Use ### for subsections
- Keep paragraphs focused (3-5 sentences)

## Code Examples

Use syntax highlighting:
\`\`\`python
# Python code example
def hello_world():
    print("Hello, World!")
\`\`\`

## Conclusion

Summarize key takeaways and next steps.

{{ partial "comments.html" }}
```

### Writing Best Practices

1. **Write for clarity, not volume**
   - Aim for 1000-2000 words per post
   - Shorter posts (300-500 words) are acceptable for quick tips
   - Avoid unnecessary jargon

2. **Use descriptive headings**
   - ✅ "How to Optimize Docker Images for Production"
   - ❌ "Docker Tips"

3. **Include code examples**
   - Show both the problem and solution
   - Provide complete, runnable examples
   - Add comments for clarity

4. **Leverage formatting**
   - Use **bold** for emphasis
   - Use `code` for technical terms
   - Use > for blockquotes/important notes
   - Use lists for multiple related items

5. **Proofread before publishing**
   - Check spelling and grammar
   - Verify code examples work
   - Test links are not broken

### Markdown Formatting Examples

```markdown
# Heading 1 (Page Title)
## Heading 2 (Section)
### Heading 3 (Subsection)

**Bold text** for emphasis

`inline code` for variables, commands, filenames

> Important note or quote

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://example.com)

![Alt text](path/to/image.jpg)
```

---

## 🔗 Links & References

### Internal Links

Link to other posts:
```markdown
[Check out my Python tutorial](../python-github-actions-ci-cd-tutorial/)
```

### External Links

Include proper references:
```markdown
[Hugo Documentation](https://gohugo.io/documentation/)
```

### Links in Metadata

Set `externalLinks` for tools/resources mentioned:
```yaml
externalLinks:
  - title: "Resource Name"
    url: "https://example.com"
```

---

## 🖼️ Images

### Adding Images

1. Place images in `static/images/`
2. Reference in markdown:
   ```markdown
   ![Alt text describing the image](/images/filename.jpg)
   ```

3. Use descriptive alt text:
   - ✅ "Screenshot of GitHub Actions workflow"
   - ❌ "image1"

### Image Guidelines

- Use **PNG** for screenshots and diagrams
- Use **JPG** for photos
- Keep file size under 1MB (compress if needed)
- Use **meaningful filenames**: `github-actions-workflow.png` not `image1.png`

---

## 📌 Draft Management

### Creating Draft Posts

New posts are created with `draft: true`:
```bash
make new_post
# Creates post with draft: true
```

### Publishing a Draft

1. Set `draft: false` in front matter
2. Verify date is set correctly
3. Test locally: `make dev`
4. Commit and push

### Previewing Drafts Locally

```bash
make dev  # Shows draft posts in local server
make preview  # Hides draft posts (production mode)
```

---

## 🔍 SEO Guidelines

### Meta Description (50-160 characters)

Write compelling descriptions for search engines:

✅ **Good**:
```yaml
description: 'Learn how to set up GitHub Actions for Python CI/CD pipelines with step-by-step examples and best practices.'
```

❌ **Poor**:
```yaml
description: 'My blog post about Python'
```

### Title Optimization

- Keep titles under 60 characters for best display in search results
- Include relevant keywords naturally
- Be descriptive and specific

### Tag Strategy

Tags become URL slugs:
- `tags: ['python', 'ci-cd']` → `/tags/python/`, `/tags/ci-cd/`
- Keep tags focused and findable
- Avoid overly broad tags

---

## ✅ Pre-Publish Checklist

Before setting `draft: false`:

- [ ] Title is clear and descriptive
- [ ] Description is 50-160 characters
- [ ] Date is correct (ISO 8601 format)
- [ ] At least 2-4 relevant tags
- [ ] Content proofread for grammar/spelling
- [ ] Code examples are tested and work
- [ ] All links are correct
- [ ] Images have alt text
- [ ] Front matter is valid YAML
- [ ] Post follows structure guidelines
- [ ] Local preview looks good (`make preview`)

---

## 📚 Examples

### Example 1: Tutorial Post

```yaml
---
title: 'How to Set Up GitHub Actions for Python Testing'
description: 'Step-by-step guide to automating Python tests with GitHub Actions, including pytest configuration and best practices.'
date: '2026-04-12T10:00:00-04:00'
tags: ['python', 'github-actions', 'ci-cd', 'testing']
draft: false
---

## Introduction

GitHub Actions is a powerful CI/CD platform that integrates directly with your GitHub repository...
```

### Example 2: Quick Tip Post

```yaml
---
title: 'Quick Tip: Speeding Up Docker Builds'
description: 'Use Docker layer caching effectively to reduce build times significantly.'
date: '2026-04-11T14:30:00-04:00'
tags: ['docker', 'devops']
draft: false
---

## The Tip

Docker layer caching is powerful when you order your Dockerfile correctly...
```

---

## ❓ Frequently Asked Questions

**Q: Can I update an old post?**
A: Yes! Update the content and set the current date if significantly updated, or add an "Updated:" note at the top.

**Q: How do I add code syntax highlighting?**
A: Use triple backticks with the language:
```python
# Your code
```

**Q: Can I use HTML in posts?**
A: Yes, but keep it minimal. Use Markdown equivalents when possible.

**Q: How do I create internal links?**
A: Use relative paths: `[link text](../other-post-name/)`

**Q: What if I want to schedule a post?**
A: Set `draft: true` and update the date. Posts publish when the date arrives.

---

## 📞 Questions?

Refer to:
- [Hugo Markdown Guide](https://www.markdownguide.org/)
- [Hugo Content Organization](https://gohugo.io/content-management/)
- README.md in this repository

---

**Last Updated**: April 12, 2026
