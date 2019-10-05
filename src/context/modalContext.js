import React, {createContext, useState} from 'react';

export const ModalContext = createContext();

const ModalContextProvider = (props) => {
  const [show, setShow] = useState(false);
  const openModal = () => {
    console.log('open modal');
    console.log(show)
    setShow(true);
  };
  const closeModal = () => setShow(false);

  return (
    <ModalContext.Provider value={{show, openModal, closeModal}}>
      {props.children}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider;
