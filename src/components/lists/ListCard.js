import React from 'react';

const ListCard = ({name}) => (
  <div className="card list-card">
    <div className="card-body">
      <h4 className="card-name">{name}</h4>
    </div>
    <div className="card-footer">
      <div className="createcard">Add Card</div>
    </div>
  </div>
);

export default ListCard;
