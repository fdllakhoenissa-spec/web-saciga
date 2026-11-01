const semuaLayar = document.querySelectorAll(".layar");
const wadahBunga = document.getElementById("bunga");
const wadahTitik = document.getElementById("titik");

const bunga = ["🌸", "🌷", "🌼", "💐", "🌹", "🌺"];
const hati = ["🤍", "💗", "💕", "💖", "🤗"];
const acak = (daftar) => daftar[Math.floor(Math.random() * daftar.length)];

/* =====================================================
   ISI GOMBALAN & PANTUN: tinggal tambah / ganti di sini
   (pantun ditulis per baris di dalam kurung siku)
   ===================================================== */
const koleksi = {
  gombal: [
    "Tau nggak bedanya kamu sama kopi? Kopi bikin aku melek, kalau kamu bikin aku meleleh 🥹",
    "Kamu pasti capek ya? Soalnya dari tadi lari-lari terus di pikiran aku 🏃",
    "Kamu tuh kayak wifi, tanpa kamu hidup aku nggak connect 📶",
    "Kamu kayak deadline, bikin deg-degan tapi nggak bisa aku hindarin 😆",
    "Aku nggak butuh bintang, cukup Saciga yang bikin hariku terang ✨",
  ],
  pantun: [
    [
      "Buah duku buah manggis,",
      "Dibeli ibu di pasar pagi.",
      "Saciga ku yang manis,",
      "Semangat terus setiap hari.",
    ],
    [
      "Burung camar terbang tinggi,",
      "Hinggap sebentar di dahan kayu.",
      "Kalau capek ada Lala di sini,",
      "Siap puk puk sepanjang waktu.",
    ],
    [
      "Pergi ke pasar membeli rambutan,",
      "Jangan lupa membeli sagu.",
      "Jangan lupa sarapan dan makan,",
      "Biar badan nggak lesu.",
    ],
    [
      "Jalan-jalan ke pasar baru,",
      "Beli sepatu warna merah.",
      "Tugas numpuk jangan ragu,",
      "Lala percaya, kamu nggak akan menyerah.",
    ],
  ],
};

/* ----- Pita tulisan berjalan ----- */
const teksPita = "💗 SEMANGAT SACIGA 💗 SAYANG KAMU 🌸 JANGAN LUPA MAKAN 🍚 ";
document.getElementById("pita-isi").textContent = teksPita.repeat(8);

/* ----- Emoji melayang di latar ----- */
const hiasan = ["💗", "🌸", "✨", "⭐", "🎀", "🌷", "💕", "🍓"];
const latar = document.getElementById("latar");
for (let i = 0; i < 18; i++) {
  const el = document.createElement("span");
  el.className = "melayang";
  el.textContent = acak(hiasan);
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = 18 + Math.random() * 18 + "px";
  el.style.animationDuration = 14 + Math.random() * 12 + "s";
  el.style.animationDelay = -Math.random() * 26 + "s";
  latar.appendChild(el);
}

/* ----- Titik penanda langkah (jumlahnya otomatis) ----- */
const JUMLAH_LANGKAH = Math.max(
  ...[...semuaLayar].map((layar) => Number(layar.dataset.langkah))
);
for (let i = 0; i < JUMLAH_LANGKAH; i++) {
  wadahTitik.appendChild(document.createElement("i"));
}

/* ----- Gombalan & pantun: urutannya diacak, tidak berulang dulu ----- */
const antrean = {};

function ambilAcak(nama) {
  if (!antrean[nama] || antrean[nama].length === 0) {
    antrean[nama] = koleksi[nama]
      .map((_, i) => i)
      .sort(() => Math.random() - 0.5);
  }
  return koleksi[nama][antrean[nama].pop()];
}

