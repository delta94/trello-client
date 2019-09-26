import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getItemFromLocal } from "../utils/localStorage";

import Login from '../pages/Login';
import Register from '../pages/Register';
import Boards from '../pages/Boards';
import SingleBoard from '../pages/SingleBoard';
import Header from "../components/Header";

function RouterComponent() {
  const user = getItemFromLocal('user');
  return (
    <Router>
      <Header user={user}/>
      <Switch>
        <Route path="/" exact component={Boards} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/board/:id" component={SingleBoard} />
      </Switch>
    </Router>
  );
}

export default RouterComponent;
