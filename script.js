// Referencias
const barra = document.getElementById('barraLateral');
const toggle = document.querySelector('.boton-toggle');

// Al hacer clic en el toggle, expandir/colapsar la barra lateral
toggle.addEventListener('click', () => {
  barra.classList.toggle('expandida');
});


import { fetchLatestData } from './services.js';

async function actualizarLecturas() {
  try {
    const {
      mh_humidity,
      dht_temperature,
      dht_humidity,
      ds_temperature,
      received_at
    } = await fetchLatestData();

    document.getElementById('soilPct').textContent   = `${mh_humidity} %`;
    document.getElementById('tempDS18').textContent  = `${ds_temperature} °C`;
    document.getElementById('humDHT').textContent    = `${dht_humidity} %`;
    document.getElementById('timestamp').textContent = new Date(received_at)
      .toLocaleTimeString('es-MX') + ' ' + new Date(received_at)
      .toLocaleDateString('es-MX');
  } catch (err) {
    console.error('Error al obtener datos:', err);
    document.getElementById('timestamp').textContent = 'Error cargando datos';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  actualizarLecturas();
  setInterval(actualizarLecturas, 5000);
});
