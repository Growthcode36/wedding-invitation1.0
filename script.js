// AMBIL NAMA TAMU
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  let guest = params.get("to");

  if (!guest) return "Tamu Undangan";

  return decodeURIComponent(guest);
}

document.getElementById("guestName").innerText = getGuestName();

// OPEN BUTTON
document.getElementById("openBtn").onclick = () => {
  alert("Next: masuk ke halaman utama (bisa lanjut kamu sambungkan)");
};
