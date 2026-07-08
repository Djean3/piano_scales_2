# Arpeggio Fingering Review Log — Group 2 (Major A, E, B / Minor F#, Db, D)

Companion to `FINGERING_REVIEW_LOG.md` (which tracks the scale data),
covering the new `arpeggio_data/group2.js` file: 42 arpeggio patterns
(3 major keys × 7 patterns + 3 minor keys × 7 patterns). Same purpose —
flag what's confirmed vs reconstructed so a human can spot-check before
this ships. None of the open items below affect pitch/note correctness
(all pitches are derived by formula from the interval math given in the
task brief, then range- and consistency-checked with a script — see
"Automated verification" at the end). The risk is entirely in which
finger number is displayed for inversions/7th-chord positions.

---

## Root position (Major Arpeggio / Minor Arpeggio) — HIGH CONFIDENCE

Directly cross-checked against the book's own consolidated arpeggio
fingering chart (pages 88-89, given verbatim in the task brief) — this
is the same book, so it should match exactly, and it does:

- A Major: RH 1-2-3-1-2-3-5, LH 5-3-2-1-3-2-1 — matches chart.
- E Major: RH 1-2-3-1-2-3-5, LH 5-3-2-1-3-2-1 — matches chart.
- B Major: RH 1-2-3-1-2-3-5, LH **4**-3-2-1-3-2-1 — matches chart's
  documented exception (4th finger on the tonic instead of the usual
  pinky, same quirk already confirmed for B major's scale in the main
  review log).
- F# Minor: RH (4)2-1-2-4-1-2-4, LH 2-1-4-2-1-4-2 — matches chart
  (used the primary finger, not the "(4)" parenthetical alternate, for
  the first note).
- Db Minor (played as C# minor, per the app's own existing convention
  — see "Db Minor spelling" below): RH (4)2-1-2-4-1-2-4, LH
  2-1-4-2-1-4-2 — matches chart exactly, identical to F# minor's shape
  as the chart itself shows.
- D Minor: RH 1-2-3-1-2-3-5, LH 5-**4**-2-1-4-2-1 — matches chart
  (LH middle-note finger is 4, not 3, differing from the major-key LH
  shape because of the minor 3rd).

Also visually corroborated against the arpeggio system on each key's
own page image (root position system, first measure) for shape/
contour (thumb-crossing points, where 5 or 4 lands) — consistent with
the chart in every case.

## Db Minor spelling — the task brief's assumption was wrong, followed data.js instead

