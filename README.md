# Soft UI Calculator

A web-based calculator built with plain HTML, CSS, and JavaScript, styled with a soft UI look (rounded edges, subtle shadows, smooth interactions).

For fun, it also has a fake paywall: addition and subtraction work for free, but multiplication and division are locked behind a mock "premium" subscription. It's not a real payment system — just a gag feature that toggles a flag in local storage.

## Features

- Soft UI styling — rounded buttons, soft shadows, minimal color palette
- Addition and subtraction available by default
- Multiplication and division gated behind a mock subscription modal
- Subscription state persisted in local storage
- Full keyboard support (numpad, Enter, Backspace, Escape)
- No frameworks or build tools — just HTML/CSS/JS

## Project structure

```
├── css/
│   └── style.css     # Styling and animations
├── js/
│   └── script.js      # Calculator logic, paywall check, local storage
├── index.html          # Main page
└── README.md
```

## Running it locally

1. Clone or download the repo.
2. Open `index.html` in a browser.

No dependencies, no build step, no server needed.

## Stack

HTML5, CSS3 (Flexbox/Grid, custom keyframes), vanilla JavaScript (ES6+).

---

Built as a side project — feel free to fork it, remove the paywall gimmick, or take it further.
