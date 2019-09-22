import React, { useEffect, useState } from 'react';
import to from 'await-to-js';

import { config } from '../config';
import { http } from '../http';

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
    setBoardData([...boardData, response.data]);
  }

  const RenderBoard = ({data}) => {
    return data.map(board => <div className="col-lg-4" key={board.id}>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{board.name}</h4>
        </div>
      </div>
    </div>)
  }

  return (
    <div className="container-fluid page-body-wrapper">
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            {boardData.length > 0 ? (
              <RenderBoard data={boardData} />
            ) : (
              <h3>You haven't created board yet.</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boards;
