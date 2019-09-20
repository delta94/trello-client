import React, { useState } from "react";
import { Link } from "react-router-dom";
import to from "await-to-js";

import { config } from "../config";
import { http } from "../http";

import Input from "../components/forms/Input";
import AuthWrapper from "../hoc/AuthWrapper";

const authUri = `${config.baseUrl}/auth`;

function Login() {
  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  });

  const [authError, setAuthError] = useState({
    error: false,
    msg: ""
  });

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

        {authError.error ? <div className="alert alert-danger" role="alert">
          {authError.msg}
        </div> : ''}

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
          <Link to="/forgot-password" className="auth-link text-black">
            Forgot password?
          </Link>
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
