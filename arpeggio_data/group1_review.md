# Arpeggio Data Review Log — Group 1 (C, G, D Major / A, E, B Minor)

Companion to the project's existing `FINGERING_REVIEW_LOG.md`, same format and
same purpose: track what's directly confirmed from the source book vs. what
was reconstructed, so a human can re-verify the riskiest spots first. This
covers all 42 objects in `arpeggio_data/group1.js` (7 patterns × 6 keys:
Major/Minor Arpeggio + 1st/2nd Inv, Dominant 7th / Diminished 7th Arpeggio +
1st/2nd/3rd Inv).

Source book: *Alfred's Basic Piano Library — The Complete Book of Scales,
Chords, Arpeggios, Cadences*. Page images used (200 DPI):
`major_C_arpeggio_p20.png` (printed page 19), `major_G_arpeggio_p22.png` (p.21),
`major_D_arpeggio_p24.png` (p.23), `minor_A_arpeggio_p50.png` (p.49),
`minor_E_arpeggio_p52.png` (p.51), `minor_B_arpeggio_p54.png` (p.53).

## Method

1. **Root position** (all 6 keys, both triad types): taken directly from the
   ground truth already transcribed from the book's own consolidated
   fingering-chart pages (88-89), supplied for this task. Cross-checked
   against the arpeggio-page images themselves — the visible numbers (RH
   "1 2 3 / 1 2 3 5" grouping, LH "5 4 2 / 1 4 2 1" or "5 3 2 / 1 3 2 1"
   grouping depending on key) are consistent with the chart. **High
   confidence.**

2. **1st/2nd inversion (triads) and all 4 inversions (Dominant 7th /
   Diminished 7th)**: the book prints these on the same pages but the
   engraving is small and dense (2 systems of 2-octave arpeggios per line,
   numbers over individual notes); pixel-legible at the available 200 DPI
   render for gross shape (grouping sizes, which notes get a printed
   alternate-fingering "(n)") but not reliably legible note-by-note at every
   position. Rather than guess pixel-by-pixel, I derived a systematic,
   cross-verified fingering method (below) and used it for every
   inversion/chord-type combination, checking the result against whatever
   groupings *were* legible in the scan. **Medium confidence** except where
   flagged lower below.

## Cross-verification (WebSearch, as required)

Searched "standard piano arpeggio fingering chart major triad root position
first inversion second inversion RH LH two octaves" and "dominant seventh
arpeggio fingering chart piano root position first second third inversion RH
LH". Key findings, both corroborating the book's own pattern:

- Piano-ology / Robert Kelley's keyboard fingering chart: for white-key-root
  keys (their example list includes C, G, D, A, E — i.e. every key in this
  batch), **root position RH = 1-2-3 (repeating) + 5 on top; 1st inversion
  RH = 1-2-4 (repeating) + 5; 2nd inversion RH = 1-2-4 (repeating) + 5. LH:
  root = 5-4-2-1 (repeating), 1st inversion = 5-4-2-1 (same shape as root),
  2nd inversion = 5-3-2-1.** This exactly matches the book's own root
  position pattern already given as ground truth, and I applied the 1st/2nd
  inversion values from this source directly for C, G, A, E (all fully
  "clean" white-key triads with no inversion starting on a black key).
