import React from "react";
import Input from '../forms/Input';
import DropdownMenu from '../ui/DropdownMenu';

const List = ({
  name,
  onSubmitCard,
  cardValue,
  onChange,
  addCard,
  isAddCard,
  onClose,
  listId,
  children,
  onAddCard,
  onArchiveAllCard,
  onArchiveList
}) => (
  <div className="card list-card">
    <div className="card-body">
      <div className="card-header p-0 d-flex align-items-center justify-content-between">
        <h4 className="card-name">{name}</h4>
        <DropdownMenu
          menus={[
            {
              text: "Add Card",
              method: onAddCard
            },
            {
              text: "Archive all card in this list",
              method: onArchiveAllCard
            },
            {
              text: "Archive this list",
              method: onArchiveList
            }
          ]}
        />
      </div>

      {children}
    </div>
    <div className="card-footer">
      {isAddCard.has(listId) ? (
        <form action="" onSubmit={onSubmitCard}>
          <Input
            name="name"
            type="text"
            placeholder="Card name"
            bm={false}
            value={cardValue}
            onChange={onChange}
            className="form-control white large card-input"
          />

          <div className="form-footer">
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-success btn-sm">
                Add
              </button>
              <span
                aria-hidden="true"
                className="ti-close close"
                onClick={onClose}
              ></span>
            </div>
          </div>
        </form>
      ) : (
        <div className="createcard" onClick={addCard}>
          + Add Card
        </div>
      )}
    </div>
  </div>
);

export default List;

