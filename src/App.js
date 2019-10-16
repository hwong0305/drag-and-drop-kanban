import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';

import Board from './Components/Board';
import reorder from './reorder';

const App = () => {
  const [todoMap, setTodoMap] = useState({
    toDo: [],
    doing: [],
    done: [],
    approved: [],
  });

  const setTodos = update => {
    setTodoMap({ ...todoMap, toDo: update });
  };
  const setDoing = update => {
    setTodoMap({ ...todoMap, doing: update });
  };
  const setDone = update => {
    setTodoMap({ ...todoMap, done: update });
  };
  const setApproved = update => {
    setTodoMap({ ...todoMap, approved: update });
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
