import React, {useState} from "react";

import Input from "../forms/Input";

const CreateCard = ({onSubmit, value, onChange}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show ? (
        <form action="" onSubmit={onSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Card name"
            bm={false}
            value={value}
            onChange={onChange}
            className="form-control white large card-input"
          />

          <div className="form-footer">
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-success btn-sm">
                Add
              </button>
              <span
                aria-hidden="true"
                className="ti-close close"
                onClick={() => setShow(false)}
              ></span>
            </div>
          </div>
        </form>
      ) : (
        <div className="createcard" onClick={() => setShow(true)}>
          + Add Card
        </div>
      )}
    </>
  );
};

export default CreateCard;
