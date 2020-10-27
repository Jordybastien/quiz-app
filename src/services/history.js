import api from './api';

export const fetchHistory = async (id) => {
  const res = await api.get(`/history/${id}`);
  return res.data.meta.details;
};
