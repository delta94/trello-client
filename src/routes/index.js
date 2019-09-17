import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';

function RouterComponent() {
  return (
    <Router>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Router>
  );
}

export default RouterComponent;
