import { getToken } from './localStorage';

export const checkToken = (history, fn) => {
  const token = getToken();
  if (token === null) {
    return history.push("/login");
  } else {
    return fn;
  }
}
