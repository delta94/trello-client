import React from 'react';
import Card from './BoardCard';
import Modal from '../modal/Modal';
import Input from '../forms/Input';
import Error from "../FormError";

const CreateBoard = (props) => (
  <>
    <Card name="Create new board" onClick={props.modalOpen} />

    <Modal show={props.show} onClose={props.modalClose} title="Create Board">
      <form action="" onSubmit={props.onSubmit}>
        <Input
          label="Board Name"
          name="name"
          mb={true}
          onChange={props.onChange}
          className="form-control white"
          value={props.value}
          type="text"
        />

        <Error error={props.error} msg={props.errorMsg} />

        <button type="submit" className="btn btn-success">
          Create Board
        </button>
      </form>
    </Modal>
  </>
);

export default CreateBoard;
