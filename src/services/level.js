import api from './api';

export const findLevelById = async (id) => {
  const res = await api.get(`/level/${id}`);
  return res.data.meta.content;
};

export const recordLevel = async (info) => {
  const res = await api.post('/quizes/create', info);
  return res.data;
};
