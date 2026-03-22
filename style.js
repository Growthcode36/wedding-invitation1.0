document.addEventListener("DOMContentLoaded", () => {

  // NAMA TAMU
  function getGuest(){
    const params=new URLSearchParams(window.location.search);
    let g=params.get("to");
    return g?decodeURIComponent(g):"Tamu Undangan";
  }
  document.getElementById("guestName").innerText=getGuest();

  const openBtn=document.getElementById("openBtn");
  const cover=document.getElementById("cover");
  const main=document.getElementById("mainContent");
  const music=document.getElementById("music");

  openBtn.onclick=()=>{
    cover.style.display="none";
    main.style.display="block";
    music.play().catch(()=>{});
    autoScroll();
  };

  // AUTO SCROLL
  function autoScroll(){
    function scroll(){
      window.scrollBy(0,0.5);
      if(window.innerHeight+window.scrollY<document.body.offsetHeight){
        requestAnimationFrame(scroll);
      }
    }
    scroll();
  }

  // COUNTDOWN
  const target=new Date("May 2, 2026 19:30:00").getTime();
  setInterval(()=>{
    const now=new Date().getTime();
    const gap=target-now;
    const d=Math.floor(gap/(1000*60*60*24));
    const h=Math.floor((gap%(1000*60*60*24))/(1000*60*60));
    const m=Math.floor((gap%(1000*60*60))/(1000*60));
    const s=Math.floor((gap%(1000*60))/1000);
    document.getElementById("timer").innerText=`${d}H ${h}J ${m}M ${s}D`;
  },1000);

  // WA
  document.getElementById("waBtn").onclick=()=>{
    window.open(`https://wa.me/6281234567890?text=Halo saya ${getGuest()} akan hadir`);
  };

});

// REKENING
function copyRek(){
  navigator.clipboard.writeText(document.getElementById("rek").innerText);
  alert("Disalin");
}

// UCAPAN
function kirimUcapan(){
  let nama=document.getElementById("nama").value;
  let pesan=document.getElementById("pesan").value;

  let data=JSON.parse(localStorage.getItem("ucapan"))||[];
  data.push({nama,pesan});
  localStorage.setItem("ucapan",JSON.stringify(data));
  tampilUcapan();
}

function tampilUcapan(){
  let data=JSON.parse(localStorage.getItem("ucapan"))||[];
  let el=document.getElementById("listUcapan");
  el.innerHTML="";
  data.forEach(d=>{
    el.innerHTML+=`<p><b>${d.nama}</b><br>${d.pesan}</p>`;
  });
}

tampilUcapan();

// REVEAL
window.addEventListener("scroll",()=>{
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-100){
      el.classList.add("active");
    }
  });
});
