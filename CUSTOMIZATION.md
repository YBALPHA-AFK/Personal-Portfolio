# Suhaan's Portfolio — Customization Guide

A practical, no-fluff guide to running, editing, and personalizing this site.

---

## 1. Run it locally

From the project root (`D:\Projects\Personal Portfolio`):

```powershell
# Install dependencies (only the first time)
npm install

# Start the dev server (auto-opens http://localhost:5173)
npm run dev

# Build a production bundle into /dist
npm run build

# Preview the production build
npm run preview
```

Hot-reload is on — save any file and the browser updates instantly.

---

## 2. Folder map (what lives where)

```
Personal Portfolio/
├── public/                        # Static files served as-is (drop images here)
│   └── favicon.svg
├── src/
│   ├── App.jsx                    # Composes every section in order
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Tailwind + custom keyframes/utilities
│   ├── data/
│   │   └── portfolioData.js       # ← All your text content (edit here first!)
│   └── components/
│       ├── AnimatedBackground.jsx # Orbs + grid + particle field
│       ├── MatrixHover.jsx        # Cyan binary code that follows the cursor
│       ├── CustomCursor.jsx       # Cyan dot + trailing ring
│       ├── ScrollProgress.jsx     # Top progress bar
│       ├── Navbar.jsx             # Sticky glass nav
│       ├── Hero.jsx               # Top section (headshot + name)
│       ├── About.jsx              # Bio + values
│       ├── Experience.jsx         # Vertical timeline of roles
│       ├── Achievements.jsx       # Awards grid
│       ├── Skills.jsx             # Skill chips + marquee
│       ├── Certifications.jsx     # Cert list + featured card
│       ├── Education.jsx          # School cards
│       ├── TechStack.jsx          # Empty placeholder section
│       ├── Contact.jsx            # Contact panel
│       ├── Footer.jsx             # Footer
│       ├── SectionHeading.jsx     # Reusable section title
│       ├── GlowCard.jsx           # Mouse-following glow card
│       └── RevealImage.jsx        # Curtain + zoom + blur image reveal
├── tailwind.config.js             # Colors, fonts, animations
├── vite.config.js                 # Dev server config
└── index.html                     # HTML shell + Google Fonts link
```

---

## 3. Adding images

All images go in `public/`. Anything in `public/` is served at the root URL,
so `public/headshot.jpg` is reachable at `/headshot.jpg` in your code.

### Step-by-step

1. **Save your file** into `public/` (e.g. `public/headshot.jpg`).
2. **Find the placeholder** in the relevant component file.
3. **Replace the placeholder div** with an `<img>` tag.

### Where each image goes

#### Hero headshot — `src/components/Hero.jsx`

Find the block labeled `{/* Headshot placeholder */}` (around line 202). Replace
the inner contents (the centered "Drop headshot here" block) with:

```jsx
<img
  src="/headshot.jpg"
  alt="Suhaan Meerapatel"
  className="absolute inset-0 h-full w-full object-cover"
/>
```

You can keep the `<CornerBrackets />` and shimmer overlay — they sit on top.
**Recommended ratio:** 4:5 (e.g. 1200×1500). The card uses `aspect-[4/5]`.

#### About image — `src/components/About.jsx`

Find the `<RevealImage className="aspect-[4/5]" direction="up">` block. Replace
its `<div className="img-placeholder ...">` child with:

```jsx
<img
  src="/about.jpg"
  alt="About Suhaan"
  className="h-full w-full object-cover"
/>
```

The reveal animation works automatically.

#### Education photos — `src/components/Education.jsx`

Each school card has a `<RevealImage>` block at the top. Replace the inner
`<div className="img-placeholder ...">` with an `<img>`:

```jsx
<img
  src="/wfhs.jpg"
  alt="West Forsyth High School"
  className="h-full w-full object-cover"
/>
```

If you want different images per card, add an `image` field to each item in
`portfolioData.js` and reference it: `<img src={e.image} ... />`.

#### Certifications featured image — `src/components/Certifications.jsx`

Find the `<RevealImage className="aspect-[4/3]" direction="left">` block. Same
pattern: replace inner placeholder with `<img>`.

#### Experience photos — `src/components/Experience.jsx`

Each timeline card has a small "add photo" indicator at the bottom-right. To
turn the card into a card-with-image, add a `<RevealImage>` above the role
heading. Quick recipe inside `TimelineItem`:

```jsx
<RevealImage className="-mx-7 -mt-7 mb-5 h-40 rounded-t-2xl border-b border-cyan-glow/10">
  <img src={item.image} alt="" className="h-full w-full object-cover" />
</RevealImage>
```

Then add `image: '/deca-vp.jpg'` to each entry in `experience` inside
`portfolioData.js`. Don't forget to `import RevealImage from './RevealImage'`.

---

## 4. Editing text content

**Single source of truth: `src/data/portfolioData.js`.**

Open that file and you'll see clearly named exports:

