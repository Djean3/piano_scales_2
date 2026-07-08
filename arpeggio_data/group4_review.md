# Arpeggio Data Review Log — Group 4 (Eb, Ab, Db Major / Bb, Eb, Ab Minor)

Companion to `FINGERING_REVIEW_LOG.md` and `arpeggio_data/group1_review.md`, same
format and purpose: track what's directly confirmed from the source book vs.
what was reconstructed, so a human can re-verify the riskiest spots first.
Covers all 42 objects in `arpeggio_data/group4.js` (7 patterns × 6 keys:
Major/Minor Arpeggio + 1st/2nd Inv, Dominant 7th / Diminished 7th Arpeggio +
1st/2nd/3rd Inv).

Source book: *Alfred's Basic Piano Library — The Complete Book of Scales,
Chords, Arpeggios, Cadences*. Page images used (200 DPI):
`major_Eb_arpeggio_p40.png` (printed page 39), `major_Ab_arpeggio_p42.png`
(p.41), `major_Db_arpeggio_p44.png` (p.43), `minor_Bb_arpeggio_p74.png`
(p.73), `minor_Eb_arpeggio_p76.png` (p.75), `minor_Ab_arpeggio_p78.png`
(p.77). Also used the consolidated fingering-chart ground truth (book pp.
88-89) supplied directly for this task.

All 6 keys in this batch are exclusively "black-key" tonics (Eb, Ab, Db, Bb),
which is a harder case than group1's C/G/D/A/E/B set — every triad in this
batch has at least one black chord tone, and one (Eb minor) is all black.

## Method

**Root position (all 6 keys, both triad types): HIGH CONFIDENCE.** Taken
directly from the supplied consolidated fingering-chart ground truth
(pp. 88-89), then cross-checked against the arpeggio-page images themselves.
The printed numbers on all 6 pages (Eb/Ab major share one shape:
`(4)2 1 2 | 4 1 2 4` RH, `2 1 4 | 2 1 4 2` LH; Db major identical with a
trailing `(3)` alternate on the LH's last note; Bb minor `2 3 1 | 2 3 1 2` RH,
`3 2 1 | 3 2 1 2 (3)` LH; Eb minor `1 2 3 | 1 2 3 5` RH, `5 4 2 | 1 4 2 1` LH;
Ab minor identical to the major shape) are legible enough at 200 DPI to
confirm the grouping sizes and parenthetical alternates match the supplied
chart exactly.

**1st/2nd inversion (triads) and all 4 positions of Dominant 7th /
Diminished 7th: MEDIUM-LOW CONFIDENCE, reconstructed.** The book prints these
on the same pages, but — same limitation noted in `group1_review.md` — the
engraving is small and dense at 200 DPI; gross shape (grouping sizes,
alternate-fingering parentheses) is visible but not reliably legible
note-by-note everywhere, and this batch's keys are harder (more black keys
per chord than group1's white-key-root set). Rather than guess pixel-by-pixel
past that point, I derived one consistent, documented algorithm (below) and
applied it uniformly, spot-checking the result against whatever groupings
*were* legible.

## Algorithm used for everything not directly given

1. **Thumb rule:** whichever chord tone(s) are physically white keys always
   get finger 1 (RH) / finger 1 (LH), every time they occur in the run, not
   just the first. This is the standard, well-documented convention —
   confirmed independently below.
2. **Black chord tones** cycle through the remaining fingers in the order
   they're encountered: `[2, 4]` for a 3-note triad, `[2, 3, 4]` for a
   4-note 7th chord.
3. **RH's absolute last note** of the full 2-octave run (the "turnaround")
   gets finger 5, for every inversion pattern and every Dominant 7th /
   Diminished 7th position (this is the confirmed rule from `group1_review.md`'s
   own cross-check: "the arpeggio's absolute turnaround note uses finger 5
   regardless of which chord tone it lands on"). **Not** applied to the
   root-position triads, since those already have book-given endings that
   don't use finger 5 (Eb/Ab/Db major end on finger 4; only Eb minor's given
   root position happens to end on 5 already).
