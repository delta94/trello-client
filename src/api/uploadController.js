import to from 'await-to-js';

import { http } from '../http/http';


export const uploadAvatar = async (data) =>
  await to(http.post('/upload', data));
