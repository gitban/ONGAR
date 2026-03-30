import { API_BASE_URL } from "../../config";

async function client(endpoint, { body, ...customConfig } = {}) {

  const headers = { 'Content-Type': 'application/json' };
  
  // Si tienes un token en localStorage, lo añadimos aquí
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  
  if (body) {
    config.body = JSON.stringify(body);
  }
console.log(API_BASE_URL+endpoint)
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en la petición');
  }

  return response.json();
}

export default client;