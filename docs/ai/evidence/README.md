# Evidence

Browser evidence per milestone. `AGENTS.md` requires it proportional to risk,
and it is kept rather than pruned because it is the only thing that
distinguishes a delivery record from a claim.

| Folder | Milestone | Shows |
| --- | --- | --- |
| `foundation/` | `LOD-3` | The CRA to Vite migration, rendering unchanged |
| `experience/` | `LOD-4` | The cinematic hero and the engraving-to-ASCII passage |
| `content/` | `LOD-5`, `LOD-6` | The bilingual content system across the viewport matrix |
| `launch/` | `LOD-7`, `LOD-8`, `LOD-9` | The launch candidate and the deployed site |

**Read `launch/README.md` first.** It is the most useful file here, because it
records three ways the capture method was wrong before it was right, and one
defect class the whole method could not see at all.

## These frames are historical, not current

Each set is what the page looked like when that milestone shipped. The site has
moved since — the Taska captures were replaced, the Russian was rewritten, the
hero gained a type role, the fisherman got its rod back. A frame here is
evidence of a moment, not a description of production.

That is deliberate. Re-shooting old milestones to match the current site would
turn a record into a reconstruction.

## What the evidence could not catch

Three defects shipped past a complete viewport matrix in two languages, and all
three were found by the owner looking at the running site:

1. **The hero clip never decoded.** Headless Chrome launched with
   `--disable-gpu` silently declines to decode video. Every frame filed showed
   the poster and no reviewer could tell.
2. **The ASCII signature was blank on iOS**, in both Safari and Chrome — both
   WebKit. `decoding = 'async'` means `drawImage` gets an undecoded bitmap and
   draws nothing; Blink decodes synchronously, so a Chrome-only matrix was
   structurally blind to it.
3. **A depth band froze for 1.25s** of its 8s loop while holding the best seam
   PSNR of the four clips and a clean SSIM. Neither metric says whether the
   picture is still moving, and a still frame of a frozen clip is identical to
   a still frame of a moving one.

The lesson each time was the same, and it is worth more than the frames: **the
instrument shapes the finding.** One engine is not coverage, a screenshot is
not proof of motion, and a green metric is only evidence of what it measures.
