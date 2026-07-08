# Arpeggio Data Review Log — Group 3

Covers: F# Major, F Major, B♭ Major (7 patterns each: root/1st/2nd-inv triad
arpeggio + root/1st/2nd/3rd-inv dominant 7th arpeggio), and G Minor, C Minor,
F Minor (7 patterns each: root/1st/2nd-inv triad arpeggio + root/1st/2nd/3rd-inv
diminished 7th arpeggio). 42 pattern objects total, written to `group3.js`.

Written in the same spirit as `FINGERING_REVIEW_LOG.md`: distinguishes what's
**confirmed** from the book vs. what's **reconstructed**, and flags the
specific spots most likely to need a manual re-check. Nothing here affects
note/pitch correctness — only which finger number is displayed/spoken.

---

## Method

1. **Root-position triads (6 objects, one per key) — GIVEN.** Fingering taken
   directly from the book's own consolidated two-octave-arpeggio fingering
   chart (RH/LH digit sequences per key, cross-checked against the six
   individual "Major/Minor Arpeggios" engravings — F# p.31, F p.35, B♭ p.37,
   G minor p.67, C minor p.69, F minor p.71). These are the highest-confidence
   entries in the batch.

2. **Everything else (36 objects) — DERIVED** by a small, consistent
   algorithm (implemented in the generator script), because the book's own
   inversion/7th-chord engravings were too small/cramped to transcribe
   digit-by-digit with confidence (same limitation noted for several keys in
   `FINGERING_REVIEW_LOG.md`). The algorithm was validated by reproducing the
   one irregular case with known ground truth (B♭ major root position) exactly
   before being trusted for the other 35:

   - Build the 2-octave ascending pitch sequence for the chord/inversion
     (root-3rd-5th repeated, or root-3rd-5th-7th repeated for 7th chords),
     using the same tonic-anchor register already used by that key's scale
     in `data.js`. Dominant 7th chords are anchored a 5th above the tonic
     anchor; diminished 7th chords (leading-tone chords) a half-step below it.
   - **Right hand:** thumb (1) is placed on the first physically-white key
     in the chord-tone cycle (thumb never sits on a black key, matching the
     rule already established for this app's irregular scale keys). Any
     chord tone(s) *before* that white key get fingers counting up from 2.
     After the thumb, fingers continue 2, 3, (4) in order. If there is
     exactly one pre-thumb note, its *recurring* (2nd-octave and final)
     occurrences bump to the next unused finger instead of repeating —
     this is the exact behavior confirmed by B♭ major's own root position
     (`(4)2 1 2 | 4 1 2 4`), which is where this rule came from. If the
     chord has *no* white key at all (F# major's triad — F#/A#/C# are all
     black), the rule falls back to plain 1-2-3(-4)...5, matching the book's
     own given fingering for that case.
   - **Left hand:** reversed copy of the right hand's finger sequence for
     that same position (same digits, order reversed) — validated against
     F# major's own given root position, where LH ascending
     (`5 3 2 1 3 2 1`) is exactly the reverse of RH ascending
     (`1 2 3 1 2 3 5`). This holds shape-for-shape for every other key too;
     the one place it's cosmetic rather than exact is which of finger 3/4
     is used at the "spare" slot, which the book itself treats as a
     legitimate free choice (seen directly in Alfred's own alternate/
     parenthetical fingerings elsewhere in this project).
   - Descending half of every pattern mirrors the ascending half in reverse,
     same convention already used for every scale in this app.
   - `cross: null` throughout — no thumb-cross audio cues in this pass, by
     design (per the task brief).

3. **Register:** each object's RH/LH register matches its parent scale's own
   octave (arpeggio's first RH/LH root-position note = that scale's tonic
   anchor pitch exactly), so switching between a scale and its arpeggios in
   the UI won't jump the hands to a surprising octave.

4. **Spelling:** letter names follow each key's own established accidental
   convention (sharps for F#, flats for F/B♭/G minor/C minor/F minor),
   reusing the existing "s"/"b" suffix convention from `voices/` filenames
   (`Fs`, `Cs`, `Eb`, …). Where a dominant-7th/diminished-7th chord tone
   would otherwise need an enharmonic reach outside the key's own signature
   (F# major's dominant-7th 3rd is theoretically E#), it's spelled using this
   project's existing precedent of substituting the simpler enharmonic
   (`F`, matching F# major's own 7th-scale-degree spelling already in
   `data.js`).

---

## Confidence flags — the specific spots to re-check first

The generator auto-flagged every DERIVED pattern whose chord starts on (or
soon reaches) a black key, since that's where the thumb-placement rule
actually does work instead of just falling through to the plain case.
From highest to lowest confidence:

**Lowest confidence (recommend re-checking first if anyone verifies against
the physical book):**
- **`G Diminished 7th (3rd Inv)`** (G minor) and **`F Diminished 7th (2nd Inv)`**
  (F minor) — both have **two consecutive pre-thumb black-key notes** (the
  inversion's starting tone and the one right after it are both black,
  before the pattern reaches a white key to plant the thumb on). This is
  the one case the "bump to next finger on repeat" rule doesn't have book
  precedent for, so recurring cycles were left **unbumped** (identical
  fingers every cycle) as the simplest, most defensible option rather than
  guessing a specific bump target. Playable either way; the finger *labels*
  here are the least certain in the whole batch.

**Irregular but higher confidence** (exactly one pre-thumb black-key note,
so the "bump on repeat" rule applies directly and matches the B♭-major-root
precedent exactly):
- `F# Dominant 7th` (root) and `F# Dominant 7th (2nd Inv)` — C#7's root
  (C#) and 5th (G#) are both black.
- `F Dominant 7th (3rd Inv)` — C7's 7th (B♭) is black.
- `B♭ Dominant 7th (3rd Inv)` — F7's 7th (E♭) is black.
- `G Diminished 7th` (root) — F#dim7's root (F#) is black.
- `C Diminished 7th (3rd Inv)` — Bdim7's 7th (A♭) is black.
- `F Diminished 7th (3rd Inv)` — Edim7's 7th (D♭) is black.
- `G Minor Arpeggio (1st Inv)` — Gm's 3rd (B♭) is black.
- `C Minor Arpeggio (1st Inv)` — Cm's 3rd (E♭) is black.
- `F Minor Arpeggio (1st Inv)` — Fm's 3rd (A♭) is black.

**Regular / most confident** (every other DERIVED pattern — 24 of the 36 —
lands on the plain 1-2-3(-4)...5 shape with zero pre-thumb notes, thumb
falls naturally on a white key).

**Given / highest confidence:** all 6 root-position triads (`FS_MAJOR_ARPEGGIO`,
`F_MAJOR_ARPEGGIO`, `BB_MAJOR_ARPEGGIO`, `G_MINOR_ARPEGGIO`,
`C_MINOR_ARPEGGIO`, `F_MINOR_ARPEGGIO`).

A caught-and-fixed bug worth recording: the first draft of the generator
checked white-vs-black-key status using each note's *offset relative to the
chord's own starting note* instead of its *actual absolute pitch class* —
which happened to look correct for keys/positions where the two coincide
(anything rooted on C) but silently mis-flagged every other case as
"regular" when it should have been irregular (e.g. it originally computed
G Minor's diminished-7th root position as a plain 1-2-3-4...5 shape, missing
that the chord actually starts on F# — a black key). Fixed before this file
was finalized; every DERIVED entry in `group3.js` reflects the corrected
absolute-pitch-class check, not the buggy first pass.

---

## Online cross-check

Searched for published two-octave arpeggio fingering charts to sanity-check
the algorithm's shape (not to source per-key digits, since none of the
sources found break fingering out by inversion in enough detail to lift
directly):

- A piano-technique blog post (pianoscience.blogspot.com) confirmed the
  core physical rule this algorithm encodes: root position and 2nd inversion
  RH triad arpeggios use the "1235" shape (1-2-3...5, with a discretionary
  3-or-4 in the middle), while **1st inversion always uses "1245"** (1-2-4,
  never 3, "the spare 3rd finger is best left spare") — this is exactly the
  thumb-avoids-a-wide-stretch logic the generator implements.
- A search on dominant-7th arpeggio fingering confirmed the general rule for
  four-note chords: regular case is 1-2-3-4 repeating, ending on 5; **"if the
  arpeggio starts on a black key, put the thumb on the first white key and
  play all other fingers (except 5) in order"** — this is the exact rule
  implemented for the DOM7/DIM7 irregular cases above.
- No single source gave a complete, unambiguous inversion-by-inversion chart
  matching this exact method book's own conventions (several sources
  actively disagreed with each other on 2nd-inversion RH shape before one
  clarified the physical reasoning), which is why root position stayed
  GIVEN-only and everything else is flagged DERIVED rather than presented
  as book-confirmed.

---

## Files produced

- `group3.js` — all 42 pattern objects, ready to concatenate after
  `data.js`'s `const V = "voices/";` line (reuses the same `V`, `CROSS_*`
  constants aren't needed since `cross: null` throughout).
- `group3_missing_audio.txt` — 9 clips that don't exist yet in `voices/`
  (all `f5_{sharp/flat-note}.wav` — pinky-on-accidental was apparently never
  needed by any scale built so far).
- `group3_needed_audio_names.txt` — all 42 `nameAudio` placeholder filenames
  (`TODO_*.wav`) with their spoken text, for whenever those get recorded.
