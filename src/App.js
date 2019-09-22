import React from 'react';
import { withRouter } from 'react-router-dom';


import RouterComponent from "./routes";
import Header from './components/Header';

import { getUserFromLocal } from './utils/getUserFromLocal';

function App({location}) {
  const user = getUserFromLocal();
  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/register'
        ? <Header user={user} /> : null
      }
      <RouterComponent />
    </div>
  );
}

export default withRouter(App);
