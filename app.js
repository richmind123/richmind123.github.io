// =====================
//  DATA
// =====================
const MOVIES = [
  {
    id: 1,
    title: "Dune: Part Three",
    genre: "Sci-Fi",
    rating: 8.9,
    duration: "2h 45m",
    poster: "posters/Dune part 3 Paul Atreides Chani.jpg",
    description:
      "Paul Atreides continues his messianic journey across the desert planet Arrakis, facing his ultimate destiny as the galaxy's fate hangs in the balance.",
    showtimes: [
      { id: "s1", time: "10:30", period: "morning", hall: "Hall 1 -- IMAX" },
      {
        id: "s2",
        time: "13:45",
        period: "afternoon",
        hall: "Hall 2 -- Standard",
      },
      { id: "s3", time: "18:00", period: "evening", hall: "Hall 1 -- IMAX" },
      { id: "s4", time: "21:15", period: "evening", hall: "Hall 3 -- VIP" },
    ],
  },
  {
    id: 2,
    title: "The Batman Returns",
    genre: "Action",
    rating: 8.4,
    duration: "3h 02m",
    poster: "posters/Batman Returns.jpg",
    description:
      "Gotham's dark knight faces a new reign of terror as two of his most iconic nemeses unite to bring the city to its knees.",
    showtimes: [
      { id: "s5", time: "11:00", period: "morning", hall: "Hall 4 -- Dolby" },
      {
        id: "s6",
        time: "14:30",
        period: "afternoon",
        hall: "Hall 2 -- Standard",
      },
      { id: "s7", time: "19:45", period: "evening", hall: "Hall 4 -- Dolby" },
    ],
  },
  {
    id: 3,
    title: "Wicked: For Good",
    genre: "Drama",
    rating: 7.8,
    duration: "2h 20m",
    poster: "posters/Wicked For Good.jpg",
    description:
      "The beloved musical's thrilling conclusion -- Elphaba and Glinda's friendship is put to the ultimate test in the land of Oz.",
    showtimes: [
      {
        id: "s8",
        time: "12:00",
        period: "afternoon",
        hall: "Hall 5 -- Standard",
      },
      {
        id: "s9",
        time: "15:30",
        period: "afternoon",
        hall: "Hall 5 -- Standard",
      },
      {
        id: "s10",
        time: "20:00",
        period: "evening",
        hall: "Hall 2 -- Standard",
      },
    ],
  },
  {
    id: 4,
    title: "Nosferatu",
    genre: "Horror",
    rating: 7.6,
    duration: "2h 12m",
    poster: "posters/Nosferatu.jpg",
    description:
      "Robert Eggers reimagines the classic vampire tale -- a brooding, terrifying vision of obsession and supernatural horror in 1800s Germany.",
    showtimes: [
      {
        id: "s11",
        time: "14:00",
        period: "afternoon",
        hall: "Hall 6 -- Standard",
      },
      {
        id: "s12",
        time: "17:30",
        period: "evening",
        hall: "Hall 6 -- Standard",
      },
      { id: "s13", time: "22:00", period: "evening", hall: "Hall 3 -- VIP" },
    ],
  },
  {
    id: 5,
    title: "Inside Out 3",
    genre: "Comedy",
    rating: 8.2,
    duration: "1h 50m",
    poster: "posters/Inside Out 3.jpg",
    description:
      "Riley navigates the most transformative chapter of her life yet, as new emotions emerge and old ones evolve in unexpected ways.",
    showtimes: [
      {
        id: "s14",
        time: "09:30",
        period: "morning",
        hall: "Hall 7 -- Standard",
      },
      {
        id: "s15",
        time: "12:30",
        period: "afternoon",
        hall: "Hall 7 -- Standard",
      },
      {
        id: "s16",
        time: "16:00",
        period: "afternoon",
        hall: "Hall 8 -- Standard",
      },
    ],
  },
  {
    id: 6,
    title: "Oppenheimer 2",
    genre: "Drama",
    rating: 8.7,
    duration: "3h 15m",
    poster: "posters/oppenheimer.jpg",
    description:
      "The untold aftermath -- how the atomic bomb's creation reshapes the world, told through the eyes of those who survived its shadow.",
    showtimes: [
      { id: "s17", time: "11:30", period: "morning", hall: "Hall 1 -- IMAX" },
      { id: "s18", time: "15:00", period: "afternoon", hall: "Hall 1 -- IMAX" },
      { id: "s19", time: "20:30", period: "evening", hall: "Hall 4 -- Dolby" },
    ],
  },
  {
    id: 7,
    title: "Gladiator III",
    genre: "Action",
    rating: 7.9,
    duration: "2h 35m",
    poster: "posters/Gladiator-3-.jpg",
    description:
      "Rome's greatest arena returns. A new champion rises from the ashes, seeking justice in a world of blood and sand.",
    showtimes: [
      {
        id: "s20",
        time: "13:00",
        period: "afternoon",
        hall: "Hall 2 -- Standard",
      },
      { id: "s21", time: "17:00", period: "evening", hall: "Hall 4 -- Dolby" },
      { id: "s22", time: "21:00", period: "evening", hall: "Hall 1 -- IMAX" },
    ],
  },
  {
    id: 8,
    title: "A Quiet Place III",
    genre: "Horror",
    rating: 7.5,
    duration: "1h 55m",
    poster: "posters/A Quiet Place III.jpg",
    description:
      "In a world overrun by sound-hunting creatures, a new family must find a way to survive -- and they'll need more than silence.",
    showtimes: [
      {
        id: "s23",
        time: "15:45",
        period: "afternoon",
        hall: "Hall 6 -- Standard",
      },
      {
        id: "s24",
        time: "19:00",
        period: "evening",
        hall: "Hall 5 -- Standard",
      },
      { id: "s25", time: "22:30", period: "evening", hall: "Hall 3 -- VIP" },
    ],
  },
];

