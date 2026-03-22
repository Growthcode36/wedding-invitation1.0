/* ============================================================
   WEDDING INVITATION — script.js
   Subyan & Desmawati · 2026
   ============================================================ */

'use strict';

/* ── CONSTANTS ── */
const WA_NUMBER   = '6282279915729'; // Ganti dengan nomor WhatsApp yang aktif
const WEDDING_DATE = new Date('2026-05-02T19:30:00+07:00'); // Akad Nikah
const WISHES_KEY   = 'wedding_wishes_subyan_desma';

/* ── DOM REFERENCES ── */
const cover        = document.getElementById('cover');
const btnOpen      = document.getElementById('btnOpen');
const mainContent  = document.getElementById('mainContent');
const musicBtn     = document.getElementById('musicBtn');
const musicIcon    = document.getElementById('musicIcon');
const bgMusic      = document.getElementById('bgMusic');

/* ============================================================
   1. GUEST NAME FROM URL
============================================================ */
(function parseGuest() {
  const params = new URLSearchParams(window.location.search);
  const name   = params.get('to');
  if (name && name.trim()) {
    const el = document.getElementById('guestName');
    if (el) el.textContent = decodeURIComponent(name.trim());
  }
})();


/* ============================================================
   2. COVER PARTICLES
============================================================ */
(function buildCoverParticles() {
  const container = document.getElementById('coverParticles');
  if (!container) return;
  const count = window.innerWidth < 480 ? 20 : 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'cp';
    p.style.cssText = `
      left:  ${Math.random() * 100}%;
      top:   ${30 + Math.random() * 60}%;
      --dur: ${5 + Math.random() * 8}s;
      --del: ${Math.random() * 8}s;
      width: ${Math.random() > 0.7 ? 3 : 2}px;
      height: ${Math.random() > 0.7 ? 3 : 2}px;
    `;
    container.appendChild(p);
  }
})();


/* ============================================================
   3. HERO PETALS
============================================================ */
(function buildHeroPetals() {
  const container = document.getElementById('heroPetals');
  if (!container) return;
  const symbols = ['✦', '✧', '·', '✿', '❋'];
  const count = window.innerWidth < 480 ? 10 : 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `
      --left: ${Math.random() * 100}%;
      --dur:  ${10 + Math.random() * 12}s;
      --del:  ${Math.random() * 14}s;
      font-size: ${10 + Math.random() * 8}px;
      opacity: ${0.2 + Math.random() * 0.4};
    `;
    container.appendChild(p);
  }
})();


/* ============================================================
   4. OPEN COVER → SHOW MAIN CONTENT
============================================================ */
btnOpen.addEventListener('click', function openCover() {
  // Prevent double-click
  btnOpen.disabled = true;

  // 1. Fade cover out
  cover.classList.add('hiding');

  // 2. Show main content SEKARANG (sebelum cover hilang)
  mainContent.classList.remove('hidden');
  // Paksa scroll ke top sebelum konten dirender
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      mainContent.classList.add('visible');
    });
  });

  // 3. Music
  playMusic();

  // 4. Setelah animasi cover selesai, hapus cover & mulai scroll
  setTimeout(() => {
    cover.style.display = 'none';
    // Pastikan di atas
    window.scrollTo(0, 0);
    // Mulai auto scroll
    setTimeout(startAutoScroll, 200);
  }, 1000);
});


/* ============================================================
   5. BACKGROUND MUSIC
============================================================ */
let musicPlaying = false;

function playMusic() {
  if (!bgMusic) return;
  bgMusic.volume = 0.4;
  const p = bgMusic.play();
  if (p !== undefined) {
    p.then(() => {
      musicPlaying = true;
      updateMusicIcon();
    }).catch(() => {
      // Autoplay blocked — user can click music btn
      musicPlaying = false;
      updateMusicIcon();
    });
  }
}

function updateMusicIcon() {
  if (!musicIcon) return;
  musicIcon.textContent = musicPlaying ? '♪' : '♩';
  musicBtn.style.borderColor = musicPlaying
    ? 'rgba(201,169,110,0.7)'
    : 'rgba(201,169,110,0.3)';
}

musicBtn.addEventListener('click', function toggleMusic() {
  if (!bgMusic) return;
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
  } else {
    bgMusic.play().then(() => { musicPlaying = true; updateMusicIcon(); }).catch(() => {});
    musicPlaying = true;
  }
  updateMusicIcon();
});