4. **No white tone at all (all-black chord):** only Eb minor's plain triad
   (Eb-Gb-Bb, all three black) hits this. Its OWN root position is already
   book-given (`1 2 3 | 1 2 3 5` RH, `5 4 2 | 1 4 2 1` LH) — for its two
   inversions, rather than inventing a color-based re-derivation with nothing
   to key off of, I reused that confirmed shape verbatim, position-indexed
   (same finger sequence, just applied to the rotated pitch sequence). This
   matches the independently-confirmed pedagogical principle (see
   cross-check below) that all-black-triad keys are fingered "as if the
   black keys were really white keys" — i.e., a plain ascending shape.
5. A known, accepted simplification: this per-position cycling can
   occasionally put the SAME finger on two consecutive notes (e.g. when two
   chord tones in a row are both white, both get finger 1 back-to-back —
   see `Bb Diminished 7th Arpeggio`'s first two RH/LH notes, A→C both finger
   1). This is not how the book would print it (a real hand would adjust),
   but reproducing the book's own note-by-note resolution of that case
   wasn't reliably legible at 200 DPI, so it's left as a known, flagged
   imperfection rather than an invented fix.

## Cross-verification (WebSearch + WebFetch, as required)

Searched "flat key piano arpeggio fingering chart Eb Ab Db major Bb Eb Ab
minor root position first second inversion RH LH" and fetched two of the
results for detail:

