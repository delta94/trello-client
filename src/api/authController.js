import to from 'await-to-js';

import { http } from '../http/http';

// Login
export const login = async data =>
  await to(http.post("/auth", data));

// Register
export const register = async data =>
  await to(http.post("/user/register", data));

export const getMe = async id =>
  await to(http.get(`/user/${id}`));
