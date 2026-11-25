# Vishnu K — Premium Light Portfolio

Production-ready personal portfolio with an interactive React Three Fiber hero, Framer Motion animations, and a premium light design system.

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Customize

Edit **`src/data/portfolio.ts`**:

- Social links (email, GitHub, LinkedIn)
- Project `links.live` / `links.github` (buttons stay hidden until set)
- `resumeUrl` — put a PDF in `/public` and set e.g. `'/Vishnu_K_Resume.pdf'`
- Certifications, workshops, internships, achievements

### Contact delivery

Copy `.env.example` → `.env` and set `VITE_FORMSPREE_ID`.  
Without it, the form opens a real `mailto:` draft to your email — never a fake success state.

## Stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · Three.js / R3F / Drei · Lucide
