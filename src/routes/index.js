import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../pages/Login';

function RouterComponent() {
  return (
    <Router>
      <Route path="/login" component={Login}/>
    </Router>
  );
}

export default RouterComponent;
