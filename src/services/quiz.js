import api from './api';

export const fetchQuizes = async () => {
  const res = await api.get('/quizes/all');
  return res.data.meta.content;
};

export const recordQuiz = async (info) => {
  const res = await api.post('/quizes/create', info);
  return res.data;
};

export const submitAnswers = async (info) => {
  const res = await api.post('/quiz/answers', info);
  return res.data;
};
