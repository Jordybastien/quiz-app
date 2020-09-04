import axios from 'axios';

export const baseURL = 'http://161.35.66.220:12000/api/';

const apiCall = axios.create({
  baseURL,
});

export default {
  get: apiCall.get,
  post: apiCall.post,
};
