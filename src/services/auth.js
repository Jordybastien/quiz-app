import api from './api';

export const loginUser = async (user) => {
  const res = await api.post('/users/login', user);
  return res.data;
};

export const tokenKey = 'ChurchService:UserInfo';

export const checkUser = () => {
  const user = localStorage.getItem(tokenKey);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
