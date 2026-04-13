/* ============================================================
   TRAVELORA — COMPLETE JAVASCRIPT ENGINE
   ============================================================ */

// ── DESTINATIONS DATA ─────────────────────────────────────────
const DESTINATIONS = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    continent: 'europe',
    price: 120,
    rating: 4.9,
    reviews: 2840,
    tag: '🏆 Most Popular',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    desc: 'The city of love, art, and exquisite cuisine.'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    continent: 'asia',
    price: 150,
    rating: 4.8,
    reviews: 1920,
    tag: '🔥 Trending',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
    desc: 'Where ancient tradition meets futuristic innovation.'
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'USA',
    continent: 'americas',
    price: 100,
    rating: 4.7,
    reviews: 3100,
    tag: '🌆 City Life',
    img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
    desc: 'The city that never sleeps, full of energy and culture.'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    continent: 'middleeast',
    price: 180,
    rating: 4.9,
    reviews: 2210,
    tag: '💎 Luxury',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    desc: 'Ultra-modern skylines, golden deserts, and world records.'
  },
  {
    id: 'capetown',
    name: 'Cape Town',
    country: 'South Africa',
    continent: 'africa',
    price: 90,
    rating: 4.8,
    reviews: 1540,
    tag: '🦁 Safari Nearby',
    img: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80',
    desc: 'Dramatic mountains, turquoise waters, vibrant culture.'
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    continent: 'europe',
    price: 130,
    rating: 4.7,
    reviews: 2650,
    tag: '👑 Iconic',
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    desc: 'History, royalty, world-class museums and theatre.'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    continent: 'oceania',
    price: 160,
    rating: 4.8,
    reviews: 1780,
    tag: '🏄 Beach Vibes',
    img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80',
    desc: 'Iconic harbour, golden beaches, and vibrant food scene.'
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    continent: 'europe',
    price: 110,
    rating: 4.8,
    reviews: 2430,
    tag: '🏛️ Historical',
    img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
    desc: 'The Eternal City — millennia of history at every corner.'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    continent: 'asia',
    price: 140,
    rating: 4.9,
    reviews: 3450,
    tag: '🌺 Paradise',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
    desc: 'Tropical paradise with lush rice terraces and temples.'
  },
  {
    id: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    continent: 'americas',
    price: 120,
    rating: 4.6,
    reviews: 1290,
    tag: '🍁 Multicultural',
    img: 'https://images.unsplash.com/photo-1517090186835-e348b621c9ca?w=600&q=80',
    desc: 'Canada\'s most diverse city — a cultural melting pot.'
  }
];

// ── HELPERS ───────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const escHtml = (s) =>
  String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const formatDate = (d) => {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date)) return d;
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatCurrency = (n) =>
  '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const calcDays = (s, e) => {
  const diff = new Date(e) - new Date(s);
  return (!isNaN(diff) && diff > 0) ? Math.ceil(diff / 86400000) : 0;
};

const getUser = () => JSON.parse(localStorage.getItem('traveloraUser') || 'null');
const setUser = (u) => localStorage.setItem('traveloraUser', JSON.stringify(u));
const getLoggedIn = () => JSON.parse(localStorage.getItem('traveloraLoggedIn') || 'null');
const setLoggedIn = (u) => localStorage.setItem('traveloraLoggedIn', JSON.stringify(u));
const clearLoggedIn = () => localStorage.removeItem('traveloraLoggedIn');
const getBookings = () => JSON.parse(localStorage.getItem('traveloraBookings') || '[]');
const setBookings = (b) => localStorage.setItem('traveloraBookings', JSON.stringify(b));

