document.addEventListener("DOMContentLoaded", () => {

  // NAMA TAMU
  const params = new URLSearchParams(window.location.search);
  let guest = params.get("to");

  if (!guest) guest = "Tamu Undangan";

  document.getElementById("guestName").innerText = decodeURIComponent(guest);

  // ELEMENT
  const openBtn = document.getElementById("openBtn");
  const cover = document.getElementById("cover");
  const main = document.getElementById("mainContent");
  const music = document.getElementById("music");

  // FIX BUTTON
  openBtn.addEventListener("click", () => {
    cover.style.display = "none";
    main.style.display = "block";

    // autoplay aman
    music.play().catch(() => {});
  });

});
