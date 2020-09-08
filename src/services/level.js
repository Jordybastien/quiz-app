import api from './api';

export const findLevelById = async (id) => {
  const res = await api.get(`/level/${id}`);
  return res.data.meta.content;
};

export const fetchAllLevels = async () => {
  const res = await api.get('/levels/all');
  return res.data.meta.content;
};

export const recordLevel = async (info) => {
  const res = await api.post('/level/create', info);
  return res.data;
};
