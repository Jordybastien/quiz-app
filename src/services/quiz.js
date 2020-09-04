import api from './api';

export const fetchQuizes = async () => {
  const res = await api.get('/quizes/all');
  return res.data.meta.content;
};

export const recordQuiz = async (info) => {
  const res = await api.post('/quizes/create', info);
  return res.data;
};

export const submitAnsweres = async (info) => {
  const res = await api.post('/quizes/answers', info);
  return res.data;
};
