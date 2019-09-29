import React, {useState, useEffect} from 'react';
import to from 'await-to-js';

import { http } from '../http';

import Layout from '../hoc/Layout';

function SingleBoard({ match }) {
  const [board, setBoard] = useState({});

  const id = match.params.id;

  // Get single board data
  // Before page render
  useEffect(() => {
    getSingleBoard();
  }, []);

  // Single board request
  const getSingleBoard = async () => {
    const [err, response] = await to(http.get(`/board/${id}`));
    if (err) return err.response;

    console.log(response.data.board);
    setBoard(response.data.board);
  };

  // Change title method
  const changeTitle = async e => {
    setBoard({
      ...board,
      name: e.currentTarget.textContent
    });
    console.log(e.currentTarget.textContent);

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
