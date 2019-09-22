import axios from 'axios';

const options = {
  headers: { 'x-auth-token': localStorage.getItem('token') }
}

const http = {
  get: url => axios.get(url, options),
  post: (url, data) => axios.post(url, data, options),
  update: (url, data) => axios.put(url, data, options),
  delete: (url, data) => axios.delete(url, data, options)
};

export { http };
