import React from "react";

const Input = props => (
  <div className="form-group">
    <label>{props.label}</label>
    <input
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      name={props.name}
      className="form-control"
    />
  </div>
);

export default Input;
