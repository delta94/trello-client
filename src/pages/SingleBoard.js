import React, { useState, useEffect, useContext } from "react";

import { config } from "../config";

import {
  getSingleBoard,
  updateBoard,
  deleteBoard
} from "../api/boardController";

import { createList, deleteList } from "../api/listController";
import { createCard, deleteCards } from "../api/cardController";
//import { uploadAvatar } from '../api/uploadController';

import { ModalContext } from "../context/modalContext";
import { getUser } from "../utils/localStorage";

import Layout from "../hoc/Layout";
import List from "../components/lists/List";
import CreateList from "../components/lists/CreateList";
import Card from "../components/card/Card";
import CreateCard from "../components/card/CreateCard";
import CreateBoard from "../components/board/CreateBoard";

function SingleBoard({ match, history }) {
  const [board, setBoard] = useState({});
  const [organizer, setOrganizer] = useState("");
  const [list, setList] = useState({
    name: "",
    error: false,
    msg: ""
  });

  const [bg, setBg] = useState(new Set([]));
  const [showBoardSettingModal, setShowBoardSettingModal] = useState(false);
  const [cardName, setCardName] = useState("");
  const { closeModal } = useContext(ModalContext);

  const { id } = match.params;

  const organizerAvatar = {
    background: `url(${config.baseUrl}/${organizer})`
  };

  useEffect(() => {
    fetchSingleBoard();
  }, []);

  const fetchSingleBoard = async () => {
    const [err, response] = await getSingleBoard(id);
    if (err) return err.response;

    setBoard(response.data);
    setOrganizer(response.data.idOrganization.avatar);

    const background = new Set([response.data.bgPath]);
    setBg(background);
  };

  const changeBoardTitle = async e => {
    if (e.currentTarget.textContent === "")
      return (e.currentTarget.textContent = board.name);

    const data = {
      name: e.currentTarget.textContent,
      bgPath: board.bgPath
    };
    let [err, response] = await updateBoard(id, data);

    if (err) return err.response;
    setBoard({ ...board, name: response.data.name });
  };

  const handleCreateList = async e => {
    e.preventDefault();
    // get user from localstorage
    const user = getUser();
    // data for post req
    const listData = {
      name: list.name,
      idMemberCreator: user._id,
      idBoard: board._id
    };

    let [err, response] = await createList(listData);

    if (err)
      return setList({
        ...list,
        error: true,
        msg: err.response.data
      });

    // Update board with latest list
    setBoard({ ...board, lists: [...board.lists, response.data] });
    setList({ ...list, name: "" });

    closeModal();
  };

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
      ...board,
      actions: [
        ...board.actions,
        {
          action: "createcard",
          _id: response.data._id,
          data: {
            card: {
              name: cardName
            },
            list: {
              _id: listId
            }
          }
        }
      ]
    });

    setCardName("");
  };

  const handleDeleteBoard = async () => {
    const id = match.params;
    const [err] = await deleteBoard(id);
    if (err) return err.response;

    history.push("/");
  };

  const handleDeleteCards = async id => {
    const [err, response] = await deleteCards({
      id,
      boardId: match.params
    });

    if (err) return err.response;
    setBoard(response.data);
  };

  // Archive Lists
  const handleDeleteList = async id => {
    const [err] = await deleteList(id);
    if (err) return err.response;

    setBoard({
      ...board,
      lists: board.lists.filter(list => list._id !== id)
    });
  };

  const hanldeUpdateBoard = async e => {
    e.preventDefault();
    const data = {
      name: board.name,
      bgPath: board.bgPath
    };

    setShowBoardSettingModal(false);
    await updateBoard(id, data);
  };

  const onSelectBackground = img => {
    let newBackground = new Set([img]);
    setBg(newBackground);
    setBoard({ ...board, bgPath: img });
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
          <button
            type="button"
            className="btn btn-transparent danger btn-rounded btn-icon ml-4"
            onClick={handleDeleteBoard}
          >
            <i className="material-icons">delete</i>
          </button>
          <button
            type="button"
            className="btn btn-transparent btn-rounded btn-icon ml-4"
            onClick={() => setShowBoardSettingModal(true)}
          >
            <i className="material-icons">settings</i>
          </button>

          <div className="organizer">
            <div className="avatar" style={organizerAvatar}></div>
          </div>
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

        <CreateBoard
          show={showBoardSettingModal}
          modalClose={() => setShowBoardSettingModal(false)}
          onSubmit={hanldeUpdateBoard}
          onChange={e => setBoard({ ...board, name: e.target.value })}
          value={board.name}
          error={board.error}
          errorMsg={board.msg}
          selectedBg={bg}
          onClickBg={onSelectBackground}
          modalOnly={true}
          title="Update Board"
          btnText="Update"
        />
      </div>
    </Layout>
  );
}

export default SingleBoard;
