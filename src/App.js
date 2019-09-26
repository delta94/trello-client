import React from 'react';
import ModalContextProvider from './context/modalContext';

import RouterComponent from "./routes";

function App() {
  return (
    <div className="App">
      <ModalContextProvider>
        <RouterComponent />
      </ModalContextProvider>
    </div>
  );
}

export default App;
