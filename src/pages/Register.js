import React, { useState } from 'react';

import { config } from '../config';
import { http } from '../http';

const regUri = `${config.baseUrl}/users/register`

function Register(){
  const [regState, setRegState] = useState({
    name: '',
    email: '',
    password: ''
  })

  return (
    <div>Register</div>
  )
};

export default Register;
