import React from "react";
import { isApiCall } from "../../utils/isApiCall"

const AjaxButton = ({ text, className }) => {
  return (
    <button className={`btn btn-primary ${className}`}>
      {isApiCall() ? <div class="circle-loader"></div> : text}
    </button>
  );
}

export default AjaxButton;
