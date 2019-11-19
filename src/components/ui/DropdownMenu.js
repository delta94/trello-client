import React, { useState } from 'react';

const DropdownMenu = ({menus}) => {
  const [show, setShow] = useState(false);
  const showDropdwon = () => setShow(!show);

  return (
    <div className="dropdown dropright card-menu-dropdown">
      <button className="btn p-0" type="button" onClick={showDropdwon}>
        <i className="material-icons">more_vert</i>
      </button>
      <div className={show ? "dropdown-menu show" : "dropdown-menu"}>
        {
          menus.map((menu, i) =>
            <button
              className="dropdown-item"
              key={i}
              onClick={menu.method}>
              {menu.text}
            </button>
          )

        }
      </div>
    </div>
  );
}

export default DropdownMenu;
