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
//  SEAT MAP GENERATOR
// =====================
function generateSeatMap(showtimeId) {
  const saved = getSavedSeatMap(showtimeId);
  if (saved) return saved;

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const map = rows.map((row, rIdx) => {
    const seats = [];
    for (let c = 1; c <= 10; c++) {
      const isVip = rIdx >= 4 && rIdx <= 5;
      const isCouple = rIdx >= 6 && (c === 9 || c === 10);
      if (isCouple && c === 10) continue;
      const preBooked = Math.random() < 0.2;
      seats.push({
        id: `${row}${c}`,
        row,
        col: c,
        type: isCouple ? "couple" : isVip ? "vip" : "regular",
        status: preBooked ? "booked" : "available",
      });
    }
    return { row, seats };
  });
  return map;
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
//  BOOKINGS (localStorage)
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
//  NAVIGATION
// =====================
function showPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  const page = document.getElementById(id);
  if (page) page.classList.add("active");

  if (BOOKING_PAGES.includes(id)) {
    document.body.classList.add("booking-mode");
  } else {
    document.body.classList.remove("booking-mode");
  }

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
      '<img class="movie-poster" src="' +
      m.poster +
      '" alt="' +
      m.title +
      ' poster" style="height:' +
      height +
      "px\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\" />" +
      '<div class="movie-poster-placeholder" style="height:' +
      height +
      'px;display:none">' +
      m.genre +
      "</div>"
    );
  }
  return (
    '<div class="movie-poster-placeholder" style="height:' +
    height +
    'px">' +
    m.genre +
    "</div>"
  );
}

