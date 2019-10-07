import React from "react";

const Input = props => (
  <div className={props.mb ? "form-group" : "form-group mb-0"}>
    {props.label && <label htmlFor={props.name}>{props.label}</label>}
    <textarea
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      className={props.className}
      placeholder={props.placeholder}
    />
  </div>
);

export default Input;
