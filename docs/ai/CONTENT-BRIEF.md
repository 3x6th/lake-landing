# Ozero Dev content milestone contract

This brief governs `LOD-5` and `LOD-6` on `codex/lod-content`. `PRODUCT.md`
owns public truth and `DESIGN.md` owns the visual system.

## Buyer job

A founder, product leader, or engineering leader should understand within one
reading pass:

1. Ozero Dev can add Java-first capacity without a long hiring cycle.
2. An engagement may begin with one engineer or a focused product squad.
3. Team extension is the primary offer; managed delivery and AI/knowledge
   integrations are secondary.
4. The work shown is real and its current status is explicit.
5. The next step is a direct email, not a lead-capture form.

English is primary. Russian must cover the same sections, facts, statuses,
actions, aria labels, and mailto subjects.

## Information architecture

1. Existing cinematic hero.
2. A ruled proof rail with four verified operating facts.
3. Three flat editorial offer rows.
4. Selected work: Taska in active development.
5. Selected work: anonymized internal AI knowledge-assistant R&D.
6. Four-step engagement process.
7. Aggregate delivery capability.
8. Buyer FAQ.
9. Quiet email conversion field and compact footer.

Primary navigation is `Offers · Work · Process · FAQ · Contact` in English and
`Форматы · Проекты · Процесс · Вопросы · Контакты` in Russian.

The current vacancy section is removed from the buyer journey. Recruitment may
appear only as a quiet footer-level email path; it must not imply an open role.
There is no founder, team, or profile section.

## Approved public proof

- Approximately 30 engineers in a curated Java-focused network.
- A focused start is realistic in one to three weeks.
- An engagement can begin with one engineer or a focused squad.
- The minimum engagement is one month.
- Each of the two principals has more than six years of production experience.
- Engineers across the network average approximately three years of
  experience.
- The network includes Java engineers, full-stack engineers, and project
  management capability.
- An English-speaking subset is available, with language fit confirmed during
  matching.
- Ozero Dev works with buyers in Europe and the CIS.

Do not turn these facts into animated counters, metric cards, outcomes, or
customer claims.

## Offer language

### Team extension

The primary offer. Add a Java engineer or a small cross-functional squad to an
existing team. The client keeps the roadmap and priorities. Ozero Dev may
support onboarding, technical oversight, mentoring, architecture, and
replacement.

### Managed delivery

For a defined product scope, Ozero Dev may assemble a focused team and
coordinate discovery, architecture, implementation, and delivery. Do not claim
guaranteed outcomes.

### AI and knowledge integrations

Ozero Dev can shape and integrate AI and knowledge workflows around a defined
product need, from assistant interfaces to the services behind them. Do not
publish model vendors, private data, confidential screens, or fabricated
metrics.

DevOps and observability are supporting engineering capabilities, not a fourth
commercial offer.

## Work evidence

### Taska

Status is always `IN DEVELOPMENT` / `В РАЗРАБОТКЕ`.

Describe it as a Jira/Kanban-like work-management product in active
development. Show the evolving interface and product decisions, never a
completed customer outcome. Use only optimized derivatives of:

- `private-assets/taska-source/img_2.png` as the primary board evidence;
- `private-assets/taska-source/img_1.png` as the supporting projects view.

Never publish or preload `img.png`, because it contains a visible login email.
Preserve all three user-supplied source files unchanged and untracked.

The sources were moved out of `public/` on 2026-07-31 and verified byte for
byte. Ignoring them was not enough: Vite copies the whole of `public/` into
`dist/`, so any local build published `img.png` regardless of what
`.gitignore` said. Anything that must not be served cannot live in `public/`.

Screenshots stay sharp and unmodified: no mock device, skew, glow, recolor,
rounded chrome, or violet site accent. Technology may appear only as a short
contextual metadata line.

### AI knowledge assistant

Status is always `INTERNAL R&D · ANONYMIZED` /
`ВНУТРЕННИЙ R&D · АНОНИМИЗИРОВАНО`.

Use a code-native semantic flow rather than an invented chat screen:

`Source library → Retrieval → Controlled generation → Response with sources`

Do not fabricate messages, document counts, confidence values, latency, usage,
logos, or outcomes.

The paused learning platform is omitted from the first release because it does
not strengthen the buyer proof beyond these two cases. If introduced later, it
must be explicitly labelled `PAUSED` / `ПРИОСТАНОВЛЕН`.

## Visual composition

- Canvas stays `#050706`; at most one full-width R&D band uses `#0A100E`.
- Desktop uses a 12-column grid up to 1440px, 24px gaps, and 48–64px gutters.
- Tablet uses 8 columns, 20px gaps, and 32px gutters.
- Mobile uses 4 columns, 12px gaps, and 20px gutters.
- Desktop sections use 144–192px vertical rhythm; mobile uses 88–104px.
- Section and image boundaries use one `#252B28` hairline.
- Content frames, screenshots, and diagram nodes are sharp with no shadow.
- `#F1F2ED` carries primary type, `#A8B0A9` body copy, and `#B8FF78`
  remains limited to focus and one factual grounded-response signal.
- No glass, cyan, generic gradients, bento tiles, pseudo-technical
  coordinates, repeated decorative eyebrows, or medium corner radii.
- Hero motion remains the only cinematic motion. Below it, controls may use
  only 120–200ms color/opacity feedback.

Taska uses a large asymmetric editorial spread. The board is cropped from the
top at a stable aspect ratio, while the projects view remains close to its
native ratio. Mobile crops are art-directed, not scaled desktop compositions.
Every `<img>` reserves space, is lazy below the fold, and has localized alt
text.

## Process and FAQ

The process is a real four-step sequence:

1. Brief: role or scope, product context, start date, and working language.
2. Fit: engagement shape, responsibilities, availability, and language fit.
3. Start: a realistic one-to-three-week start and one-month minimum.
4. Work: client-owned roadmap for team extension, with optional Ozero Dev
   support.

FAQ must answer:

- whether the buyer can start with one engineer;
- realistic timing and minimum duration;
- roadmap and priority ownership;
- available experience and working language;
- offers beyond team extension;
- what to include in the first email.

## Conversion

Every CTA resolves to `CONTACT_EMAIL`. Use locale-specific subjects for team
extension, managed delivery, AI/knowledge integration, a general project
inquiry, and future-career introductions.

The final field says what to include in the email and explicitly notes that no
form or visitor data collection is used.

## Verification

- Exact EN/RU content parity and claim inventory review.
- All `mailto:` destinations derive from `CONTACT_EMAIL`.
- Semantic landmarks and coherent heading order.
- Keyboard-visible focus and 44px minimum interactive targets.
- Responsive browser evidence at 1440×900, 1280×800, 1024×768, 390×844, and
  360×800.
- No horizontal overflow at any required viewport.
- Local `check`, production `build`, audit, independent launch-reviewer verdict,
  PR, merge, and GitHub Pages deployment.
