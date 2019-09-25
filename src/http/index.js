import axios from 'axios';

import { config } from '../config';


const http = axios.create({
  baseURL: config.baseUrl,
  timeout: 1000,
  headers: { "Content-Type": "application/json" }
});

http.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('token');
    if (token) config.headers['x-auth-token'] = token;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// const options = {
//   headers: { 'x-auth-token': localStorage.getItem('token') }
// }

// const http = {
//   get: url => axios.get(url, options),
//   post: (url, data) => axios.post(url, data, options),
//   update: (url, data) => axios.put(url, data, options),
//   delete: (url, data) => axios.delete(url, data, options)
// };

export { http };
