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

// --- MODALE PREVENTIVO ---

// Utility: crea un elemento, imposta attributi e appende i figli in una sola espressione.
// append() accetta sia nodi che stringhe, quindi il testo si passa direttamente come figlio.
function make(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  // Object.entries(attrs) trasforma l'oggetto in coppie [chiave, valore].
  // for...of le scorre una a una; [k, v] le destructura direttamente — più conciso di forEach
  // e supporta break/continue se in futuro servisse interrompere il ciclo.
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  el.append(...children);
  return el;
}

// Helper: gruppo label + campo (input, select o textarea)
function formGroup(labelText, field) {
  const label = document.createElement("label");
  label.setAttribute("for", field.id); // setAttribute evita il conflitto con la keyword 'for'
  label.textContent = labelText;
  const errorSpan = make("span", { class: "form-error" });
  // Rimuove l'errore non appena l'utente interagisce col campo
  field.addEventListener("input", () => {
    const group = field.closest(".form-group");
    group.classList.remove("error");
    group.querySelector(".form-error").textContent = "";
  });
  return make("div", { class: "form-group" }, label, field, errorSpan);
}

// Campi del form
const fieldNome = make("input", {
  type: "text",
  id: "field-nome",
  name: "nome",
  placeholder: "Il tuo nome",
});
const fieldEmail = make("input", {
  type: "email",
  id: "field-email",
  name: "email",
  placeholder: "nome@email.it",
});
const fieldMessaggio = make("textarea", {
  id: "field-messaggio",
  name: "messaggio",
  placeholder: "Descrivi brevemente il tuo progetto...",
});

// Select servizio con le opzioni
const fieldServizio = make("select", {
  id: "field-servizio",
  name: "servizio",
});
[
  ["", "Seleziona..."],
  ["identita", "Identità visiva"],
  ["web", "Web design"],
  ["motion", "Motion graphic"],
].forEach(([val, txt]) =>
  fieldServizio.append(make("option", { value: val }, txt)),
);

const formPreventivo = make(
  "form",
  { id: "form-preventivo", novalidate: "" },
  formGroup("Nome", fieldNome),
  formGroup("Email", fieldEmail),
  formGroup("Servizio", fieldServizio),
  formGroup("Messaggio", fieldMessaggio),
  make("button", { type: "submit", class: "btn-invia" }, "Invia richiesta"),
);

// Conferma invio, nascosta finché il form non viene inviato
const formSuccess = make(
  "div",
  { id: "form-success", class: "form-success" },
  make("i", { class: "fa-solid fa-circle-check" }),
  make("p", {}, "Grazie! Ti contatteremo al più presto."),
);
// Costruisce la struttura della modale e la inietta nel body
const closeBtn = make(
  "button",
  { class: "modal-close", "aria-label": "Chiudi" },
  make("i", { class: "fa-solid fa-xmark" }),
);

const modalOverlay = make(
  "div",
  {
    id: "modal-overlay",
    class: "modal-overlay",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "modal-title",
  },
  make(
    "div",
    { class: "modal" },
    closeBtn,
    make("h2", { id: "modal-title" }, "Richiedi un preventivo"),
    formPreventivo,
    formSuccess,
  ),
);

document.body.append(modalOverlay);

// Apre la modale e blocca lo scroll della pagina
function openModal() {
  modalOverlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

// Chiude la modale, ripristina lo scroll e resetta il form
function closeModal() {
  modalOverlay.classList.remove("is-open");
  document.body.style.overflow = "";
  formPreventivo.reset();
  formPreventivo.hidden = false;
  formSuccess.classList.remove("is-visible");
  // Pulisce eventuali errori di validazione
  formPreventivo
    .querySelectorAll(".form-group")
    .forEach((g) => g.classList.remove("error"));
  formPreventivo
    .querySelectorAll(".form-error")
    .forEach((e) => (e.textContent = ""));
}

document.getElementById("btn-preventivo").addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

closeBtn.addEventListener("click", closeModal);

// Click sull'overlay fuori dal modal chiude
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Escape chiude
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("is-open"))
    closeModal();
});

// Invio form: valida i campi, poi mostra la conferma
formPreventivo.addEventListener("submit", (e) => {
  e.preventDefault();

  const validations = [
    { field: fieldNome, msg: "Il nome è obbligatorio" },
    { field: fieldEmail, msg: "L'email è obbligatoria" },
    { field: fieldServizio, msg: "Seleziona un servizio" },
    { field: fieldMessaggio, msg: "Il messaggio è obbligatorio" },
  ];

  let valid = true;
  validations.forEach(({ field, msg }) => {
    const group = field.closest(".form-group");
    const errorEl = group.querySelector(".form-error");
    const empty =
      !field.value.trim() || (field.tagName === "SELECT" && field.value === "");
    if (empty) {
      group.classList.add("error");
      errorEl.textContent = msg;
      valid = false;
    }
  });

  if (!valid) return;

  formPreventivo.hidden = true;
  formSuccess.classList.add("is-visible");
});

// --- ANIMAZIONE TEAM ---

const teamCards = document.querySelectorAll(".team-card");

// getBoundingClientRect() restituisce le coordinate dell'elemento rispetto al viewport
// (la finestra visibile del browser, non la pagina intera). .top è la distanza dal
// bordo superiore dello schermo: se è minore di window.innerHeight, la card è entrata
// nella vista e possiamo aggiungere .in-view per far partire l'animazione.
function checkTeam() {
  teamCards.forEach((card, i) => {
    const img = card.querySelector("img");
    const rect = card.getBoundingClientRect();
    // rect.top < innerHeight: la card è entrata nel viewport dal basso
    // rect.bottom > 0: il bordo inferiore della card è ancora sotto il bordo superiore
    //   dello schermo — se fosse negativo la card sarebbe uscita completamente in alto.
    // La combinazione identifica correttamente "visibile almeno in parte".
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      // Scaglionamento: i (0, 1, 2) × 0.15s dà ritardi crescenti — stesso principio
      // delle service card, ma calcolato dinamicamente dall'indice del forEach
      img.style.animationDelay = `${i * 0.15}s`;
      img.classList.add("in-view");
    } else {
      // Card fuori dal viewport: rimuove .in-view → opacity torna a 0,
      // così al prossimo ingresso nel viewport l'animazione riparte da capo
      img.classList.remove("in-view");
    }
  });
}

// Ad ogni scroll ricontrolla le card — stesso pattern del cambio colore dell'header
window.addEventListener("scroll", checkTeam);
// Controlla subito al caricamento nel caso la sezione fosse già visibile
checkTeam();

// --- TEMA CHIARO / SCURO ---

const btnTema = document.getElementById("btn-tema");

btnTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  // Aggiorna icona, testo e aria-label in base al tema attivo
  btnTema.querySelector("i").className = isDark
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
  btnTema.querySelector("span").textContent = isDark
    ? "Tema chiaro"
    : "Tema scuro";
  btnTema.setAttribute(
    "aria-label",
    isDark ? "Attiva tema chiaro" : "Attiva tema scuro",
  );
});
