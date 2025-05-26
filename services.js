// services.js – Módulo para interacción con el backend FastAPI

const BASE_URL = 'http://192.168.1.75:8000/api/v1';  // Ajusta esta URL al endpoint de tu backend

// Obtener última lectura de DHT11
export async function fetchLastDHT11() {
  const res = await fetch(`${BASE_URL}/opMongo/lastDHT11`);
  if (!res.ok) {
    console.error('Error al obtener DHT11:', res.status, await res.text());
    throw new Error('Error al obtener datos del sensor DHT11');
  }
  return res.json(); // { temperature, humidity, timestamp }
}

// Obtener última lectura de DS18B20
export async function fetchLastDS18B20() {
  const res = await fetch(`${BASE_URL}/opMongo/lastDS18B20`);
  if (!res.ok) {
    console.error('Error al obtener DS18B20:', res.status, await res.text());
    throw new Error('Error al obtener datos del sensor DS18B20');
  }
  return res.json(); // { temperature, timestamp }
}

// Obtener última lectura de humedad de suelo
export async function fetchLastSoil() {
  const res = await fetch(`${BASE_URL}/opMongo/lastSoilMoisture`);
  if (!res.ok) {
    console.error('Error al obtener humedad de suelo:', res.status, await res.text());
    throw new Error('Error al obtener datos de humedad de suelo');
  }
  return res.json(); // { raw_value, percentage, timestamp }
}

// Obtener última lectura de luz ambiental
export async function fetchLastLight() {
  const res = await fetch(`${BASE_URL}/opMongo/lastLightSensor`);
  if (!res.ok) {
    console.error('Error al obtener luz ambiental:', res.status, await res.text());
    throw new Error('Error al obtener datos del sensor de luz');
  }
  return res.json(); // { raw_value, percentage, timestamp }
}

// Wrapper general para manejar errores y tiempo de espera (opcional)
export async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error('fetchWithTimeout error:', err);
    throw err;
  }
}
