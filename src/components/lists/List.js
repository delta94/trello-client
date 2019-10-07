import React from "react";
import Input from '../forms/Input';

const List = ({
  name,
  onSubmitCard,
  cardValue,
  onChange,
  addCard,
  isAddCard,
  onClose,
  listId,
  children
}) => (
  <div className="card list-card">
    <div className="card-body">
      <h4 className="card-name">{name}</h4>
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