const SEAT_PRICES = { regular: 12.5, vip: 22.0, couple: 38.0 };

// =====================
//  STATE
// =====================
let state = {
  currentMovie: null,
  currentShowtime: null,
  selectedSeats: [],
  seatMap: [],
  filter: "all",
};

const BOOKING_PAGES = [
  "page-showtime",
  "page-seats",
  "page-confirm",
  "page-tickets",
];

// =====================
//  HELPERS
// =====================
function $(id) {
  return document.getElementById(id);
}
function on(id, event, fn) {
  const el = $(id);
  if (el) el.addEventListener(event, fn);
}

// =====================
//  SEAT MAP GENERATOR
// =====================
function generateSeatMap(showtimeId) {
  const saved = getSavedSeatMap(showtimeId);
  if (saved) return saved;
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  return rows.map((row, rIdx) => {
    const seats = [];
    for (let c = 1; c <= 10; c++) {
      const isVip = rIdx >= 4 && rIdx <= 5;
      const isCouple = rIdx >= 6 && (c === 9 || c === 10);
      if (isCouple && c === 10) continue;
      seats.push({
        id: `${row}${c}`,
        row,
        col: c,
        type: isCouple ? "couple" : isVip ? "vip" : "regular",
        status: Math.random() < 0.2 ? "booked" : "available",
      });
    }
    return { row, seats };
  });
}

function getSavedSeatMap(showtimeId) {
  const all = JSON.parse(localStorage.getItem("seatMaps") || "{}");
  return all[showtimeId] || null;
}

function saveSeatMap(showtimeId, map) {
  const all = JSON.parse(localStorage.getItem("seatMaps") || "{}");
  all[showtimeId] = map;
  localStorage.setItem("seatMaps", JSON.stringify(all));
}

