import React from 'react';

const CreateList = ({onClick}) => (
  <button
    type="button"
    onClick={onClick}
    class="btn btn-outline-info btn-fw btn-block">
    Add another list
  </button>
);

export default CreateList;
