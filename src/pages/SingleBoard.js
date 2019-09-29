import React, {useState, useEffect} from 'react';
import to from 'await-to-js';

import { http } from '../http';

import Layout from '../hoc/Layout';

function SingleBoard({ match }) {
  const [board, setBoard] = useState({});

  const id = match.params.id;

  useEffect(() => {
    getSingleBoard();
  }, []);

  const getSingleBoard = async () => {
    const [err, response] = await to(http.get(`/board/${id}`));
    if (err) return err.response;

    console.log(response.data.board);
    setBoard(response.data.board);
  };

  const changeTitle = async e => {
    setBoard({
      ...board,
      name: e.currentTarget.textContent
    });

    let [, response] = await to(http.put(`/board/${id}`, board));
    console.log(response);
  }

  return (
    <Layout>
      <div className="single-board">
        <h3
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={changeTitle}
        >
          {board.name}
        </h3>
      </div>
    </Layout>
  );
}

export default SingleBoard;