- A second search on dominant-7th fingering turned up the explicit rule used
  here for all 4 inversions: **"in dominant-seventh inversions, fingers play
  the same notes they play in the root position"** — i.e. a *fixed
  chord-tone-to-finger mapping* (root=1, 3rd=2, 5th=3, 7th=4 for RH; root=1,
  3rd=4, 5th=3, 7th=2 for LH, mirrored), with the arpeggio's absolute
  turnaround note using finger 5 regardless of which chord tone it lands on.
  I verified this against the book's own G Major page, which shows a
  parenthetical "(4)" alternate over a primary "2" on the very first note of
  the Dominant 7th 1st inversion (F♯, the chord's 3rd) — i.e. F♯ defaults to
  finger 2 there, matching "3rd = finger 2" regardless of which inversion
  starts on it. This confirms the fixed-mapping rule rather than a naive
  "always start the group with finger 1" reading.
- Sources: [Piano-ology major triad arpeggio fingerings](https://piano-ology.com/piano-technique/fingering-charts-major-triad-arpeggios/),
  [Robert Kelley arpeggio fingering chart](https://robertkelleyphd.com/home/teaching/keyboard/keyboard-arpeggio-fingering-chart/),
  [Wheaton College — Fingerings for Arpeggios (D.P. Horn)](https://www.wheaton.edu/media/migrated-images-amp-files/media/files/academics/faculty/horn-dp/DPH-FINGERINGS-FOR-ARPEGGIOS.pdf),
  [Guide to Playing Dominant Seventh Arpeggios](https://wwwdox.s3.amazonaws.com/fb/resources/guide-to-playing-dominant-7ths-for-piano.pdf).

## Black-key adaptations (where the "clean" pattern above would put a thumb on a black key)

The fixed-mapping / repeating-shape rules above assume no inversion starts on
a black key. Three of our patterns violate that, and each needed a
one-position rotation of the standard shape so the thumb lands on the
adjacent white key instead. These rotations are **my own reconstruction**,
reasoned from hand-position mechanics, not read from the page — flagged here
explicitly:

- **D Major, 1st inversion** (triad starts on F♯): rotated RH from the
  standard 1-2-4 shape to **2-3-1** (repeating) so finger 1 lands on D
  instead of F♯. LH rotated similarly (the "3,2,1" repeating cell shifted to
  "2,1,3") so thumb lands on D, not F♯.
- **D Major, 2nd inversion**: checked for the same problem (starts on A) —
  **no rotation needed**, the standard shape's thumb positions land on A/D
  naturally, never on F♯.
- **B Minor, 2nd inversion** (triad starts on F♯, the chord's 5th here):
  same rotation pattern applied (RH 1-2-4 → **4-1-2**; LH "3,2,1" → "2,1,3")
  so thumb lands on B/D rather than F♯.
- **B Minor, root position / 1st inversion**: checked — no conflict (thumb
  never lands on F♯ in either shape).
- Dominant 7th arpeggios (G's D7 has F♯ as its 3rd; D's A7 has C♯ as its
  3rd): **no rotation needed** — the fixed chord-tone mapping (3rd = finger 2
  RH / finger 4 LH) already keeps the black key off the thumb in every
  inversion, for all three major keys, without any special-casing.

## Diminished 7th (minor keys) — lowest confidence section, needs the closest human re-check

The diminished 7th is built on the raised leading tone, which is **always a
black key** for all three of these minor keys (A minor → G♯, E minor → D♯, B
minor → A♯), and for E minor / B minor the chord's minor-3rd-up neighbor is
*also* black (D♯→F♯, A♯→C♯) — two consecutive black keys. The book's own page
shows extra parenthetical alternate fingerings (e.g. "(3)(4)" clusters) right
at the start of these systems, which is the book acknowledging real
hand-size-dependent ambiguity here — exactly the kind of detail that doesn't
survive a 200 DPI scan crop.

What I used instead: the same fixed-mapping approach as Dominant 7th, but
rotated so the black key(s) never get the thumb —

- **A minor (1 black key, G♯ only):** RH cycle rotated to root=2, 3rd=3,
  5th=4, 7th=1 (repeating); LH to root=4, 3rd=3, 5th=2, 7th=1 (mirrored,
  first-note-of-run override to finger 5 still applies as with Dom7).
- **E minor / B minor (2 consecutive black keys):** RH cycle root=2, 3rd=3,
  5th=1, 7th=4; LH root=3, 3rd=2, 5th=1, 7th=4. This keeps the thumb only on
  the 5th (the first white key reached ascending from the black-key pair),
  which is a reasonable, physically playable choice, but it is **not**
  pixel-verified against the book's own alternate fingerings and is the
  single area most likely to need a hand-correction pass — particularly E
  minor's and B minor's dim7 (all 4 inversions each). A minor's dim7 is
  somewhat more likely to be right since it only has the one black key to
  route around.

**Recommendation:** if anyone re-verifies this batch against the physical
book, spend that time on the 8 Diminished 7th objects (`A_/E_/B_DIMINISHED_7TH_ARPEGGIO` +
inversions) before anything else in this delivery.

## Register / octave anchor note

Every pattern's RH/LH starting octave was anchored to that key's *existing*
scale entry in `data.js` (per the task's instructions), so e.g. C's arpeggios
sit around middle C same as `C_MAJOR`'s scale. Because a 2-octave arpeggio
inversion can start above the tonic (2nd inversion starts on the 5th, 3rd
inversion of a 7th chord starts on the 7th), some patterns reach fairly high
— e.g. B Minor's 2nd-inversion triad RH tops out at MIDI 102 (F♯7), and B
Diminished 7th's higher inversions run similarly high. This is inherent to a
real 2-octave arpeggio starting from a high inversion tone, not a bug — but
worth knowing if the app's rendered range/keyboard display has an upper
cutoff.

## `cross`

Every slot in every object has `cross: null`, per the task's explicit scope
cut (no thumb-crossing animation/audio cues for arpeggios in this first
pass).

## Audio

- `group1_missing_audio.txt` — 6 missing `f{finger}_{Note}.wav` clips, all at
  finger 5 on a sharp (`f5_Fs`, `f5_Cs`, `f5_Gs`, `f5_Ds`, `f5_As` — the
  existing project never needed finger 5 on an accidental before, since
  every scale's octave-ending note was always a natural), plus one
  `f3_As.wav` (needed by B Minor Diminished 7th's left hand). All `note_*.wav`
  (together-section) and `finger_*.wav` clips needed already exist — no gaps
  there.
- `group1_needed_audio_names.txt` — all 42 `nameAudio` announcement clips are
  placeholders (`TODO_*.wav`); none of these exist yet since this is a new
  feature. Each line has the exact spoken text to record/generate.

## Not covered by this pass (by design)

- No `cross` cues (see above).
- `together` section audio reuses `note_{Name}.wav` (pitch-class only, no
  finger number spoken), matching the existing scale template's convention.
- Info blocks (`keyInfo`, `degrees`, `pentatonic`, `progressions`) are copied
  verbatim from each key's existing scale entry in `data.js`, per the task's
  instructions — only `typeLabel` and `description` are newly written per
  pattern.
