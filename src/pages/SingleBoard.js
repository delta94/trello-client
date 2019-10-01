import React, {useState, useEffect} from 'react';
import to from 'await-to-js';

import { http } from '../http';

import Layout from '../hoc/Layout';

function SingleBoard({ match }) {
  const [board, setBoard] = useState({});

  const { id } = match.params;

  // Get single board data
  // Before page render
  useEffect(() => {
    getSingleBoard();
  }, []);

  // Single board request
  const getSingleBoard = async () => {
    const [err, response] = await to(http.get(`/board/${id}`));
    if (err) return err.response;

    setBoard(response.data.board);
  };

  // Change title method
  const changeTitle = async e => {
    await to(
      http.put(`/board/${id}`, { name: e.currentTarget.textContent })
    );
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
