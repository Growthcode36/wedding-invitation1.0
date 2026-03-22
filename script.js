// NAMA TAMU
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");
if (guest) document.getElementById("guestName").innerText = guest;

// OPEN
const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const main = document.getElementById("mainContent");
const music = document.getElementById("music");

main.style.display = "none";

openBtn.onclick = () => {
  cover.style.display = "none";
  main.style.display = "block";
  music.play();
};

// COUNTDOWN
const target = new Date("May 2, 2026 19:30:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = target - now;

  const d = Math.floor(gap/(1000*60*60*24));
  const h = Math.floor((gap%(1000*60*60*24))/(1000*60*60));
  const m = Math.floor((gap%(1000*60*60))/(1000*60));
  const s = Math.floor((gap%(1000*60))/1000);

  document.getElementById("timer").innerText =
    `${d} Hari ${h} Jam ${m} Menit ${s} Detik`;
}, 1000);

// WA
document.getElementById("waBtn").onclick = () => {
  const nama = guest || "Tamu";
  const text = `Halo, saya ${nama} akan hadir di pernikahan Subyan & Desmawati`;
  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`);
};

// COPY REKENING
function copyRek() {
  const rek = document.getElementById("rek").innerText;
  navigator.clipboard.writeText(rek);
  alert("Nomor rekening disalin!");
}

// KOMENTAR (LOCAL STORAGE)
function kirimUcapan() {
  const nama = document.getElementById("nama").value;
  const pesan = document.getElementById("pesan").value;

  let data = JSON.parse(localStorage.getItem("ucapan")) || [];
  data.push({nama, pesan});

  localStorage.setItem("ucapan", JSON.stringify(data));
  tampilUcapan();
}

// TAMPILKAN
function tampilUcapan() {
  let data = JSON.parse(localStorage.getItem("ucapan")) || [];
  const container = document.getElementById("listUcapan");

  container.innerHTML = "";

  data.forEach(d => {
    container.innerHTML += `<p><b>${d.nama}</b><br>${d.pesan}</p>`;
  });
}

tampilUcapan();

// SCROLL REVEAL
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});
