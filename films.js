// =====================
//  INFINITE LOOP SLIDER
// =====================
(function () {
  const track = document.querySelector(".slides");
  const originals = Array.from(document.querySelectorAll(".slide"));
  const dotsWrap = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const total = originals.length;
  const DELAY = 3500; // 5 seconds per slide
  const SPEED = 600; // transition speed ms

  let current = 0;
  let isMoving = false;
  let autoTimer = null;

  // ── Clone first & last for seamless wrap ──
  const firstClone = originals[0].cloneNode(true);
  firstClone.setAttribute("data-clone", "first");
  track.appendChild(firstClone);

  const lastClone = originals[total - 1].cloneNode(true);
  lastClone.setAttribute("data-clone", "last");
  track.insertBefore(lastClone, originals[0]);

  // Position starts at 1 (first real slide, after prepended clone)
  let position = 1;

  function setPosition(pos, animate) {
    track.style.transition = animate
      ? "transform " + SPEED + "ms cubic-bezier(0.4, 0, 0.2, 1)"
      : "none";
    track.style.transform = "translateX(-" + pos * 100 + "%)";
  }

  // Start without animation
  setPosition(position, false);

  // ── Build dots ──
  originals.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Slide " + (i + 1));
    dot.addEventListener("click", () => {
      if (!isMoving) goTo(i);
    });
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    document.querySelectorAll(".slider-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  // ── Go to a specific real slide ──
  function goTo(realIndex) {
    if (isMoving) return;
    isMoving = true;
    current = realIndex;
    position = realIndex + 1;
    setPosition(position, true);
    updateDots();
  }

  // ── Next ──
  function next() {
    if (isMoving) return;
    isMoving = true;
    position++;
    current = (position - 1) % total;
    setPosition(position, true);
    updateDots();
  }

  // ── Prev ──
  function prev() {
    if (isMoving) return;
    isMoving = true;
    position--;
    current = (position - 1 + total) % total;
    setPosition(position, true);
    updateDots();
  }

  // ── After slide animation ends — silently jump if on a clone ──
  track.addEventListener("transitionend", () => {
    isMoving = false;

    // Landed on clone of first slide at the end → jump to real first
    if (position >= total + 1) {
      position = 1;
      current = 0;
      setPosition(position, false);
      updateDots();
    }

    // Landed on clone of last slide at the start → jump to real last
    if (position <= 0) {
      position = total;
      current = total - 1;
      setPosition(position, false);
      updateDots();
    }
  });

  // ── Auto play ──
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, DELAY);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  // ── Button controls ──
  nextBtn.addEventListener("click", () => {
    next();
    startAuto();
  });
  prevBtn.addEventListener("click", () => {
    prev();
    startAuto();
  });

  // Pause on hover, resume on leave
  const wrapper = document.querySelector(".slider-wrapper");
  wrapper.addEventListener("mouseenter", stopAuto);
  wrapper.addEventListener("mouseleave", startAuto);

  // Touch swipe support
  let touchStartX = 0;
  wrapper.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      stopAuto();
    },
    { passive: true },
  );
  wrapper.addEventListener(
    "touchend",
    (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
      startAuto();
    },
    { passive: true },
  );

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      next();
      startAuto();
    }
    if (e.key === "ArrowLeft") {
      prev();
      startAuto();
    }
  });

  // Start
  startAuto();
})();
