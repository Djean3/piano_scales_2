// Sheet music visual — renders each section's notes via VexFlow with note-name
// annotations, plus a playhead line that tracks the currently-sounding slot.

const SM_PC_LETTER = { 0: "C", 1: "C", 2: "D", 3: "D", 4: "E", 5: "F", 6: "F", 7: "G", 8: "G", 9: "A", 10: "A", 11: "B" };
const SM_SVG_NS = "http://www.w3.org/2000/svg";

// Extract the note's display name from a slot's voiceAudio filename.
// "f3_Fs.wav" → "F#", "note_Cs.wav" → "C#", "f1_D.wav" → "D".
// Returns null for non-note clips (e.g. now_backwards.wav).
function noteNameFromAudio(voiceAudio) {
  if (!voiceAudio) return null;
  const file = voiceAudio.split("/").pop().replace(".wav", "");
  let part = null;
  let m = file.match(/^f\d_(.+)$/);
  if (m) part = m[1];
  else { m = file.match(/^note_(.+)$/); if (m) part = m[1]; }
  if (!part) return null;
  if (part.length === 2 && part[1] === "s") return part[0] + "#";
  if (part.length === 2 && part[1] === "b" && part[0] !== "B") return part[0] + "b";
  return part;
}

// Splits a resolved note name (e.g. "F#", "Bb", "C") into its bare letter and
// accidental ("#", "b", or null), falling back to the natural letter for the
// pitch class when no note name could be resolved.
function sm_noteNameParts(noteName, midi) {
  if (noteName) {
    const m = noteName.match(/^([A-G])(#|b)?$/);
    if (m) return { letter: m[1], accidental: m[2] || null };
  }
  const pc = ((midi % 12) + 12) % 12;
  return { letter: SM_PC_LETTER[pc], accidental: null };
}

const SheetMusic = (() => {
  let rootEl = null;
  let scaleData = null;
  const sections = new Map(); // id -> { el, xs, playhead, topY, bottomY }
  let currentSectionId = null;
  let vexAvailable = typeof Vex !== "undefined" && Vex.Flow;

  function init(container, scale) {
    rootEl = container;
    scaleData = scale;
    sections.clear();
    currentSectionId = null;
    rootEl.innerHTML = "";

    if (!vexAvailable) {
      rootEl.innerHTML = '<p class="sheet-music-error">Sheet music view unavailable (notation library failed to load).</p>';
      return;
    }

    try {
      for (const section of scale.sections) {
        const wrap = document.createElement("div");
        wrap.className = "sheet-music-section";
        wrap.dataset.section = section.id;
        wrap.style.display = "none";
        const scroller = document.createElement("div");
        scroller.className = "sheet-music-scroller";
        wrap.appendChild(scroller);
        rootEl.appendChild(wrap);

        const render = renderSection(scroller, section);
        sections.set(section.id, { el: wrap, scroller, ...render });
      }
    } catch (e) {
      console.warn("Sheet music rendering failed", e);
      vexAvailable = false;
      sections.clear();
      rootEl.innerHTML = '<p class="sheet-music-error">Sheet music view unavailable (rendering error).</p>';
    }
  }

  function makeClefNote(VF, midi, clef, noteName) {
    // VexFlow only draws a sharp/flat glyph (and only tells two notes with the
    // same natural-letter bucket apart, e.g. F vs F#) when the accidental is
    // both present in the key string AND registered via addAccidental — a
    // bare "f/4" key renders identically whether the real note is F or F#.
    const { letter, accidental } = sm_noteNameParts(noteName, midi);
    const octave = Math.floor(midi / 12) - 1;
    const key = accidental ? `${letter.toLowerCase()}${accidental}/${octave}` : `${letter.toLowerCase()}/${octave}`;
    const note = new VF.StaveNote({ clef, keys: [key], duration: "q" });
    if (accidental) note.addAccidental(0, new VF.Accidental(accidental));
    const label = noteName || letter;
    note.addAnnotation(
      0,
      new VF.Annotation(label)
        .setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM)
        .setFont("Arial", 10)
    );
    return note;
  }

  // A GhostNote takes up the correct tick width for grand-staff alignment but
  // draws nothing — a rest glyph would too, but rest glyphs and noteheads have
  // different built-in x-offsets, so a column of rests never lines up with the
  // notes on the other stave at the same tick.
  function makeRestNote(VF) {
    return new VF.GhostNote({ duration: "q" });
  }

  // Picks the pitch (if any) this section's slot has for the given stave.
  // RH/LH sections only have notes on their own clef; the other stave gets
  // ghost notes so the grand staff is always shown, just empty on the unused side.
  function makeSectionNote(VF, slot, sectionClef, staveClef, noteName) {
    let midi = null;
    if (sectionClef === "grand") {
      midi = staveClef === "treble" ? slot.pitches[0] : slot.pitches[1];
    } else if (sectionClef === staveClef) {
      midi = slot.pitches[0];
    }
    return midi == null ? makeRestNote(VF) : makeClefNote(VF, midi, staveClef, noteName);
  }

  // Structural clips (e.g. "now_backwards.wav") have no note-name of their own
  // to parse from voiceAudio — they're a spoken turnaround cue that repeats
  // the same pitch(es) as the immediately preceding slot (the top note of the
  // scale, played twice: once with its real note-name clip, once with "now
  // backwards"). Reusing the previous slot's already-resolved note name keeps
  // display correct (e.g. "F#") instead of falling back to the bare,
  // sharp/flat-blind natural-letter-per-pitch-class guess.
  function resolveNoteNames(section) {
    let prevNoteName = null;
    let prevPitches = null;
    return section.slots.map((slot) => {
      const samePitchesAsPrev =
        prevPitches && slot.pitches.length === prevPitches.length &&
        slot.pitches.every((p, i) => p === prevPitches[i]);
      const noteName = noteNameFromAudio(slot.voiceAudio) || (samePitchesAsPrev ? prevNoteName : null);
      prevNoteName = noteName;
      prevPitches = slot.pitches;
      return noteName;
    });
  }

  function renderSection(container, section) {
    const VF = Vex.Flow;
    const slotCount = section.slots.length;
    const width = slotCount * 65 + 70;
    // Headroom above the treble stave and below the bass stave for ledger
    // lines. VexFlow draws high notes above the stave (and low notes below
    // it) using coordinates that can go negative relative to a tight
    // top margin -- anything outside the SVG's viewBox gets clipped by the
    // scroller ancestor (overflow-x: auto forces overflow-y to compute as
    // auto too, per the CSS overflow spec, even though only overflow-x was
    // set). Wide-range content (multi-octave arpeggios especially) needs
    // real room, not the ~20px this used to leave.
    const topMargin = 70;
    const staveGap = 130;
    const bottomMargin = 90;
    const height = topMargin + staveGap + bottomMargin;

    container.innerHTML = "";
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(width, height);
    const context = renderer.getContext();

    // Scale the notation to fit the panel width instead of overflowing it —
    // without a viewBox, the SVG paints at its literal pixel width/height, so
    // longer scales/arpeggios (more slots => wider SVG) can exceed the visible
    // panel and push the final note(s) past the edge, only reachable via a
    // horizontal scroll a user may not notice. A viewBox + 100% CSS width
    // makes the whole sequence always fit in view, matching the reference
    // design (every note visible at once, no scrolling needed).
    const rootSvg = container.querySelector("svg");
    if (rootSvg) {
      rootSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      rootSvg.removeAttribute("width");
      rootSvg.setAttribute("height", height);
      rootSvg.style.width = "100%";
      rootSvg.style.height = "auto";
    }

    // Notation ink follows the app's current theme (--sheet-ink) so it stays
    // legible now that the sheet-music panel itself is theme-colored instead
    // of a fixed cream background.
    const ink = getComputedStyle(document.documentElement).getPropertyValue("--sheet-ink").trim() || "#000000";
    context.setFillStyle(ink);
    context.setStrokeStyle(ink);

    const trebleStave = new VF.Stave(10, topMargin, width - 20);
    trebleStave.addClef("treble");
    trebleStave.setContext(context).draw();

    const bassStave = new VF.Stave(10, topMargin + staveGap, width - 20);
    bassStave.addClef("bass");
    bassStave.setContext(context).draw();

    // Treble and bass clef glyphs have different widths, so each stave's
    // note-start x differs by default. Align them so grand-staff notes (and
    // the playhead/cross arcs, which reuse one set of x positions for both
    // staves) line up vertically across the treble and bass staves.
    const noteStartX = Math.max(trebleStave.getNoteStartX(), bassStave.getNoteStartX());
    trebleStave.setNoteStartX(noteStartX);
    bassStave.setNoteStartX(noteStartX);

    const noteNames = resolveNoteNames(section);
    const trebleNotes = section.slots.map((slot, i) => makeSectionNote(VF, slot, section.clef, "treble", noteNames[i]));
    const bassNotes = section.slots.map((slot, i) => makeSectionNote(VF, slot, section.clef, "bass", noteNames[i]));

    const trebleVoice = new VF.Voice({ num_beats: slotCount, beat_value: 4 }).setStrict(false);
    trebleVoice.addTickables(trebleNotes);
    const bassVoice = new VF.Voice({ num_beats: slotCount, beat_value: 4 }).setStrict(false);
    bassVoice.addTickables(bassNotes);

    new VF.Formatter()
      .joinVoices([trebleVoice])
      .joinVoices([bassVoice])
      .format([trebleVoice, bassVoice], width - noteStartX - 10);

    trebleVoice.draw(context, trebleStave);
    bassVoice.draw(context, bassStave);

    // VexFlow's noteheads and text annotations hardcode their own fill/stroke
    // internally at draw time — they don't inherit context.setFillStyle() the
    // way stave lines and clefs do. Force every already-colored SVG element
    // (i.e. everything VexFlow itself drew) to the theme ink color directly,
    // so noteheads and the note-letter labels actually recolor with the
    // theme instead of staying stuck black. Only elements that already carry
    // an explicit fill/stroke attribute are touched, so nothing gets an
    // unwanted outline added.
    const notationSvg = container.querySelector("svg");
    if (notationSvg) {
      notationSvg.querySelectorAll("*").forEach((el) => {
        if (el.getAttribute("fill") && el.getAttribute("fill") !== "none") el.setAttribute("fill", ink);
        if (el.getAttribute("stroke") && el.getAttribute("stroke") !== "none") el.setAttribute("stroke", ink);
      });
    }

    // Use whichever stave has the real (non-ghost) notes for this section's
    // x-positions, so the playhead and cross-arcs line up with visible noteheads.
    const xNotes = section.clef === "bass" ? bassNotes : trebleNotes;
    const xs = xNotes.map((n) => n.getAbsoluteX());
    const topY = trebleStave.getYForLine(0) - 10;
    const bottomY = bassStave.getYForLine(4) + 30;

    const svg = container.querySelector("svg");
    const playhead = document.createElementNS("http://www.w3.org/2000/svg", "line");
    playhead.setAttribute("class", "sheet-music-playhead");
    playhead.setAttribute("y1", String(topY));
    playhead.setAttribute("y2", String(bottomY));
    playhead.setAttribute("x1", String(xs[0] - 25));
    playhead.setAttribute("x2", String(xs[0] - 25));
    svg.appendChild(playhead);

    return { xs, playhead, topY, bottomY, clef: section.clef };
  }

  function showSection(sectionId) {
    if (!vexAvailable) return;
    if (currentSectionId === sectionId) return;
    for (const [id, s] of sections) {
      s.el.style.display = id === sectionId ? "block" : "none";
    }
    currentSectionId = sectionId;
    const s = sections.get(sectionId);
    if (s) {
      s.playhead.setAttribute("x1", String(s.xs[0] - 25));
      s.playhead.setAttribute("x2", String(s.xs[0] - 25));
    }
  }

  // Animates an arc between two notes for a "Cross Over" / "Cross Under" cue.
  // Drawn above the treble staff if the crossing note is on the treble clef,
  // below the bass staff if it's on the bass clef. For "together" (grand
  // staff), handIndex 0 = RH (treble/above), handIndex 1 = LH (bass/below).
  // For RH/LH-only sections, handIndex is always 0 and the section's own
  // clef decides which staff the note lives on.
  function showCross({ type, section, handIndex, fromSlot, toSlot }) {
    if (!vexAvailable) return;
    const s = sections.get(section);
    if (!s) return;
    const x1 = s.xs[fromSlot];
    const x2 = s.xs[toSlot];
    if (x1 == null || x2 == null) return;

    const svg = s.scroller.querySelector("svg");
    if (!svg) return;
    svg.querySelectorAll(".sheet-music-cross").forEach((el) => el.remove());

    const above = s.clef === "grand" ? handIndex !== 1 : s.clef === "treble";
    const y = above ? s.topY + 6 : s.bottomY - 6;
    const midY = above ? s.topY - 14 : s.bottomY + 14;

    const path = document.createElementNS(SM_SVG_NS, "path");
    path.setAttribute("class", `sheet-music-cross cross-${type}`);
    path.setAttribute("d", `M ${x1} ${y} Q ${(x1 + x2) / 2} ${midY} ${x2} ${y}`);
    svg.appendChild(path);

    setTimeout(() => {
      if (svg.contains(path)) svg.removeChild(path);
    }, 1500);
  }

  function highlight(sectionId, slotIndex) {
    if (!vexAvailable) return;
    const s = sections.get(sectionId);
    if (!s) return;
    const x = s.xs[slotIndex];
    if (x == null) return;
    s.playhead.setAttribute("x1", String(x));
    s.playhead.setAttribute("x2", String(x));

    // Keep the playhead in view on narrow screens.
    s.scroller.scrollLeft = Math.max(0, x - s.scroller.clientWidth / 2);
  }

  return { init, showSection, highlight, showCross };
})();
