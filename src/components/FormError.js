import React from 'react';

const FormError = ({ error, msg }) => {
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {msg}
      </div>
    );

  return null;
};

export default FormError;
