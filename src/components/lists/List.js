import React from "react";
import DropdownMenu from '../ui/DropdownMenu';

const List = ({
  name,
  children,
  onArchiveAllCard,
  onArchiveList,
  footer
}) => (
  <div className="card list-card">
    <div className="card-body">
      <div className="card-header p-0 d-flex align-items-center justify-content-between">
        <h4 className="card-name">{name}</h4>
        <DropdownMenu
          menus={[
            {
              text: "Remove all card",
              method: onArchiveAllCard
            },
            {
              text: "Remove this list",
              method: onArchiveList
            }
          ]}
        />
      </div>

      {children}
    </div>
    <div className="card-footer">
      {footer}
    </div>
  </div>
);

export default List;

