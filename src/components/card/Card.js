import React from 'react';

const Card = ({ name }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-name">{name}</h4>
      </div>
    </div>
  );
}

export default Card;
