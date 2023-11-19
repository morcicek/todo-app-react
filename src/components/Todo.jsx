import React, { useState } from 'react';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoMdDoneAll } from 'react-icons/io';

const Todo = ({
  todos,
  changeIsDone,
  onDelete,
  setTodoText,
  setWillUpdateTodo,
  setEdit,
  todoText,
}) => {
  // const [done, setDone] = useState(false);

  if (todos.length) {
    return (
      <>
        {todos.map((item) => {
          if (item.text === todoText) {
            alert('You have already that Todo');
            return null;
          }
          return (
            <div
              className={`card mb-3 ${
                item.isDone ? 'bg-success-subtle' : 'bg-light'
              }`}
              key={item.id}
            >
              <div className="card-body d-flex justify-content-between">
                <p className="fs-5">
                  {item.text}{' '}
                  {item.isDone && <IoCheckmarkDoneSharp color="green" />}{' '}
                </p>

                <div>
                  <MdDelete
                    onClick={() => {
                      onDelete(item.id);
                      setTodoText('');
                    }}
                    className="fs-2 cursor m-1"
                    color="red"
                  />
                  {!item.isDone ? (
                    <FaCheck
                      onClick={() => {
                        changeIsDone(item.id);
                      }}
                      className="fs-3 mx-2 cursor"
                      color="gray"
                    />
                  ) : (
                    <IoCheckmarkDoneSharp
                      onClick={() => {
                        changeIsDone(item.id);
                      }}
                      className="fs-3 mx-2 cursor"
                      color="gray"
                    />
                  )}
                  <FiEdit
                    onClick={() => {
                      setEdit(true);
                      setWillUpdateTodo(item.id);
                      setTodoText(item.text);
                    }}
                    className="fs-3 ms-1 cursor"
                    color="pink"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  return <p className="text-center fs-4">There is no Todo to show </p>;
};

export default Todo;
