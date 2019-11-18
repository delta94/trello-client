import React, { useEffect, useState, useContext } from 'react';

import { getBoards, createBoard } from '../api/boardController';

import Layout from '../hoc/Layout';
import RenderBoard from '../components/board/RenderBoard';
import CreateBoard from '../components/board/CreateBoard';

import { ModalContext } from '../context/modalContext';

function Boards({ history, match }) {
  const [boardData, setBoardData] = useState([]);
  const [board, setBoard] = useState({
    name: '',
    error: false,
    msg: ''
  });
  const [postBoard, setPostBoard] = useState(false);
  const [selectedBg, setSelectedBg] = useState(new Set());

  const {show, openModal, closeModal} = useContext(ModalContext);

  /**
   * *Check token available on localstorage
   * !if no token redirect to login page
   * otherwise fetch boards data and
   * set to state
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      history.push("/login");
    } else {
      getAllBoards();
    }
  }, [postBoard]);

  /**
   * getAllBoards
   * @desc get all boards data /board api
   */
  const getAllBoards = async () => {
    let [err, response] = await getBoards();

    // Check error and token validation
    if (err !== null) {
      if (err.response.data.invalid) {
        return history.push("/login");
      }
    }

    setBoardData(response.data);
  };

  /**
   * * Redirect route to single board page
   */
  const getSingleBoard = (id) =>
    history.push(`/board/${id}`);

  /**
   * onInputChage method
   * for creating Board
   */
  const onInputChange = e =>
    setBoard({ name: e.target.value });

  /**
   * Post request to server
   * when createBoard call
   */
  const createBoardHanlder = async (e) => {
    e.preventDefault();

    const bgPath = selectedBg.values().next().value;
    const newBoard = { name: board.name, bgPath };

    let [err, response] = await createBoard(newBoard);

    if (err !== null)
      return setBoard({
        ...board,
        error: true,
        msg: err.response.data.msg
      });

    setBoardData([...boardData, response.data]);
    setPostBoard(!postBoard);
    setBoard({ name: '', error: false, msg: '' });
    // Close modal when done
    closeModal();
    setSelectedBg(new Set());
  };

  // Set seleted bg to state and pass it
  // when create board
  const onClickBg = (img) => {
    const bgPath = new Set();
    bgPath.add(img);
    setSelectedBg(bgPath);
  }


  return (
    <Layout>
      <div className="row">
        <div className="col-md-12 mb-4">
          <h3>Boards</h3>
        </div>
        {boardData && boardData.length > 0
          ? boardData.map((board, index) => (
              <RenderBoard
                key={index}
                board={board}
                onClickBoard={getSingleBoard}
              />
            ))
          : null}

        <div className="col-lg-3">
          <CreateBoard
            modalOpen={openModal}
            show={show}
            modalClose={closeModal}
            onSubmit={createBoardHanlder}
            onChange={onInputChange}
            value={board.name}
            error={board.error}
            errorMsg={board.msg}
            selectedBg={selectedBg}
            onClickBg={onClickBg}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Boards;
