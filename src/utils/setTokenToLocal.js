/**
 * setTokenToLocal
 * use localstorage to store token
 * when login/register api calls
 */
const setTokenToLocal = {
  token: value => localStorage.setItem("token", value),
  user: value => {
    const token = JSON.parse(window.atob(value.split(".")[1]));
    return localStorage.setItem("user", JSON.stringify(token));
  }
};

export { setTokenToLocal };