// =====================
//  BOOKINGS
// =====================
function getBookings() {
  return JSON.parse(localStorage.getItem("bookings") || "[]");
}
function saveBooking(booking) {
  const bookings = getBookings();
  bookings.unshift(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

// =====================
//  NAVIGATION (index.html only)
// =====================
function showPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  const page = $(id);
  if (page) page.classList.add("active");
  document.body.classList.toggle("booking-mode", BOOKING_PAGES.includes(id));
  localStorage.setItem("currentPage", id);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =====================
//  MOVIE LISTING
// =====================
function posterHTML(m, height) {
  height = height || 320;
  if (m.poster) {
    return (
      `<img class="movie-poster" src="${m.poster}" alt="${m.title} poster" style="height:${height}px"` +
      ` onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />` +
      `<div class="movie-poster-placeholder" style="height:${height}px;display:none">${m.genre}</div>`
    );
  }
  return `<div class="movie-poster-placeholder" style="height:${height}px">${m.genre}</div>`;
}

function renderMovies(filter = "all") {
  const grid = $("moviesGrid");
  if (!grid) return; // guard: only runs on index.html
  const filtered =
    filter === "all" ? MOVIES : MOVIES.filter((m) => m.genre === filter);
  grid.innerHTML = filtered
    .map(
      (m, i) => `
    <div class="movie-card" style="animation-delay:${i * 0.06}s" onclick="selectMovie(${m.id})">
      ${posterHTML(m, 320)}
      <div class="movie-info">
        <div class="movie-genre">${m.genre}</div>
        <div class="movie-title">${m.title}</div>
        <div class="movie-meta">
          <span class="movie-rating">&#9733; ${m.rating}</span>
          <span class="movie-duration">&#x23F1; ${m.duration}</span>
        </div>
        <button class="book-now-btn" onclick="event.stopPropagation(); selectMovie(${m.id})">Book Now</button>
      </div>
    </div>
  `,
    )
    .join("");
}

function selectMovie(id) {
  state.currentMovie = MOVIES.find((m) => m.id === id);
  state.currentShowtime = null;
  localStorage.setItem("currentMovieId", id);
  localStorage.removeItem("currentShowtimeId");
  localStorage.removeItem("currentSeats");
  renderShowtimePage();
  history.pushState(null, "", "#showtime");
  showPage("page-showtime");
}

// =====================
//  SHOWTIME PAGE (index.html only)
// =====================
function renderShowtimePage() {
  const card = $("movieDetailCard");
  if (!card) return;
  const m = state.currentMovie;
  card.innerHTML = `
    ${posterHTML(m, 380)}
    <div class="detail-info">
      <div class="movie-title">${m.title}</div>
      <span class="detail-badge badge-genre">${m.genre}</span>
      <span class="detail-badge badge-rating">&#9733; ${m.rating}</span>
      <span class="detail-badge badge-duration">&#x23F1; ${m.duration}</span>
      <p class="detail-desc">${m.description}</p>
    </div>
  `;
  const groups = { morning: [], afternoon: [], evening: [] };
  m.showtimes.forEach((s) => groups[s.period].push(s));
  const periodLabels = {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
  };
  $("timeSlots").innerHTML = Object.entries(groups)
    .filter(([, slots]) => slots.length)
    .map(
      ([period, slots]) => `
      <div class="time-slot-group">
        <div class="time-slot-label">${periodLabels[period]}</div>
        <div class="time-slots-row">
          ${slots
            .map(
              (s) => `
            <div class="time-slot" data-id="${s.id}" onclick="selectShowtime('${s.id}')">
              <span class="slot-time">${s.time}</span>
              <span class="slot-hall">${s.hall}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `,
    )
    .join("");
  $("proceedToSeats").disabled = true;
}

function selectShowtime(id) {
  state.currentShowtime = state.currentMovie.showtimes.find((s) => s.id === id);
  localStorage.setItem("currentShowtimeId", id);
  document
    .querySelectorAll(".time-slot")
    .forEach((el) => el.classList.remove("selected"));
  document
    .querySelector(`.time-slot[data-id="${id}"]`)
    ?.classList.add("selected");
  $("proceedToSeats").disabled = false;
}

// =====================
//  SEAT MAP PAGE (index.html only)
// =====================
function renderSeatsPage() {
  if (!$("seatGrid")) return;
  const m = state.currentMovie;
  const st = state.currentShowtime;
  state.selectedSeats = [];
  state.seatMap = generateSeatMap(st.id);
  renderSeatGrid();
  updateBookingSummary();
  $("summaryMovie").textContent = m.title;
  $("summaryDetails").innerHTML = `
    ${st.time} &bull; ${st.hall}<br/>
    ${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
  `;
}

function renderSeatGrid() {
  const grid = $("seatGrid");
  if (!grid) return;
  grid.innerHTML = state.seatMap
    .map(
      ({ row, seats }) => `
    <div class="seat-row">
      <span class="row-label">${row}</span>
      ${seats
        .map(
          (seat) => `
        <button
          class="seat ${seat.status === "booked" ? "booked" : seat.type} ${state.selectedSeats.includes(seat.id) ? "selected" : ""}"
          data-id="${seat.id}"
          title="${seat.id} -- ${seat.type.charAt(0).toUpperCase() + seat.type.slice(1)} &#163;${SEAT_PRICES[seat.type].toFixed(2)}"
          onclick="toggleSeat('${seat.id}')"
          ${seat.status === "booked" ? "disabled" : ""}
        ></button>
      `,
        )
        .join("")}
    </div>
  `,
    )
    .join("");
}

function toggleSeat(seatId) {
  let seat = null;
  for (const row of state.seatMap) {
    seat = row.seats.find((s) => s.id === seatId);
    if (seat) break;
  }
  if (!seat || seat.status === "booked") return;
  const idx = state.selectedSeats.indexOf(seatId);
  idx === -1
    ? state.selectedSeats.push(seatId)
    : state.selectedSeats.splice(idx, 1);
  renderSeatGrid();
  localStorage.setItem("currentSeats", JSON.stringify(state.selectedSeats));
  updateBookingSummary();
}

function getSeat(id) {
  for (const row of state.seatMap) {
    const s = row.seats.find((s) => s.id === id);
    if (s) return s;
  }
  return null;
}

function updateBookingSummary() {
  const summarySeats = $("summarySeats");
  const totalEl = $("totalPrice");
  const confirmBtn = $("confirmBooking");
  const nameInput = $("customerName");
  if (!summarySeats) return;

  if (state.selectedSeats.length === 0) {
    summarySeats.innerHTML = `<p class="no-seats">No seats selected yet.</p>`;
    totalEl.innerHTML = "&#163;0.00";
    confirmBtn.disabled = true;
    return;
  }

  let total = 0;
  summarySeats.innerHTML = state.selectedSeats
    .map((id) => {
      const seat = getSeat(id);
      const price = SEAT_PRICES[seat.type];
      total += price;
      const typeLabel = seat.type.charAt(0).toUpperCase() + seat.type.slice(1);
      return `
      <div class="seat-item">
        <span class="seat-item-label">Seat ${id} <small>(${typeLabel})</small></span>
        <span class="seat-item-price">&#163;${price.toFixed(2)}</span>
      </div>
    `;
    })
    .join("");

  totalEl.innerHTML = `&#163;${total.toFixed(2)}`;
  confirmBtn.disabled = !nameInput.value.trim();
}

// =====================
//  CONFIRM BOOKING (index.html only)
// =====================
function confirmBooking() {
  const nameInput = $("customerName");
  if (!nameInput) return;
  const name = nameInput.value.trim();
  if (!name || state.selectedSeats.length === 0) return;

  const m = state.currentMovie;
  const st = state.currentShowtime;

  state.seatMap.forEach((row) => {
    row.seats.forEach((seat) => {
      if (state.selectedSeats.includes(seat.id)) seat.status = "booked";
    });
  });
  saveSeatMap(st.id, state.seatMap);

  let total = 0;
  state.selectedSeats.forEach((id) => {
    total += SEAT_PRICES[getSeat(id).type];
  });

  const booking = {
    bookingId: "BK" + Date.now(),
    movieId: m.id,
    movieTitle: m.title,
    movieGenre: m.genre,
    showtimeId: st.id,
    showtimeTime: st.time,
    showtimeHall: st.hall,
    selectedSeats: [...state.selectedSeats],
    totalPrice: total,
    customerName: name,
    bookingDate: new Date().toISOString(),
  };

  saveBooking(booking);
  updateTicketBadge();
  renderConfirmPage(booking);
  history.pushState(null, "", "#confirm");
  showPage("page-confirm");

  localStorage.removeItem("currentPage");
  localStorage.removeItem("currentMovieId");
  localStorage.removeItem("currentShowtimeId");
  localStorage.removeItem("currentSeats");
}

// =====================
//  CONFIRMATION PAGE (index.html only)
// =====================
function renderConfirmPage(booking) {
  const el = $("confirmDetails");
  if (!el) return;
  el.innerHTML = `
    <strong>Booking ID:</strong> ${booking.bookingId}<br/>
    <strong>Film:</strong> ${booking.movieTitle}<br/>
    <strong>Showtime:</strong> ${booking.showtimeTime} &bull; ${booking.showtimeHall}<br/>
    <strong>Customer:</strong> ${booking.customerName}<br/>
    <strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}<br/>
    <strong>Total Paid:</strong> &#163;${booking.totalPrice.toFixed(2)}
  `;
  $("confirmTickets").innerHTML = booking.selectedSeats
    .map((id) => {
      const seat = getSeat(id);
      const type = seat
        ? seat.type.charAt(0).toUpperCase() + seat.type.slice(1)
        : "";
      return `<span class="confirm-ticket-tag">Seat ${id} &middot; ${type}</span>`;
    })
    .join("");
}

// =====================
//  MY TICKETS PAGE (index.html only)
// =====================
function renderTicketsPage() {
  const list = $("ticketsList");
  if (!list) return;
  const bookings = getBookings();

  if (bookings.length === 0) {
    list.innerHTML = `
      <div class="no-tickets">
        <div class="empty-icon">&#127902;</div>
        <p>You haven't booked any tickets yet.<br/>Browse our films and book your first seat!</p>
      </div>
    `;
    return;
  }

  list.innerHTML = bookings
    .map(
      (b) => `
    <div class="ticket-card">
      <div class="ticket-card-info">
        <h4>${b.movieTitle}</h4>
        <div class="ticket-card-meta">
          \uD83D\uDD50 ${b.showtimeTime} &bull; ${b.showtimeHall}<br/>
          \uD83D\uDCC5 ${new Date(b.bookingDate).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}<br/>
          \uD83D\uDC64 ${b.customerName} &bull; ID: ${b.bookingId}
        </div>
        <div class="ticket-card-seats">Seats: ${b.selectedSeats.join(", ")}</div>
      </div>
      <div class="ticket-card-price">
        &#163;${b.totalPrice.toFixed(2)}
        <div class="ticket-card-seats">${b.selectedSeats.length} ticket${b.selectedSeats.length > 1 ? "s" : ""}</div>
      </div>
    </div>
  `,
    )
    .join("");
}

function updateTicketBadge() {
  const count = getBookings().length;
  const badge = $("ticketCount");
  if (!badge) return;
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

// =====================
//  DARK MODE (all pages)
// =====================
function initDarkMode() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");
}
on("darkToggle", "click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark",
  );
});

// =====================
//  FILTER TABS (index.html only)
// =====================
document.querySelectorAll(".filter-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-tab")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.filter = btn.dataset.filter;
    renderMovies(state.filter);
  });
});

