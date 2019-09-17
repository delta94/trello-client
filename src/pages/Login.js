import React, { useState } from "react";

import { config } from '../config';
import { http } from '../http';

const authUri = `${config.baseUrl}/auth`;

function Login() {
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });

  const onInputChage = e => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { data } = await http.post(authUri, authData);
    console.log(data);
  };

  return (
    <form action="" onSubmit={onSubmitForm}>
      <label>email</label>
      <input
        type="text"
        name="email"
        value={authData.email}
        onChange={onInputChage}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={authData.password}
        onChange={onInputChage}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
