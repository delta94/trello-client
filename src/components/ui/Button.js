import React from 'react';

const Button = ({ text, type }) => {
  return (
    <button className="btn btn-primary" type={type}>{text}</button>
  )
};

export default Button;
