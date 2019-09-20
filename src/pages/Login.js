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

  const onSubmitForm = async e => {
    e.preventDefault();
    let err, response;

    [err, response] = await to(http.post(authUri, authData));

    if (err)
      return setAuthError({
        error: true,
        msg: err.response.data.msg
      });

    // Decode token to extrac user info
    // and save it to localstorage.
    const decodeToken = JSON.parse(
      window.atob(response.data.token.split(".")[1])
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(decodeToken));
  };

  return (
    <div>
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* Logo should be here with image tag */}
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={onSubmitForm}>
                  <div className="form-group">
                    <Input
                      type="email"
                      value={authData.email}
                      onChange={onInputChange}
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="password"
                      value={authData.password}
                      onChange={onInputChange}
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                      Login
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>
                    <a  className="auth-link text-black">
                      Forgot password?
                    </a>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <a href="register.html" className="text-primary">
                      Create
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container">
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
    </div> */}
    </div>
  );
}

export default Login;
