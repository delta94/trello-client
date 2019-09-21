import React, { useEffect } from 'react';

function Boards({history}) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(history);
    if (token === null) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="">Board</div>
  )
}

export default Boards;
