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
| `src/mediaConfig.ts` | Atmosphere loop slots; see `docs/ai/MEDIA-BRIEF.md` |
| `public/` | Everything here is published — never put private material in it |
| `private-assets/` | Untracked source material that must not be served |
| `docs/ai/` | Product, design and delivery documents, plus review records |

## The agent harness

This site is built by a small set of agents with explicit, unequal rights, and
that is deliberate: it is what keeps a generated page from quietly inventing
claims about a real business.

| Role | Writes | Owns |
| --- | --- | --- |
| Orchestrator | Repository, git, Jira, releases | Scope, sequencing, evidence |
| `frontend-builder` | Production frontend | The only agent that may edit `src/` |
| `product-strategist` | Nothing | Positioning, claim integrity, EN/RU parity |
| `art-director` | Nothing | Visual hierarchy, crops, motion restraint |
| `launch-reviewer` | Nothing | The independent verdict before a merge |

Three read-only agents against one writer is the point. A reviewer that cannot
edit cannot quietly fix what it should be reporting, and a builder that cannot
approve cannot sign off on its own work. Read-only agents may run concurrently;
two production writers must never run at once.

Definitions live twice, once per harness — `.claude/agents/*.md` and
`.codex/agents/*.toml`. The role bodies are identical and only the frontmatter
differs. Change one, change the other.

Commit subjects carry the Jira key. Reviewer verdicts are recorded in the PR as
text; a same-account GitHub approval is not a substitute for review and is
never faked.

## Generated media

Every generated asset is traceable. `docs/ai/ASSET-PROVENANCE.md` records the
model, prompt, date, job IDs where they were captured, the exact ffmpeg and
`cwebp` invocations, and the measured result — loop seams as PSNR, encode
fidelity as SSIM, and file sizes. `docs/ai/MEDIA-BRIEF.md` holds the briefs the
assets were generated against.

Two rules that are easy to get wrong:

- Media is additive. A poster is a real element underneath every loop, so a
  missing file, a blocked request or an unsupported codec costs atmosphere and
  nothing else.
- The published case screenshots are derivatives of untracked private sources.
  They may be cropped and re-encoded, never recoloured, skewed, or dressed in
  device chrome — `docs/ai/CONTENT-BRIEF.md` is the contract.

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