bgMusic.addEventListener('play',  () => { musicPlaying = true;  updateMusicIcon(); });
bgMusic.addEventListener('pause', () => { musicPlaying = false; updateMusicIcon(); });


/* ============================================================
   6. AUTO SCROLL
   Menggunakan setInterval agar konsisten di semua browser mobile
============================================================ */
let autoScrollInterval = null;
let autoScrollActive   = false;
let stopListenersAdded = false;

function startAutoScroll() {
  if (autoScrollActive) return;

  // Pastikan di posisi atas
  window.scrollTo(0, 0);
  autoScrollActive = true;

  // Gunakan setInterval (lebih stabil di mobile vs rAF)
  // ~2px setiap 30ms ≈ 66px/detik
  autoScrollInterval = setInterval(function() {
    if (!autoScrollActive) {
      clearInterval(autoScrollInterval);
      return;
    }
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 2) {
      clearInterval(autoScrollInterval);
      autoScrollActive = false;
      return;
    }
    window.scrollBy({ top: 3, behavior: 'instant' });
  }, 200);

  // Pasang stop listeners SETELAH 800ms
  // supaya sentuhan tombol "Buka Undangan" tidak ikut stop scroll
  setTimeout(addStopListeners, 800);
}

function stopAutoScroll() {
  if (autoScrollActive) {
    autoScrollActive = false;
    clearInterval(autoScrollInterval);
  }
}

function addStopListeners() {
  if (stopListenersAdded) return;
  stopListenersAdded = true;
  window.addEventListener('wheel',     stopAutoScroll, { passive: true });
  window.addEventListener('touchmove', stopAutoScroll, { passive: true });
  window.addEventListener('keydown', function(e) {
    const keys = ['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '];
    if (keys.includes(e.key)) stopAutoScroll();
  });
}


/* ============================================================
   7. COUNTDOWN TIMER
============================================================ */
const cdDays    = document.getElementById('cdDays');
const cdHours   = document.getElementById('cdHours');
const cdMinutes = document.getElementById('cdMinutes');
const cdSeconds = document.getElementById('cdSeconds');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const now  = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    // Wedding day or past
    if (cdDays)    cdDays.textContent    = '00';
    if (cdHours)   cdHours.textContent   = '00';
    if (cdMinutes) cdMinutes.textContent = '00';
    if (cdSeconds) cdSeconds.textContent = '00';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  function setNum(el, val) {
    if (!el) return;
    const str = pad(val);
    if (el.textContent !== str) {
      el.textContent = str;
      el.classList.remove('tick');
      void el.offsetWidth; // reflow
      el.classList.add('tick');
    }
  }

  setNum(cdDays,    days);
  setNum(cdHours,   hours);
  setNum(cdMinutes, minutes);
  setNum(cdSeconds, seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ============================================================
   8. SCROLL REVEAL (Intersection Observer)
============================================================ */
(function setupScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Unobserve after reveal to save resources
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
})();


/* ============================================================
   9. RSVP → WHATSAPP
============================================================ */
document.getElementById('btnRsvp').addEventListener('click', function sendRSVP() {
  const nameEl   = document.getElementById('rsvpName');
  const attendEl = document.getElementById('rsvpAttend');

  const name   = nameEl.value.trim();
  const attend = attendEl.value;

  if (!name) {
    nameEl.focus();
    nameEl.style.borderColor = '#e87070';
    setTimeout(() => { nameEl.style.borderColor = ''; }, 2000);
    return;
  }

  const msg = `Assalamu'alaikum 🌸

Saya *${name}* ingin mengkonfirmasi kehadiran untuk undangan pernikahan *Subyan & Desmawati* 💍

Status: *${attend}*

Semoga pernikahannya berlangsung lancar dan penuh berkah. 🤲`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');
});

// Reset input border on typing
document.getElementById('rsvpName').addEventListener('input', function() {
  this.style.borderColor = '';
});


/* ============================================================
   10. COPY REKENING
============================================================ */
window.copyRek = function copyRek(elementId, btn) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.textContent.trim();

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showCopied(btn)).catch(() => fallbackCopy(text, btn));
  } else {
    fallbackCopy(text, btn);
  }
};

function fallbackCopy(text, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); showCopied(btn); } catch(e) {}
  document.body.removeChild(ta);
}

function showCopied(btn) {
  if (!btn) return;
  const orig = btn.innerHTML;
  btn.classList.add('copied');
  btn.innerHTML = '<span>✓ Tersalin!</span>';
  setTimeout(() => {
    btn.classList.remove('copied');
    btn.innerHTML = orig;
  }, 2200);
}