| Export             | What it controls                           |
| ------------------ | ------------------------------------------ |
| `profile`          | Name, role, email, LinkedIn, summary, stats |
| `profile.taglines` | Lines the typewriter cycles through        |
| `profile.stats`    | The 4-up stat strip below the hero         |
| `skills`           | Skill chips (each has `name` + `icon`)     |
| `experience`       | Timeline entries                           |
| `education`        | School cards                               |
| `honors`           | Awards grid                                |
| `certifications`   | Cert list                                  |
| `navLinks`         | Top-nav menu items                         |
| `languages`        | Language strip                             |

Save and the page hot-reloads.

### Adding a new role to Experience

```js
{
  org: 'Your Org',
  role: 'Your Role',
  period: 'Aug 2026 — Present',
  duration: '1 month',
  location: 'Cumming, GA',
  icon: Briefcase, // pick from lucide-react (see top of file for examples)
  badge: 'Current', // optional — shows green pulsing dot
  points: [
    'Bullet one.',
    'Bullet two.',
  ],
  color: 'from-cyan-glow to-cyan-soft',
},
```

### Adding a new skill chip

```js
{ name: 'New Skill', icon: Target }, // any icon imported at the top of the file
```

Browse icons at https://lucide.dev — make sure to import the icon at the top of
`portfolioData.js`.

---

## 5. Changing colors and fonts

### Colors — `tailwind.config.js`

```js
colors: {
  cyan: {
    glow: '#00daff',  // primary accent — change this to recolor the whole site
    deep: '#0099b8',
    soft: '#7aebff',
  },
  ink: {                // dark backgrounds
    950: '#020306',
    900: '#05080d',     // page background
    800: '#0a0e15',     // card background
    ...
  },
}
```

After changing a color, restart `npm run dev` for the change to fully take
effect.

### Fonts — `index.html`

Look at the `<link>` tag pulling Google Fonts. Swap the family names there, then
update `tailwind.config.js`:

```js
fontFamily: {
  sans:    ['Inter', 'sans-serif'],
  display: ['Space Grotesk', 'Inter', 'sans-serif'],
  mono:    ['JetBrains Mono', 'monospace'],
},
```

`font-display` is the big bold heading font; `font-sans` is body; `font-mono`
is the small uppercase labels.

---

## 6. Animations + effects (where to tweak)

| Effect                        | File                                | Knob                                          |
| ----------------------------- | ----------------------------------- | --------------------------------------------- |
| Cursor speed / springs        | `CustomCursor.jsx`                  | `useSpring({ stiffness, damping })` values    |
| Matrix density / radius       | `MatrixHover.jsx`                   | `CELL`, `RADIUS`, `MAX_OPACITY`, `TARGET_FPS` |
| Particle count + line links   | `AnimatedBackground.jsx`            | `count`, `linkDist` constants                 |
| Image reveal duration         | `RevealImage.jsx`                   | `duration` and `delay` in transitions         |
| Hero typewriter speed         | `Hero.jsx`                          | `typeSpeed`, `eraseSpeed`, `hold` props       |
| Marquee speed                 | `tailwind.config.js`                | `animation: marquee`'s `30s` duration         |
| Section padding               | `index.css`                         | `.section-pad` rule                           |

To **disable the Matrix effect** entirely: open `App.jsx` and remove the
`<MatrixHover />` line.

To **disable the custom cursor**: same — remove `<CustomCursor />`.

---

## 7. Adding a new section

1. Create `src/components/MySection.jsx` (copy `TechStack.jsx` as a template).
2. Give the wrapping `<section>` an `id` (e.g. `id="projects"`).
3. Import + add it inside `<main>` in `src/App.jsx`.
4. Add a nav entry in `portfolioData.js` → `navLinks`.

That's it — the navbar, scroll-spy, and smooth-scroll all wire up automatically
based on the `id`.

---

## 8. Filling in the Tech Stack section

The placeholder lives in `src/components/TechStack.jsx`. When you're ready:

1. Add a `techStack` export to `portfolioData.js`:

   ```js
   import { Code2, Database, Cloud } from 'lucide-react'
   export const techStack = [
     { name: 'React', category: 'Frontend', icon: Code2 },
     { name: 'PostgreSQL', category: 'Backend', icon: Database },
     // ...
   ]
   ```

2. In `TechStack.jsx`, replace the `Array.from({ length: 8 }).map(...)` block
   with `techStack.map(...)` and render whatever style you want (chip, card,
   logo grid).

---

## 9. Deploying

The site is a static SPA — works on any static host.

- **Vercel:** `vercel` from the project folder (zero config).
- **Netlify:** drag-drop the `dist/` folder after `npm run build`.
- **GitHub Pages:** push, then point Pages at the `dist/` branch.
- **Cloudflare Pages:** connect repo → build command `npm run build` → output `dist`.

---

## 10. Troubleshooting

- **Cursor stuck or weird positioning** → hard-refresh (Ctrl+F5). The cursor
  component adds a body class on mount; reload re-attaches it.
- **Matrix effect heavy on old hardware** → in `MatrixHover.jsx` lower
  `TARGET_FPS` to `20` and bump `CELL` to `28`.
- **Build fails after adding a package** → delete `node_modules` and
  `package-lock.json`, then `npm install`.
- **Tailwind class not applying** → make sure the file path is included in
  `tailwind.config.js → content`. The default glob covers `src/**/*.{js,jsx}`.
