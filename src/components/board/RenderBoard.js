import React from "react";
import Card from "./BoardCard";

// Render Board component
const RenderBoard = ({ board, onClickBoard }) => (
  <div className="col-lg-3 mb-4">
    <Card
      name={board.name}
      style={{ background: `url(${board.bgPath}) center center no-repeat` }} onClick={() => onClickBoard(board._id)}
      />
  </div>
);

export default RenderBoard;
