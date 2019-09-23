import React from 'react';

const Card = ({ name, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        <h4 className="card-name">{name}</h4>
      </div>
    </div>
  );
}

export default Card;
