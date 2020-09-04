import api from './api';

export const fetchServices = async () => {
  const res = await api.get('/service/all');
  return res.data.meta.content;
};
