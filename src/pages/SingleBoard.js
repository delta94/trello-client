import React, { useState, useEffect, useContext } from "react";

import { getSingleBoard, updateBoardTitle } from "../api/boardController";
import { createList, archiveList } from "../api/listController";
import { createCard } from '../api/cardController';

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
    getSingleBoardDetails();
  }, []);

  // Get single from api
  const getSingleBoardDetails = async () => {
    const [err, response] = await getSingleBoard(id);
    if (err) return err.response;

    setBoard(response.data);
  };

  /**
   * Change Board title
   * with contenteditable feature
   * and when the title is onBlur
   * send request to server to change
   * the board name
   */
  const changeTitle = async e => {
    if (e.currentTarget.textContent === '')
      return e.currentTarget.textContent = board.name;

    const newTitle = { name: e.currentTarget.textContent };
    let [err, response] = await updateBoardTitle(id, newTitle);

    if (err) return err.response;
    setBoard({ ...board, name: response.data.name })
  }

  /**
   * Create List handeler
   * shows a modal with list name input filed
   * member and board id passed via
   * localstorage user id and single board data id
   */
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

    let [err, response] = await createList(listData);

    if (err) return setList({
      ...list,
      error: true,
      msg: err.response.data
    });

    // Update board with latest list
    setBoard({ ...board, lists: [...board.lists, response.data] });
    setList({ ...list, name: '' });

    closeModal();
  };

  /**
   * Add card handler function set the list id to state
   * so that this specific list can shows a input filed at
   * the bottom of the list to add Card on that list
   */
  const addCardhandler = (id) => {
    const newList = new Set([]);
    newList.add(id);
    setCard({ ...card, addCard: newList });
  }

  /**
   * When click close beside add card close button
   * remove list id from set and hide card add input filed
   * and show add card button instead
   */
  const closeCardhandler = () =>
    setCard({ ...card, addCard: new Set([]) });

  /**
   * createCard function trigger when
   * user add card name and click enter or add button
   * send api call with card name, board id, and list id
   *
   * after create card successful update the board actions array
   */
  const createCardHandler = async (e, listId) => {
    e.preventDefault();
    const cardData = {
      name: card.name,
      idBoard: board._id,
      idList: listId
    };

    let [, response] = await createCard(cardData);

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
  };

  const archiveCardHandler = () => {


  };

  const archiveListHandler = async (id) => {
    const [err] = await archiveList(id);
    if (err) return err.response;

    setBoard({ ...board, lists: board.lists.filter((list) => list._id !== id) });
  }

  return (
    <Layout bg={board.bgPath} className="single-board-wrapper">
      <div className="single-board">
        <h3
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={changeTitle}
          className="board-name"
        >
          {board.name}
        </h3>

        <div className="board-lists row flex-nowrap pt-3">
          {board.lists && board.lists.length > 0
            ? board.lists.map((item, index) =>
                !item.closed ? (
                  <div className="col-md-3" key={index}>
                    <List
                      listId={item._id}
                      name={item.name}
                      onSubmitCard={e => createCardHandler(e, item._id)}
                      cardValue={card.name}
                      isAddCard={card.addCard}
                      onChange={e => setCard({ ...card, name: e.target.value })}
                      addCard={() => addCardhandler(item._id)}
                      onClose={closeCardhandler}
                      onAddCard={addCardhandler}
                      onArchiveAllCard={archiveCardHandler}
                      onArchiveList={() => archiveListHandler(item._id)}
                    >
                      {board.actions &&
                        board.actions.map(card => {
                          return card.action === "createcard" &&
                            card.data.list._id === item._id ? (
                            <Card key={card._id} name={card.data.card.name} />
                          ) : null;
                        })}
                    </List>
                  </div>
                ) : null
              )
            : null}
          <div className="col-md-3">
            <CreateList
              lists={board.lists}
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
