// Bloom — Week Project Settimana V

// --- SCROLL HEADER ---

// Recupera l'header una sola volta, fuori dal listener, per non cercarlo ad ogni scroll
const header = document.getElementById("site-header");

// Ascolta lo scroll della pagina
window.addEventListener("scroll", () => {
  // Oltre 100px aggiunge "scrolled": il CSS scurisce l'header
  // Sotto i 100px la rimuove, tornando al colore originale
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// --- SEZIONE LAVORI ---

// <template> in index.html: struttura HTML inerte — il browser la analizza
// ma non la mostra finché JS non la clona e la inserisce nel DOM.
// Il <template> non è vuoto — contiene già tutta la struttura della card (<div>, <img>, <h3>, <span>), solo con i valori vuoti, una specie di stampo pre-formato.
// <template> è molto più sicuro di innerHTML perché textContent tratta sempre il valore come testo puro — se qualcuno passasse <script>alert()</script> come titolo, verrebbe mostrato letteralmente come testo, quindi non eseguito; cloneNode copia nodi DOM, non stringhe — non c'è nessuna fase di parsing HTML (quando il browser incontra dell'HTML — che sia un file, una stringa, qualsiasi cosa — deve trasformarlo in nodi DOM. Questo processo si chiama parsing. innerHTML attiva sempre questo processo ogni volta che si assegna una stringa, con cloneNode il discorso è diverso ancora: non si mai lavora con stringhe, si copiano nodi che esistono già nel DOM. Non c'è niente da parsare.); la struttura del template è fissa nell'HTML, non può essere alterata dall'esterno.
// Per aggiungere una card basta un nuovo oggetto nell'array qui sotto.

const progetti = [
  {
    title: "Progetto A",
    category: "Identità visiva",
    img: "https://placehold.co/600x400/1f7a4d/ffffff",
  },
  {
    title: "Progetto B",
    category: "Web design",
    img: "https://placehold.co/600x400/248f59/ffffff",
  },
  {
    title: "Progetto C",
    category: "Motion graphic",
    img: "https://placehold.co/600x400/1a5c3a/ffffff",
  },
  {
    title: "Progetto D",
    category: "Identità visiva",
    img: "https://placehold.co/600x400/c5ead8/1f7a4d",
  },
];

const template = document.getElementById("tmpl-work-card");
const worksGrid = document.querySelector(".works-grid");

progetti.forEach(({ title, category, img }) => {
  // cloneNode(true) copia il template con tutti i figli (deep clone) —
  // ogni card è indipendente, modificarla non altera le altre né il template
  const card = template.content.cloneNode(true);
  card.querySelector("img").src = img;
  card.querySelector("img").alt = title;
  card.querySelector("h3").textContent = title;
  card.querySelector("span").textContent = category;
  // append() inserisce la card nel DOM: solo ora diventa visibile
  worksGrid.append(card);
});
