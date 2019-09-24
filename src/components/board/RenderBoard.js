import React from 'react';
import Card from '../card/Card';

// Render Board component
const RenderBoard = ({ data, onClickBoard }) => {
  return data.map((board, index) => (
    <div className="col-lg-3 mb-4" key={index}>
      <Card
        name={board.name}
        onClick={() => onClickBoard(board._id)}
      />
    </div>
  ));
};

export default RenderBoard;