function buildInitials(name) {
  return (name || 'T').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

// ── NAVBAR ─────────────────────────────────────────────────────
function initNav() {
  const nav = $('mainNav');
  const hamburger = $('navHamburger');
  const navGuest = $('navGuest');
  const navUser = $('navUser');
  const navUserName = $('navUserName');
  const navAvatarInitial = $('navAvatarInitial');
  const logoutBtn = $('logoutBtn');

  // Scroll effect
  if (nav && !nav.classList.contains('scrolled')) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-open');
    });
  }

  // Auth state
  const user = getLoggedIn();
  if (user) {
    navGuest && (navGuest.style.display = 'none');
    if (navUser) {
      navUser.classList.remove('d-none');
      navUserName && (navUserName.textContent = user.name.split(' ')[0]);
      navAvatarInitial && (navAvatarInitial.textContent = buildInitials(user.name));
    }
  } else {
    navGuest && (navGuest.style.display = '');
    navUser && navUser.classList.add('d-none');
  }

  // User dropdown toggle
  const userBtn = $('navUserBtn');
  if (userBtn) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navUser.classList.toggle('open');
    });
    document.addEventListener('click', () => navUser && navUser.classList.remove('open'));
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearLoggedIn();
      window.location.href = 'login.html';
    });
  }
}

// ── SCROLL REVEAL ──────────────────────────────────────────────
function initReveal() {
  const els = qsa('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ── DESTINATION CARD BUILDER ────────────────────────────────────
function buildDestCard(d) {
  const wishlist = JSON.parse(localStorage.getItem('traveloraWishlist') || '[]');
  const isWished = wishlist.includes(d.id);
  return `
    <div class="dest-card" data-continent="${d.continent}" data-id="${d.id}">
      <div class="dest-card-img">
        <img src="${d.img}" alt="${escHtml(d.name)}" loading="lazy" />
        <div class="dest-card-badge">${d.tag}</div>
        <div class="dest-card-wishlist ${isWished ? 'active' : ''}" data-id="${d.id}" title="Wishlist">
          ${isWished ? '❤️' : '🤍'}
        </div>
      </div>
      <div class="dest-card-body">
        <div class="dest-card-header">
          <div>
            <div class="dest-card-name">${escHtml(d.name)}</div>
            <div class="dest-card-country">📍 ${escHtml(d.country)}</div>
          </div>
          <div class="dest-card-rating">★ ${d.rating} <span style="color: var(--white-70); font-weight: 400;">(${d.reviews.toLocaleString()})</span></div>
        </div>
        <p style="font-size: 0.85rem; color: var(--white-70); margin-bottom: 0; line-height: 1.5;">${escHtml(d.desc)}</p>
        <div class="dest-card-meta">
          <div class="dest-card-price">$${d.price} <span>/day per person</span></div>
          <a href="booking.html?dest=${encodeURIComponent(d.name + ', ' + d.country)}" class="dest-card-btn">Book Now →</a>
        </div>
      </div>
    </div>`;
}

function renderDestGrid(containerId, filter = 'all', limit = null) {
  const grid = $(containerId);
  if (!grid) return;
  let list = filter === 'all' ? DESTINATIONS : DESTINATIONS.filter(d => d.continent === filter);
  if (limit) list = list.slice(0, limit);
  grid.innerHTML = list.map(buildDestCard).join('');
  attachWishlistEvents(grid);
}

function attachWishlistEvents(ctx) {
  qsa('.dest-card-wishlist', ctx).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const id = btn.dataset.id;
      let wl = JSON.parse(localStorage.getItem('traveloraWishlist') || '[]');
      if (wl.includes(id)) {
        wl = wl.filter(x => x !== id);
        btn.classList.remove('active');
        btn.textContent = '🤍';
      } else {
        wl.push(id);
        btn.classList.add('active');
        btn.textContent = '❤️';
      }
      localStorage.setItem('traveloraWishlist', JSON.stringify(wl));
    });
  });
}

// ── FILTER TABS ──────────────────────────────────────────────
function initFilterTabs(tabsId, gridId, limit = null) {
  const tabs = $(tabsId);
  if (!tabs) return;
  renderDestGrid(gridId, 'all', limit);
  qsa('.filter-tab', tabs).forEach(tab => {
    tab.addEventListener('click', () => {
      qsa('.filter-tab', tabs).forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderDestGrid(gridId, tab.dataset.filter, limit);
    });
  });
}

