import React, { useState } from 'react';
import Todo from './Todo';

const TodoForm = ({ todoText, setTodoText, edit, onHandle }) => {
  return (
    <form onSubmit={onHandle}>
      <div className="input-group mb-3 mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Add your todo"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button
          className={`btn btn-${
            edit ? 'primary text-white' : 'pink'
          } text-dark`}
          type="submit"
          id="button-addon2"
        >
          {edit ? 'SAVE' : 'ADD'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