// =====================
//  NAV BUTTONS (index.html only)
// =====================
on("backToMovies", "click", () => {
  history.pushState(null, "", window.location.pathname);
  showPage("page-movies");
});
on("backToShowtime", "click", () => {
  if (state.currentMovie) {
    renderShowtimePage();
    setTimeout(() => {
      if (state.currentShowtime) {
        document
          .querySelector(`.time-slot[data-id="${state.currentShowtime.id}"]`)
          ?.classList.add("selected");
        $("proceedToSeats").disabled = false;
      }
    }, 50);
  }
  history.pushState(null, "", "#showtime");
  showPage("page-showtime");
});
on("backFromTickets", "click", () => {
  history.pushState(null, "", window.location.pathname);
  showPage("page-movies");
});
on("viewMyTickets", "click", () => {
  renderTicketsPage();
  history.pushState(null, "", "#history");
  showPage("page-tickets");
});
on("backToHome", "click", () => {
  state.currentMovie = null;
  state.currentShowtime = null;
  state.selectedSeats = [];
  renderMovies(state.filter);
  history.pushState(null, "", window.location.pathname);
  showPage("page-movies");
});
on("proceedToSeats", "click", () => {
  renderSeatsPage();
  history.pushState(null, "", "#seats");
  showPage("page-seats");
});
on("confirmBooking", "click", confirmBooking);
on("customerName", "input", updateBookingSummary);

