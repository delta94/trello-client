import React, { useState, useRef } from 'react';

import { useOnClickOutside } from "../../hooks/useClickOutside";

const DropdownMenu = ({menus}) => {
  const [show, setShow] = useState(false);
  const showDropdwon = () => setShow(!show);
  const el = useRef(null);

  useOnClickOutside(el, () => setShow(false));

  return (
    <div className="dropdown dropright card-menu-dropdown">
      <button className="btn p-0" type="button" onClick={showDropdwon}>
        <i className="material-icons">more_vert</i>
      </button>
      <div ref={el} className={show ? "dropdown-menu show" : "dropdown-menu"}>
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
