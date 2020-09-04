import api from './api';
import { formatChurches } from '../utils/churches';
import { checkUser } from './auth';

export const fetchChurches = async () => {
  const res = await api.get('/church/all');
  return formatChurches(res.data.meta.content);
};

export const fetchChurchServices = async () => {
  const user = checkUser();
  if (user) {
    const res = await api.get(`/church/serviceLookUpByChurch/${user.churchId}`);
    return res.data.meta.content;
  }
  return {};
};
