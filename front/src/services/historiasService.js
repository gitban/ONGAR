import client from '../api/clienteapi';

export const historiasService = { 
  getAll: () => client('/api/historias'),
  
  getById: (id) => client(`/historias/${id}`),
  
  create: (userData) => client('/historias', { body: userData }),
  
  update: (id, userData) => client(`/historias/${id}`, { 
    body: userData, 
    method: 'PUT' 
  }),
};