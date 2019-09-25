import React, { useEffect, useState, useContext } from 'react';
import to from 'await-to-js';

import { clearLocalStorage } from '../utils/localStorage';

import { config } from '../config';
import { http } from '../http';

import Layout from '../hoc/Layout';
import RenderBoard from '../components/board/RenderBoard';
import CreateBoard from '../components/board/CreateBoard';

import { ModalContext } from '../context/modalContext';

function Boards({ history }) {
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
    //let boards = [...boardData];
    let [err, response] = await to(
      http.get('/board')
    );

    //console.log(err.response);

    if (err !== null && err.response.data) {
      console.log(err.response)
      //return clearLocalStorage();
    }

    if (response) {
      console.log(response)
      setBoardData(response.data);
    }
  };

  /**
   * gets the single board data
   * route change to single board
   */
  const getSingleBoard = (id) => {
    console.log(id);
  }

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

    let [err, response] = await to(http.post(
      `${config.baseUrl}/board/create`, boardName));

    console.log(response);

    setBoardData(boardData.concat(response.data));
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
