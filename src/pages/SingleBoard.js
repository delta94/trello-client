import React, {useState, useEffect, useContext} from 'react';
import to from 'await-to-js';

import { http } from '../http';
import { ModalContext } from '../context/modalContext';
import { getItemFromLocal } from '../utils/localStorage';

import Layout from '../hoc/Layout';
import List from '../components/lists/List';
import CreateList from '../components/lists/CreateList';

function SingleBoard({ match }) {
  const [board, setBoard] = useState({});
  const [list, setList] = useState({
    name: '',
    error: false,
    msg: ''
  });

  const { show, openModal, closeModal } = useContext(ModalContext);

  const { id } = match.params;

  // Get single board data
  useEffect(() => {
    getSingleBoard();
  }, []);

  // Single board request
  const getSingleBoard = async () => {
    const [err, response] = await to(http.get(`/board/${id}`));

    if (err) return err.response;

    setBoard(response.data);
  };

  // Change title
  const changeTitle = async e => {
    if (e.currentTarget.textContent === '')
      return e.currentTarget.textContent = board.name;

    let [err, response] = await to(http.put(`/board/${id}`, { name: e.currentTarget.textContent }));

    if (err) return err.response;
    setBoard(response.data)
  }

  const onCreateList = async (e) => {
    e.preventDefault();
    // get user from localstorage
    const user = getItemFromLocal('user');
    // data for post req
    const listData = {
      name: list.name,
      idMemberCreator: user._id,
      idBoard: board._id
    }

    let [err, response] = await to(http.post('/list/create', listData));

    if (err) return setList({
      ...list,
      error: true, msg: err.response.data
    });

    // Update board with latest list
    setBoard({ ...board, lists: [...board.lists, response.data] });

    closeModal();
  };

  return (
    <Layout>
      <div className="single-board">
        <h3
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={changeTitle}
          className="board-name"
        >
          {board.name}
        </h3>

        <div className="board-lists row flex-nowrap pt-5">
          {board.lists && board.lists.length > 0
            ? board.lists.map((item, index) => (
                <div className="col-md-3" key={index}>
                  <List name={item.name} />
                </div>
              ))
            : null}
          <div className="col-md-3">
            <CreateList
              show={show}
              modalOpen={openModal}
              modalClose={closeModal}
              value={list.name}
              onChange={(e) => setList({...list, name: e.target.value})}
              onSubmit={onCreateList}
              error={list.error}
              errorMsg={list.msg}
              />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SingleBoard;
