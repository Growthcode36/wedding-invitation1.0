document.addEventListener("DOMContentLoaded", function () {

  // ===== NAMA TAMU =====
  function getGuest() {
    const params = new URLSearchParams(window.location.search);
    let g = params.get("to");
    return g ? decodeURIComponent(g) : "Tamu Undangan";
  }

  const guestEl = document.getElementById("guestName");
  if (guestEl) guestEl.innerText = getGuest();

  // ===== ELEMENT =====
  const openBtn = document.getElementById("openBtn");
  const cover = document.getElementById("cover");
  const main = document.getElementById("mainContent");
  const music = document.getElementById("music");

  // ===== BUKA UNDANGAN =====
  if (openBtn) {
    openBtn.addEventListener("click", function () {
      if (cover) cover.style.display = "none";
      if (main) main.style.display = "block";

      if (music) {
        music.play().catch(() => {});
      }

      startAutoScroll();
    });
  }

  // ===== AUTO SCROLL =====
  function startAutoScroll() {
    function scroll() {
      window.scrollBy(0, 0.5);

      if (window.innerHeight + window.scrollY < document.body.offsetHeight) {
        requestAnimationFrame(scroll);
      }
    }
    scroll();
  }

  // ===== COUNTDOWN =====
  const timerEl = document.getElementById("timer");

  if (timerEl) {
    const target = new Date("May 2, 2026 19:30:00").getTime();

    setInterval(() => {
      const now = new Date().getTime();
      const gap = target - now;

      const d = Math.floor(gap / (1000 * 60 * 60 * 24));
      const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((gap % (1000 * 60)) / 1000);

      timerEl.innerText = `${d} Hari ${h} Jam ${m} Menit ${s} Detik`;
    }, 1000);
  }

  // ===== WHATSAPP =====
  const waBtn = document.getElementById("waBtn");

  if (waBtn) {
    waBtn.onclick = () => {
      const text = `Halo, saya ${getGuest()} akan hadir di pernikahan Subyan & Desmawati`;
      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`);
    };
  }

  // ===== UCAPAN =====
  function tampilUcapan() {
    const container = document.getElementById("listUcapan");
    if (!container) return;

    let data = JSON.parse(localStorage.getItem("ucapan")) || [];

    container.innerHTML = "";
    data.forEach(d => {
      container.innerHTML += `<p><b>${d.nama}</b><br>${d.pesan}</p>`;
    });
  }

  window.kirimUcapan = function () {
    const nama = document.getElementById("nama")?.value;
    const pesan = document.getElementById("pesan")?.value;

    if (!nama || !pesan) return alert("Isi dulu ya");

    let data = JSON.parse(localStorage.getItem("ucapan")) || [];
    data.push({ nama, pesan });

    localStorage.setItem("ucapan", JSON.stringify(data));
    tampilUcapan();
  };

  tampilUcapan();

});

// ===== COPY REKENING =====
function copyRek() {
  const rek = document.getElementById("rek");
  if (!rek) return;

  navigator.clipboard.writeText(rek.innerText);
  alert("Rekening disalin");
}

// ===== SCROLL REVEAL =====
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});