// ── HERO SEARCH FORM ─────────────────────────────────────────
function initHeroSearch() {
  const form = $('heroSearchForm');
  if (!form) return;

  // Search tabs (cosmetic)
  qsa('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      qsa('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dest = $('heroDestInput')?.value;
    const ci = $('heroCheckIn')?.value;
    if (dest) {
      window.location.href = `booking.html?dest=${encodeURIComponent(dest)}${ci ? '&start=' + ci : ''}`;
    } else {
      window.location.href = 'destinations.html';
    }
  });
}

// ── BOOKING FORM ──────────────────────────────────────────────
function initBookingForm() {
  const form = $('bookingForm');
  if (!form) return;

  const destEl = $('destination');
  const startEl = $('startDate');
  const endEl = $('endDate');
  const travelersEl = $('travelers');
  const classEl = $('travelClass');
  const basePriceEl = $('basePrice');
  const totalEl = $('totalCost');

  // Summary panel refs
  const summaryDest = $('summaryDest');
  const summarySt = $('summarySt');
  const summaryEd = $('summaryEd');
  const summaryDays = $('summaryDays');
  const summaryTravelers = $('summaryTravelers');
  const summaryClass = $('summaryClass');
  const summaryRate = $('summaryRate');
  const summaryTotal = $('summaryTotal');
  const summaryImg = $('summaryImg');
  const costBreakdown = $('costBreakdown');

  // Pre-fill from URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('dest') && destEl) {
    const opt = Array.from(destEl.options).find(o => o.value === params.get('dest'));
    if (opt) { destEl.value = params.get('dest'); }
  }
  if (params.get('start') && startEl) startEl.value = params.get('start');

  // Set today min
  const today = new Date().toISOString().split('T')[0];
  if (startEl) startEl.min = today;
  if (endEl) endEl.min = today;

  function getClassMultiplier() {
    const val = classEl?.value || 'economy';
    return val === 'first' ? 1.8 : val === 'business' ? 1.4 : 1;
  }

  function updateTotal() {
    const base = parseFloat(basePriceEl?.value) || 0;
    const travelers = parseInt(travelersEl?.value) || 1;
    const days = calcDays(startEl?.value, endEl?.value);
    const mult = getClassMultiplier();
    const total = base * travelers * Math.max(days, 1) * mult;

    if (totalEl) totalEl.textContent = formatCurrency(total);
    if (summaryTotal) summaryTotal.textContent = formatCurrency(total);
    if (costBreakdown && base > 0) {
      costBreakdown.textContent = `$${base}/day × ${travelers} traveler${travelers > 1 ? 's' : ''} × ${Math.max(days, 1)} day${days !== 1 ? 's' : ''}${mult > 1 ? ` × ${mult}x class` : ''}`;
    }
    if (summaryDays) summaryDays.textContent = days > 0 ? `${days} day${days !== 1 ? 's' : ''}` : '—';
    if (summaryRate) summaryRate.textContent = base > 0 ? `$${base}/day` : '—';
    if (summaryTravelers) summaryTravelers.textContent = travelers;
  }

  function updateDestSummary() {
    if (!destEl) return;
    const opt = destEl.options[destEl.selectedIndex];
    if (opt && opt.dataset.price) {
      if (basePriceEl) basePriceEl.value = opt.dataset.price;
      if (summaryDest) summaryDest.textContent = opt.value || '—';
      if (summaryImg && opt.dataset.img) summaryImg.src = opt.dataset.img;
    } else {
      if (basePriceEl) basePriceEl.value = '';
      if (summaryDest) summaryDest.textContent = '—';
    }
    updateTotal();
  }

  function fixEndDate() {
    if (!startEl?.value || !endEl) return;
    const s = new Date(startEl.value);
    const e = new Date(endEl.value);
    if (isNaN(e) || e <= s) {
      const next = new Date(s);
      next.setDate(s.getDate() + 1);
      endEl.value = next.toISOString().split('T')[0];
    }
    endEl.min = startEl.value;
    if (summarySt) summarySt.textContent = formatDate(startEl.value);
    if (summaryEd) summaryEd.textContent = formatDate(endEl.value);
  }

  // Trigger class update on summary
  if (classEl) {
    classEl.addEventListener('change', () => {
      if (summaryClass) {
        const labels = { economy: 'Economy', business: 'Business Class', first: 'First Class' };
        summaryClass.textContent = labels[classEl.value] || classEl.value;
      }
      updateTotal();
    });
  }

  destEl?.addEventListener('change', updateDestSummary);
  startEl?.addEventListener('change', () => { fixEndDate(); updateTotal(); });
  endEl?.addEventListener('change', () => { fixEndDate(); updateTotal(); });
  travelersEl?.addEventListener('change', updateTotal);

  // Initial render
  updateDestSummary();
  fixEndDate();
  updateTotal();

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const agreeEl = $('agreeTerms');
    if (agreeEl && !agreeEl.checked) { showToast('Please agree to the Terms of Service.', 'error'); return; }

    const nameEl = $('fullName');
    const emailEl = $('email');
    const phoneEl = $('phone');

    if (!nameEl?.value.trim() || !emailEl?.value.trim() || !phoneEl?.value.trim()) {
      showToast('Please fill in all required fields.', 'error'); return;
    }
    if (!/^\S+@\S+\.\S+$/.test(emailEl.value.trim())) {
      showToast('Please enter a valid email address.', 'error'); return;
    }
    if (!destEl?.value) { showToast('Please select a destination.', 'error'); return; }
    if (!startEl?.value || !endEl?.value) { showToast('Please select travel dates.', 'error'); return; }
    const days = calcDays(startEl.value, endEl.value);
    if (days <= 0) { showToast('Return date must be after departure.', 'error'); return; }

    const base = parseFloat(basePriceEl?.value) || 0;
    const travelers = parseInt(travelersEl?.value) || 1;
    const mult = getClassMultiplier();
    const total = base * travelers * days * mult;

    const booking = {
      id: Date.now(),
      fullName: nameEl.value.trim(),
      email: emailEl.value.trim(),
      phone: phoneEl.value.trim(),
      destination: destEl.value,
      destImg: destEl.options[destEl.selectedIndex]?.dataset.img || '',
      travelers,
      startDate: startEl.value,
      endDate: endEl.value,
      days,
      basePrice: base,
      travelClass: classEl?.value || 'economy',
      totalCost: total,
      status: 'upcoming',
      bookedAt: new Date().toISOString(),
      notes: $('notes')?.value || ''
    };

    const bookings = getBookings();
    bookings.push(booking);
    setBookings(bookings);
    localStorage.setItem('traveloraLatest', JSON.stringify(booking));
    window.location.href = 'confirmation.html';
  });
}