function renderMovies(filter = "all") {
  const grid = document.getElementById("moviesGrid");
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
//  SHOWTIME PAGE
// =====================
function renderShowtimePage() {
  const m = state.currentMovie;
  document.getElementById("movieDetailCard").innerHTML = `
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
  document.getElementById("timeSlots").innerHTML = Object.entries(groups)
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

  document.getElementById("proceedToSeats").disabled = true;
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
  document.getElementById("proceedToSeats").disabled = false;
}

// =====================
//  SEAT MAP PAGE
// =====================
function renderSeatsPage() {
  const m = state.currentMovie;
  const st = state.currentShowtime;

  state.selectedSeats = [];
  state.seatMap = generateSeatMap(st.id);

  renderSeatGrid();
  updateBookingSummary();

  document.getElementById("summaryMovie").textContent = m.title;
  document.getElementById("summaryDetails").innerHTML = `
    ${st.time} &bull; ${st.hall}<br/>
    ${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
  `;
}

function renderSeatGrid() {
  const grid = document.getElementById("seatGrid");
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
  if (idx === -1) {
    state.selectedSeats.push(seatId);
  } else {
    state.selectedSeats.splice(idx, 1);
  }

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
  const summarySeats = document.getElementById("summarySeats");
  const totalEl = document.getElementById("totalPrice");
  const confirmBtn = document.getElementById("confirmBooking");
  const nameInput = document.getElementById("customerName");

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
//  CONFIRM BOOKING
// =====================
function confirmBooking() {
  const name = document.getElementById("customerName").value.trim();
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
    const seat = getSeat(id);
    total += SEAT_PRICES[seat.type];
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

  // Clear session after booking is complete
  localStorage.removeItem("currentPage");
  localStorage.removeItem("currentMovieId");
  localStorage.removeItem("currentShowtimeId");
  localStorage.removeItem("currentSeats");
}

// =====================
//  CONFIRMATION PAGE
// =====================
function renderConfirmPage(booking) {
  document.getElementById("confirmDetails").innerHTML = `
    <strong>Booking ID:</strong> ${booking.bookingId}<br/>
    <strong>Film:</strong> ${booking.movieTitle}<br/>
    <strong>Showtime:</strong> ${booking.showtimeTime} &bull; ${booking.showtimeHall}<br/>
    <strong>Customer:</strong> ${booking.customerName}<br/>
    <strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}<br/>
    <strong>Total Paid:</strong> &#163;${booking.totalPrice.toFixed(2)}
  `;

  document.getElementById("confirmTickets").innerHTML = booking.selectedSeats
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
//  MY TICKETS PAGE
// =====================
function renderTicketsPage() {
  const bookings = getBookings();
  const list = document.getElementById("ticketsList");

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
  const badge = document.getElementById("ticketCount");
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

// =====================
//  DARK MODE
// =====================
function initDarkMode() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");
}
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark",
  );
});

// =====================
//  FILTER TABS
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
//  NAV BUTTONS
// =====================
document.getElementById("backToMovies").addEventListener("click", () => {
  history.pushState(null, "", window.location.pathname);
  showPage("page-movies");
});
document.getElementById("backToShowtime").addEventListener("click", () => {
  // Re-render showtime page fully so movie detail and slots are visible
  if (state.currentMovie) {
    renderShowtimePage();
    setTimeout(() => {
      if (state.currentShowtime) {
        document
          .querySelector(`.time-slot[data-id="${state.currentShowtime.id}"]`)
          ?.classList.add("selected");
        document.getElementById("proceedToSeats").disabled = false;
      }
    }, 50);
  }
  history.pushState(null, "", "#showtime");
  showPage("page-showtime");
});
document.getElementById("backFromTickets").addEventListener("click", () => {
  history.pushState(null, "", window.location.pathname);
  showPage("page-movies");
});
document.getElementById("viewMyTickets").addEventListener("click", () => {
  renderTicketsPage();
  history.pushState(null, "", "#history");
  showPage("page-tickets");
});
document.getElementById("backToHome").addEventListener("click", () => {
  state.currentMovie = null;
  state.currentShowtime = null;
  state.selectedSeats = [];
  renderMovies(state.filter);
  history.pushState(null, "", window.location.pathname);
  showPage("page-movies");
});
document.getElementById("proceedToSeats").addEventListener("click", () => {
  renderSeatsPage();
  history.pushState(null, "", "#seats");
  showPage("page-seats");
});
document
  .getElementById("confirmBooking")
  .addEventListener("click", confirmBooking);
document.getElementById("myTicketsBtn").addEventListener("click", () => {
  renderTicketsPage();
  history.pushState(null, "", "#history");
  showPage("page-tickets");
});
document
  .getElementById("customerName")
  .addEventListener("input", updateBookingSummary);

// =====================
//  SEARCH
// =====================
function initSearch() {
  const overlay = document.getElementById("searchOverlay");
  const input = document.getElementById("searchInput");
  const cancel = document.getElementById("searchCancel");
  function open() {
    overlay.classList.add("open");
    input.focus();
  }
  function close() {
    overlay.classList.remove("open");
    input.value = "";
  }
  document.getElementById("searchToggle")?.addEventListener("click", open);
  document
    .getElementById("searchToggleMobile")
    ?.addEventListener("click", open);
  cancel.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    if (!q) return;
    const filtered = MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q),
    );
    if (document.getElementById("page-movies").classList.contains("active")) {
      const grid = document.getElementById("moviesGrid");
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
    }
  });
}

// =====================
//  MOBILE NAV
// =====================
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navDropdown = document.getElementById("navDropdown");
  const profileBtn = document.getElementById("profileBtn");
  const profileDropdown = document.getElementById("profileDropdown");

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = navDropdown.classList.contains("open");
    profileDropdown.classList.remove("open");
    open
      ? navDropdown.classList.remove("open")
      : navDropdown.classList.add("open");
    hamburger.classList.toggle("open", !open);
  });
  profileBtn.addEventListener("click", (e) => {
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
    profileDropdown.classList.remove("open");
    hamburger.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navDropdown.classList.remove("open");
      profileDropdown.classList.remove("open");
      hamburger.classList.remove("open");
    }
  });
}

// =====================
//  RESTORE SESSION
// =====================
function restoreSession() {
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
    // Fully render the showtime page including movie detail card
    renderShowtimePage();
    setTimeout(() => {
      // Re-populate movie detail card explicitly after render
      const m = state.currentMovie;
      document.getElementById("movieDetailCard").innerHTML = `
        ${posterHTML(m, 380)}
        <div class="detail-info">
          <div class="movie-title">${m.title}</div>
          <span class="detail-badge badge-genre">${m.genre}</span>
          <span class="detail-badge badge-rating">&#9733; ${m.rating}</span>
          <span class="detail-badge badge-duration">&#x23F1; ${m.duration}</span>
          <p class="detail-desc">${m.description}</p>
        </div>
      `;
      // Re-highlight the saved showtime button if one was selected
      if (state.currentShowtime) {
        document
          .querySelector(`.time-slot[data-id="${state.currentShowtime.id}"]`)
          ?.classList.add("selected");
        document.getElementById("proceedToSeats").disabled = false;
      }
    }, 50);
    history.pushState(null, "", "#showtime");
    showPage("page-showtime");
  } else if (
    savedPage === "page-seats" &&
    state.currentMovie &&
    state.currentShowtime
  ) {
    // Pre-render the showtime page in background so back button works perfectly
    renderShowtimePage();
    setTimeout(() => {
      const m = state.currentMovie;
      document.getElementById("movieDetailCard").innerHTML = `
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
        document.getElementById("proceedToSeats").disabled = false;
      }
    }, 50);
    // Now set up and show seats page
    state.seatMap = generateSeatMap(state.currentShowtime.id);
    state.selectedSeats = savedSeats;
    document.getElementById("summaryMovie").textContent =
      state.currentMovie.title;
    document.getElementById("summaryDetails").innerHTML = `
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
//  LOCATION PICKER
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

  document.getElementById("locClose").addEventListener("click", locClose);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) locClose();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) locClose();
  });

  document.getElementById("locSearchInput").addEventListener("input", (e) => {
    locQuery = e.target.value;
    locRenderList();
  });

  document.getElementById("locSave").addEventListener("click", locSave);

  document.querySelectorAll(".location-wrapper").forEach((wrapper) => {
    const btn = wrapper.querySelector(".icon-btn");
    const oldTooltip = wrapper.querySelector(".location-tooltip");
    if (oldTooltip) oldTooltip.remove();
    btn.addEventListener("click", (e) => {
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
  setTimeout(() => document.getElementById("locSearchInput").focus(), 50);
}

function locClose() {
  document.getElementById("locBackdrop").classList.remove("open");
  document.body.style.overflow = "";
}

function locRenderPills() {
  const container = document.getElementById("locPills");
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

  document.getElementById("locCount").textContent =
    `Showing ${filtered.length} location${filtered.length !== 1 ? "s" : ""} (select up to 5)`;

  const list = document.getElementById("locList");
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

  document.getElementById("locSave").disabled = locSelected.length === 0;
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
  document.getElementById("locSave").disabled = locSelected.length === 0;
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
  const toast = document.getElementById("locToast");
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
