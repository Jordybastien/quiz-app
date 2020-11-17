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

export const deleteQuiz = async (quizId) => {
  const res = await api.get(`/quiz/deactivate/${quizId}`);
  return parseInt(res.data.responseCode);
};