// =====================
//  TICKETS BUTTON (all pages)
// =====================
on("myTicketsBtn", "click", () => {
  // On films.html: redirect to index.html and open tickets page
  if (!$("ticketsList")) {
    window.location.href = "index.html#history";
    return;
  }
  // On index.html: show tickets section directly
  renderTicketsPage();
  history.pushState(null, "", "#history");
  showPage("page-tickets");
});

// =====================
//  SEARCH (all pages)
// =====================
function initSearch() {
  const overlay = $("searchOverlay");
  const input = $("searchInput");
  const cancel = $("searchCancel");
  if (!overlay || !input || !cancel) return;

  function open() {
    overlay.classList.add("open");
    input.focus();
  }
  function close() {
    overlay.classList.remove("open");
    input.value = "";
  }

  $("searchToggle")?.addEventListener("click", open);
  $("searchToggleMobile")?.addEventListener("click", open);
  cancel.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    const filtered = MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q),
    );

    // On index.html: filter the movie grid
    const grid = $("moviesGrid");
    if (grid) {
      if (!q) {
        renderMovies(state.filter);
        return;
      }
      grid.innerHTML =
        filtered
          .map(
            (m, i) => `
        <div class="movie-card" style="animation-delay:${i * 0.06}s" onclick="selectMovie(${m.id}); document.getElementById('searchCancel').click();">
          ${posterHTML(m, 320)}
          <div class="movie-info">
            <div class="movie-genre">${m.genre}</div>
            <div class="movie-title">${m.title}</div>
            <div class="movie-meta">
              <span class="movie-rating">&#9733; ${m.rating}</span>
              <span class="movie-duration">&#x23F1; ${m.duration}</span>
            </div>
            <button class="book-now-btn">Book Now</button>
          </div>
        </div>
      `,
          )
          .join("") ||
        `<p style="color:var(--text2);padding:20px">No results for "${q}"</p>`;
      return;
    }

    // On films.html: show a dropdown results box
    let resultsBox = $("filmsSearchResults");
    if (!resultsBox) {
      resultsBox = document.createElement("div");
      resultsBox.id = "filmsSearchResults";
      resultsBox.style.cssText = `
        position:fixed; top:70px; left:50%; transform:translateX(-50%);
        background:var(--card); border-radius:12px; padding:16px;
        width:90%; max-width:500px; z-index:999; box-shadow:0 8px 32px rgba(0,0,0,0.4);
      `;
      document.body.appendChild(resultsBox);
    }

    if (!q) {
      resultsBox.innerHTML = "";
      return;
    }

    resultsBox.innerHTML = filtered.length
      ? filtered
          .map(
            (m) => `
          <div onclick="window.location.href='index.html'" style="padding:10px 0; border-bottom:1px solid var(--border); cursor:pointer;">
            <strong style="color:var(--text)">${m.title}</strong>
            <span style="color:var(--text2); font-size:13px; margin-left:8px">${m.genre} &bull; &#9733; ${m.rating}</span>
          </div>
        `,
          )
          .join("")
      : `<p style="color:var(--text2)">No results for "${q}"</p>`;

    cancel.addEventListener("click", () => {
      resultsBox.innerHTML = "";
    });
  });
}

