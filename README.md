# PROGETTO-SETTIMANA-5

Progetto settimanale 5

---

# Bloom — Studio di design

Landing page per uno studio creativo fittizio, realizzata come progetto settimanale.

## Stack

- HTML5 semantico
- CSS3 mobile-first (nessun framework)
- JavaScript vanilla (scroll handler)
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

| Sezione | Descrizione                                                                                                                                   |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Header  | Logo + nav sticky, diventa scuro dopo 100px di scroll                                                                                         |
| Hero    | Titolo, sottotitolo e bottone con animazione `fadeInUp`                                                                                       |
| Servizi | Tre card responsive (1 col → 2 col → 3 col)                                                                                                   |
| Footer  | Mobile: colonna centrata — da 768px: logo+tagline a sx, social al centro, copyright a dx — click sul logo riporta in cima con scroll animato |

## Layout

Tutto in **flexbox**, niente grid né margin per la spaziatura (solo `gap`).

Breakpoint:

- `768px` — header in riga, card 2+1, footer in riga a tre blocchi
- `992px` — card tre in fila, header `space-around`

## Avvio

Apri `index.html` direttamente nel browser oppure usa un server locale (es. Live Server in VS Code).
