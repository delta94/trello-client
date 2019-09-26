import React, { useEffect, useState, useContext } from 'react';
import to from 'await-to-js';

import { http } from '../http';

import Layout from '../hoc/Layout';
import RenderBoard from '../components/board/RenderBoard';
import CreateBoard from '../components/board/CreateBoard';

import { ModalContext } from '../context/modalContext';

function Boards({ history, match }) {
  const [boardData, setBoardData] = useState([]);
  const [boardName, setBoardName] = useState({name: ''});
  const [postBoard, setPostBoard] = useState(false);

  const {show, openModal, closeModal} = useContext(ModalContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      history.push("/login");
    } else {
      getBoards();
    }
  }, [postBoard]);

  const getBoards = async () => {
    let [err, response] = await to(
      http.get('/board')
    );

    // Check error and token validation
    if (err !== null && err.response.data.invalid)
      return history.push("/login");


      setBoardData(response.data);
  };

  /**
   * gets the single board data
   * route change to single board
   */
  const getSingleBoard = (id) => history.push(`/board/${id}`);

  /**
   * onInputChage method
   * on creating Board
   */
  const onInputChange = e =>
    setBoardName({[e.target.name]: e.target.value});

  /**
   * Post request to server
   * when createBoard call
   */
  const createBoard = async (e) => {
    e.preventDefault();

    let [, response] = await to(http.post(
      '/board/create', boardName));

    setBoardData([...boardData, response.data]);
    setPostBoard(!postBoard);
    // Close modal when done
    closeModal();
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12 mb-4">
          <h3>Boards</h3>
        </div>
        {boardData && boardData.length > 0 ?
          boardData.map((board, index) => <RenderBoard
            key={index}
            board={board}
            onClickBoard={getSingleBoard} />)
         : null}

        <div className="col-lg-3">
          <CreateBoard
            modalOpen={openModal}
            show={show}
            modalClose={closeModal}
            onSubmit={createBoard}
            onChange={onInputChange}
            value={boardName.name}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Boards;