// ── CONFIRMATION PAGE ─────────────────────────────────────────
function initConfirmation() {
  const confDest = $('confDestination');
  if (!confDest) return;

  const booking = JSON.parse(localStorage.getItem('traveloraLatest') || 'null');
  if (!booking) {
    $('confMessage') && ($('confMessage').textContent = 'No booking data found.');
    return;
  }

  const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  setText('confDestination', booking.destination);
  setText('confDates', `${formatDate(booking.startDate)} → ${formatDate(booking.endDate)}`);
  setText('confDays', `${booking.days} day${booking.days !== 1 ? 's' : ''}`);
  setText('confTravelers', `${booking.travelers} traveler${booking.travelers !== 1 ? 's' : ''}`);
  setText('confClass', ({ economy: 'Economy', business: 'Business Class', first: 'First Class' }[booking.travelClass] || 'Economy'));
  setText('confCost', formatCurrency(booking.totalCost));
  setText('confId', `#${booking.id}`);
  setText('confMessage', `Your trip has been reserved, ${booking.fullName}! A confirmation will be sent to ${booking.email}.`);

  const dlBtn = $('downloadReceipt');
  if (dlBtn) {
    dlBtn.addEventListener('click', () => generatePDF(booking));
  }
}

// ── MY BOOKINGS ───────────────────────────────────────────────
function initMyBookings() {
  const list = $('bookings-list');
  if (!list) return;

  const clearBtn = $('clearAllBtn');

  function renderStats(bookings) {
    const total = bookings.reduce((s, b) => s + (b.totalCost || 0), 0);
    const unique = new Set(bookings.map(b => b.destination)).size;
    const st = (id, v) => { const e = $(id); if (e) e.textContent = v; };
    st('statTotalTrips', bookings.length);
    st('statTotalSpent', formatCurrency(total));
    st('statDestinations', unique);
    if (clearBtn) clearBtn.style.display = bookings.length ? 'flex' : 'none';
  }

  function render() {
    const bookings = getBookings();
    renderStats(bookings);

    if (!bookings.length) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🗺️</div>
          <h3>No bookings yet</h3>
          <p>Ready to start your adventure? Book your first trip with Travelora!</p>
          <a href="booking.html" class="btn-primary-custom">✈ Book a Trip</a>
        </div>`;
      return;
    }

    list.innerHTML = bookings.map((b, i) => {
      const statusClass = b.status === 'completed' ? 'status-completed' : b.status === 'cancelled' ? 'status-cancelled' : 'status-upcoming';
      const statusLabel = b.status === 'completed' ? '✅ Completed' : b.status === 'cancelled' ? '❌ Cancelled' : '⏳ Upcoming';
      const classLabel = { economy: 'Economy', business: 'Business', first: 'First Class' }[b.travelClass] || 'Economy';
      return `
        <div class="booking-card reveal">
          <img class="booking-card-img" src="${b.destImg || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80'}" alt="${escHtml(b.destination)}" />
          <div>
            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 10px;">
              <h3 class="booking-card-title" style="margin: 0;">${escHtml(b.destination)}</h3>
              <span class="status-badge ${statusClass}">${statusLabel}</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 8px; margin-bottom: 14px;">
              <div style="font-size: 0.82rem; color: var(--white-70);">📅 <strong style="color: var(--white);">${formatDate(b.startDate)}</strong></div>
              <div style="font-size: 0.82rem; color: var(--white-70);">📅 <strong style="color: var(--white);">${formatDate(b.endDate)}</strong></div>
              <div style="font-size: 0.82rem; color: var(--white-70);">👥 <strong style="color: var(--white);">${b.travelers} traveler${b.travelers !== 1 ? 's' : ''}</strong></div>
              <div style="font-size: 0.82rem; color: var(--white-70);">🎫 <strong style="color: var(--white);">${classLabel}</strong></div>
              <div style="font-size: 0.82rem; color: var(--white-70);">🕐 <strong style="color: var(--white);">${b.days} day${b.days !== 1 ? 's' : ''}</strong></div>
            </div>
            <div style="font-family: var(--font-head); font-size: 1.3rem; font-weight: 900; color: var(--teal);">${formatCurrency(b.totalCost)}</div>
          </div>
          <div class="booking-actions">
            <button class="btn-primary-custom" style="padding: 10px 18px; font-size: 0.82rem;" data-dl="${i}">📄 Receipt</button>
            <button class="btn-secondary-custom" style="padding: 9px 18px; font-size: 0.82rem; border-color: rgba(255,107,107,0.4); color: #ff6b6b;" data-del="${i}">🗑 Remove</button>
          </div>
        </div>`;
    }).join('');

    // Attach events
    qsa('[data-dl]', list).forEach(btn => {
      btn.addEventListener('click', () => {
        const b = getBookings()[parseInt(btn.dataset.dl)];
        if (b) generatePDF(b);
      });
    });

    qsa('[data-del]', list).forEach(btn => {
      btn.addEventListener('click', () => {
        const bookings = getBookings();
        bookings.splice(parseInt(btn.dataset.del), 1);
        setBookings(bookings);
        render();
      });
    });

    initReveal();
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Delete ALL bookings? This cannot be undone.')) {
        setBookings([]);
        render();
      }
    });
  }

  render();
}

// ── DASHBOARD ─────────────────────────────────────────────────
function initDashboard() {
  const dashEl = $('dashUserName');
  if (!dashEl) return;

  const user = getLoggedIn();
  if (user) dashEl.textContent = user.name.split(' ')[0];

  const bookings = getBookings();
  const total = bookings.reduce((s, b) => s + (b.totalCost || 0), 0);
  const unique = new Set(bookings.map(b => b.destination)).size;
  const st = (id, v) => { const e = $(id); if (e) e.textContent = v; };
  st('dashTotalTrips', bookings.length);
  st('dashTotalSpent', formatCurrency(total));
  st('dashDestinations', unique);

  const recEl = $('dashRecentBookings');
  if (!recEl) return;

  const recent = [...bookings].reverse().slice(0, 3);
  if (!recent.length) return; // empty state already in HTML

  recEl.innerHTML = recent.map((b) => `
    <div class="booking-card" style="margin-bottom: 16px;">
      <img class="booking-card-img" src="${b.destImg || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&q=80'}" alt="${escHtml(b.destination)}" />
      <div>
        <h3 style="font-family: var(--font-head); font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">${escHtml(b.destination)}</h3>
        <p style="color: var(--white-70); font-size: 0.85rem; margin-bottom: 4px;">📅 ${formatDate(b.startDate)} → ${formatDate(b.endDate)}</p>
        <p style="color: var(--white-70); font-size: 0.85rem;">👥 ${b.travelers} traveler${b.travelers !== 1 ? 's' : ''}</p>
      </div>
      <div style="text-align: right;">
        <div style="font-family: var(--font-head); font-size: 1.2rem; font-weight: 800; color: var(--teal);">${formatCurrency(b.totalCost)}</div>
        <span class="status-badge status-upcoming" style="margin-top: 8px; display: inline-flex;">⏳ Upcoming</span>
      </div>
    </div>`).join('');
}

// ── AUTH ──────────────────────────────────────────────────────
function initLogin() {
  const form = $('loginForm');
  if (!form) return;

  // Toggle password
  const toggleBtn = $('toggleLoginPwd');
  const pwdInput = $('loginPassword');
  if (toggleBtn && pwdInput) {
    toggleBtn.addEventListener('click', () => {
      pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
      toggleBtn.textContent = pwdInput.type === 'password' ? '👁' : '🙈';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('loginEmail')?.value.trim();
    const password = $('loginPassword')?.value;
    const errEl = $('loginError');

    const users = JSON.parse(localStorage.getItem('traveloraUsers') || '[]');
    const match = users.find(u => u.email === email && u.password === password);

    if (!match) {
      if (errEl) errEl.style.display = 'block';
      return;
    }

    setLoggedIn(match);
    window.location.href = 'dashboard.html';
  });
}

function initSignup() {
  const form = $('signupForm');
  if (!form) return;

  const toggleBtn = $('toggleSignupPwd');
  const pwdInput = $('signupPassword');
  if (toggleBtn && pwdInput) {
    toggleBtn.addEventListener('click', () => {
      pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
      toggleBtn.textContent = pwdInput.type === 'password' ? '👁' : '🙈';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errEl = $('signupError');
    const name = $('signupName')?.value.trim();
    const email = $('signupEmail')?.value.trim();
    const password = $('signupPassword')?.value;
    const confirm = $('signupConfirm')?.value;
    const agree = $('agreeSignup')?.checked;

    const showErr = (msg) => { if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; } };

    if (!name || !email || !password) return showErr('Please fill in all required fields.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return showErr('Please enter a valid email address.');
    if (password.length < 8) return showErr('Password must be at least 8 characters.');
    if (password !== confirm) return showErr('Passwords do not match.');
    if (!agree) return showErr('You must agree to the Terms of Service.');

    const users = JSON.parse(localStorage.getItem('traveloraUsers') || '[]');
    if (users.find(u => u.email === email)) return showErr('An account with this email already exists.');

    const newUser = { name, email, password, phone: '', joinedAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('traveloraUsers', JSON.stringify(users));
    setLoggedIn(newUser);
    window.location.href = 'dashboard.html';
  });
}

// ── PROFILE ──────────────────────────────────────────────────
function initProfile() {
  if (!$('profileAvatar')) return;

  const user = getLoggedIn();
  if (!user) { window.location.href = 'login.html'; return; }

  // Display
  const set = (id, v) => { const e = $(id); if (e) e.textContent = v; };
  const avEl = $('profileAvatar');
  if (avEl) avEl.textContent = buildInitials(user.name);
  set('profileDisplayName', user.name);
  set('profileDisplayEmail', user.email);
  set('profileName', user.name);
  set('profileEmail', user.email);
  set('profileJoined', formatDate(user.joinedAt) || 'Member');

  // Pre-fill form
  const editName = $('editName');
  const editEmail = $('editEmail');
  const editPhone = $('editPhone');
  if (editName) editName.value = user.name;
  if (editEmail) editEmail.value = user.email;
  if (editPhone) editPhone.value = user.phone || '';

  // Edit form
  const profileForm = $('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = { ...user, name: editName.value.trim(), email: editEmail.value.trim(), phone: editPhone.value.trim() };
      // Update in users array
      const users = JSON.parse(localStorage.getItem('traveloraUsers') || '[]');
      const idx = users.findIndex(u => u.email === user.email);
      if (idx !== -1) users[idx] = updated;
      localStorage.setItem('traveloraUsers', JSON.stringify(users));
      setLoggedIn(updated);
      set('profileDisplayName', updated.name);
      set('profileDisplayEmail', updated.email);
      set('profileName', updated.name);
      set('profileEmail', updated.email);
      if (avEl) avEl.textContent = buildInitials(updated.name);
      const succ = $('profileUpdateSuccess');
      if (succ) { succ.style.display = 'block'; setTimeout(() => succ.style.display = 'none', 3000); }
    });
  }

  // Password form
  const pwdForm = $('passwordForm');
  if (pwdForm) {
    pwdForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cur = $('currentPwd')?.value;
      const nw = $('newPwd')?.value;
      const conf = $('confirmPwd')?.value;
      const pwdErr = $('pwdError');
      const showPwdErr = (m) => { if (pwdErr) { pwdErr.textContent = m; pwdErr.style.display = 'block'; } };
      if (cur !== user.password) return showPwdErr('⚠️ Current password is incorrect.');
      if (nw.length < 8) return showPwdErr('⚠️ New password must be at least 8 characters.');
      if (nw !== conf) return showPwdErr('⚠️ Passwords do not match.');
      if (pwdErr) pwdErr.style.display = 'none';
      const lu = getLoggedIn();
      const updated = { ...lu, password: nw };
      const users = JSON.parse(localStorage.getItem('traveloraUsers') || '[]');
      const idx = users.findIndex(u => u.email === lu.email);
      if (idx !== -1) users[idx] = updated;
      localStorage.setItem('traveloraUsers', JSON.stringify(users));
      setLoggedIn(updated);
      showToast('Password updated successfully!', 'success');
      pwdForm.reset();
    });
  }

  // Logout
  const profileLogoutBtn = $('profileLogoutBtn');
  if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener('click', () => { clearLoggedIn(); window.location.href = 'login.html'; });
  }
}

// ── CONTACT FORM ─────────────────────────────────────────────
function initContact() {
  const form = $('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const succ = $('contactSuccess');
    if (succ) { succ.style.display = 'block'; form.reset(); }
  });
}

// ── NEWSLETTER ────────────────────────────────────────────────
function initNewsletter() {
  const btn = $('newsletterBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const email = $('newsletterEmail')?.value.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { showToast('Please enter a valid email!', 'error'); return; }
    showToast('🎉 You\'re subscribed! Welcome to Travelora.', 'success');
    if ($('newsletterEmail')) $('newsletterEmail').value = '';
  });
}

// ── PDF RECEIPT ───────────────────────────────────────────────
function generatePDF(b) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFillColor(10, 15, 30);
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(14, 207, 207);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('TRAVELORA', 20, 22);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Official Booking Receipt', 20, 32);
    doc.text(`Receipt #${b.id}`, 140, 22);
    doc.text(new Date().toLocaleDateString(), 140, 32);

    // Body
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Booking Details', 20, 60);

    doc.setDrawColor(14, 207, 207);
    doc.setLineWidth(0.5);
    doc.line(20, 63, 190, 63);

    const rows = [
      ['Passenger Name', b.fullName],
      ['Email', b.email],
      ['Phone', b.phone],
      ['Destination', b.destination],
      ['Departure Date', formatDate(b.startDate)],
      ['Return Date', formatDate(b.endDate)],
      ['Duration', `${b.days} day${b.days !== 1 ? 's' : ''}`],
      ['No. of Travelers', String(b.travelers)],
      ['Travel Class', ({ economy:'Economy', business:'Business Class', first:'First Class' }[b.travelClass] || 'Economy')],
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    let y = 74;
    rows.forEach(([label, value], i) => {
      if (i % 2 === 0) doc.setFillColor(248, 248, 252);
      else doc.setFillColor(255, 255, 255);
      doc.rect(20, y - 5, 170, 9, 'F');
      doc.setTextColor(100, 100, 100);
      doc.text(label + ':', 25, y);
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.text(String(value || '—'), 100, y);
      doc.setFont('helvetica', 'normal');
      y += 11;
    });

    // Total
    y += 6;
    doc.setFillColor(14, 207, 207);
    doc.rect(20, y - 5, 170, 14, 'F');
    doc.setTextColor(10, 15, 30);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL AMOUNT PAID', 25, y + 4);
    doc.text(formatCurrency(b.totalCost), 140, y + 4);

    // Footer
    y += 30;
    doc.setTextColor(130, 130, 130);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for choosing Travelora! Safe travels.', 20, y);
    doc.text('support@travelora.com | +1 (800) 123-4567 | travelora.com', 20, y + 7);

    doc.save(`Travelora_Receipt_${b.id}.pdf`);
  } catch (err) {
    alert('PDF library not loaded. Please ensure jspdf.umd.min.js is present.');
  }
}

// ── TOAST NOTIFICATION ────────────────────────────────────────
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.travelora-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'travelora-toast';
  toast.style.cssText = `
    position: fixed; bottom: 28px; right: 28px; z-index: 9999;
    background: ${type === 'error' ? 'rgba(255,107,107,0.12)' : 'rgba(14,207,207,0.12)'};
    border: 1px solid ${type === 'error' ? 'rgba(255,107,107,0.4)' : 'rgba(14,207,207,0.4)'};
    color: ${type === 'error' ? '#ff6b6b' : '#0ecfcf'};
    backdrop-filter: blur(20px); border-radius: 12px;
    padding: 14px 22px; font-family: var(--font-body); font-size: 0.9rem; font-weight: 500;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4); animation: slideInToast 0.3s ease;
  `;
  toast.textContent = msg;

  const style = document.createElement('style');
  style.textContent = '@keyframes slideInToast { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ── INIT ALL ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initHeroSearch();
  initFilterTabs('destFilterTabs', 'featuredDestGrid', 6);
  initFilterTabs('destFilterTabs', 'allDestGrid');
  initBookingForm();
  initConfirmation();
  initMyBookings();
  initDashboard();
  initLogin();
  initSignup();
  initProfile();
  initContact();
  initNewsletter();
});
