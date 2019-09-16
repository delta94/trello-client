import axios from 'axios';

const http = {
  get: (url) => axios.get(url),
  post: (url, data) => axios.post(url, data),
  update: (url, data) => axios.put(url, data),
  delete: (url, data) => axios.delete(url, data),
}

export { http };
