// services.js

const BASE_URL_MIRADOR = 'http://192.168.1.9:3000';
const BASE_URL_ROMERO = 'http://192-168-1-75-via-1.tailc7f7f2.ts.net:8000';

// Huerto Mirador
export async function fetchMiradorData() {
  try {
    const response = await fetch(`${BASE_URL_MIRADOR}/latest`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching Mirador data:', error);
    return { error: 'Error cargando datos del Mirador' };
  }
}

// Huerto Romero - DHT11
export async function fetchRomeroDHT11() {
  try {
    const response = await fetch(`${BASE_URL_ROMERO}/api/v1/opMongo/lastDHT11`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      temperature: data.temperature,
      humidity: data.humidity,
      timestamp: data.timestamp
    };
  } catch (error) {
    console.error('Error fetching Romero DHT11 data:', error);
    return { error: 'Error cargando datos DHT11 del Romero' };
  }
}

// Huerto Romero - DS18B20
export async function fetchRomeroDS18B20() {
  try {
    const response = await fetch(`${BASE_URL_ROMERO}/api/v1/opMongo/lastDS18B20`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      temperature: data.temperature,
      timestamp: data.timestamp
    };
  } catch (error) {
    console.error('Error fetching Romero DS18B20 data:', error);
    return { error: 'Error cargando datos DS18B20 del Romero' };
  }
}