function isiKartu(nama) {
  const wadah = document.getElementById("isi-" + nama);
  const isi = ambilAcak(nama);
  const baris = Array.isArray(isi) ? isi : [isi];
  wadah.innerHTML = "";
  baris.forEach((teks, i) => {
    const el = document.createElement("span");
    el.textContent = teks;
    el.style.animationDelay = i * 0.5 + "s";
    wadah.appendChild(el);
  });
}

/* ----- Pindah layar ----- */
function tampil(id) {
  let langkah = 1;
  semuaLayar.forEach((layar) => {
    const aktif = layar.id === id;
    layar.classList.toggle("aktif", aktif);
    if (aktif) {
      langkah = Number(layar.dataset.langkah);
      if (layar.dataset.kartu) isiKartu(layar.dataset.kartu);
    }
  });
  wadahTitik.querySelectorAll("i").forEach((titik, i) => {
    titik.classList.toggle("on", i + 1 === langkah);
  });
  window.scrollTo(0, 0);
}

/* ----- Hujan bunga / hati ----- */
function hujan(daftar) {
  for (let i = 0; i < 60; i++) {
    const el = document.createElement("span");
    el.className = "bunga";
    el.textContent = acak(daftar);
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = 18 + Math.random() * 24 + "px";
    el.style.animationDuration = 4 + Math.random() * 3 + "s";
    el.style.animationDelay = Math.random() * 3 + "s";
    el.addEventListener("animationend", () => el.remove());
    wadahBunga.appendChild(el);
  }
}

/* ----- Hati meledak dari tombol yang ditekan ----- */
function ledakan(tombol) {
  const kotak = tombol.getBoundingClientRect();
  const x = kotak.left + kotak.width / 2;
  const y = kotak.top + kotak.height / 2;
  for (let i = 0; i < 8; i++) {
    const el = document.createElement("span");
    el.className = "hati";
    el.textContent = acak(["💗", "💕", "💖", "✨"]);
    el.style.left = x - 10 + "px";
    el.style.top = y - 10 + "px";
    el.style.setProperty("--dx", Math.random() * 160 - 80 + "px");
    el.style.animationDelay = Math.random() * 0.2 + "s";
    el.addEventListener("animationend", () => el.remove());
    document.body.appendChild(el);
  }
}

// true = dijalankan sebelum layar berpindah, supaya posisi tombol masih benar
document.addEventListener(
  "click",
  (e) => {
    const tombol = e.target.closest("button.tombol");
    if (tombol) ledakan(tombol);
  },
  true
);

/* ----- Tombol pindah layar ----- */
document.querySelectorAll("[data-ke]").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    wadahBunga.innerHTML = "";
    if (tombol.dataset.hadiah) {
      document.getElementById("hadiah-hasil").textContent = tombol.dataset.hadiah;
    }
    tampil(tombol.dataset.ke);
    if (tombol.dataset.hujan === "bunga") hujan(bunga);
    if (tombol.dataset.hujan === "hati") hujan(hati);
  });
});

/* ----- Tombol "lagi" (gombalan lagi, pantun lagi) ----- */
document.querySelectorAll("[data-lagi]").forEach((tombol) => {
  tombol.addEventListener("click", () => isiKartu(tombol.dataset.lagi));
});

/* ----- Foto Lala: kalau lala.jpg tidak ada, tampilkan pilihan dari galeri ----- */
const foto = document.getElementById("foto-lala");
const fotoKosong = document.getElementById("foto-kosong");
const pilihFoto = document.getElementById("pilih-foto");

function fotoTidakAda() {
  foto.hidden = true;
  fotoKosong.hidden = false;
}

foto.addEventListener("error", fotoTidakAda);
if (foto.complete && foto.naturalWidth === 0) fotoTidakAda();

pilihFoto.addEventListener("change", () => {
  const berkas = pilihFoto.files[0];
  if (!berkas) return;
  foto.src = URL.createObjectURL(berkas);
  foto.hidden = false;
  fotoKosong.hidden = true;
});

tampil("layar-1");