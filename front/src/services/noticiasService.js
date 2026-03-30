import client from '../api/clienteapi';

export const noticiasService = { 
  getAll: () => client('/api/noticias'),
  
  getById: (id) => client(`/noticias/${id}`),
  
  create: (userData) => client('/noticias', { body: userData }),
  
  update: (id, userData) => client(`/noticias/${id}`, { 
    body: userData, 
    method: 'PUT' 
  }),
};