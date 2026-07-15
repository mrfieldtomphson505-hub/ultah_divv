// ============================
// Audio per halaman
// ============================

const daftarAudio = {
    "index.html": "amplop.mp3",
    "ucapan-ultah.html": "ultah.mp3",
    "kenangan.html": "ultah.mp3"
};

// Ambil nama file yang sedang dibuka
const halaman = window.location.pathname.split("/").pop();

// Cari lagu yang sesuai
const lagu = daftarAudio[halaman];

if (lagu) {
    const audio = new Audio(lagu);
    audio.loop = true;
    audio.volume = 0.5;

    // ==== lanjutin posisi lagu kalau halaman sebelumnya pakai file yang sama ====
    const laguTersimpan = sessionStorage.getItem("laguAktif");
    const waktuTersimpan = parseFloat(sessionStorage.getItem("laguWaktu") || "0");

    if (laguTersimpan === lagu && waktuTersimpan > 0) {
        audio.currentTime = waktuTersimpan;
    }

    function playAudio() {
        audio.play().catch(() => {});
    }
     playAudio();

    // Browser butuh interaksi user dulu (klik, sentuh, ATAU mulai drag)
    document.addEventListener("click", playAudio, { once: true });
    document.addEventListener("touchstart", playAudio, { once: true });
    document.addEventListener("pointerdown", playAudio, { once: true });
    document.addEventListener("mousedown", playAudio, { once: true });

    // ==== simpan posisi lagu terus-terusan, biar bisa dilanjutin di halaman berikutnya ====
    setInterval(function () {
        sessionStorage.setItem("laguAktif", lagu);
        sessionStorage.setItem("laguWaktu", audio.currentTime);
    }, 500);

    window.addEventListener("pagehide", function () {
        sessionStorage.setItem("laguAktif", lagu);
        sessionStorage.setItem("laguWaktu", audio.currentTime);
    });
}