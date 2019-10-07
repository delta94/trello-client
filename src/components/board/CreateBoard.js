import React from 'react';
import Card from './BoardCard';
import Modal from '../modal/Modal';
import Input from '../forms/Input';
import Error from "../FormError";

import { config } from '../../config';

const CreateBoard = (props) => {
  const imgPath = Object.values(config.boardBd);

  return (
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

          <div className="card-bgs">
            {
              imgPath.map((img, i) => <div
                key={i}
                className={props.selectedBg.has(img) ? 'bg selected' : 'bg'}
                onClick={() => props.onClickBg(img)}
                style={{ background: 'url(' + img + ') center center no-repeat' }}></div>)
            }
          </div>

          <Error error={props.error} msg={props.errorMsg} />

          <button type="submit" className="btn btn-success">
            Create Board
        </button>
        </form>
      </Modal>
    </>
  )

};

export default CreateBoard;
