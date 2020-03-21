import React, { createContext, useState, useEffect } from 'react';

import { getUser } from '../utils/localStorage';
import { config } from '../config';

export const AvatarContext = createContext();

const AvatarContextProvider = ({children}) => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const user = getUser();
    if (user) {
      setAvatarToState(`${config.baseUrl}/${user.avatar}`);
    }
  });

  const setAvatarToState = (url) => setAvatar(url);

  const updateContextAvatar = (value) => {
    const user = getUser();
    user.avatar = value;
    localStorage.setItem('user', JSON.stringify(user));
    setAvatar(`${config.baseUrl}/${value}`);
  }

  return (
    <AvatarContext.Provider value={{ avatar, updateContextAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
}

export default AvatarContextProvider;
