# ozero.dev

Marketing site for Ozero Dev, a Java-first talent network. Single page,
English primary with Russian at full parity, statically hosted on GitHub Pages
at [ozero.dev](https://ozero.dev).

## Stack

Vite 8, React 19, strict TypeScript. Vitest and Testing Library for tests,
ESLint for linting. Fonts are self-hosted through `@fontsource`. No CSS
framework and no animation library: the motion is a small scroll-progress hook
and plain CSS.

Node 20.19 or newer.

## Commands

```bash
npm install
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 5173 |
| `npm run check` | Typecheck, lint and tests — run before every commit |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output |

## Layout

| Path | Contents |
| --- | --- |
| `src/siteContent.ts` | All copy, both locales. `Record<Language, UiCopy>` makes a missing translation a compile error |
| `src/components/` | Hero, the fisherman interlude, and the content sections |
| `src/hooks/` | Scroll-stage driver, reveal observer, nav scroll flag |
| `src/mediaConfig.ts` | Atmosphere loop slots; see `docs/ai/VIDEO-BRIEF.md` |
| `public/` | Everything here is published — never put private material in it |
| `private-assets/` | Untracked source material that must not be served |
| `docs/ai/` | Product, design and delivery documents, plus review records |

## Before changing anything

Read [AGENTS.md](AGENTS.md). It defines the authority order, what may and may
not be claimed on the page, and what evidence a change needs. `PRODUCT.md` and
`DESIGN.md` outrank the implementation; if they conflict with what you are
doing, resolve the document first rather than working around it.

Two constraints catch people out:

- Nothing readable may depend on animation. Reveal and scroll effects are
  additive and degrade to plain content.
- `public/` is copied wholesale into `dist/`. Ignoring a file there does not
  stop it being published.

## Deployment

`.github/workflows/deploy.yml` runs `npm ci`, `npm run check` and
`npm run build` on a clean checkout, then publishes `dist/`. `public/CNAME`
holds the custom domain.
