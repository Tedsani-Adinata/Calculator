<p align="center">
  <img src="assets/banner.svg" alt="Paywall Calculator" width="100%">
</p>

Kalkulator web dari HTML, CSS, dan JavaScript murni dengan paywall tiruan. Menekan `=` memunculkan pilihan paket sampai Anda berlangganan. Paket Basic membuka tambah (+) dan kurang (-), paket Premium membuka semua operasi termasuk kali (×) dan bagi (÷). Pilihan paket hanya disimpan di `localStorage`, tidak ada pembayaran sungguhan.

<p align="center">
  <img src="assets/preview.png" alt="Kalkulator dan tampilan paywall" width="85%">
</p>

## Fitur

- Dukungan keyboard penuh: angka, `+ - * x /`, `Enter`, `Backspace`, `Esc`
- Paywall tiruan dengan dua paket: Basic (Rp 5.000) dan Premium (Rp 10.000)
- Status langganan tersimpan di `localStorage` (kunci `calc_tier`)
- Tanpa framework, dependensi, maupun build step

## Menjalankan

```bash
git clone https://github.com/Tedsani-Adinata/Calculator.git
```

Buka `index.html` di browser. Selesai.

Untuk mengunci ulang fitur premium, jalankan di console browser:

```js
localStorage.removeItem('calc_tier');
```

## Struktur

```
assets/   banner, preview, dan screenshot asli
css/      style.css
js/       script.js (logika kalkulator dan paywall)
index.html
```


