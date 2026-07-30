# Jira delivery map

Personal Jira project: [LOD — Landing Ozero Dev](https://jira.ozero.dev/projects/LOD/issues)

## Epic

- `LOD-1` — Ozero Dev cinematic landing redesign

## Stories

| Key | Story | Milestone |
| --- | --- | --- |
| `LOD-2` | Design system and generated media foundation | Foundation |
| `LOD-3` | Foundation: Codex harness and Vite migration | Foundation |
| `LOD-4` | Experience: cinematic hero and motion system | Experience |
| `LOD-5` | Content components: offers, work, process, profiles, FAQ, and contact | Content |
| `LOD-6` | Content: bilingual sales narrative and information architecture | Content |
| `LOD-7` | Launch quality: responsive, accessibility, and performance hardening | Launch |
| `LOD-8` | Release: independent review, milestone PRs, and GitHub Pages deployment | Launch |

Each story contains its own outcome, acceptance criteria, dependencies, and
required verification evidence. All seven are linked to `LOD-1` using the Jira
Epic Link field.

## Foundation acceptance snapshot

The Jira issues remain authoritative. These criteria are mirrored here so a
read-only repository reviewer can audit the foundation milestone without Jira
access.

### LOD-2

- `PRODUCT.md`, `DESIGN.md`, the reference lock, and the hero storyboard are
  authoritative and non-conflicting.
- Generated-media provenance records source, model, prompt, date, job IDs,
  processing, rejection history, and production inventory.
- Desktop, 4:3, and portrait assets are available locally and optimized.
- Production media contains no baked-in text, UI, logos, or fake telemetry.
- Palette, typography, spacing, motion, and responsive principles are
  represented as reusable tokens.

### LOD-3

- `AGENTS.md` defines the orchestrator, four-agent ownership, safety rules, and
  evidence protocol.
- Product strategist, art director, and launch reviewer are read-only;
  frontend builder is the only subagent production-code writer.
- Vite build, strict TypeScript, lint, and focused unit tests are available as
  scripts.
- GitHub Pages publishes `dist` and preserves `ozero.dev` through `CNAME`.
- Secrets, IDE state, and build output are ignored.
- A clean `npm ci`, `npm run check`, and `npm run build` pass.

## Branch and commit policy

- `codex/lod-foundation`: `LOD-2`, `LOD-3`
- `codex/lod-experience`: `LOD-4`
- `codex/lod-content`: `LOD-5`, `LOD-6`
- `codex/lod-launch`: `LOD-7`, `LOD-8`

Commits are smaller than stories when useful, but each commit subject starts
with one Jira key. One milestone PR aggregates related commits so the workflow
is visible without creating Jira or GitHub overhead for every small edit.
