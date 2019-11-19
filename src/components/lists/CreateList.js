import React, {useContext} from "react";
import Modal from "../modal/Modal";
import Input from "../forms/Input";
import Error from "../FormError";
import { ModalContext } from "../../context/modalContext";

const CreateList = props => {
  const { show, openModal, closeModal } = useContext(ModalContext);
  return (
    <>
      <div className="transparent-white-btn" onClick={openModal}>
        {props.lists && props.lists.length > 0
          ? "+ Add another List"
          : "+ Add a list"}
      </div>

      <Modal show={show} onClose={closeModal} title="Add List">
        <form action="" onSubmit={props.onSubmit}>
          <Input
            name="name"
            onChange={props.onChange}
            className="form-control white"
            value={props.value}
            type="text"
            mb={true}
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
};

export default CreateList;
