# PROGETTO-SETTIMANA-5

Progetto settimanale 5

---

# Bloom — Studio di design

Landing page per uno studio creativo fittizio, realizzata come progetto settimanale.

## Stack

- HTML5 semantico
- CSS3 mobile-first (nessun framework)
- JavaScript vanilla (scroll handler, generazione dinamica card lavori, modale preventivo, validazione form custom)
- Font: [Roboto](https://fonts.google.com/specimen/Roboto) via Google Fonts
- Icone: [Font Awesome 6](https://fontawesome.com/)

## Struttura

```
PROGETTO-SETTIMANA-5/
├── index.html
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Sezioni

| Sezione | Descrizione                                                                                                                                                                                   |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header  | Logo + `.header-right` (nav + bottone tema) sticky — mobile: logo riga 1, nav+tema riga 2 — da 768px tutto in fila — diventa scuro dopo 100px di scroll                                      |
| Hero    | Titolo, sottotitolo e bottone con animazione `fadeInUp` — altezza minima 70vh                                                                                                                 |
| Servizi | Tre card responsive (1 col → 2 col → 3 col) — entrata scaglionata con `fadeInUp` e `animation-delay` via `:first-child`, `:nth-child(2)`, `:last-child`                                       |
| Lavori  | Card generate da JS tramite `<template>` + `cloneNode` — per aggiungere un progetto basta un oggetto nell'array `progetti` in `script.js` (mobile-first 1 col → 768px 2x2 → 992px V4 in fila) |
| Team    | 3 membri in HTML statico, avatar circolare — roll-in da sinistra triggerato dallo scroll con `getBoundingClientRect()`, scaglionato per indice — si resetta e ripete ad ogni rientro nel viewport — da 768px tre in fila |
| Footer  | Mobile: colonna centrata — da 768px: logo+tagline a sx, social al centro, copyright a dx — click sul logo riporta in cima con scroll animato                                                                             |
| Modale  | Generata interamente da JS tramite utility `make()` — overlay `fadeIn` + card `slideUp` — form con 4 campi e validazione custom inline (senza `required` né `alert`) — conferma invio — chiude con X, click overlay o Escape |

## Layout

Tutto in **flexbox**, niente grid né margin per la spaziatura (solo `gap`).

Breakpoint:

- `768px` — header in riga (logo sx, nav+tema dx raggruppati in `.header-right`), card servizi 2+1, card lavori 2x2, team tre in fila, footer in riga a tre blocchi
- `992px` — card servizi tre in fila, card lavori quattro in fila, header `space-around`

## Avvio

Apri `index.html` direttamente nel browser oppure usa un server locale (es. Live Server in VS Code).
