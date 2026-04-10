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

// =====================================================================
//  NAVBAR.JS — shared navbar features across all pages
//  Include this on every page: <script src="./navbar.js"></script>
// =====================================================================

(function () {
  // ── Dark Mode ──────────────────────────────────────────────────────
  function initDarkMode() {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light");
    }
    const btn = document.getElementById("darkToggle");
    if (btn) {
      btn.addEventListener("click", function () {
        document.body.classList.toggle("light");
        localStorage.setItem(
          "theme",
          document.body.classList.contains("light") ? "light" : "dark",
        );
      });
    }
  }

  // ── Search Overlay ─────────────────────────────────────────────────
  function initSearch() {
    const overlay = document.getElementById("searchOverlay");
    const input = document.getElementById("searchInput");
    const cancel = document.getElementById("searchCancel");
    if (!overlay) return;

    function openSearch() {
      overlay.classList.add("open");
      if (input) input.focus();
    }
    function closeSearch() {
      overlay.classList.remove("open");
      if (input) input.value = "";
    }

    const tog = document.getElementById("searchToggle");
    const togMob = document.getElementById("searchToggleMobile");
    if (tog) tog.addEventListener("click", openSearch);
    if (togMob) togMob.addEventListener("click", openSearch);
    if (cancel) cancel.addEventListener("click", closeSearch);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSearch();
    });
  }

  // ── Mobile Hamburger ───────────────────────────────────────────────
  function initMobileNav() {
    const hamburger = document.getElementById("hamburger");
    const navDropdown = document.getElementById("navDropdown");
    const profileBtn = document.getElementById("profileBtn");
    const profileDropdown = document.getElementById("profileDropdown");
    if (!hamburger) return;

    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      let open = navDropdown.classList.contains("open");
      profileDropdown.classList.remove("open");
      open
        ? navDropdown.classList.remove("open")
        : navDropdown.classList.add("open");
      hamburger.classList.toggle("open", !open);
    });

    if (profileBtn) {
      profileBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        let open = profileDropdown.classList.contains("open");
        navDropdown.classList.remove("open");
        hamburger.classList.remove("open");
        open
          ? profileDropdown.classList.remove("open")
          : profileDropdown.classList.add("open");
      });
    }

    document.addEventListener("click", function () {
      navDropdown.classList.remove("open");
      if (profileDropdown) profileDropdown.classList.remove("open");
      hamburger.classList.remove("open");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        navDropdown.classList.remove("open");
        if (profileDropdown) profileDropdown.classList.remove("open");
        hamburger.classList.remove("open");
      }
    });
  }

  // ── Ticket Badge ───────────────────────────────────────────────────
  function initTicketBadge() {
    const badge = document.getElementById("ticketCount");
    if (!badge) return;
    try {
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const count = bookings.length;
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove("hidden");
      }
    } catch (e) {}
  }

  // ── Location Picker ────────────────────────────────────────────────
  const CINEMA_LOCATIONS = [
    { name: "Acton", address: "Royale Leisure Park, Kendal Avenue, London" },
    {
      name: "Andover",
      address: "Cinema Unit, New Asda Development, Anton Mill Road, Andover",
    },
    { name: "Bath", address: "Kingsmead Square, Bath" },
    {
      name: "Birmingham Broadway Plaza",
      address: "Ladywood Middleway, Birmingham",
    },
    { name: "Birmingham Great Park", address: "Rubery, Birmingham" },
    { name: "Brighton", address: "Brighton Marina, Brighton" },
    { name: "Bristol Aspects", address: "Longwell Green Retail Park, Bristol" },
    { name: "Cambridge", address: "St Andrew's Street, Cambridge" },
    { name: "Canterbury", address: "St Georges Lane, Canterbury" },
    { name: "Cardiff", address: "Mary Ann Street, Cardiff" },
    { name: "Cheltenham", address: "Winchcombe Street, Cheltenham" },
    { name: "Chester", address: "Hunter Street, Chester" },
    { name: "Coventry", address: "Jordan Well, Coventry" },
    { name: "Derby", address: "Foresters Park, Foresters Leisure Park, Derby" },
    { name: "Dublin", address: "The Point Village, Dublin" },
    { name: "Edinburgh", address: "Lothian Road, Edinburgh" },
    { name: "Exeter", address: "Sidwell Street, Exeter" },
    { name: "Glasgow", address: "Springfield Quay, Glasgow" },
    { name: "Guildford", address: "Epsom Road, Guildford" },
    { name: "Leeds Bradford", address: "Valley Road, Birstall, Leeds" },
    {
      name: "Liverpool One",
      address: "Liverpool ONE, 14 Mersey St, Liverpool",
    },
    { name: "London Covent Garden", address: "135 Shaftesbury Avenue, London" },
    {
      name: "London Leicester Square",
      address: "24-26 Leicester Square, London",
    },
    { name: "Manchester Printworks", address: "27 Withy Grove, Manchester" },
    { name: "Milton Keynes", address: "602 Marlborough Gate, Milton Keynes" },
    { name: "Newcastle", address: "The Gate, Newgate Street, Newcastle" },
    { name: "Nottingham", address: "Lower Parliament Street, Nottingham" },
    { name: "Oxford", address: "Magdalen Street, Oxford" },
    { name: "Reading", address: "The Oracle Shopping Centre, Reading" },
    { name: "Sheffield", address: "Arundel Gate, Sheffield" },
    { name: "Southampton", address: "West Quay Shopping Centre, Southampton" },
    { name: "Stoke-on-Trent", address: "Festival Park, Stoke-on-Trent" },
    { name: "Swansea", address: "Parc Tawe, Swansea" },
    { name: "Warrington", address: "Westbrook Centre, Warrington" },
    { name: "York", address: "Clifton Moor Retail Park, York" },
  ];

  let locSelected = [];
  let locQuery = "";

  try {
    locSelected = JSON.parse(localStorage.getItem("savedCinemas") || "[]");
  } catch (e) {
    locSelected = [];
  }

  function initLocationPicker() {
    // Inject modal
    const backdrop = document.createElement("div");
    backdrop.className = "loc-backdrop";
    backdrop.id = "locBackdrop";
    backdrop.innerHTML =
      '<div class="loc-modal" role="dialog" aria-modal="true" aria-label="Select cinemas">' +
      '<button class="loc-close" id="locClose">&#x2715;</button>' +
      '<div class="loc-title">Choose Your Cinemas</div>' +
      '<div class="loc-search-wrap">' +
      '<input class="loc-search-input" id="locSearchInput" type="text" placeholder="Search by name or location" autocomplete="off"/>' +
      '<span class="loc-search-icon">&#9906;</span>' +
      "</div>" +
      '<div class="loc-count" id="locCount"></div>' +
      '<div class="loc-pills" id="locPills"></div>' +
      '<div class="loc-list"  id="locList"></div>' +
      '<div class="loc-footer"><button class="loc-save" id="locSave" disabled>Save your cinemas</button></div>' +
      "</div>";
    document.body.appendChild(backdrop);

    // Inject toast
    const toast = document.createElement("div");
    toast.className = "loc-toast";
    toast.id = "locToast";
    document.body.appendChild(toast);

    document.getElementById("locClose").addEventListener("click", locClose);
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) locClose();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && backdrop.classList.contains("open")) locClose();
    });

    document
      .getElementById("locSearchInput")
      .addEventListener("input", function (e) {
        locQuery = e.target.value;
        locRenderList();
      });

    document.getElementById("locSave").addEventListener("click", locSave);

    // Wire all location pin buttons
    document.querySelectorAll(".location-wrapper").forEach(function (wrapper) {
      const btn = wrapper.querySelector(".icon-btn");
      const oldTooltip = wrapper.querySelector(".location-tooltip");
      if (oldTooltip) oldTooltip.remove();
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        locOpen();
      });
    });

    locUpdateBadges();
  }

  function locOpen() {
    locQuery = "";
    document.getElementById("locSearchInput").value = "";
    locRenderPills();
    locRenderList();
    document.getElementById("locBackdrop").classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      document.getElementById("locSearchInput").focus();
    }, 50);
  }

  function locClose() {
    document.getElementById("locBackdrop").classList.remove("open");
    document.body.style.overflow = "";
  }

  function locRenderPills() {
    const container = document.getElementById("locPills");
    container.innerHTML = "";
    locSelected.forEach(function (name) {
      const pill = document.createElement("span");
      pill.className = "loc-pill";
      pill.innerHTML = name + ' <span class="loc-pill-x">&#x2715;</span>';
      pill.querySelector(".loc-pill-x").addEventListener("click", function (e) {
        e.stopPropagation();
        locToggle(name);
      });
      container.appendChild(pill);
    });
  }

  function locRenderList() {
    let q = locQuery.toLowerCase().trim();
    const filtered = CINEMA_LOCATIONS.filter(function (l) {
      return (
        l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)
      );
    });

    document.getElementById("locCount").textContent =
      "Showing " +
      filtered.length +
      " location" +
      (filtered.length !== 1 ? "s" : "") +
      " (select up to 5)";

    const list = document.getElementById("locList");
    list.innerHTML = "";

    if (filtered.length === 0) {
      list.innerHTML =
        '<div class="loc-empty">No locations found for "' +
        locQuery +
        '"</div>';
      return;
    }

    filtered.forEach(function (loc) {
      let isActive = locSelected.includes(loc.name);
      const item = document.createElement("div");
      item.className = "loc-item" + (isActive ? " active" : "");

      const toggle = document.createElement("button");
      toggle.className = "loc-toggle";
      toggle.innerHTML = isActive ? "&#10003;" : "+";
      toggle.setAttribute("tabindex", "-1");

      const info = document.createElement("div");
      info.innerHTML =
        '<div class="loc-name">' +
        loc.name +
        '</div><div class="loc-addr">' +
        loc.address +
        "</div>";

      item.appendChild(toggle);
      item.appendChild(info);
      item.addEventListener("click", function () {
        locToggle(loc.name);
      });
      list.appendChild(item);
    });

    document.getElementById("locSave").disabled = locSelected.length === 0;
  }

  function locToggle(name) {
    let idx = locSelected.indexOf(name);
    if (idx !== -1) {
      locSelected.splice(idx, 1);
    } else {
      if (locSelected.length >= 5) return;
      locSelected.push(name);
    }
    locRenderPills();
    locRenderList();
    document.getElementById("locSave").disabled = locSelected.length === 0;
  }

  function locSave() {
    localStorage.setItem("savedCinemas", JSON.stringify(locSelected));
    locUpdateBadges();
    locClose();
    locShowToast(
      locSelected.length
        ? locSelected.length +
            " cinema" +
            (locSelected.length > 1 ? "s" : "") +
            " saved!"
        : "No cinemas saved.",
    );
  }

  function locUpdateBadges() {
    document.querySelectorAll(".location-wrapper").forEach(function (wrapper) {
      let existing = wrapper.querySelector(".loc-pin-count");
      if (existing) existing.remove();
      const btn = wrapper.querySelector(".icon-btn");
      if (locSelected.length > 0) {
        btn.style.color = "var(--accent)";
        const badge = document.createElement("span");
        badge.className = "loc-pin-count";
        badge.textContent = locSelected.length;
        wrapper.appendChild(badge);
      } else {
        btn.style.color = "";
      }
    });
  }

  function locShowToast(msg) {
    const toast = document.getElementById("locToast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  // ── Boot all navbar features ───────────────────────────────────────
  initDarkMode();
  initSearch();
  initMobileNav();
  initTicketBadge();
  initLocationPicker();
})();
