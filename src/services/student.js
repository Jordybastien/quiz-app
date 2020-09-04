import api from './api';

export const fetchStudents = async () => {
  const res = await api.get('/students/all');
  return res.data.meta.content;
};

export const recordStudent = async (info) => {
  const res = await api.post('/students/create', info);
  return res.data;
};