// =====================
//  MOBILE NAV (all pages)
// =====================
function initMobileNav() {
  const hamburger = $("hamburger");
  const navDropdown = $("navDropdown");
  const profileBtn = $("profileBtn");
  const profileDropdown = $("profileDropdown");
  if (!hamburger || !navDropdown) return;

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = navDropdown.classList.contains("open");
    profileDropdown?.classList.remove("open");
    open
      ? navDropdown.classList.remove("open")
      : navDropdown.classList.add("open");
    hamburger.classList.toggle("open", !open);
  });
  profileBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = profileDropdown.classList.contains("open");
    navDropdown.classList.remove("open");
    hamburger.classList.remove("open");
    open
      ? profileDropdown.classList.remove("open")
      : profileDropdown.classList.add("open");
  });
  document.addEventListener("click", () => {
    navDropdown.classList.remove("open");
    profileDropdown?.classList.remove("open");
    hamburger.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navDropdown.classList.remove("open");
      profileDropdown?.classList.remove("open");
      hamburger.classList.remove("open");
    }
  });
}

// =====================
//  RESTORE SESSION (index.html only)
// =====================
function restoreSession() {
  if (!$("page-movies")) return; // guard: only index.html has this

  // Handle redirect from films.html tickets button
  if (window.location.hash === "#history") {
    renderTicketsPage();
    showPage("page-tickets");
    return;
  }

  const savedPage = localStorage.getItem("currentPage");
  const savedMovieId = localStorage.getItem("currentMovieId");
  const savedShowtimeId = localStorage.getItem("currentShowtimeId");
  const savedSeats = JSON.parse(localStorage.getItem("currentSeats") || "[]");

  if (savedMovieId) {
    state.currentMovie = MOVIES.find((m) => m.id === parseInt(savedMovieId));
  }
  if (state.currentMovie && savedShowtimeId) {
    state.currentShowtime = state.currentMovie.showtimes.find(
      (s) => s.id === savedShowtimeId,
    );
  }

  if (savedPage === "page-showtime" && state.currentMovie) {
    renderShowtimePage();
    setTimeout(() => {
      const m = state.currentMovie;
      $("movieDetailCard").innerHTML = `
        ${posterHTML(m, 380)}
        <div class="detail-info">
          <div class="movie-title">${m.title}</div>
          <span class="detail-badge badge-genre">${m.genre}</span>
          <span class="detail-badge badge-rating">&#9733; ${m.rating}</span>
          <span class="detail-badge badge-duration">&#x23F1; ${m.duration}</span>
          <p class="detail-desc">${m.description}</p>
        </div>
      `;
      if (state.currentShowtime) {
        document
          .querySelector(`.time-slot[data-id="${state.currentShowtime.id}"]`)
          ?.classList.add("selected");
        $("proceedToSeats").disabled = false;
      }
    }, 50);
    history.pushState(null, "", "#showtime");
    showPage("page-showtime");
  } else if (
    savedPage === "page-seats" &&
    state.currentMovie &&
    state.currentShowtime
  ) {
    renderShowtimePage();
    setTimeout(() => {
      const m = state.currentMovie;
      $("movieDetailCard").innerHTML = `
        ${posterHTML(m, 380)}
        <div class="detail-info">
          <div class="movie-title">${m.title}</div>
          <span class="detail-badge badge-genre">${m.genre}</span>
          <span class="detail-badge badge-rating">&#9733; ${m.rating}</span>
          <span class="detail-badge badge-duration">&#x23F1; ${m.duration}</span>
          <p class="detail-desc">${m.description}</p>
        </div>
      `;
      if (state.currentShowtime) {
        document
          .querySelector(`.time-slot[data-id="${state.currentShowtime.id}"]`)
          ?.classList.add("selected");
        $("proceedToSeats").disabled = false;
      }
    }, 50);
    state.seatMap = generateSeatMap(state.currentShowtime.id);
    state.selectedSeats = savedSeats;
    $("summaryMovie").textContent = state.currentMovie.title;
    $("summaryDetails").innerHTML = `
      ${state.currentShowtime.time} &bull; ${state.currentShowtime.hall}<br/>
      ${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
    `;
    renderSeatGrid();
    updateBookingSummary();
    history.pushState(null, "", "#seats");
    showPage("page-seats");
  } else if (savedPage === "page-tickets") {
    renderTicketsPage();
    history.pushState(null, "", "#history");
    showPage("page-tickets");
  } else {
    history.pushState(null, "", window.location.pathname);
    showPage("page-movies");
  }
}

