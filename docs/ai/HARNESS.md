# The harness

This repository is a working site. It is also a record of how it was built:
by an orchestrating agent directing four specialised subagents, across two
different agent runtimes, against documents that outrank the code.

Read `AGENTS.md` for the rules. This file is the account of whether they held.

## The shape

| Role | Writes | Owns |
| --- | --- | --- |
| Orchestrator | Repository, git, Jira, releases | Scope, sequencing, evidence |
| `frontend-builder` | Production frontend | The only agent that may edit `src/` |
| `product-strategist` | Nothing | Positioning, claims, EN/RU parity |
| `art-director` | Nothing | Hierarchy, crops, motion restraint |
| `launch-reviewer` | Nothing | The independent verdict before a merge |

**Three read-only roles against one writer.** A reviewer that cannot edit
cannot quietly fix what it should be reporting; a builder that cannot approve
cannot sign off on its own work. Read-only agents run concurrently; two
production writers never do.

## Two runtimes, one definition

The work began in Codex and finished in Claude Code. Each subagent is therefore
defined twice — `.codex/agents/*.toml` and `.claude/agents/*.md` — with
identical role bodies and only the frontmatter differing, because read-only is
expressed as a sandbox mode in one and a restricted tool list in the other.

Portability was not free. Mid-project the account hit a monthly spend limit
that killed a subagent outright, and the orchestrator continued in-thread and
said so in the delivery record rather than pretending the agent had run.

## Authority

`PRODUCT.md` → `DESIGN.md` → the Jira story → `docs/ai/REFERENCE-LOCK.md` →
`AGENTS.md`. A conflict stops the conflicting work and defers upward.

This is the part that did real work. It is what stopped a Taska description
claiming roles, workflows and notifications the product does not authorize;
what kept `Реалистичный` in the Russian hero when a better-reading line wanted
to drop it, because the hedge *is* the claim; and what refused a saturation
filter on a case screenshot that the content contract forbids recolouring,
recording the clash as an owner decision instead.

## What the record is for

The interesting artifacts here are not the successes.

**A reviewer overruled the orchestrator, twice.** `launch-reviewer` returned
REQUEST CHANGES on a commit whose message claimed a fix that the built artifact
disproved frame by frame. The claim was wrong, the commit message was corrected
along with the code, and both rounds are in the PR.

**A builder refused an instruction and was right.** Asked to rescale an SVG
coordinate space on the orchestrator's theory of a WebKit bug, `frontend-builder`
compiled a WKWebView probe, falsified the theory by measurement, found the real
cause — `decoding = 'async'` handing an undecoded bitmap to a canvas — and
reported that it had not made the requested change.

**Three defects shipped past a complete evidence matrix**, and the owner found
all three by looking at the running site. Each is recorded in
`docs/ai/evidence/README.md` with what the method could not see and why.

**An owner decision overruled a blocking art-direction finding**, and is
recorded as exactly that in `docs/ai/reviews/LOD-9-art-direction.md` — not
softened into agreement, and reversible because the measurements are kept.

**A Jira story did not exist for most of its own branch.** Twenty-two commits
carried the key `LOD-9` before the issue was created, so nobody could audit the
work against its acceptance criteria; two consecutive reviewer verdicts said
so. The issue was created after the fact rather than rewriting history, and
`docs/ai/JIRA-WORKFLOW.md` now mirrors the criteria into the repository so a
reviewer without Jira access can check them.

## Verification

`npm run check` is typecheck, lint at zero warnings, and unit tests.
`npm run build` is the production build. Neither proves visual, content or
deployment correctness, and the harness says so in as many words.

There is no CI on pull requests in this repository — the deploy workflow fires
on push to `main` — so "merge on green" has always meant local verification
plus a written reviewer verdict. No GitHub approval was ever given or claimed;
a same-account approval would be theatre.