The task brief asked me to "respell to flats to match the app's
existing Db-minor convention." I checked the actual `data.js` entry
(`D_FLAT_NATURAL_MINOR`) before doing that, and it does **not** use
flat spelling — it's internally spelled and voiced as C# minor
throughout (`f2_Cs.wav`, `f3_Gs.wav`, `note_Fs.wav`, etc.), exactly
like the main review log documents for the scale ("Db Major + 'Db
Minor' family" entry above). So `group2.js`'s Db-minor arpeggio and
diminished-7th objects use the same sharp spelling as the existing
scale data, not flats. Flagging this explicitly since it contradicts
what the task brief assumed — not a silent judgment call.

## 1st/2nd inversion (triads) and all dominant-7th / diminished-7th positions — MEDIUM CONFIDENCE, recommend spot-check

The book's own consolidated chart (pp. 88-89) only covers root
position — it doesn't tabulate inversions or 7th-chord fingering. For
these, I read the per-key arpeggio page images directly, but the
finger numbers are printed quite small and densely (especially where a
"(4)" alternate sits right next to the primary number), so per-digit
certainty is lower here than for root position. What I did to keep
this defensible rather than guessing outright:

- **Triads (1st/2nd inversion):** reused each key's own already-
  confirmed root-position finger *pattern*, transposed to start on the
  3rd or 5th instead of the root (e.g. A major 1st inversion RH is the
  same 1-2-3-1-2-3-5 shape as root position, just starting on C#
  instead of A). This is consistent with what's visible in the page
  images (the same recognizable 1-2-3...5 or 2-1-2-4...4 contour
  recurs at each inversion) and with general arpeggio pedagogy (the
  hand-shape for a 1-3-5 stack is largely position-independent), but
  it was not verified digit-by-digit against the page for every single
  note of every inversion.
- **Dominant 7th / diminished 7th (all 4 positions each):** used the
  RH 1-2-3-4-1-2-3-4-5 / LH 5-4-3-2-1-4-3-2-1 pattern for every
  inversion of every key in this group. For the diminished 7th this is
  on solid theoretical ground (a fully-diminished 7th chord is
  perfectly symmetric — every "inversion" is really the same shape
  starting on a different, equally-spaced note — so one fingering
  shape genuinely does cover all four positions). For the dominant
  7th this is a simplifying assumption; the page images showed the
  same 1-2-3-4/5-4-3-2 digit set recurring across inversions, which
  supports it, but I did not confirm every individual digit.
- **B major's documented LH exception** (4th finger on the tonic B and
  on the 5th degree F#, per the root-position chart and per the main
  review log's note on B major's scale) was extended to B major's own
  2nd-inversion triad arpeggio (whose lowest LH note is F#) on the
  reasoning that it's the same underlying anatomical/hand-position
  quirk. It was **not** extended to B major's dominant-7th arpeggio
  (whose root-position lowest LH note is also F#) — there's no direct
  confirmation the exception carries over to the 7th-chord shape, so
  standard fingering (finger 5) was used there instead. Flagging this
  as a judgment call, not a confirmed fact either way.

**Recommend:** before shipping, spot-check at least one 1st-inversion
triad and one dominant-7th/diminished-7th inversion against the actual
page images (`major_A_arpeggio_p26.png`, `minor_Fs_arpeggio_p56.png`,
etc., already in the scratchpad) to confirm digit-by-digit.

## Enharmonic substitutions for diminished-7th chords (no direct audio for E#/B#)

The diminished-7th arpeggios are built on the leading tone, which for
F# minor is E# and for Db/C# minor is B#. Neither "Es" nor "Bs" voice
clips exist (checked the full `voices/` listing) and no scale in this
app has ever needed them either. Followed this app's own existing
precedent (F# major/minor's E#→F substitution, already documented in
the main `FINGERING_REVIEW_LOG.md`) and spelled these chords using
their plain enharmonic equivalents instead:

- F# minor's diminished 7th: spelled starting on **F** (not E#).
- Db/C# minor's diminished 7th: spelled starting on **C** (not B#).

D minor's diminished 7th (on C#) needed no such substitution, but its
3rd inversion lands on pitch-class 10, which I spelled **Bb** (not
As) to match D minor's own established flat-6th convention (Bb is
already used in this key's natural-minor scale, `f3_Bb.wav`).

## Register/octave placement for dominant-7th and diminished-7th chords

The task brief's formula describes the dominant 7th as built on "the
5th scale degree" and the diminished 7th on "root+11 semitones" (i.e.
the leading tone placed *above* the tonic). Taken completely literally
at the exact MIDI anchor pitch, later inversions (3rd inversion
especially, which stacks a full 2-octave run on top of an
already-elevated starting point) would exceed the 88-key piano's
range — e.g. A major's dominant-7th 3rd inversion would peak at MIDI
110 (D8), past the top of the keyboard.

Since "5th scale degree" and "leading tone" are the same pitch class
whether placed a 5th above or a 4th below the tonic (dominant), and a
half-step above or below (leading tone), I anchored both a register
lower — dominant 7th anchored a 4th *below* tonic, diminished 7th
anchored a half-step *below* tonic — which keeps every inversion of
every key comfortably within range (worst case, B major dominant-7th
3rd inversion, peaks at MIDI 100). This also lines up with what I saw
in the source images: D minor's root-position triad arpeggio page is
marked "Play LH 8va" and F#/Db minor's diminished-7th 2nd/3rd-inversion
systems are marked "Both hands 8va" — both are the book's own
print-space workaround for keeping the engraving from running into
excessive ledger lines, which is exactly the same register-crowding
problem approached differently (the book keeps the *written* pitch low
and marks it to be played 8va higher; I instead just anchor the whole
run lower to begin with). Either approach lands on the same practical
register — flagging this in case a reviewer wants to instead literally
follow the "root+11" wording and let the 3rd inversions run higher
(they'd need transposing down an octave to stay playable regardless).

## Voice audio gaps found (see `group2_missing_audio.txt`)

Cross-checked every `f{finger}_{Note}.wav` and `note_{Note}.wav`
reference actually used in `group2.js` against the real file listing
in `voices/` (222 files). Found 7 combinations this app has never
needed before and that don't exist yet — all because the top note of
an ascending run (always finger 5 in this project's convention, both
as the RH's highest note and the LH's lowest note) happens to fall on
an accidental for several of these inversions, and the `f5_*` set only
has natural-note clips (`f5_A` through `f5_G`, no sharps/flats at
all) — plus one single `f3_As` gap (B major's dominant-7th 3rd
inversion is the only spot in this whole group where finger 3 lands on
A#/Bb):

- `f5_Cs`, `f5_Ds`, `f5_Fs`, `f5_Gs`, `f5_As`, `f5_Bb` — six missing
  finger-5 clips.
- `f3_As` — one missing finger-3 clip.

Every other `f1`-`f4` combination and every `note_*` combination needed
by this group already exists.

## Online cross-check

Searched for a published general piano-pedagogy arpeggio fingering
reference (query: "standard piano major arpeggio fingering chart all
keys root position RH LH"). The clearest general-audience source found
([Baylor Piano Basics / arpeggio fingering chart summary](https://openbooks.library.baylor.edu/pianobasics/back-matter/major-arpeggio-fingerings/),
and the general principles restated on
[robertkelleyphd.com's keyboard fingering chart](https://robertkelleyphd.com/home/teaching/keyboard/keyboard-arpeggio-fingering-chart/))
confirms the general shape used throughout this file: RH plays a
repeating 1-2-3 pattern with the thumb tucking under at each octave
and the 5th finger reserved only for a starting/stopping/turning point
— exactly what's used here and in the existing scale data. It also
explicitly confirms the black-key-avoidance principle behind F#/Db
minor's unusual root-position shape ("the thumb always stays on the
white keys, except when there are no white keys" — F#/Gb major and
D#/Eb minor are called out by name as the exception case).

**One explicit discrepancy, not silently resolved:** that general
source describes the LH root-position fingering for a major arpeggio
as ending in a "4-2-1" shape (implying finger 4 on the middle/3rd-
degree note), whereas Alfred's Basic Piano Library — the book this
whole app is built from, per the task's own ground-truth chart — uses
finger 3 there instead (5-3-2-1-3-2-1). This is a known, ordinary
variance between method books, not an error in either source. This
file follows Alfred's Basic Piano Library throughout, per the book
this whole project already commits to, but flagging that a different
commonly-taught fingering exists in case that matters later.

## Automated verification performed

Before finalizing, ran a script that loads `group2.js` and checks,
across all 42 objects:
- Every object has the required top-level fields and 3 sections.
- Slot counts are correct (14 for triads, 18 for 7th chords).
- Every pitch is within the 88-key range (MIDI 21-108).
- LH pitch = RH pitch − 12 at every corresponding slot.
- The "together" section's pitches/fingers exactly match the
  corresponding rh/lh slots.
- The descending run is an exact mirror of the ascending run (same
  finger on the same pitch), matching the existing scale data's
  convention.
- Every `voiceAudio` note name matches the actual pitch class of that
  slot's MIDI pitch.
- `cross: null` on every single slot.

Zero issues found. This confirms internal consistency (no arithmetic
slips) but does **not** substitute for the human page-image spot-check
recommended above for the medium-confidence fingering.
