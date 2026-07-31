# Ozero Dev

Read [AGENTS.md](AGENTS.md) first. It is the single authority for roles,
delivery flow, frontend constraints, evidence, and safety — this file only
points at it so the Codex and Claude Code harnesses share one source of truth.
Do not duplicate harness rules here; change `AGENTS.md` instead.

Authority order when sources conflict: `PRODUCT.md` → `DESIGN.md` → the Jira
story → `docs/ai/REFERENCE-LOCK.md` → `AGENTS.md`. A conflict stops the
conflicting work and defers to the higher-ranked source.

Subagents live in `.claude/agents/` and mirror `.codex/agents/*.toml`. Keep the
two in sync when a role changes. `frontend-builder` is the only one that may
edit production frontend code.

Verification: `npm run check` (typecheck + lint + test), then `npm run build`.
A green build does not prove visual, content, or deployment correctness.
