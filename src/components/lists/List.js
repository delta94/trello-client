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
  focusInput,
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
            placeholder="Card name"
            type="text"
            inputRef={focusInput}
            bm={false}
            value={cardValue}
            onChange={onChange}
            className="form-control small white"
          />
          <button type="button" className="close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </form>
      ) : (
        <div className="createcard" onClick={addCard}>
          Add Card
        </div>
      )}
    </div>
  </div>
);

export default List;

