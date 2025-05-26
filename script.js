import {
  fetchMiradorData,
  fetchRomeroDHT11,
  fetchRomeroDS18B20
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
  const [dhtData, dsData] = await Promise.all([
    updateHuerto('Romero DHT11', fetchRomeroDHT11),
    updateHuerto('Romero DS18B20', fetchRomeroDS18B20)
  ]);

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