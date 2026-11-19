<p align="center">
  <img src="assets/banner.svg" alt="Paywall Calculator" width="100%">
</p>

A calculator built with plain HTML, CSS, and JavaScript, with a mock paywall. Pressing `=` opens a plan picker until you subscribe. Basic unlocks addition (+) and subtraction (-); Premium unlocks everything, including multiplication (×) and division (÷). The chosen plan is only stored in `localStorage`. No real payment happens.

<p align="center">
  <img src="assets/preview.png" alt="Calculator and paywall screens" width="85%">
</p>

## Features

- Full keyboard support: digits, `+ - * x /`, `Enter`, `Backspace`, `Esc`
- Mock paywall with two plans: Basic (Rp 5,000) and Premium (Rp 10,000)
- Plan persisted in `localStorage` (key `calc_tier`)
- No frameworks, dependencies, or build step

## Run

```bash
git clone https://github.com/Tedsani-Adinata/Calculator.git
```

Open `index.html` in a browser. Done.

To lock the premium features again, run this in the browser console:

```js
localStorage.removeItem('calc_tier');
```

## Structure

```
assets/   banner, preview, and original screenshots
css/      style.css
js/       script.js (calculator logic and paywall)
index.html
```
