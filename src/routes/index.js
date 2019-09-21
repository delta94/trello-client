import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Boards from '../pages/Boards';

function RouterComponent() {
  return (
    <Router>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/" component={Boards}/>
    </Router>
  );
}

export default RouterComponent;
