import React, { useState, useEffect, useContext } from "react";
import to from 'await-to-js';

import { http } from '../http';
import { ModalContext } from '../context/modalContext';
import { getItemFromLocal } from '../utils/localStorage';

import Layout from '../hoc/Layout';
import List from '../components/lists/List';
import CreateList from '../components/lists/CreateList';
import Card from '../components/card/Card';

function SingleBoard({ match }) {
  const [board, setBoard] = useState({});
  const [list, setList] = useState({
    name: '',
    error: false,
    msg: ''
  });

  const [card, setCard] = useState({
    name: '',
    addCard: new Set([]),
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
    setBoard({ ...board, name: response.data.name })
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


  const addCardhandler = (id) => {
    const newList = new Set([]);
    newList.add(id);
    setCard({ ...card, addCard: newList });
  }

  const createCard = async (e, listId) => {
    e.preventDefault();
    const cardData = {
      name: card.name,
      idBoard: board._id,
      idList: listId
    };



    let [err, response] = await to(http.post('/card/create', cardData));
    setBoard({
      ...board, actions: [...board.actions, {
        action: 'createcard',
        _id: response.data._id,
        data: {
          card: {
            name: card.name,
          },
          list: {
            _id: listId
          }
        }
      }]
    })

    console.log(response, err);
  }

  const closeCardhandler = () =>
    setCard({ ...card, addCard: new Set([]) });

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
                  <List
                    listId={item._id}
                    name={item.name}
                    onSubmitCard={e => createCard(e, item._id)}
                    cardValue={card.name}
                    isAddCard={card.addCard}
                    onChange={e => setCard({ ...card, name: e.target.value })}
                    addCard={() => addCardhandler(item._id)}
                    onClose={closeCardhandler}
                >
                  {
                    board.actions && board.actions.map(card => {
                      return card.action === 'createcard' && card.data.list._id === item._id
                       ?
                        <Card key={card._id} name={card.data.card.name} />
                      : null;
                    })
                  }
                  </List>
                </div>
              ))
            : null}
          <div className="col-md-3">
            <CreateList
              show={show}
              modalOpen={openModal}
              modalClose={closeModal}
              value={list.name}
              onChange={e => setList({ ...list, name: e.target.value })}
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
