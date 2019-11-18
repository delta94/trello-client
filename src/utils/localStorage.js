
/**
 * setTokenToLocal
 * use localstorage to store token
 * when login/register api calls
 */
export const setTokenToLocal = {
  token: value => localStorage.setItem("token", value),
  user: value => {
    const token = JSON.parse(window.atob(value.split(".")[1]));
    return localStorage.setItem("user", JSON.stringify(token));
  }
};

// Get user data from localstorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
};

export const getToken = () => localStorage.getItem('token');

// Clear local storage
export const clearLocalStorage = () => localStorage.clear();
