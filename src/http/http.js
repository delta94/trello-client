import axios from "axios";

import { config } from "../config";
import { isApiCall } from "../utils/isApiCall";

const http = axios.create({
  baseURL: config.baseUrl,
  timeout: 1000,
  headers: { "Content-Type": "application/json" }
});

http.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");
    config.headers["Access-Control-Allow-Origin"] = "*";
    if (token) config.headers["x-auth-token"] = token;
    isApiCall(true);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function(response) {
    isApiCall(false);
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export { http };
