import api from './api';

export const fetchHistory = async (id) => {
  const res = await api.get(`/history/${id}`);
  return res.data.meta.details;
};

export const fetchUserHistory = async (historyId) => {
  const res = await api.get(`/history/data/${historyId}`);
  return res.data;
};
