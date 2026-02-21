export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  // 1. Configurar headers base y añadir el token si existe
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  // 2. Ejecutar la petición
  const response = await fetch({ endpoint }, {
    ...options,
    headers,
  });

  // 3. ¡EL TRUCO! Si el status es 401 (Token expirado o inválido)
  if (response.status === 401) {
    localStorage.removeItem('token');
    // Redirigimos al login y limpiamos la app
    window.location.href = '/login';
    return Promise.reject('Sesión expirada');
  }

  return response;
};