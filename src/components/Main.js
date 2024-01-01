import React from 'react';
import Whiteboard from './Whiteboard';

const Main = () => {
  console.log('main');

  return (
    <div className="whiteboard-container">
      <div className="whiteboard">
        <Whiteboard />
      </div>
    </div>
  );
};

export default Main;
