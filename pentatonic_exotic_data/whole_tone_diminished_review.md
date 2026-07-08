# Whole Tone / Diminished (Octatonic) — Sourcing & Confidence Review

Generated 2026-07-08. Covers 24 entries (12 keys x 2 scale types) in `whole_tone_diminished.js`. Not wired into `data.js` — output only.

## Sourcing method (important: two WebFetch passes disagreed with each other — see below)

Both scale pages were fetched from `https://www.pianoscales.org/whole-tone.html` and
`https://www.pianoscales.org/diminished.html`, spacing requests a few seconds apart (no 429s hit).

The first couple of `WebFetch` calls (which run the fetched page through a small summarization
model) gave **internally inconsistent answers on repeated queries** — e.g. three separate asks
about the D#/Eb whole-tone scale's LH fingering returned three different digit sequences
(`4,3,2,1,4,3,2` / `3,2,1,3,2,1,3` / `4,3,2,1,3,2,1`). That's a real reliability problem for
digit-exact data, so instead of trusting any single `WebFetch` summary, I pulled the **raw HTML**
directly (`System.Net.WebClient` via PowerShell, bypassing the summarization step entirely) and
read the fingering numbers straight out of the page markup myself. The raw HTML is small,
static, and unambiguous (see `<h2>` per-key blocks in both pages) — this is the source of truth
used for every number in this file, not the earlier `WebFetch` summaries. All whole-tone note
lists and all 12 keys' RH/LH fingering below are transcribed directly from that raw HTML.

## Whole Tone — fingering is sourced, not reconstructed

Contrary to the task brief's expectation ("fingering shown for C and G only"), the raw HTML
actually contains a per-key fingering line for **all 12 keys** (each key has its own `<h2>` block
with `Notes:`, `Fingering (LH):`, `Fingering (RH):`). So none of the whole-tone fingering below
is a from-scratch reconstruction — it's a direct transcription, cross-checked by re-fetching the
raw page a second time (all values reproduced identically except the one D#/Eb LH hiccup
mentioned above, which was resolved by going to raw HTML). Confidence: **high** for both notes
and fingering, all 12 keys.

