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
| `LOD-9` | Launch candidate: art direction correction, blocking fixes, and release | Launch |

`LOD-9` was created on 2026-07-31, after the fact. Twenty-two commits had
already been authored against that key before the issue existed, so for most of
the milestone neither the orchestrator nor the launch reviewer could read its
acceptance criteria — the reviewer recorded that gap in two consecutive
verdicts. The issue was created rather than rewriting history, because
`AGENTS.md` forbids destructive git operations.

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

## Launch acceptance snapshot

Mirrored for the same reason as the foundation snapshot above, and added after
a reviewer twice reported being unable to audit this milestone against its own
stories. If this section drifts from Jira, Jira wins.

### LOD-7 — launch quality

- layouts verified at desktop 16:9, laptop 16:10, 4:3, iPhone, and Android
- keyboard navigation, visible focus, skip link, landmarks, contrast, and
  accessible names verified
- reduced motion and static media fallbacks work
- decorative media is lazily or appropriately loaded and does not block
  readable hero content
- build, typecheck, lint, unit tests, and Impeccable detection pass
- no Playwright dependency or test harness is introduced
- no avoidable large layout shifts, console errors, or horizontal overflow

### LOD-8 — release

- four milestone PRs cover foundation, experience, content, and launch
- commits use LOD issue keys and remain scoped
- launch-reviewer independently reports blockers before each merge
- blocking findings are fixed and checks rerun
- PRs merge with green available checks; same-user review limitations are
  documented rather than faked
- GitHub Pages deployment completes and ozero.dev is reachable
- README documents local setup, architecture, AI harness, generated-media
  provenance, validation, and release workflow
- Jira stories contain or link final verification evidence

### LOD-9 — launch candidate

- the language switch leaves no content block hidden, with a regression test
  that fails against the unfixed hook
- first-load media stays under 2.5MB on desktop
- the media source follows the viewport across a phone rotation
- Russian copy reads as Russian, with every PRODUCT.md hedge preserved
- no claim exceeds PRODUCT.md or CONTENT-BRIEF.md, including the HTML head
- the fisherman signature is published whole, rod and line intact
- the hero type ramp carries the offer legibly in the first viewport
- vertical rhythm between sections stays inside the 144-192px contract
- the published case screenshots show evidence rather than empty background
- link previews use a purpose-built card, not the raw engraving
- art-director and launch-reviewer both return a verdict with no unresolved
  blockers

## Branch and commit policy

- `codex/lod-foundation`: `LOD-2`, `LOD-3`
- `codex/lod-experience`: `LOD-4`
- `codex/lod-content`: `LOD-5`, `LOD-6`
- `codex/lod-launch`: `LOD-7`, `LOD-8`, `LOD-9`

Commits are smaller than stories when useful, but each commit subject starts
with one Jira key. One milestone PR aggregates related commits so the workflow
is visible without creating Jira or GitHub overhead for every small edit.