// ================================================
//  LOCATION PICKER (all pages)
// ================================================
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
  { name: "Liverpool One", address: "Liverpool ONE, 14 Mersey St, Liverpool" },
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

let locSelected = JSON.parse(localStorage.getItem("savedCinemas") || "[]");
let locQuery = "";

function initLocationPicker() {
  const backdrop = document.createElement("div");
  backdrop.className = "loc-backdrop";
  backdrop.id = "locBackdrop";
  backdrop.innerHTML = `
    <div class="loc-modal" role="dialog" aria-modal="true" aria-label="Select cinemas">
      <button class="loc-close" id="locClose">&#x2715;</button>
      <div class="loc-title">Choose Your Cinemas</div>
      <div class="loc-search-wrap">
        <input class="loc-search-input" id="locSearchInput" type="text"
          placeholder="Search by name or location" autocomplete="off" />
        <span class="loc-search-icon">&#9906;</span>
      </div>
      <div class="loc-count" id="locCount"></div>
      <div class="loc-pills" id="locPills"></div>
      <div class="loc-list" id="locList"></div>
      <div class="loc-footer">
        <button class="loc-save" id="locSave" disabled>Save your cinemas</button>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const toast = document.createElement("div");
  toast.className = "loc-toast";
  toast.id = "locToast";
  document.body.appendChild(toast);

  $("locClose").addEventListener("click", locClose);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) locClose();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) locClose();
  });
  $("locSearchInput").addEventListener("input", (e) => {
    locQuery = e.target.value;
    locRenderList();
  });
  $("locSave").addEventListener("click", locSave);

  // Tooltip stays in DOM — only attach click handler here
  document.querySelectorAll(".location-wrapper").forEach((wrapper) => {
    const btn = wrapper.querySelector(".icon-btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      locOpen();
    });
  });

  locUpdateBadges();
}

function locOpen() {
  locQuery = "";
  $("locSearchInput").value = "";
  locRenderPills();
  locRenderList();
  $("locBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => $("locSearchInput").focus(), 50);
}

function locClose() {
  $("locBackdrop").classList.remove("open");
  document.body.style.overflow = "";
}

function locRenderPills() {
  const container = $("locPills");
  container.innerHTML = "";
  locSelected.forEach((name) => {
    const pill = document.createElement("span");
    pill.className = "loc-pill";
    pill.innerHTML = `${name} <span class="loc-pill-x">&#x2715;</span>`;
    pill.querySelector(".loc-pill-x").addEventListener("click", (e) => {
      e.stopPropagation();
      locToggle(name);
    });
    container.appendChild(pill);
  });
}

