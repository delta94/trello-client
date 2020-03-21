import { getToken } from './localStorage';

export const checkToken = async (history, fn) => {
  const token = getToken();
  if (token === null) {
    return history.push("/login");
  } else {
    return await fn;
  }
}