Root-note spelling was matched to this app's key-naming convention (e.g. our "Db" key uses the
page's `Db, Eb, F, G, A, B` alternate spelling row rather than its primary `C#, D#, F, G, A, B`
row; our "F#" key uses the primary `F#, G#, A#, C, D, E` row rather than the page's `Gb, Ab, Bb,
C, D, E` alternate). Every fingering number stays exactly as printed on the page for that
letter-spelling variant — respelling a note (C# -> Db) never changes which finger plays it.

| Key | Notes (ascending) | RH fingering | LH fingering |
|---|---|---|---|
| C | C, D, E, F#, G#, Bb | 1,2,1,2,3,4,5 | 3,2,1,4,3,2,1 |
| Db | Db, Eb, F, G, A, B | 2,3,1,2,3,1,2 | 3,2,1,3,2,1,3 |
| D | D, E, F#, G#, A#, C | 2,1,2,3,4,1,2 | 2,1,4,3,2,1,2 |
| Eb | Eb, F, G, A, B, Db | 4,1,2,1,2,3,4 | 4,3,2,1,4,3,2 |
| E | E, F#, G#, A#, C, D | 1,2,3,4,1,2,3 | 5,4,3,2,1,3,2 |
| F | F, G, A, B, Db, Eb | 1,2,3,1,2,3,4 | 4,3,2,1,3,2,1 |
| F# | F#, G#, A#, C, D, E | 2,3,4,1,2,3,4 | 4,3,2,1,3,1,2 |
| G | G, A, B, C#, D#, F | 1,2,1,2,3,4,5 | 3,2,1,4,3,2,1 |
| Ab | Ab, Bb, C, D, E, Gb | 2,3,1,2,1,2,3 | 3,2,1,2,1,3,2 |
| A | A, B, C#, D#, F, G | 1,2,3,4,1,2,3 | 2,1,3,2,1,2,3 |
| Bb | Bb, C, D, E, Gb, Ab | 4,1,2,1,2,3,4 | 4,3,2,1,4,3,2 |
| B | B, C#, D#, F, G, A | 1,2,3,1,2,3,4 | 4,3,2,1,3,2,1 |

Each 7-number sequence covers the 6 ascending scale degrees plus the octave repeat of the root;
the app's descending run reuses the same per-degree finger in reverse (matching how `C_MAJOR`'s
own template works — B/A/G/F/E/D reuse the identical fingers from the ascent). The note names
above match the semitone formula (root + 0,2,4,6,8,10) exactly in every key — verified
arithmetically before generating pitches, not just copied.

Interesting confirmed detail: C and G use the *identical* fingering shape (1,2,1,2,3,4,5 /
3,2,1,4,3,2,1) even though they belong to the two different whole-tone note-sets — this matches
the ground truth given in the task brief. Db, despite sharing G's note-set family, uses a
different shape (2,3,1,2,3,1,2) — fingering here tracks the specific white/black arrangement of
that individual root, not which of the two 6-note families it belongs to.

## Diminished (Octatonic) — fingering is reconstructed, no site/book source found

Confirmed (via the same raw-HTML fetch) that `diminished.html` shows **no fingering anywhere on
the page** — only note lists per key. `pianoencyclopedia.com`'s diminished-scale pages likewise
had no visible finger numbers in the fetched content, and `learnjazzpiano.com`'s dedicated
fingering article 404'd; the `vi-control.net` forum thread 403'd (anti-bot blocked). So there is
no single authoritative "here is the diminished scale finger chart for all 12 keys" source.

What multiple independent `WebSearch` results *did* converge on, though, is a specific
well-known convention for this exact scale: because the whole-half diminished scale is fully
symmetric and repeats its interval pattern every minor third, it is commonly taught as a scale
"most comfortably played using [only] 3 fingers" in a repeating pattern, split "3+3+2" across
the octave — sources phrased this as `1,2,3,1,2,3,1,2` / `123 13 123` style fingerings. That
converges cleanly on a **uniform 1-2-3 repeating pattern for RH (3-2-1 repeating for LH)**,
applied identically to all 12 keys:

- RH ascending (8 degrees + octave repeat, 9 notes): `1,2,3,1,2,3,1,2,3`
- LH ascending (mirrored): `3,2,1,3,2,1,3,2,1`

This deliberately **does not** follow the usual "thumb avoids black keys" rule — that's the
point of the 3-finger convention (it trades off strict finger-color matching for a pattern
simple enough to play at tempo without thinking about each key's black/white layout), and
several of the sources found call this out explicitly as the standard practical compromise
pianists use for this specific scale. Confidence: **medium** — this is a real, sourced
convention (not invented from nothing), but it is uniform across all 12 keys rather than
individually optimized per root the way the whole-tone fingering above is. A teacher or a
fingered edition should be treated as the tie-breaker if this ever conflicts with how a specific
student is taught the scale.

Note spelling for all 12 keys is high-confidence — transcribed directly from the same raw HTML
(including the page's own alternate-spelling row for Db/Eb/Ab/Bb, matching this app's flat-key
naming), not reconstructed:

| Key | Notes (ascending) |
|---|---|
| C | C, D, Eb, F, Gb, Ab, A, B |
| Db | Db, Eb, Fb, Gb, G, A, Bb, C |
| D | D, E, F, G, Ab, Bb, B, C# |
| Eb | Eb, F, Gb, Ab, A, B, C, D |
| E | E, F#, G, A, Bb, C, C#, D# |
| F | F, G, Ab, Bb, B, C#, D, E |
| F# | F#, G#, A, B, C, D, D#, F |
| G | G, A, Bb, C, C#, D#, E, F# |
| Ab | Ab, Bb, Cb, Db, D, E, F, G |
| A | A, B, C, D, Eb, F, Gb, Ab |
| Bb | Bb, C, Db, Eb, E, Gb, G, A |
| B | B, C#, D, E, F, G, Ab, Bb |

Two keys use double-flat-style enharmonic naturals that this app already has voice files for:
**Db diminished** uses "Fb" (in place of E) and **Ab diminished** uses "Cb" (in place of B) —
both are the page's own choice, not something I introduced, and both `f{finger}_Fb.wav` /
`f{finger}_Cb.wav` families mostly already exist in `voices/` (one gap — see Audio section below).

## Register / octave anchor

RH tonic MIDI and LH tonic MIDI were taken directly from each key's existing `"{Key} Major"`
entry's first RH/LH slot in `data.js` (grepped and read for all 12 keys before generating any
output), so these scales sit in the same register as that key's already-built major scale:

| Key | RH tonic | LH tonic |
|---|---|---|
| C | 60 | 48 |
| Db | 61 | 49 |
| D | 62 | 50 |
| Eb | 63 | 51 |
| E | 64 | 52 |
| F | 65 | 53 |
| F# | 66 | 54 |
| G | 67 | 55 |
| Ab | 68 | 56 |
| A | 69 | 57 |
| Bb | 70 | 58 |
| B | 71 | 59 |

All ascending pitch sequences were verified programmatically to strictly increase through the
ascent, and the descending run mirrors the ascending pitches/fingers exactly (same script that
generated the data also asserted this before the files were finalized).

## Info blocks

`typeLabel`, `description`, `keyInfo` (signature/relative/parallel all "N/A", genres
`["Jazz", "Classical", "Film Score"]`), and `degrees.numbers` (`"1st".."6th"` for whole tone,
`"1st".."8th"` for diminished) are included per the task spec; `pentatonic` and `progressions`
are omitted entirely, matching how other non-diatonic scale types in this app already vary which
optional info fields they include. `cross: null` is set on every slot in both scale types, per
the task's instructions for this pass — no thumb-crossing cue audio fires despite several
fingerings implying a cross.

## Audio

- `whole_tone_diminished_missing_audio.txt`: exactly **one** missing voice clip out of all 24
  entries — `voices/f3_Fb.wav` (needed for Db Diminished's 3rd-finger Fb). Every other
  `f{finger}_{note}.wav` and `note_{note}.wav` referenced by this data already exists in
  `voices/` (checked programmatically against a live directory listing at generation time, not
  just assumed).
- `whole_tone_diminished_needed_audio_names.txt`: the 24 `nameAudio` TTS clips, none of which
  exist yet (all point at `TODO_*.wav` placeholders) — spoken text spelled out per key (e.g.
  "F Sharp Diminished", "D Flat Whole Tone"), filename tokens matching this app's existing
  nameAudio convention (`FSharp`, not `Fs`, to match `50_FSharp_Major.wav` etc.).

## Bottom line

- **Whole tone**: high confidence across the board — notes and fingering both directly sourced
  and cross-checked (raw HTML, re-fetched, one WebFetch inconsistency chased down and resolved).
- **Diminished**: notes high confidence (same sourcing); fingering medium confidence —
  reconstructed but grounded in a real, repeatedly-cited pedagogical convention for this specific
  scale (uniform 1-2-3 / 3-2-1 repeating pattern), not root-specific. Flag this the same way
  prior batches flagged unconfirmed fingering: treat as a reasonable default, not gospel.
