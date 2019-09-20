import React from "react";

const Input = props => (
  <div className="form-group">

    <input
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      name={props.name}
      className={props.className}
      placeholder={props.placeholder}
    />
  </div>
);

export default Input;
