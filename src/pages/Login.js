import React, { useState } from "react";
import { Link } from 'react-router-dom';
import to from 'await-to-js';

import { config } from '../config';
import { http } from '../http';

import Input from '../components/forms/Input';

const authUri = `${config.baseUrl}/auth`;

function Login() {
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });

  const [authError, setAuthError] = useState({
    error: false,
    msg: ''
  })

  const onInputChange = e => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (authData.email === '' || authData.password === '')
      return setAuthError({
        error: true,
        msg: 'Please fill both fields'
      })

    let [err, response] = await to(http.post(authUri, authData));

    console.log({ err, response });

    if (err !== null && err.response.data.error)
      return setAuthError({
        error: true,
        msg: err.response.data.msg
      });

    if (response !== null && response.data.error)
      return setAuthError({
        error: true,
        msg: response.data.msg
      });


    if (response.data.error === false) {
      const decodeToken = JSON.parse(
        window.atob(response.data.token.split(".")[1])
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(decodeToken));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <form
          action="#"
          className="col-md-4 offset-md-4 auth-form"
          onSubmit={onSubmitForm}
        >
          <div className="auth-card">
            <h3>Login</h3>
            <Input
              type="email"
              label="Email"
              value={authData.email}
              onChange={onInputChange}
              name="email"
            />
            <Input
              type="password"
              label="Password"
              value={authData.password}
              onChange={onInputChange}
              name="password"
            />
            {authError.error ? <div className="alert alert-danger" role="alert">
              {authError.msg}
            </div> : ''}
            <button className="btn btn-primary">Login</button>
            <p className="pt-3">Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
