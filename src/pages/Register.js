import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import to from 'await-to-js';

import Input from '../components/forms/Input';
import AuthWrapper from '../hoc/AuthWrapper';

import { config } from '../config';
import { http } from '../http';

const regUri = `${config.baseUrl}/user/register`

function Register({history}){
  const [authData, setAuthData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const [authError, setAuthError] = useState({
    error: false,
    msg: ''
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let [err] = await to(http.post(regUri, authData));

    if (err)
      return setAuthError({
        error: true,
        msg: err.response.data.msg
      });

    return history.push('/login');
  }

  return (
    <AuthWrapper>
      <form class="pt-3" onSubmit={onSubmit}>
        <div class="form-group">
          <Input
            type="text"
            onChange={onChangeInput}
            value={authData.firstname}
            name="firstname"
            placeholder="First name"
            className="form-control form-control-lg"
          />
        </div>
        <div class="form-group">
          <Input
            type="text"
            onChange={onChangeInput}
            value={authData.lastname}
            name="lastname"
            placeholder="Last name"
            className="form-control form-control-lg"
          />
        </div>

        <div className="form-group">
          <Input
            type="text"
            onChange={onChangeInput}
            value={authData.username}
            name="username"
            placeholder="Username"
            className="form-control form-control-lg"
          />
        </div>

        <div className="form-group">
          <Input
            type="email"
            label="Email"
            onChange={onChangeInput}
            value={authData.email}
            name="email"
            placeholder="Email"
            className="form-control form-control-lg"
          />
        </div>

        <div class="form-group">
          <Input
            type="password"
            onChange={onChangeInput}
            value={authData.password}
            name="password"
            placeholder="Password"
            className="form-control form-control-lg"
          />
        </div>

        {authError.error ? <div className="alert alert-danger" role="alert">
          {authError.msg}
        </div> : ''}

        <div class="mt-3">
          <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Register</button>
        </div>

        <div class="text-center mt-4 font-weight-light">
          Already have an account?{" "}
          <Link to="/login" class="text-primary">
            Login
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default Register;
