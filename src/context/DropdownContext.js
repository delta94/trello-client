import React, { createContext, useState } from "react";

export const DropdownContext = createContext();

const DropdownContextProvider = props => {
  const [showMenu, setShowMenu] = useState(false);

  const showDropdown = setShowMenu(true);
  const hideDropdown = setShowMenu(false);

  return (
    <DropdownContext.Provider
      value={{ showMenu, showDropdown, hideDropdown }}>
      {props.children}
    </DropdownContext.Provider>
  );
};

export default DropdownContextProvider
