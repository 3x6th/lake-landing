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

## Branch and commit policy

- `codex/lod-foundation`: `LOD-2`, `LOD-3`
- `codex/lod-experience`: `LOD-4`
- `codex/lod-content`: `LOD-5`, `LOD-6`
- `codex/lod-launch`: `LOD-7`, `LOD-8`

Commits are smaller than stories when useful, but each commit subject starts
with one Jira key. One milestone PR aggregates related commits so the workflow
is visible without creating Jira or GitHub overhead for every small edit.
