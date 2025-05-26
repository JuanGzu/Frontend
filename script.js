// Referencias
const barra = document.getElementById('barraLateral');
const toggle = document.querySelector('.boton-toggle');

// Al hacer clic en el toggle, expandir/colapsar la barra lateral
toggle.addEventListener('click', () => {
  barra.classList.toggle('expandida');
});



// script.js – Actualización dinámica de datos de sensores

document.addEventListener('DOMContentLoaded', () => {
  // Construir la URL base al backend
  const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/v1/endpoints/op_mongo`;

  // Para cada sección de huerto, obtener y renderizar datos
  document.querySelectorAll('.huerto').forEach(async (huerto) => {
    const tarjetas = Array.from(huerto.querySelectorAll('.tarjeta'));
    let latestTimestamp = 0;

    // Ejecutar fetch en paralelo para todas las tarjetas
    await Promise.all(
      tarjetas.map(async (tarjeta) => {
        const endpoint = tarjeta.dataset.endpoint;
        try {
          const res = await fetch(`${baseUrl}/last/${endpoint}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const { value, timestamp } = await res.json();

          // Actualizar valor
          tarjeta.querySelector('.valor').textContent = value;

          // Determinar timestamp más reciente
          if (timestamp > latestTimestamp) latestTimestamp = timestamp;
        } catch (error) {
          console.error(`Error al obtener ${endpoint}:`, error);
          tarjeta.querySelector('.valor').textContent = 'Err';
        }
      })
    );

    // Actualizar la última actualización del huerto entero
    const fecha = latestTimestamp ? new Date(latestTimestamp) : new Date();
    huerto.querySelector('.ultima-actualizacion').textContent =
      `Última actualización: ${fecha.toLocaleDateString()} – ${fecha.toLocaleTimeString()}`;
  });
});