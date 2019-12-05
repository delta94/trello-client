import React from "react";

const Input = props => (
  <div className={props.mb ? "form-group mb-20" : 'form-group mb-0'}>
    {props.label && <label htmlFor={props.name}>{props.label}</label> }
    <input
      ref={props.reference}
      value={props.value || ''}
      type={props.type}
      onChange={props.onChange}
      name={props.name}
      className={props.className}
      placeholder={props.placeholder}
    />
  </div>
);

export default Input;
