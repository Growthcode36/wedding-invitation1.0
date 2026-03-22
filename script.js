// NAMA TAMU
function getGuest() {
  const params = new URLSearchParams(window.location.search);
  let g = params.get("to");
  return g ? decodeURIComponent(g) : "Tamu Undangan";
}

document.getElementById("guestName").innerText = getGuest();

// ELEMENT
const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const main = document.getElementById("main");
const music = document.getElementById("music");

// OPEN FIX
openBtn.onclick = () => {
  cover.style.display = "none";
  main.style.display = "block";
  music.play();
  autoScroll();
};

// AUTO SCROLL
function autoScroll(){
  function scroll(){
    window.scrollBy(0,0.5);
    if(window.innerHeight + window.scrollY < document.body.offsetHeight){
      requestAnimationFrame(scroll);
    }
  }
  scroll();
}

// WA
document.getElementById("waBtn").onclick = () => {
  const nama = getGuest();
  window.open(`https://wa.me/6281234567890?text=Halo saya ${nama} akan hadir`);
};
