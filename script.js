// Referencias
const barra = document.getElementById('barraLateral');
const toggle = document.querySelector('.boton-toggle');

// Al hacer clic en el toggle, expandir/colapsar la barra lateral
toggle.addEventListener('click', () => {
  barra.classList.toggle('expandida');
});
