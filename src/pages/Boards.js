import React, { useEffect, useState } from 'react';
import to from 'await-to-js';

import { config } from '../config';
import { http } from '../http';

import Layout from '../hoc/Layout';
import Card from '../components/card/Card';
import Modal from '../components/modal/Modal';

function Boards({ history }) {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      history.push("/login");
    }
  }, []);

  const getBoards = async () => {
    let [err, response] =
      await to(http.get(`${config.baseUrl}/board`));

    if (err) return err.response;
    setBoardData(response.data);
  };


  const RenderBoard = ({ data, onClickBoard }) => {
    return data.map((board, index) => (
      <div className="col-lg-3" key={index}>
        <Card
          name={board.name}
          onClick={() => onClickBoard(board._id)}
        />
      </div>
    ));
  };

  /**
   * gets the single board data
   * route change to single board
   */
  const getSingleBoard = (id) => {
    console.log(id);
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12 mb-4">
          <h3>Boards</h3>
          <Modal show={true} />
        </div>
        {boardData && boardData.length > 0 ? (
          <RenderBoard
            data={boardData}
            onClickBoard={getSingleBoard}
          />
        ) : null}
        <div className="col-lg-3">
          <Card name="Create new board" />
        </div>
      </div>
    </Layout>
  );
}

export default Boards;
