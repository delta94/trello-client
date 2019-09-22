import React, { useEffect, useState } from 'react';
import to from 'await-to-js';

import { config } from '../config';
import { http } from '../http';

import Layout from '../hoc/Layout';

function Boards({ history }) {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    let [, response] =  await to(http.get(`${config.baseUrl}/board`));
    return setBoardData(response.data);
  }

  console.log(boardData);

  const RenderBoard = ({data}) => {
    return data.map((board, index) => <div className="col-lg-3" key={index}>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{board.name}</h4>
        </div>
      </div>
    </div>)
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h3>Boards</h3>
        </div>
        {boardData && boardData.length > 0 ? (
          <RenderBoard data={boardData} />
        ) : (
          <h3>You haven't created a board yet.</h3>
        )}
      </div>
    </Layout>
  );
}

export default Boards;
