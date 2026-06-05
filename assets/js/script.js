// Bloom — Week Project Settimana V

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
