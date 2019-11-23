import React, { useState, useEffect, useContext } from "react";

import { getSingleBoard, updateBoardTitle, deleteBoard } from "../api/boardController";
import { createList, deleteList } from "../api/listController";
import { createCard, deleteCards } from '../api/cardController';
import { uploadAvatar } from '../api/uploadController';

import { ModalContext } from '../context/modalContext';
import { getUser } from '../utils/localStorage';

import Layout from '../hoc/Layout';
import List from '../components/lists/List';
import CreateList from '../components/lists/CreateList';
import Card from '../components/card/Card';
import CreateCard from '../components/card/CreateCard';

function SingleBoard({ match, history }) {
  const [board, setBoard] = useState({});
  const [list, setList] = useState({
    name: '',
    error: false,
    msg: ''
  });

  const [cardName, setCardName] = useState('');
  const { closeModal } = useContext(ModalContext);
  const { id } = match.params;

  useEffect(() => {
    getSingleBoardData();
  }, []);

  // Get single from api
  const getSingleBoardData = async () => {
    const [err, response] = await getSingleBoard(id);
    if (err) return err.response;

    setBoard(response.data);
  };


  // Change board title
  const changeBoardTitle = async e => {
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
  const handleCreateList = async (e) => {
    e.preventDefault();
    // get user from localstorage
    const user = getUser();
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
   * When click close beside add card close button
   * remove list id from set and hide card add input filed
   * and show add card button instead
   */
  // Create new card
  const handleCreateCard = async (e, listId) => {
    e.preventDefault();
    const cardData = {
      name: cardName,
      idBoard: board._id,
      idList: listId
    };

    let [err, response] = await createCard(cardData);

    if (err) return;

    setBoard({
      ...board, actions: [...board.actions, {
        action: 'createcard',
        _id: response.data._id,
        data: {
          card: {
            name: cardName,
          },
          list: {
            _id: listId
          }
        }
      }]
    });

    setCardName('');
  };

  const handleDeleteBoard = async () => {
    const id = match.params;
    const [err] = await deleteBoard(id);
    if (err) return err.response;

    history.push('/');
  };

  const handleDeleteCards = async (id) => {
    const [err, response] = await deleteCards({
      id,
      boardId: match.params
    });

    if (err) return err.response;
    setBoard(response.data);
  };

  // Archive Lists
  const handleDeleteList = async (id) => {
    const [err] = await deleteList(id);
    if (err) return err.response;

    setBoard({
      ...board,
      lists: board.lists.filter((list) => list._id !== id)
    });
  };

  return (
    <Layout bg={board.bgPath} className="single-board-wrapper">
      <div className="single-board">
        <div className="board-header d-flex align-items-center pb-2">
          <h3
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={changeBoardTitle}
            className="board-name"
          >
            {board.name}
          </h3>
          <button type="button" className="btn btn-transparent danger btn-rounded btn-icon ml-4" onClick={handleDeleteBoard}>
            <i className="material-icons">
              delete
            </i>
          </button>
        </div>

        <div className="board-lists row flex-nowrap pt-3">
          {board.lists &&
            board.lists.map((item, index) =>
              !item.closed ? (
                <div className="col-md-3" key={index}>
                  <List
                    name={item.name}
                    onArchiveAllCard={() => handleDeleteCards(item._id)}
                    onArchiveList={() => handleDeleteList(item._id)}
                    footer={
                      <CreateCard
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        onSubmit={e => handleCreateCard(e, item._id)}
                      />
                    }
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
            )}
          <div className="col-md-3">
            <CreateList
              lists={board.lists}
              value={list.name}
              onChange={e => setList({ ...list, name: e.target.value })}
              onSubmit={handleCreateList}
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
