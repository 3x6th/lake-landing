# Motion implementation plans

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| [001](./001-fisherman-ascii-hero.md) | Build the fisherman-to-ASCII hero passage | High | TODO |

## Execution order

1. Execute plan 001 during Jira story `LOD-4`.
2. Run the independent `review-animations` audit against the implementation.
3. Resolve all blocking findings before the experience milestone PR.

## Dependencies

Plan 001 depends on the approved art direction in `DESIGN.md`, product truth in
`PRODUCT.md`, and the production media under `public/media/hero/`. It must
finish before later content-section animation decisions are considered.
