import React, { useEffect, useState, useContext } from 'react';
import to from 'await-to-js';

import { http } from '../http';

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
   * Check token available on localstorage
   * or not, if not redirect to login page
   * otherwise fetch boards data and
   * set to state
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      history.push("/login");
    } else {
      getBoards();
    }
  }, [postBoard]);

  // Get all boards
  const getBoards = async () => {
    let [err, response] = await to(
      http.get('/board')
    );

    // Check error and token validation
    if (err !== null) {
      if (err.response.data.invalid) {
        return history.push("/login");
      }
    }

    setBoardData(response.data);
  };

  /**
   * gets the single board data
   * route change to single board
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
  const createBoard = async (e) => {
    e.preventDefault();

    const bgPath = selectedBg.values().next().value;

    let [err, response] = await to(http.post(
      '/board/create', { name: board.name, bgPath }));

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
            onSubmit={createBoard}
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
