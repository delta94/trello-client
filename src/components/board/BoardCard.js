import React from 'react';

const Card = ({ name, onClick, style, className }) => {
  const classes = className ? `card board-card ${className}` : 'card board-card';
  return (
    <div className={classes} style={style} onClick={onClick}>
      <div className="card-body">
        <h4 className="card-name">{name}</h4>
      </div>
    </div>
  );
}

export default Card;
