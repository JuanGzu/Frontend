// services.js

// Base URL de tu API
const BASE_URL = 'http://192.168.1.9:3000';

/**
 * Fetch the latest sensor data from the API.
 * @returns {Promise<Object>}
 */
export async function fetchLatestData() {
  const response = await fetch(`${BASE_URL}/latest`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
