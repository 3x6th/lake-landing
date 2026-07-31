# Ozero Dev agent harness

This repository uses a small, explicit agent harness. The harness is part of
the delivery evidence, but customer-facing product copy must never mention it.

## Authority

1. `PRODUCT.md` defines product truth and prohibited claims.
2. `DESIGN.md` defines the visual system.
3. Jira `LOD-1` and its child stories define delivery scope and acceptance
   criteria.
4. `docs/ai/REFERENCE-LOCK.md` defines how external references may influence
   the work.
5. This file defines ownership and verification.

When two sources conflict, stop the conflicting work and follow the
higher-ranked source.

## Roles

| Role | Write access | Responsibility |
| --- | --- | --- |
| Primary Codex | Orchestration and repository operations | Scope, sequencing, Jira, git, PRs, merge, deployment, evidence |
| `product-strategist` | Read-only | Positioning, claim integrity, information architecture, EN/RU parity |
| `art-director` | Read-only | Visual hierarchy, asset/crop quality, responsive art direction, motion restraint |
| `frontend-builder` | Workspace write | The only subagent that may edit production frontend code |
| `launch-reviewer` | Read-only | Independent milestone and launch verdict |

Never run multiple production-code writers in parallel. Read-only agents may
research or review concurrently when their scopes do not overlap.

The four subagents are defined twice, once per harness: `.codex/agents/*.toml`
for Codex and `.claude/agents/*.md` for Claude Code. The role bodies are
identical; only the frontmatter differs, and read-only is expressed as a
restricted tool list rather than a sandbox mode. When a role changes, change
both.

## Delivery flow

The epic is `LOD-1`. Work is grouped into four milestone branches:

1. `codex/lod-foundation`
2. `codex/lod-experience`
3. `codex/lod-content`
4. `codex/lod-launch`

Each milestone may contain multiple atomic commits. Commit subjects start with
the relevant Jira key, for example:

```text
LOD-3 migrate CRA build to Vite
```

Before a milestone PR:

1. run the relevant local verification
2. capture browser evidence when UI is present
3. give the exact diff and evidence to `launch-reviewer`
4. fix all blocking findings
5. rerun checks
6. push and open the PR
7. merge only when available checks are green and the reviewer verdict has no
   blockers

Do not fake a same-user GitHub approval. Record the independent reviewer verdict
in the PR instead.

## Frontend constraints

- Vite, React, and strict TypeScript.
- English primary; Russian has full content parity.
- No pricing, founder/team section, or technology-logo wall.
- No invented clients, testimonials, results, metrics, or project completion
  states.
- No founder photos, names, GitHub profiles, secrets, or private project
  details.
- Keep the reachable contact email in one configuration constant.
- Keep readable content independent of animation.
- Provide `prefers-reduced-motion` behavior and static media fallbacks.
- Verify desktop 16:9, laptop 16:10, 4:3, iPhone, and Android layouts.
- Do not install or use Playwright.

## Verification evidence

Every completed story should have evidence proportional to risk:

- exact commands and outcomes
- changed files and commit SHAs
- browser viewport screenshots for visual work
- claim/content review for public copy
- accessibility, responsive, and reduced-motion checks
- independent reviewer verdict
- PR and deployment URLs at release

Report limitations directly. A green build does not prove visual, content, or
deployment correctness.

## Safety

- Use only the personal Jira at `jira.ozero.dev` for writes.
- Never print or commit credentials.
- Preserve unrelated user changes.
- Stage explicit paths.
- Do not use destructive git commands.
- Do not publish external messages or mutate systems outside the approved
  Jira/GitHub/deployment scope.
