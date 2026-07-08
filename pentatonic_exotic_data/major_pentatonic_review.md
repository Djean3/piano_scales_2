# Major Pentatonic — sourcing & confidence review

## Cross-check result

Per the task, I ran one WebSearch ("major pentatonic scale piano fingering
all keys C F# pianoscales") and then one WebFetch directly against
`https://www.pianoscales.org/pentatonic.html` to verify C, F#/Gb, and B.

**Result: the task's ground-truth fingering is confirmed correct for all
three spot-checked keys**, including B major pentatonic's unusual LH
"1, 5, 4, 3, 2, 1" — the source page states this explicitly, it is not a
transcription error.

One wrinkle: the raw WebSearch snippet (Claude's own search-result summary,
not the source page) mis-attributed B major pentatonic's fingering to
F#/Gb. Fetching the actual page directly resolved this — the page itself
gives F#/Gb: LH `3,2,1,3,2,1` / RH `1,2,3,1,2,3` and B: LH `1,5,4,3,2,1` /
RH `1,2,3,4,5,1`, both matching the task's ground truth exactly. This is a
useful reminder that search-result summaries can shuffle rows across a
table; the underlying source (fetched directly) was correct and is what I
built from.

I did not separately re-verify the other 9 keys against the live page,
per the task's "don't over-research" instruction — the ground truth was
already given directly and the 3-key spot check (including one of the two
flagged idiosyncratic keys) found zero discrepancies.

## Per-key notes

All 12 keys used the same construction method, so confidence is uniform
except where noted:

- **Pitch math**: every key's pentatonic pitches were derived as
  semitone offsets [0, 2, 4, 7, 9, 12] from the RH tonic anchor (and the
  same offsets from the LH tonic, one octave below). I independently
  cross-checked this against each key's *existing* `"{Key} Major"` entry
  in data.js by extracting scale degrees 1, 2, 3, 5, 6 directly from that
  entry's own RH ascending slots (skipping the stored 4th/7th) — the
  resulting note names and MIDI pitches matched the task's given ground
  truth note lists for all 12 keys with no discrepancies. This also
  confirms enharmonic spelling: I used each key's own established
  spelling convention from its Major scale entry (e.g. Bb major spells its
  pentatonic with Bb/C/D/F/G, not A#/C/D/F/G) rather than the sharp-heavy
  spelling in the task's raw ground-truth text, since that's the
  convention this app already uses everywhere else (voice files, NOTE_NAMES).

- **Register anchor**: confirmed for all 12 keys that LH tonic = RH tonic
  − 12 semitones exactly, by reading each Major scale's first RH and LH
  slot pitches directly out of data.js. No irregular-octave surprises.

- **Fingering source**: taken directly from the task's ground truth (itself
  sourced from pianoscales.org), applied to the 5 ascending scale-degree
  slots + octave repeat; descending slots mirror ascending slots 5,4,3,2,1
  exactly (same pitch class, same finger, same voiceAudio file) — this is
  the same mirroring convention already used by every scale in
  data.js's C_MAJOR-style template (verified by manually diffing C_MAJOR's
  own ascending vs. descending finger arrays before writing any new data).

- **B Major Pentatonic** (lowest confidence key, flagged by the task):
  RH finger 5 lands on G# and LH finger 5 lands on C# — both unusual, both
  confirmed via direct WebFetch against the source page. This also
  surfaces the two missing audio clips (see missing_audio.txt) since the
  voices/ folder has no f5_*.wav for any accidental, only naturals.

- **F# Major Pentatonic**: spelled with sharps throughout (Fs, Gs, As, Cs,
  Ds), matching the existing "F# Major" entry's own spelling and the
  voices/ file-naming convention (f2_Fs.wav, f3_Gs.wav, etc. all exist).

- **Db Major Pentatonic**: parallel-minor field reuses the parent "Db
  Major" entry's own phrasing verbatim ("D♭ minor (played here using its
  practical enharmonic spelling, C♯ minor)") since that's a general
  fact about the key, not something pentatonic-specific changes.

- **cross**: null on every slot in all 12 keys, per the task's scope
  (no thumb-crossing cues built this pass).

## Missing audio

Exactly 2 files are missing, both for B Major Pentatonic (f5_Gs.wav,
f5_Cs.wav) — see major_pentatonic_missing_audio.txt for full detail. No
other key/hand/finger/note combination used anywhere in this build is
missing from voices/.

## nameAudio

No TTS clip exists for any of the 12 new scale names. All 12 use a
`TODO_*_major_pentatonic.wav` placeholder; exact spoken text for each is
in major_pentatonic_needed_audio_names.txt.
