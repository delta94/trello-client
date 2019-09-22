import React, { useEffect } from 'react';
import to from 'await-to-js';

import { config } from '../config';
import { http } from '../http';

function Boards({history}) {
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
    let [err, response] =  await to(http.get(`${config.baseUrl}/board`));
    console.log(err, response);
  }

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        Boards
      </div>
    </div>
  );
}

export default Boards;
