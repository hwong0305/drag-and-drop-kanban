import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Board = props => {
  const { listId, listType, name } = props;
  const [message, setMessage] = useState('');
  return (
    <div className="kanban">
      <header className="board-header" id={name}>
        <span>{name}</span>
      </header>
      <main>
        <div>
          <Droppable
            droppableId={listId}
            type={listType}
            direction="vertical"
            isCombineEnabled={true}
          >
            {dropProvided => (
              <div {...dropProvided.droppableProps}>
                <div>
                  <div ref={dropProvided.innerRef}>
                    <ul className="todos">
                      {props.todos.map((msg, index) => (
                        <Draggable
                          draggableId={`${props.name}:${index}`}
                          key={index}
                          index={index}
                        >
                          {dragProvided => (
                            <div
                              {...dragProvided.dragHandleProps}
                              {...dragProvided.draggableProps}
                              ref={dragProvided.innerRef}
                              className="item"
                            >
                              <div>
                                <li
                                  onClick={() => {
                                    const confirmed = window.confirm(
                                      'Are you sure you want to delete?'
                                    );
                                    if (!confirmed) return;

                                    const messages = [...props.todos];

                                    messages.splice(index, 1);
                                    props.setTodos(messages);
                                  }}
                                  key={index}
                                >
                                  {msg}
                                </li>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </ul>
                  </div>
                </div>
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </main>
      <footer>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              const messages = [...props.todos];
              messages.push(message);
              setMessage('');
              props.setTodos(messages);
            }
          }}
        ></textarea>
        <button
          type="button"
          className="submit-button"
          onClick={() => {
            const messages = [...props.todos];
            messages.push(message);
            setMessage('');
            props.setTodos(messages);
          }}
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Board;
