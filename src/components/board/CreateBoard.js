import React from 'react';
import Card from '../card/Card';
import Modal from '../modal/Modal';
import Input from '../forms/Input';

const CreateBoard = (props) => (
  <>
    <Card name="Create new board" onClick={props.modalOpen} />

    <Modal show={props.show} onClose={props.modalClose} title="Create Board">
      <form action="" onSubmit={props.onSubmit}>
        <Input
          label="Board Name"
          name="name"
          onChange={props.onChange}
          className="form-control white"
          value={props.value}
          type="text"
        />

        <button type="submit" className="btn btn-success">
          Create Board
        </button>
      </form>
    </Modal>
  </>
);

export default CreateBoard;
