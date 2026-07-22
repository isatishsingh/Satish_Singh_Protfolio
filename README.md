# Satish Singh — Portfolio

Personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Recharts**. All site content lives in `/data` files so you can update the site without touching component code.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) by connecting this repository.

## Updating content

Edit the files in `/data` and refresh the site.

| File | What to update |
| --- | --- |
| `data/profile.ts` | Name, role, hero intro, and about paragraph |
| `data/contact.ts` | Email, phone, and social links |
| `data/skills.ts` | Unified skills list (`{ name, category? }[]`) |
| `data/experience.ts` | Work history with role, company, dates, and bullets |
| `data/projects.ts` | Project cards, tech stack, GitHub/live URLs |
| `data/education.ts` | Degrees, institutions, and details |
| `data/leetcode.ts` | LeetCode stats, contest rating, profile URL |
| `data/patterns.ts` | Pattern bubbles and solved problem paths with LeetCode slugs |
| `data/navigation.ts` | Header navigation labels and links |

### Placeholders to fill in

- **`data/projects.ts`** — Actual GitHub repo URLs and live deployment URLs
- **`data/patterns.ts`** — Your real solved problems per pattern (title + LeetCode slug)
- **`data/leetcode.ts`** — Verify stats match your live LeetCode profile

## Pages

- **`/`** — Main portfolio
- **`/dsa`** — LeetCode-style problem solving dashboard with pattern explorer

Click **Problem Solving** in the nav or the hero CTA to open the DSA dashboard.

## Project structure

```
app/           Next.js App Router pages and global styles
components/    UI sections and DSA dashboard components
data/          Editable content
types/         Shared TypeScript types
```

## Features

- Dark/light mode toggle with persisted preference
- Responsive, mobile-first layout with improved light mode styling
- Subtle scroll-triggered section animations
- Dedicated `/dsa` page with charts, heatmap, and clickable pattern paths
- Accessible semantic HTML and focus states
