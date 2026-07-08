// Scale-info card — beginner-friendly summary plus a paged music theory
// section with ← → navigation: Pattern → Chords → Modes → Key & Context.

const ScaleInfo = (() => {
  function pitchClass(midi) {
    return ((midi % 12) + 12) % 12;
  }

  // Returns [{midi, name}] for the ascending run — name comes from the
  // slot's voiceAudio filename (spelling-aware: "Eb", "F#", etc.) via the
  // shared noteNameFromAudio() helper (defined in sheetmusic.js), falling
  // back to the plain PC_LETTER table (no accidental) if a slot has no
  // voice clip. Raw PC_LETTER can't tell Eb from D#, so it must not be
  // used directly on scales that are flat-spelled (minor keys).
  function ascendingRun(slots) {
    const first = slots[0];
    const out = [{ midi: first.pitches[0], name: noteNameFromAudio(first.voiceAudio) || PC_LETTER[pitchClass(first.pitches[0])] }];
    for (let i = 1; i < slots.length; i++) {
      const slot = slots[i];
      const p = slot.pitches[0];
      if (p <= out[out.length - 1].midi) break;
      out.push({ midi: p, name: noteNameFromAudio(slot.voiceAudio) || PC_LETTER[pitchClass(p)] });
    }
    return out;
  }

  function intervalPattern(run) {
    const steps = [];
    for (let i = 1; i < run.length; i++) {
      const diff = run[i].midi - run[i - 1].midi;
      steps.push(diff === 2 ? "W" : diff === 1 ? "H" : String(diff));
    }
    return steps;
  }

  function render(container, scale) {
    container.innerHTML = "";
    const rh = scale.sections.find((s) => s.id === "rh") || scale.sections[0];
    const lh = scale.sections.find((s) => s.id === "lh");
    const run = ascendingRun(rh.slots);
    const pattern = intervalPattern(run);
    const chromatic = pattern.length > 0 && pattern.every((s) => s === "H");
    const notes = run.map((n) => n.name);
    const tonicPc = pitchClass(run[0].midi);

    const desc = document.createElement("p");
    desc.className = "scale-info-desc";
    desc.textContent = scale.info.description;
    container.appendChild(desc);

    const notesEl = document.createElement("p");
    notesEl.className = "scale-info-notes";
    notesEl.innerHTML =
      "Notes: " +
      notes
        .map((n, i) => (i === 0 || i === notes.length - 1 ? `<span class="tonic-note">${n}</span>` : n))
        .join(" – ");
    container.appendChild(notesEl);

    container.appendChild(renderKeyboard(rh, lh, run, tonicPc));

    const caption = document.createElement("p");
    caption.className = "scale-info-caption";
    caption.innerHTML =
      '<span class="legend-swatch tonic"></span>Root (1) ' +
      '<span class="legend-swatch other"></span>Scale degrees';
    container.appendChild(caption);

    container.appendChild(buildTheoryPager(scale, pattern, chromatic, run));
  }

  // ── Keyboard diagram ──────────────────────────────────────────────────────

  function renderKeyboard(rh, lh, run, tonicPc) {
    const highlighted = new Set();
    const nameByPc = {};
    ascendingRun(rh.slots).forEach((n) => {
      highlighted.add(n.midi);
      const pc = pitchClass(n.midi);
      if (!(pc in nameByPc)) nameByPc[pc] = n.name;
    });
    if (lh) ascendingRun(lh.slots).forEach((n) => {
      highlighted.add(n.midi);
      const pc = pitchClass(n.midi);
      if (!(pc in nameByPc)) nameByPc[pc] = n.name;
    });

    const degreeByPc = {};
    run.forEach((n, i) => {
      const pc = pitchClass(n.midi);
      if (!(pc in degreeByPc)) degreeByPc[pc] = i + 1;
    });

    function keyContent(midi) {
      const pc = pitchClass(midi);
      return `<span class="key-degree">${degreeByPc[pc]}</span><span class="key-note">${nameByPc[pc] || PC_LETTER[pc]}</span>`;
    }

    const board = document.createElement("div");
    board.className = "piano-roll-board scale-info-board";
    const whiteRow = document.createElement("div");
    whiteRow.className = "piano-roll-white-row";

    let whiteIndex = 0;
    const blackKeyDefs = [];
    for (let midi = PIANO_ROLL_MIN; midi <= PIANO_ROLL_MAX; midi++) {
      const pc = pitchClass(midi);
      if (PC_IS_BLACK.has(pc)) {
        blackKeyDefs.push({ midi, boundary: whiteIndex });
        continue;
      }
      const key = document.createElement("div");
      key.className = "piano-key white";
      if (highlighted.has(midi)) {
        key.classList.add("scale-note");
        if (pc === tonicPc) key.classList.add("tonic");
        key.innerHTML = keyContent(midi);
      }
      whiteRow.appendChild(key);
      whiteIndex++;
    }
    const whiteCount = whiteIndex;
    board.appendChild(whiteRow);

    const whiteWidthPct = 100 / whiteCount;
    const blackWidthPct = whiteWidthPct * 0.62;
    for (const def of blackKeyDefs) {
      const key = document.createElement("div");
      key.className = "piano-key black";
      key.style.left = `calc(${def.boundary * whiteWidthPct}% - ${blackWidthPct / 2}%)`;
      key.style.width = `${blackWidthPct}%`;
      if (highlighted.has(def.midi)) {
        key.classList.add("scale-note");
        if (pitchClass(def.midi) === tonicPc) key.classList.add("tonic");
        key.innerHTML = keyContent(def.midi);
      }
      board.appendChild(key);
    }
    return board;
  }

  // ── Theory pager ──────────────────────────────────────────────────────────

  const MODE_NAMES   = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
  const MODE_QUALITY = ["major", "minor", "minor", "major", "major", "minor", "diminished"];
  const MODE_VIBE    = ["bright", "smooth", "exotic", "dreamy", "bluesy", "natural", "dark"];

  function buildTheoryPager(scale, pattern, chromatic, run) {
    const wrapper = document.createElement("div");
    wrapper.className = "theory-pager";

    const pages = [];

    // Page 1 — Interval Pattern
    pages.push({
      title: "Interval Pattern",
      build() {
        const div = document.createElement("div");

        const typeEl = document.createElement("p");
        typeEl.className = "scale-info-type";
        typeEl.textContent = `${chromatic ? "Chromatic" : "Diatonic"} · ${scale.info.typeLabel}`;
        div.appendChild(typeEl);

        const patEl = document.createElement("p");
        patEl.className = "scale-info-pattern";
        patEl.innerHTML = pattern
          .map((s) => `<span class="pattern-step ${s === "W" ? "whole" : s === "H" ? "half" : ""}">${s === "W" ? "Whole" : s === "H" ? "Half" : s}</span>`)
          .join("");
        div.appendChild(patEl);

        if (scale.info.advanced) {
          const adv = document.createElement("p");
          adv.className = "scale-info-desc theory-last";
          adv.textContent = scale.info.advanced;
          div.appendChild(adv);
        }
        return div;
      },
    });

    // Page 2 — Diatonic Chords
    if (!chromatic && run.length >= 7) {
      pages.push({
        title: "Diatonic Chords",
        build() { return buildChordsPage(run); },
      });
    }

    // Page 3 — Modes (only for scales that rotate through the standard
    // 7 diatonic modes -- major and natural minor. Harmonic/melodic minor
    // have their own, differently-named mode families, so scale.info.modeRotation
    // is left unset for those and this page is skipped rather than showing
    // wrong mode names.)
    if (!chromatic && run.length >= 7 && scale.info.modeRotation != null) {
      pages.push({
        title: "Modes",
        build() { return buildModesPage(run, scale.info.modeRotation); },
      });
    }

    // Page 4 — Scale Degrees
    if (scale.info.degrees) {
      pages.push({
        title: "Scale Degrees",
        build() { return buildScaleDegreesPage(run, scale.info.degrees); },
      });
    }

    // Page 5 — Pentatonic
    if (scale.info.pentatonic) {
      pages.push({
        title: "Pentatonic",
        build() { return buildPentatonicPage(run, scale.info.pentatonic); },
      });
    }

    // Page 6 — Progressions
    if (scale.info.progressions) {
      pages.push({
        title: "Progressions",
        build() { return buildProgressionsPage(scale.info.progressions); },
      });
    }

    // Page 7 — Key & Context
    if (scale.info.keyInfo) {
      pages.push({
        title: "Key & Context",
        build() { return buildKeyInfoPage(scale.info.keyInfo); },
      });
    }

    let current = 0;

    const header = document.createElement("div");
    header.className = "theory-header";

    const prevBtn = document.createElement("button");
    prevBtn.className = "theory-nav";
    prevBtn.innerHTML = "&#8592;";
    prevBtn.setAttribute("aria-label", "Previous topic");

    const titleEl = document.createElement("span");
    titleEl.className = "theory-title";

    const nextBtn = document.createElement("button");
    nextBtn.className = "theory-nav";
    nextBtn.innerHTML = "&#8594;";
    nextBtn.setAttribute("aria-label", "Next topic");

    header.appendChild(prevBtn);
    header.appendChild(titleEl);
    header.appendChild(nextBtn);
    wrapper.appendChild(header);

    const contentEl = document.createElement("div");
    contentEl.className = "theory-content";
    wrapper.appendChild(contentEl);

    const dotsEl = document.createElement("div");
    dotsEl.className = "theory-dots";
    wrapper.appendChild(dotsEl);

    function goTo(idx) {
      current = ((idx % pages.length) + pages.length) % pages.length;
      titleEl.textContent = pages[current].title;
      contentEl.innerHTML = "";
      contentEl.appendChild(pages[current].build());
      dotsEl.innerHTML = "";
      pages.forEach((_, i) => {
        const d = document.createElement("span");
        d.className = "theory-dot" + (i === current ? " active" : "");
        d.addEventListener("click", () => goTo(i));
        dotsEl.appendChild(d);
      });
    }

    prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn.addEventListener("click", () => goTo(current + 1));
    goTo(0);
    return wrapper;
  }

  function buildChordsPage(run) {
    const div = document.createElement("div");
    const degrees = run.slice(0, 7);
    const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

    const grid = document.createElement("div");
    grid.className = "theory-chord-grid";

    degrees.forEach(({ midi: root, name: noteName }, d) => {
      let third = degrees[(d + 2) % 7].midi;
      let fifth  = degrees[(d + 4) % 7].midi;
      while (third <= root)  third += 12;
      while (fifth  <= third) fifth += 12;

      const majorThird   = (third - root) === 4;
      const perfectFifth = (fifth  - root) === 7;

      let quality, roman, qualLabel;
      if (majorThird && perfectFifth) {
        quality = "major"; roman = ROMAN[d]; qualLabel = "";
      } else if (!majorThird && perfectFifth) {
        quality = "minor"; roman = ROMAN[d].toLowerCase(); qualLabel = "m";
      } else {
        quality = "dim"; roman = ROMAN[d].toLowerCase() + "°"; qualLabel = "°";
      }

      const chip = document.createElement("div");
      chip.className = `theory-chord theory-chord-${quality}`;
      chip.innerHTML =
        `<span class="chord-roman">${roman}</span>` +
        `<span class="chord-name">${noteName}<span class="chord-qual">${qualLabel}</span></span>`;
      grid.appendChild(chip);
    });

    div.appendChild(grid);

    const note = document.createElement("p");
    note.className = "theory-note";
    note.textContent = "Uppercase = major · lowercase = minor · ° = diminished";
    div.appendChild(note);
    return div;
  }

  // rotation: index into MODE_NAMES/QUALITY/VIBE that this scale's own
  // 1st degree corresponds to (0 for major/Ionian-rooted scales, 5 for
  // natural minor since Aeolian is the major scale's 6th mode).
  function buildModesPage(run, rotation) {
    const div = document.createElement("div");
    const list = document.createElement("div");
    list.className = "theory-mode-list";

    run.slice(0, 7).forEach(({ name: noteName }, i) => {
      const m = (rotation + i) % 7;
      const row = document.createElement("div");
      row.className = "theory-mode-row";
      row.innerHTML =
        `<span class="mode-note">${noteName}</span>` +
        `<span class="mode-name">${MODE_NAMES[m]}</span>` +
        `<span class="mode-quality mode-${MODE_QUALITY[m]}">${MODE_QUALITY[m]}</span>` +
        `<span class="mode-vibe">${MODE_VIBE[m]}</span>`;
      list.appendChild(row);
    });

    div.appendChild(list);
    return div;
  }

  function buildKeyInfoPage(info) {
    const div = document.createElement("div");
    const grid = document.createElement("div");
    grid.className = "theory-key-grid";

    [
      ["Key signature", info.signature],
      ["Relative key",  info.relative],
      ["Parallel minor", info.parallel],
    ].forEach(([label, value]) => {
      if (!value) return;
      const row = document.createElement("div");
      row.className = "theory-key-row";
      row.innerHTML =
        `<span class="theory-key-label">${label}</span>` +
        `<span class="theory-key-value">${value}</span>`;
      grid.appendChild(row);
    });

    if (info.genres && info.genres.length) {
      const row = document.createElement("div");
      row.className = "theory-key-row";
      const labelEl = document.createElement("span");
      labelEl.className = "theory-key-label";
      labelEl.textContent = "Common genres";
      const genreWrap = document.createElement("div");
      genreWrap.className = "theory-genres";
      info.genres.forEach((g) => {
        const chip = document.createElement("span");
        chip.className = "theory-genre";
        chip.textContent = g;
        genreWrap.appendChild(chip);
      });
      row.appendChild(labelEl);
      row.appendChild(genreWrap);
      grid.appendChild(row);
    }

    div.appendChild(grid);
    return div;
  }

  function buildScaleDegreesPage(run, degrees) {
    const div = document.createElement("div");
    const list = document.createElement("div");
    list.className = "theory-degree-list";
    run.slice(0, 7).forEach(({ name: noteName }, i) => {
      const row = document.createElement("div");
      row.className = "theory-degree-row";
      row.innerHTML =
        `<span class="deg-num">${i + 1}</span>` +
        `<span class="deg-note">${noteName}</span>` +
        `<span class="deg-sol">${degrees.solfege[i]}</span>` +
        `<span class="deg-name">${degrees.names[i]}</span>` +
        `<span class="deg-fn">${degrees.functions[i]}</span>`;
      list.appendChild(row);
    });
    div.appendChild(list);
    return div;
  }

  function buildPentatonicPage(run, penta) {
    const div = document.createElement("div");
    const row = document.createElement("div");
    row.className = "theory-penta-row";
    const inSet = new Set(penta.indices);
    run.slice(0, 7).forEach(({ name: noteName }, i) => {
      const chip = document.createElement("span");
      chip.className = `penta-note ${inSet.has(i) ? "in" : "out"}`;
      chip.textContent = noteName;
      row.appendChild(chip);
    });
    div.appendChild(row);
    const note = document.createElement("p");
    note.className = "theory-note";
    note.textContent = `Drops ${penta.dropped} — leaving 5 notes that all sound good together.`;
    div.appendChild(note);
    return div;
  }

  function buildProgressionsPage(progressions) {
    const div = document.createElement("div");
    const list = document.createElement("div");
    list.className = "theory-prog-list";
    progressions.forEach(({ roman, chords, genre }) => {
      const item = document.createElement("div");
      item.className = "theory-prog-item";
      const top = document.createElement("div");
      top.className = "prog-top";
      top.innerHTML =
        `<span class="prog-roman">${roman}</span>` +
        `<span class="prog-genre">${genre}</span>`;
      const chordsEl = document.createElement("div");
      chordsEl.className = "prog-chords";
      chords.forEach((c) => {
        const chip = document.createElement("span");
        chip.className = "prog-chord";
        chip.textContent = c;
        chordsEl.appendChild(chip);
      });
      item.appendChild(top);
      item.appendChild(chordsEl);
      list.appendChild(item);
    });
    div.appendChild(list);
    return div;
  }

  return { render };
})();
