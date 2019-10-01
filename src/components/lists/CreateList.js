import React from "react";
import Modal from "../modal/Modal";
import Input from "../forms/Input";
import Error from "../FormError";

const CreateList = props => (
  <>
    <button
      type="button"
      onClick={props.modalOpen}
      className="btn btn-outline-info btn-fw btn-lg btn-block"
    >
      Add List
    </button>

    <Modal show={props.show} onClose={props.modalClose} title="Add List">
      <form action="" onSubmit={props.onSubmit}>
        <Input
          name="name"
          onChange={props.onChange}
          className="form-control white"
          value={props.value}
          type="text"
          placeholder="List name"
        />

        <Error error={props.error} msg={props.errorMsg} />

        <button type="submit" className="btn btn-success">
          Create List
        </button>
      </form>
    </Modal>
  </>
);

export default CreateList;
