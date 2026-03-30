import client from '../api/clienteapi';

export const adopcionesService = { 
  getAll: () => client('/api/animales'),
  
  getById: (id) => client(`/animales/${id}`),
  
  create: (userData) => client('/animales', { body: userData }),
  
  update: (id, userData) => client(`/animales/${id}`, { 
    body: userData, 
    method: 'PUT' 
  }),
};