# Personal Website (thomasjamesgale.com)

Plan:

0. scaffolding & deps

ui: tailwindcss @radix-ui/react-\* class-variance-authority (or shadcn)

three/r3f: three @react-three/fiber @react-three/drei

physics: @react-three/rapier

utils: valtio (state), react-spring (subtle ui motion), zod (schema)

seo: next-seo next-sitemap

set up tailwind + a minimal design token (brand colour palette)

set up eslint/prettier and npm scripts (dev, build, lint, typecheck)

files

/app
/api
/skills/ (optional JSON route later)
layout.tsx
page.tsx
globals.css
/src
/components
/gl # r3f scene bits
/lib # linkedin ingest, schema helpers
/types

1. content ingestion (linkedin → typed data)

avoid scraping; prefer manual export + a tiny mapping script.

export linkedin data (settings → data privacy → get a copy of your data → “resume pdf” and “profile” json if available)

write a small parser to map to your site schema:

src/types/profile.ts (Person, Experience, Project, Skill)

src/lib/ingest/linkedin.ts (pure function mapping json → typed data)

store curated data in repo for now: content/profile.json, content/skills.json

create a minimal cms-less accessor: src/lib/data.ts that returns objects

acceptance

page builds without network; console.log(getSkills()) shows your curated list

2. central uikit card (“Engineer of things”)

component: src/components/ProfileCard.tsx

avatar (rounded), name, 1-liner “Engineer of things”

buttons: “email”, “github”, “gale systems”

keyboard focusable; high contrast; respects prefers-reduced-motion

responsive: centered on mobile; max-width ~420–520px

acceptance

lighthouse a11y ≥ 95; tab order sane; works with js disabled (card still renders)

3. skill system data → visual tokens

define skill model with display props:

type Skill = {
id: string; label: string; level?: 1|2|3;
color?: string; shape?: "box"|"sphere"|"capsule"|"tetra";
weight?: number; // affects orbit radius / mass
}

create content/skills.json with 20–40 items (short labels)

utility to assign defaults (color/shape) deterministically from label hash

acceptance

deterministic visuals across sessions w/out storing user state

4. r3f scene: orbiting physics swarm

scene wrapper: src/gl/Scene.tsx (Canvas, camera, lights)

physics world: @react-three/rapier <Physics gravity={[0,0,0]}>

central “no-go” collider around the card (soft boundary)

spawn skill bodies:

randomised initial positions on a torus/sphere shell

gentle orbital forces (custom hook adds tangential impulse per tick)

varied mass/drag based on weight

shapes:

mesh components per shape; use Text from drei for labels (or dynamic sprite text)

Billboard or per-hover re-orientation (see §5)

acceptance

60fps on desktop mid-tier gpu; ≥30fps on mobile; CPU < 30% on idle

when physics paused, swarm freezes gracefully

5. interaction: hover/touch focus + readability

raycasting: pointer move picks nearest skill

on hover/focus:

temporarily increase linear damping of that body

apply impulse toward camera (or to a focus anchor in front of card)

smoothly orient text toward camera (slerp quaternion)

upscale label slightly, increase contrast, add subtle bloom/glow (optional)

on hover lost:

restore damping/mass over 0.5–1s; return to orbit flow

mobile:

single tap selects/locks focus; tap outside to release

optional: drag to “swim” the field (cursor gravity)

acceptance

pointer over a shape makes it legible within ~250ms, no jitter

mobile tap toggles focus; second tap elsewhere releases

6. performance & fallbacks

instancing: use Instances for repeated shapes (boxes/spheres)

text strategy:

prefer Text (msdf) with low weight; or pre-baked sprite-text for small sizes

cap visible label detail when distance > threshold (fade text, keep colour)

suspend canvas until in viewport; SSR rest of page

prefers-reduced-motion: disable physics, render static constellation

defensive bounds: stop sim on background tab (page visibility)

acceptance

web vitals good (LCP < 2.5s on wifi); memory stable during 60s idle

7. layout & compose page

app/page.tsx layout grid:

center column: ProfileCard

background: absolute Scene layer (z-behind)

ensure card remains topmost, pointer events pass through to scene except on controls

dark mode default (brand accents), readable in light too

8. polish

subtle ambient audio toggle? (off by default)

motion blur/bloom minimal preset on desktop only

shadow under card to ground the composition

tasteful entrance animation (fade/scale) obeying motion settings

9. seo, meta, analytics

next-seo default config (title, description, og image)

/api/og route (satori) for dynamic og with avatar + “Engineer of things”

Person JSON-LD with sameAs (github, x, linkedin)

robots.txt, sitemap.xml (next-sitemap)

analytics: Vercel Analytics or Plausible (no cookies)

10. accessibility & testing

colour contrast ≥ 4.5:1 for text; test on hover state too

keyboard: provide a “skills list” skip-link that focuses a plain HTML list mirroring the 3D labels (for screen readers)

add unit tests for data mappers; playwrite smoke test that:

loads page, waits for canvas, hovers first skill, asserts label scales

mobile viewport tap focus works

11. deployment

vercel project -> map thomasjamesgale.com, redirect www → apex

environment var for analytics key (if used)

preview deployments comments enabled

12. stretch ideas (later)

“pin” favourite skills; let users fling skills with pointer impulse

time-of-day driven lighting (hdr env swap)

import from jsonresume / github readme to enrich content

“tech constellations” groups with gentle spring lines between related skills

## Dev

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
