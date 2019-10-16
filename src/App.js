import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';

import Board from './Components/Board';
import reorder from './reorder';

const App = () => {
  const [todoMap, setTodoMap] = useState({
    ToDo: [],
    Doing: [],
    Done: [],
    Approved: [],
  });

  const setTodos = update => {
    setTodoMap({ ...todoMap, ToDo: update });
  };
  const setDoing = update => {
    setTodoMap({ ...todoMap, Doing: update });
  };
  const setDone = update => {
    setTodoMap({ ...todoMap, Done: update });
  };
  const setApproved = update => {
    setTodoMap({ ...todoMap, Approved: update });
  };

  const setFunctions = [setTodos, setDoing, setDone, setApproved];

  const onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) return;
    setTodoMap(reorder(todoMap, source, destination));
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(todoMap).map((key, id) => (
          <Board
            name={key}
            key={id}
            listId={key}
            listType="CARD"
            todos={todoMap[key]}
            setTodos={setFunctions[id]}
          ></Board>
        ))}
      </DragDropContext>
    </div>
  );
};

export default App;
