import React from 'react';
import { withRouter } from 'react-router-dom';
import ModalContextProvider from './context/modalContext';


import RouterComponent from "./routes";
import Header from './components/Header';

import { getUserFromLocal } from './utils/localStorage';

function App({location}) {
  const user = getUserFromLocal();
  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/register'
        ? <Header user={user} /> : null
      }
      <ModalContextProvider>
        <RouterComponent />
      </ModalContextProvider>
    </div>
  );
}

export default withRouter(App);
