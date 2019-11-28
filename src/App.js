import React from 'react';
import ModalContextProvider from './context/modalContext';
import AvatarContextProvider from './context/AvatarContext';

import RouterComponent from "./routes";

function App() {
  return (
    <div className="App">
      <AvatarContextProvider>
        <ModalContextProvider>
          <RouterComponent />
        </ModalContextProvider>
      </AvatarContextProvider>
    </div>
  );
}

export default App;
