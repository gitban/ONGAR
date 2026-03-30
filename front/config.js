// src/config.js

// Centralizamos la URL base
export const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("URL usasda: "+ API_BASE_URL)
// Otras constantes útiles
export const ENDPOINTS = {
  ADOPCIONES: `${API_BASE_URL}/api/animales`,
  SOLICITUDES: `${API_BASE_URL}/api/adopciones`,
  HISTORIAS: `${API_BASE_URL}/api/historias`,
  NOTICIAS: `${API_BASE_URL}/api/noticias`,
  USUARIOS: `${API_BASE_URL}/api/usuarios`,
};

export default {
  API_BASE_URL,
  ENDPOINTS
}