function locRenderList() {
  const q = locQuery.toLowerCase().trim();
  const filtered = CINEMA_LOCATIONS.filter(
    (l) =>
      l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q),
  );
  $("locCount").textContent =
    `Showing ${filtered.length} location${filtered.length !== 1 ? "s" : ""} (select up to 5)`;

  const list = $("locList");
  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = `<div class="loc-empty">No locations found for "${locQuery}"</div>`;
    return;
  }

  filtered.forEach((loc) => {
    const isActive = locSelected.includes(loc.name);
    const item = document.createElement("div");
    item.className = "loc-item" + (isActive ? " active" : "");
    const toggle = document.createElement("button");
    toggle.className = "loc-toggle";
    toggle.innerHTML = isActive ? "&#10003;" : "+";
    toggle.setAttribute("tabindex", "-1");
    const info = document.createElement("div");
    info.innerHTML = `<div class="loc-name">${loc.name}</div><div class="loc-addr">${loc.address}</div>`;
    item.appendChild(toggle);
    item.appendChild(info);
    item.addEventListener("click", () => locToggle(loc.name));
    list.appendChild(item);
  });

  $("locSave").disabled = locSelected.length === 0;
}

function locToggle(name) {
  const idx = locSelected.indexOf(name);
  if (idx !== -1) {
    locSelected.splice(idx, 1);
  } else {
    if (locSelected.length >= 5) return;
    locSelected.push(name);
  }
  locRenderPills();
  locRenderList();
  $("locSave").disabled = locSelected.length === 0;
}

function locSave() {
  localStorage.setItem("savedCinemas", JSON.stringify(locSelected));
  locUpdateBadges();
  locClose();
  locShowToast(
    locSelected.length
      ? `${locSelected.length} cinema${locSelected.length > 1 ? "s" : ""} saved!`
      : "No cinemas saved.",
  );
}

function locUpdateBadges() {
  document.querySelectorAll(".location-wrapper").forEach((wrapper) => {
    const existing = wrapper.querySelector(".loc-pin-count");
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
  const toast = $("locToast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}

// =====================
//  INIT
// =====================
initDarkMode();
initSearch();
initMobileNav();
initLocationPicker();
renderMovies();
updateTicketBadge();
restoreSession();

// =====================
//  INFINITE LOOP SLIDER (films.html only)
// =====================
(function () {
  const track = document.querySelector(".slides");
  if (!track) return; // guard: skip entirely if no slider on this page

  const originals = Array.from(document.querySelectorAll(".slide"));
  const dotsWrap = $("sliderDots");
  const prevBtn = $("prevBtn");
  const nextBtn = $("nextBtn");

  if (!originals.length || !dotsWrap || !prevBtn || !nextBtn) return;

  const total = originals.length;
  const DELAY = 3500;
  const SPEED = 600;

  let current = 0;
  let isMoving = false;
  let autoTimer = null;

  const firstClone = originals[0].cloneNode(true);
  firstClone.setAttribute("data-clone", "first");
  track.appendChild(firstClone);

  const lastClone = originals[total - 1].cloneNode(true);
  lastClone.setAttribute("data-clone", "last");
  track.insertBefore(lastClone, originals[0]);

  let position = 1;

  function setPosition(pos, animate) {
    track.style.transition = animate
      ? `transform ${SPEED}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : "none";
    track.style.transform = `translateX(-${pos * 100}%)`;
  }

  setPosition(position, false);

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

  function goTo(realIndex) {
    if (isMoving) return;
    isMoving = true;
    current = realIndex;
    position = realIndex + 1;
    setPosition(position, true);
    updateDots();
  }

  function next() {
    if (isMoving) return;
    isMoving = true;
    position++;
    current = (position - 1) % total;
    setPosition(position, true);
    updateDots();
  }

  function prev() {
    if (isMoving) return;
    isMoving = true;
    position--;
    current = (position - 1 + total) % total;
    setPosition(position, true);
    updateDots();
  }

  track.addEventListener("transitionend", () => {
    isMoving = false;
    if (position >= total + 1) {
      position = 1;
      current = 0;
      setPosition(position, false);
      updateDots();
    }
    if (position <= 0) {
      position = total;
      current = total - 1;
      setPosition(position, false);
      updateDots();
    }
  });

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, DELAY);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  nextBtn.addEventListener("click", () => {
    next();
    startAuto();
  });
  prevBtn.addEventListener("click", () => {
    prev();
    startAuto();
  });

  const wrapper = document.querySelector(".slider-wrapper");
  wrapper.addEventListener("mouseenter", stopAuto);
  wrapper.addEventListener("mouseleave", startAuto);

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

  startAuto();
})();
