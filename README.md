# Core Edge Academy Website

Marketing site for Core Edge Academy, an industry-ready IT training institute in
Ameerpet, Hyderabad. Built with React + Vite.

## Run Locally

```bash
npm install
npm run dev
```

The local dev URL is usually `http://localhost:5173`.

## Build And Preview

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` folder to any static host such as Netlify, Vercel,
Cloudflare Pages, GitHub Pages, or S3.

## Project Structure

```text
index.html
package.json
vite.config.js

public/
  logo.png
  manifest.webmanifest
  og-image.png
  robots.txt
  sitemap.xml

scripts/
  og-image.html

src/
  main.jsx
  App.jsx
  index.css

  assets/
    companies/
    courses/
    logo-full.png
    logo-mark.png

  components/
    courses/
    Audience.jsx
    Contact.jsx
    CourseLayout.jsx
    CourseSection.jsx
    FAQ.jsx
    Footer.jsx
    Header.jsx
    Hero.jsx
    HiringPartners.jsx
    Layout.jsx
    Successstories.jsx
    WhyUs.jsx

  data/
    courses.js

  pages/
    Home.jsx
    Enroll.jsx
    ArtificialIntelligence.jsx
    AutomationTesting.jsx
    BusinessAnalyst.jsx
    CyberSecurity.jsx
    DataAnalytics.jsx
    DevOps.jsx
    FlutterDevelopment.jsx
    FullStackDevelopment.jsx
    ScrumMaster.jsx
    TableauAI.jsx

  styles/
    shared/
    home/
    course/
    pages/
    legacy/
```

## Where To Edit

Home page sections live in `src/pages/Home.jsx` and are implemented as separate
components in `src/components`.

Course page content lives in `src/data/courses.js`.

Home page styles live in `src/styles/home`.

Shared layout, header, footer, button, and responsive styles live in
`src/styles/shared`.

Course page styles live in `src/styles/course`.

Page-specific styles, such as the enroll page, live in `src/styles/pages`.

Older CSS kept for compatibility during cleanup lives in `src/styles/legacy`.

## Before Going Live

- Replace every `https://www.coreedgeacademy.com` placeholder with the real domain.
- Confirm the LinkedIn URL used in the footer and `index.html`.
- Confirm email, phone, address, and map details.
- Confirm local SEO details in `index.html`, `robots.txt`, and `sitemap.xml`.

## Quality Notes

- Built with React Router and Vite.
- Responsive layout with mobile navigation.
- Production build outputs to `dist/`.
- updated after connecting Vercel to GitHub.
