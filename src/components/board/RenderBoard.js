import React from "react";
import Card from "../card/Card";

// Render Board component
const RenderBoard = ({ board, onClickBoard }) => (
  <div className="col-lg-3 mb-4">
    <Card name={board.name} onClick={() => onClickBoard(board._id)} />
  </div>
);

export default RenderBoard;
