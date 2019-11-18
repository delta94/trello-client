import React, { useEffect, useState, useContext } from "react";

import { getBoards, createBoard } from "../api/boardController";
import { config } from "../config";
import { checkToken } from '../utils/checkToken';
import { ModalContext } from "../context/modalContext";

import Layout from "../hoc/Layout";
import RenderBoard from "../components/board/RenderBoard";
import CreateBoard from "../components/board/CreateBoard";

const NEW_BOARD = {
  name: "",
  error: false,
  msg: ""
};

function Boards({ history }) {
  // All board data
  const [board, setBoard] = useState({
    new: NEW_BOARD,
    items: [],
    bg: new Set([config.background.one])
  });

  const { show, openModal, closeModal } = useContext(ModalContext);

  /**
   * *Check token available on localstorage
   * !if no token redirect to login page
   * otherwise fetch boards data and set to state
   */
  useEffect(() => {
    checkToken(history, getAllBoards());
  }, []);

  // Get all boards
  const getAllBoards = async () => {
    let [err, response] = await getBoards();

    if (err !== null) {
      if (err.response.data.invalid) {
        return history.push("/login");
      }
    }

    setBoard({ ...board, items: response.data });
  };

  const onInputChange = e =>
    setBoard({
      ...board,
      newBoard: { ...board.new, name: e.target.value }
    });

  const onSelectBackground = img => {
    let newBackground = new Set([img]);
    setBoard({ ...board, bg: newBackground });
  };

  // Create new board
  const hanldeCreateBoard = async e => {
    e.preventDefault();

    const bgPath = board.bg.values().next().value;
    const newBoard = { name: board.new.name, bgPath };

    let [err, response] = await createBoard(newBoard);

    if (err !== null)
      return setBoard({
        ...board,
        new: {
          ...board.new,
          error: true,
          msg: err.response.data.msg
        }
      });

    setBoard({
      ...board,
      new: NEW_BOARD,
      items: [...board.items, response.data],
      bg: new Set([config.background.one])
    });

    closeModal();
  };

  // Redirect route to single board page /board/:id
  const redirectToSingleBoardPage = id => history.push(`/board/${id}`);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12 mb-4">
          <h3>Boards</h3>
        </div>
        {board && board.items.length > 0
          ? board.items.map((board, index) => (
              <RenderBoard
                key={index}
                board={board}
                onClickBoard={redirectToSingleBoardPage}
              />
            ))
          : null}

        <div className="col-lg-3">
          <CreateBoard
            modalOpen={openModal}
            show={show}
            modalClose={closeModal}
            onSubmit={hanldeCreateBoard}
            onChange={onInputChange}
            value={board.new.name}
            error={board.new.error}
            errorMsg={board.new.msg}
            selectedBg={board.bg}
            onClickBg={onSelectBackground}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Boards;
