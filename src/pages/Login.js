import React, { useState } from "react";
import { Link } from "react-router-dom";
import to from "await-to-js";

import { config } from "../config";
import { http } from "../http";
import { setTokenToLocal } from "../utils/localStorage";

import Input from "../components/forms/Input";
import AuthWrapper from "../hoc/AuthWrapper";
import Error from '../components/FormError';

// Request url
const authUri = `${config.baseUrl}/auth`;

function Login({history}) {
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    error: false,
    msg: ''
  });

  // From input change populate authData state
  const onInputChange = e => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  // Submit form with
  const onSubmitForm = async e => {
    e.preventDefault();

    const data = {
      email: authData.email,
      password: authData.password
    }

    let [err, response] = await to(http.post(authUri, data));

    if (err)
      return setAuthData({
        ...authData,
        error: true,
        msg: err.response.data.msg
      });

    // save it to localstorage.
    setTokenToLocal.token(response.data.token);
    setTokenToLocal.user(response.data.token);

    return history.push('/');
  };

  return (
    <AuthWrapper>
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

        <Error error={authData.error} msg={authData.msg}/>

        <div className="mt-3">
          <button
           className="btn btn-block
           btn-primary btn-lg font-weight-medium
           auth-form-btn"
          >
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
          {/* <Link to="/forgot-password" className="auth-link text-black">
            Forgot password?
          </Link> */}
        </div>
        <div className="text-center mt-4 font-weight-light">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Create
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
}

export default Login;
