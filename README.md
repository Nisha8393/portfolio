# Nisha Shrestha — Portfolio

A premium personal portfolio for **Nisha Shrestha**, Senior Software QA Analyst
specializing in Test Automation, API Testing, Performance Testing, CI/CD, and
AI/LLM Quality Engineering.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react**.

---

## ✨ Features

- **Single-page, section-based layout** with sticky nav & smooth scrolling
- **Dark / light mode** (system-aware, remembers preference)
- **Animated hero "QA console"** — a code-driven visual of a CI/CD pipeline (no photo, no cartoon avatar)
- **Interactive experience timeline** (tabbed on desktop, accordion on mobile)
- **Case-study project cards** (Problem → Approach → Tech → Impact)
- **Interactive QA dashboard** with animated metrics & a testing-strategy pyramid
- **Categorized skill cards** and **certification cards**
- **Engineering philosophy** feature section
- **Working contact form** with graceful `mailto:` fallback
- **SEO-ready**: metadata, Open Graph, JSON-LD `Person` schema, `robots.txt`, `sitemap.xml`
- **Accessible & responsive**, mobile-first, `prefers-reduced-motion` respected

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# open http://localhost:3000

# 3. Production build
npm run build
npm start
```

Requires **Node.js 18.17+** (Node 20+ recommended).

---

## 🗂️ Project structure

```
portfolio/
├── app/
│   ├── layout.tsx           # Root layout, fonts, SEO metadata, JSON-LD
│   ├── page.tsx             # Assembles all sections
│   ├── globals.css          # Tailwind layers, design tokens, component classes
│   ├── icon.svg             # Favicon
│   ├── robots.ts            # robots.txt
│   ├── sitemap.ts           # sitemap.xml
│   └── api/contact/route.ts # Contact endpoint (stub — see "Contact form")
├── components/
│   ├── navbar.tsx           ├── qa-console.tsx        (hero visual)
│   ├── hero.tsx             ├── qa-dashboard.tsx      (metrics section)
│   ├── about.tsx            ├── experience-timeline.tsx
│   ├── project-cards.tsx    ├── skill-cards.tsx
│   ├── certification-cards.tsx  ├── philosophy.tsx
│   ├── contact-section.tsx  ├── footer.tsx
│   ├── theme-provider.tsx   ├── theme-toggle.tsx
│   ├── scroll-progress.tsx
│   └── ui/                  # reveal, section-heading, count-up
├── lib/
│   ├── data.ts              # ⭐ ALL content lives here — edit this file
│   └── utils.ts
└── public/
    └── Nisha-Shrestha-Resume.pdf   # ⚠️ placeholder — replace with your real PDF
```

---

## ✏️ Editing content

**All copy, experience, projects, skills, certifications, links, and metrics
live in [`lib/data.ts`](lib/data.ts).** Edit that one file to update the site —
components read from it, so you never have to touch JSX for content changes.

- **Social / contact links** → `site.socials` in `lib/data.ts`
- **Resume** → replace `public/Nisha-Shrestha-Resume.pdf` with your real PDF
  (keep the same filename, or update `site.resumeUrl`)
- **Domain** → set `site.url` (used by SEO metadata, sitemap, JSON-LD)

---

## ✉️ Contact form

Out of the box the form uses a **`mailto:` fallback** — it always works and
opens the visitor's email client pre-filled to `nishashrestha5470@gmail.com`.

To send email server-side instead, wire an email provider into
`app/api/contact/route.ts` (instructions are in the file header). Easy options:

- **[Resend](https://resend.com)** — `npm i resend`, set `RESEND_API_KEY`
- **[Formspree](https://formspree.io)** — point the fetch at your form endpoint
- **SendGrid / Nodemailer**

Store any API key in an environment variable (e.g. `.env.local`), never in code.

---

## ☁️ Deployment

### Vercel (recommended — zero config)

1. Push this folder to a GitHub repo.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Framework preset auto-detects **Next.js** → click **Deploy**.
4. (Optional) add a custom domain and set `site.url` to match.

```bash
# or deploy from the CLI
npm i -g vercel
vercel
```

### Netlify

1. Push to GitHub, "Add new site" → import the repo.
2. Build command `npm run build`, and install the
   [`@netlify/plugin-nextjs`](https://github.com/netlify/next-runtime) plugin
   (Netlify adds it automatically for Next.js apps).

### Static export (GitHub Pages, etc.)

The contact **API route** requires a Node runtime. For a fully static host,
remove `app/api/contact/route.ts` (the form falls back to `mailto:` anyway) and
add `output: "export"` to `next.config.mjs`, then `npm run build` produces `/out`.

---

## 🎨 Design system

- **Colors** — a green → black fade (emerald glow up top deepening to near-black),
  emerald (`brand`) accent, cyan/teal secondary cues, soft grays. Tokens in
  `tailwind.config.ts`; the page fade lives in `app/globals.css`.
- **Type** — Inter (body), Sora (display headings), JetBrains Mono (technical
  accents), all via `next/font`.
- **Motion** — subtle fade/rise on scroll, staggered reveals, hover lifts.
  Disabled automatically for `prefers-reduced-motion`.

Inspired by the engineering aesthetic of Linear, Vercel, Stripe, and OpenAI.

---

Made with Next.js, Tailwind CSS & Framer Motion.
