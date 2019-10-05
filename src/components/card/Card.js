import React from "react";

const Card = ({ name }) => (
  <div className="card-item-wrapper">
    <div className="card item-card">
      <div className="card-body">
        <h4 className="card-name">{name}</h4>
      </div>
    </div>
  </div>
);

export default Card;
