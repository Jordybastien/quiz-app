import axios from 'axios';

export const baseURL = 'https://infinite-ocean-61053.herokuapp.com/api/';

const apiCall = axios.create({
  baseURL,
});

export default {
  get: apiCall.get,
  post: apiCall.post,
};
