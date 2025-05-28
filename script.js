// Referencias
const barra = document.getElementById('barraLateral');
const toggle = document.querySelector('.boton-toggle');

// Al hacer clic en el toggle, expandir/colapsar la barra lateral
toggle.addEventListener('click', () => {
  barra.classList.toggle('expandida');
});


import {
  fetchMiradorData,
  fetchRomeroDHT11,
  fetchRomeroDS18B20,
  fetchRomeroSoil
} from './services.js';

// Actualiza los datos de un huerto específico
async function updateHuerto(huertoName, updateFunction) {
  try {
    return await updateFunction();
  } catch (error) {
    console.error(`Error updating ${huertoName}:`, error);
    return { error: `Error actualizando ${huertoName}` };
  }
}

// Actualiza el Huerto Mirador
async function updateMirador() {
  const data = await updateHuerto('Mirador', fetchMiradorData);
  
  if (data.error) {
    document.getElementById('timestamp').textContent = data.error;
    return;
  }

  document.getElementById('soilPct').textContent = `${data.mh_humidity} %`;
  document.getElementById('tempDS18').textContent = `${data.ds_temperature} °C`;
  document.getElementById('humDHT').textContent = `${data.dht_humidity} %`;
  document.getElementById('timestamp').textContent = formatDate(data.received_at);
}

// Actualiza el Huerto Romero
async function updateRomero() {
  const [dhtData, dsData, soilData] = await Promise.all([
    updateHuerto('Romero DHT11', fetchRomeroDHT11),
    updateHuerto('Romero DS18B20', fetchRomeroDS18B20),
    updateHuerto('Romero Soil', fetchRomeroSoil)  // ✅ Corrección aquí
  ]);
  console.log(soilData.percentage);
  if (dhtData.error) {
    document.getElementById('romeroTimestamp').textContent = dhtData.error;
  } else {
    document.getElementById('romeroHumedadDHT').textContent = `${dhtData.humidity} %`;
    document.getElementById('romeroTemDHT').textContent = `${dhtData.temperature} °C`;
  }

  if (dsData.error) {
    document.getElementById('romeroTempDS18').textContent = dsData.error;
  } else {
    document.getElementById('romeroTempDS18').textContent = `${dsData.temperature} °C`;
  }

  // Manejo de datos Soil Moisture - ¡ESTA ES LA PARTE IMPORTANTE!
  if (soilData.error) {
    document.getElementById('soilMeasure').textContent = soilData.error;
  } else {
    // Asegúrate de que el porcentaje es un número antes de mostrarlo
    const percentage = typeof soilData.percentage === 'number' ? soilData.percentage : '--';
    document.getElementById('soilMeasure').textContent = `${percentage} %`;
  }
  
  // Usamos el timestamp más reciente disponible
  const timestamp = dhtData.timestamp || dsData.timestamp;
  if (timestamp) {
    document.getElementById('romeroTimestamp').textContent = formatDate(timestamp);
  }
}

// Función auxiliar para formatear fechas
function formatDate(dateString) {
  if (!dateString) return '--';
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-MX') + ' ' + date.toLocaleDateString('es-MX');
}

// Función principal que actualiza todos los huertos
export async function actualizarLecturas() {
  // Ejecuta ambas actualizaciones en paralelo
  await Promise.all([
    updateMirador(),
    updateRomero()
  ]);
}

// Inicia la actualización al cargar y cada 30 segundos
actualizarLecturas();
setInterval(actualizarLecturas, 30000);