/* ============================================================
   11. UCAPAN & DOA (localStorage)
============================================================ */
const wishNameEl  = document.getElementById('wishName');
const wishMsgEl   = document.getElementById('wishMsg');
const btnWish     = document.getElementById('btnWish');
const wishesList  = document.getElementById('wishesList');

// Load wishes from localStorage
function loadWishes() {
  const data = JSON.parse(localStorage.getItem(WISHES_KEY) || '[]');
  renderWishes(data);
}

function saveWish(name, msg) {
  const data = JSON.parse(localStorage.getItem(WISHES_KEY) || '[]');
  const entry = {
    name: name,
    msg:  msg,
    time: new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' })
  };
  data.unshift(entry); // Newest first
  if (data.length > 100) data.pop(); // Max 100 wishes
  localStorage.setItem(WISHES_KEY, JSON.stringify(data));
  return data;
}

function renderWishes(data) {
  if (!wishesList) return;
  if (!data.length) {
    wishesList.innerHTML = '<p class="wish-empty">Jadilah yang pertama memberikan ucapan ✨</p>';
    return;
  }
  wishesList.innerHTML = data.map(w => `
    <div class="wish-item">
      <div class="wish-header">
        <span class="wish-name">${escapeHTML(w.name)}</span>
        <span class="wish-time">${escapeHTML(w.time)}</span>
      </div>
      <p class="wish-msg">${escapeHTML(w.msg)}</p>
    </div>
  `).join('');
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

btnWish.addEventListener('click', function submitWish() {
  const name = wishNameEl.value.trim();
  const msg  = wishMsgEl.value.trim();

  if (!name) {
    wishNameEl.focus();
    wishNameEl.style.borderColor = '#e87070';
    setTimeout(() => { wishNameEl.style.borderColor = ''; }, 2000);
    return;
  }
  if (!msg) {
    wishMsgEl.focus();
    wishMsgEl.style.borderColor = '#e87070';
    setTimeout(() => { wishMsgEl.style.borderColor = ''; }, 2000);
    return;
  }

  const data = saveWish(name, msg);
  renderWishes(data);

  // Clear inputs
  wishNameEl.value = '';
  wishMsgEl.value  = '';

  // Scroll to list
  wishesList.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Button feedback
  const orig = btnWish.innerHTML;
  btnWish.textContent = '✓ Ucapan Terkirim!';
  btnWish.style.borderColor = '#25d366';
  btnWish.style.color = '#7ae89c';
  setTimeout(() => {
    btnWish.innerHTML = orig;
    btnWish.style.borderColor = '';
    btnWish.style.color = '';
  }, 2500);
});

wishNameEl.addEventListener('input', function() { this.style.borderColor = ''; });
wishMsgEl.addEventListener('input',  function() { this.style.borderColor = ''; });

// Init wishes on DOM ready
loadWishes();


/* ============================================================
   12. PREVENT DOUBLE-TAP ZOOM (hanya via CSS touch-action)
   — Tidak pakai touchend preventDefault karena bisa mengganggu
     event click & auto-scroll di HP
============================================================ */


/* ============================================================
   13. VISIBILITY CHANGE — PAUSE MUSIC WHEN TAB HIDDEN
============================================================ */
document.addEventListener('visibilitychange', function() {
  if (document.hidden && musicPlaying && bgMusic) {
    bgMusic.pause();
  } else if (!document.hidden && musicPlaying && bgMusic) {
    bgMusic.play().catch(() => {});
  }
});


/* ============================================================
   14. LAZY LOAD IFRAME MAP (performance)
============================================================ */
(function lazyMap() {
  const mapWrap = document.querySelector('.map-wrap');
  if (!mapWrap) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = mapWrap.querySelector('iframe');
        if (iframe && !iframe.src.includes('google.com/maps/embed')) {
          // Already has src, just mark loaded
        }
        observer.unobserve(mapWrap);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(mapWrap);
})();


/* ============================================================
   15. LIGHTBOX GALLERY
============================================================ */
window.openLightbox = function(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
};

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});


/* ============================================================
   LOG
============================================================ */
console.log('%c♥ Subyan & Desmawati — 02 Mei 2026 ♥', 'color:#c9a96e;font-size:16px;font-weight:bold;');
console.log('%cPremium Wedding Invitation · Semoga barakah!', 'color:#8a6f3e;font-size:12px;');