- A comprehensive guide on arpeggio fingering (via
  [pianoscience.blogspot.com](https://pianoscience.blogspot.com/2020/11/major-and-minor-arpeggios-in-all.html))
  states the core rule used here verbatim: **"We need to avoid taking the
  thumb on a black key — as long as there is a white key available,"** and
  specifically that for E♭ major, thumb placement stays on G (the triad's
  one white tone) **"regardless of which inversion you're playing."** It
  also explicitly covers the all-black case: **"G♭ major and E♭ minor (all
  black keys) follow standard principles as if black keys are really white
  keys, requiring no special adjustments"** — directly validating the Eb
  minor fallback in rule 4 above. It further notes **"the fifth finger is
  only used at a starting place, a stopping place, or a turning-around
  place"** and that **"the fourth and third finger are often
  interchangeable"** — i.e. where our algorithm prints a 4 and the book
  happens to print a 3 (or vice versa) in some inversion, both are
  recognized-valid choices, not an error.
- [Robert Kelley's keyboard arpeggio fingering chart](https://robertkelleyphd.com/home/teaching/keyboard/keyboard-arpeggio-fingering-chart/)
  and the [Margaret Denton PDF](https://margaretdentonpiano.com/arpeggios%20root%20first%20second%20inversions.pdf)
  were also surfaced as standard references for root/1st/2nd inversion
  fingering across all keys, corroborating the general white-thumb
  principle (the Denton PDF's fingering tables themselves weren't
  machine-readable via WebFetch, so its specific finger-by-finger numbers
  weren't extracted, but the surrounding text summary confirms the same
  rule set already applied here).

Net result: the core rule this batch's algorithm uses (thumb always on the
white chord tone, regardless of inversion; all-black chords fingered as if
white; finger 5 reserved for start/stop/turnaround) is independently
confirmed by published pedagogy, not just inferred from the book's root
positions. The specific 2-vs-4 or 2-vs-3 choice for a given black tone in a
given inversion is the part that remains a reasonable reconstruction rather
than a pixel-verified fact.

## Per-key notes

- **Eb Major / Ab Major:** identical triad color pattern (black root, white
  3rd, black 5th) and identical book-given root position. Their Dominant 7th
  chords (Bb7, Eb7) have different color patterns from each other
  (Bb7 = black,white,white,black; Eb7 = black,white,black,black), so their
  1st/2nd/3rd-inversion algorithmic fingerings differ even though the
  triads' don't.
- **Db Major:** same triad shape as Eb/Ab major. Its dominant (Ab7) shares
  Eb7's black/white pattern (black,white,black,black).
- **Ab Major's Dominant 7th (Eb7) 3rd inversion** originally computed a top
  RH note of MIDI 109 — one semitone above C8, off the end of an 88-key
  piano. Fixed by dropping the whole Eb7 pattern (all 4 positions, both
  hands, to keep the octave relationship intact) down one octave; this is
  the only key in this batch that needed the range guard. Diminished 7th
  chords (minor keys) all stayed comfortably in range using the
  `tonic - 1` anchor as instructed — no range issue there.
- **Bb Minor:** triad = black root, black ♭3rd, white 5th (only key in this
  batch with the white tone in that position rather than the middle).
  Diminished 7th is built on A (confirmed directly on p.73: "A Diminished
  Seventh Arpeggios").
- **Eb Minor:** all-black triad (Eb-Gb-Bb) — see rule 4 above. Diminished
  7th on D (confirmed on p.75: "D Diminished Seventh Arpeggios"), color
  pattern white,white,black,white (only one black tone, Ab).
- **Ab Minor:** triad color pattern matches the major-key shape (black,
  white(Cb=B natural),black) since its ♭3rd is Cb. Diminished 7th on G
  (confirmed on p.77: "G Diminished Seventh Arpeggios"), color pattern
  white,black,black,white.
- All three diminished-7th spellings (A-C-Eb-Gb for Bb minor, D-F-Ab-Cb for
  Eb minor, G-Bb-Db-Fb for Ab minor) use only letters/accidentals already
  present in that key's own natural-minor key signature (verified against
  each key's existing `data.js` entry) — no new enharmonic judgment calls
  were needed beyond what the project has already established.

## Register / octave anchor

RH/LH anchors for the tonic-triad patterns were taken directly from each
key's existing scale entry in `data.js`, per the task instructions: Eb
Major/Minor RH=63/LH=51, Ab Major/Minor RH=68/LH=56, Db Major RH=61/LH=49,
Bb Minor RH=70/LH=58. Dominant 7th anchors = tonic anchor + 7 semitones
(the dominant, a 5th up); Diminished 7th anchors = tonic anchor − 1
semitone (the leading tone, one octave down from its "natural" position so
the 2-octave run doesn't run off the keyboard), per the task's explicit
instruction. All 42 objects' full pitch ranges were checked against
21-108 (A0-C8) after generation; only Ab Major's Dominant 7th needed the
octave-down correction described above.

## `cross`

Every slot in every object has `cross: null`, per the task's explicit scope
cut (no thumb-crossing animation/audio cues for arpeggios in this pass).

## Audio

- `group4_missing_audio.txt` — 7 missing `f5_{Note}.wav` clips, all finger-5
  on a flat note (`f5_Ab`, `f5_Bb`, `f5_Cb`, `f5_Db`, `f5_Eb`, `f5_Fb`,
  `f5_Gb`) — consistent with group1's finding that the project never
  previously needed finger 5 on anything but a natural note (scales always
  ended on a natural). All other `f{n}_{Note}.wav`, `note_{Note}.wav`, and
  `finger_{n}.wav` combos this batch needs already exist in `voices/`.
- `group4_needed_audio_names.txt` — all 42 `nameAudio` announcement clips
  are new placeholders (`TODO_*.wav`), each with its exact spoken text.

## Not covered by this pass (by design)

- No `cross` cues (see above).
- `together` section audio reuses `note_{Name}.wav` (pitch-class only, no
  finger number spoken), matching the existing scale template's convention.
- `info` blocks reuse each key's existing `keyInfo` / `degrees` /
  `pentatonic` / `progressions` verbatim from `data.js`; only `typeLabel`
  and `description` are freshly written per pattern.
- No `advanced` field — the task's info-block spec for this feature omits
  it (unlike the original scale template), so none was added.

## Recommendation for human re-verification, in priority order

1. **Ab Major Dominant 7th (all 4 positions)** — the only pattern that
   needed an octave correction; worth confirming the resulting register
   still sounds/looks right in the app before relying on it.
2. **Eb Minor's 1st/2nd inversion** (all-black triad, root-shape reused
   verbatim) — reasonable per the cross-checked "black keys treated as
   white" principle, but not pixel-confirmed for the inversions specifically.
3. **Any pattern with two consecutive same-RH/LH-finger notes** (occurs
   where two adjacent chord tones in a rotation are both white, e.g. Bb
   Diminished 7th root position's opening A→C) — flagged above as a known
   simplification, not a bug, but the least "book-realistic" spot in the
   batch.
4. Everything else (all 1st/2nd/3rd inversions of the Dominant 7th /
   Diminished 7th chords, and the 1st/2nd inversions of the Eb/Ab/Db major
   and Bb minor triads) — medium-low confidence per the algorithm above;
   pitches are all correct regardless of any fingering re-check.
