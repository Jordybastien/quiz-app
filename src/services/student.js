import api from './api';

export const fetchStudents = async () => {
  const res = await api.get('/students/all');
  return res.data.meta.content;
};

export const recordStudent = async (info) => {
  const res = await api.post('/students/create', info);
  return res.data;
};

export const alterStudent = async (studentId, status) => {
  const res = await api.get(`/students/${status}/${studentId}`);
  return parseInt(res.data.responseCode);
};

export const fetchCourseHistory = async (courseId) => {
  const res = await api.get(`/history/course/${courseId}`);
  return res.data.meta.details;
};
