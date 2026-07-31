# LOD-9 hero typography decision

Decision: **the `<h1>` stays `ozero.dev`. The offer is promoted instead.**

## How this was decided

`product-strategist` argued that the hero `<h1>` should carry the offer rather
than the domain. The owner had explicitly chosen the domain, so the case was
put back to them rather than acted on. The owner declined to arbitrate and
delegated the call to the design skill the project already runs on.

## The case that was put

For changing it: `PRODUCT.md` Principle 1 is "make the offer legible before
making the experience cinematic". The first entry under DESIGN.md § Do's is
"make the offer and primary CTA understandable in the first viewport".
`CONTENT-BRIEF.md` § Buyer job item 1 is that a visitor understands Ozero Dev
can add Java-first capacity without a long hiring cycle, in one reading pass.
Against all three, the page spent its largest type on a string the navigation
wordmark already carries 40px above it, and the document's top-level heading
told a screen reader and a crawler nothing about what is sold.

For keeping it: it is the brand, it is short and memorable, and a brand-first
hero is what the locked monopo reference actually does.

## Why the framing was wrong

Both sides assumed the hero has two type roles and the argument is about which
one wins. The hero has two roles and needs three.

`display` ran to 152px. The offer paragraph ran to 26.4px. That is a 5.8×
cliff with nothing between, and the sentence that does the selling sat at the
bottom of it. No existing role could catch it: `headline` at 6rem would have
rivalled the wordmark, and `title` at 2rem is too quiet for the page's primary
claim.

Swapping the `<h1>` outright fails for a separate, measurable reason. The
English value proposition is 96 characters and the Russian is longer. Set at
`display`, it needs five lines; to fit, the display role would have to collapse
to roughly headline scale, which discards the hero's only piece of scale drama
and abandons the committed visual world. The choice was never
brand-versus-offer. It was a missing rung.

## What shipped

`DESIGN.md` gains a `lede` role — `clamp(1.5rem, 2.4vw, 2.5rem)`, weight 350,
1.22 leading, `-0.015em` — and the hero's value proposition takes it. Weight
stays at 350 because the Whispered Authority Rule grows type through scale and
negative space, never weight. The resulting ramp is 144px → 34.5px → 19.2px at
1440: roughly 4.2× and then 1.8×, so display, lede, and body are each
unmistakably a different job.

The `<h1>` is unchanged, and the same edit brought
`.hero-experience__copy h1` back onto the declared `display` token — it had
drifted to `clamp(4.5rem, 12vw, 9.5rem)` against DESIGN.md's
`clamp(3.8rem, 10vw, 9.5rem)`, which was separately on the launch fix list.

`DESIGN.md` also gains `title`, which its own § Hierarchy prose had described
all along without ever tokenizing.

## Not done

The brand line "a lake of developers" is not in the hero. It is already the
payoff of the fisherman interlude, where it resolves out of the
engraving-to-ASCII transformation, and duplicating it under the wordmark would
spend it twice and reintroduce an eyebrow-shaped element in the same change
that removed six of them.
