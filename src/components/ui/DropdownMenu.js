import React, { useState } from 'react';

const DropdownMenu = ({onAddCard, onArchiveCard, onArchiveList}) => {
  const [show, setShow] = useState(false);
  const showDropdwon = () => setShow(!show);


  return (
    <div className="dropdown dropright card-menu-dropdown">
      <button className="btn p-0" type="button" onClick={showDropdwon}>
        <i className="material-icons">more_vert</i>
      </button>
      <div className={show ? "dropdown-menu show" : "dropdown-menu"}>
        <button className="dropdown-item" onClick={onAddCard}>
          Add Card
        </button>
        <button className="dropdown-item" onClick={onArchiveCard}>
          Archive all card in this list
        </button>
        <button className="dropdown-item" onClick={onArchiveList}>
          Archive this list
        </button>
      </div>
    </div>
  );
}

export default DropdownMenu;
