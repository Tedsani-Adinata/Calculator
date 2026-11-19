<div align="center">

# 🧮 Paywall Calculator

**Kalkulator web sederhana dengan "paywall" palsu untuk perkalian & pembagian.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)

<img src="assets/screenshoot1.png" alt="Tampilan kalkulator" width="45%"> <img src="assets/screenshoot2.png" alt="Tampilan paywall" width="45%">

</div>

## 📖 Tentang

Dibangun hanya dengan HTML, CSS, dan JavaScript murni. Operasi **tambah (+)** dan **kurang (−)** gratis, sedangkan **kali (×)** dan **bagi (÷)** terkunci di balik "langganan premium" palsu. Ini hanya gimmick: status langganan disimpan di `localStorage` dan tidak ada pembayaran sungguhan.

## ✨ Fitur

| Fitur | Keterangan |
| --- | --- |
| ⌨️ Dukungan keyboard | Numpad, `Enter`, `Backspace`, `Esc` |
| 🔒 Paywall tiruan | Perkalian & pembagian butuh "langganan" |
| 💾 Status tersimpan | Pilihan paket disimpan di `localStorage` (`calc_tier`) |
| 📦 Tanpa dependensi | Tidak ada framework, `npm install`, atau build step |

## 🚀 Cara Menjalankan

```bash
git clone https://github.com/Tedsani-Adinata/Calculator.git
cd Calculator
```

Lalu buka `index.html` di browser. Tidak perlu server lokal.

## ⌨️ Pintasan Keyboard

| Tombol | Aksi |
| --- | --- |
| `0`–`9`, `.` / `,` | Input angka & desimal |
| `+` `-` | Tambah, kurang |
| `*` / `x` , `/` | Kali, bagi (perlu premium) |
| `Enter` / `=` | Hitung hasil |
| `Backspace` | Hapus satu digit |
| `Esc` | Bersihkan semua |

## 🗂️ Struktur Proyek

```
├── assets/
│   ├── screenshoot1.png
│   └── screenshoot2.png
├── css/
│   └── style.css      # Styling dan animasi
├── js/
│   └── script.js      # Logika kalkulator dan sistem paywall
├── index.html         # Halaman utama
└── README.md
```

## 🔓 Reset Langganan

Untuk mengunci kembali fitur premium, jalankan di console browser:

```js
localStorage.removeItem('calc_tier');
```

---

<div align="center">

*Dibuat untuk senang-senang. Silakan fork, modifikasi, atau hapus paywall-nya.* 🎉

</div>
