import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../components/forms/Input';

import { config } from '../config';
import { http } from '../http';

const regUri = `${config.baseUrl}/user/register`

function Register(){
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
    const { data } = await http.post(regUri, authData);
    if (data.error) return setAuthError({
      error: true,
      msg: data.msg
    });

    setAuthError({ error: false, msg: ''});
    console.log(data);
  }

  return (
    <div><div className="container">
      <div className="row">
        <form action="#" onSubmit={onSubmit} className="col-md-4 offset-md-4 auth-form">
          <div className="auth-card">
            <h3>Register</h3>
            <Input
              type="text"
              label="First Name"
              onChange={onChangeInput}
              value={authData.firstname}
              name="firstname"
            />
            <Input
              type="text"
              label="Last Name"
              onChange={onChangeInput}
              value={authData.lastname}
              name="lastname"
            />
            <Input
              type="text"
              label="Username"
              onChange={onChangeInput}
              value={authData.username}
              name="username"
            />

            <Input
              type="email"
              label="Email"
              onChange={onChangeInput}
              value={authData.email}
              name="email"
            />
            <Input
              type="password"
              label="Password"
              onChange={onChangeInput}
              value={authData.password}
              name="password"
            />

            {authError.error ? <div className="alert alert-danger" role="alert">
              {authError.msg}
            </div> : ''}
            <button className="btn btn-primary">Register</button>

            <p className="pt-3">Already have an account? <Link to="/login">Login</Link></p>

          </div>
        </form>
      </div>
    </div></div>
  )
};

export default Register;
