import React, { useState } from 'react';

const DropdownMenu = () => {
  const [show, setShow] = useState(false);
  const showDropdwon = () => setShow(!show);


  return (
    <div className="dropdown dropright card-menu-dropdown">
      <button className="btn p-0" type="button" onClick={showDropdwon}>
        <i className="material-icons">more_vert</i>
      </button>
      <div className={show ? "dropdown-menu show" : "dropdown-menu"}>
        <button className="dropdown-item">Action</button>
        <button className="dropdown-item">Another action</button>
        <button className="dropdown-item">Something else here</button>
      </div>
    </div>
  );
}

export default DropdownMenu;
