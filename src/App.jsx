import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [edit, setEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo] = useState('');

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem('todos');
    if (todosFromLocalStorage === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);

  const deleteTask = (id) => {
    const deletedTodo = todos.filter((el) => el.id !== id);
    setTodos(deletedTodo);
    localStorage.setItem('todos', JSON.stringify(deletedTodo));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoText.length) {
      alert('Please add your todo');
      return null;
    }
    const hasTodos = todos.find((item) => item.text === todoText);
    if (hasTodos !== undefined) {
      alert('You have already that Todo!');
      return;
    }
    if (edit) {
      const searchedTodo = todos.find((todo) => todo.id === willUpdateTodo);
      const updatedTodo = {
        ...searchedTodo,
        text: todoText,
        isDone: false,
      };
      const filteredTodos = todos.filter((item) => item.id !== willUpdateTodo);
      setTodos([...filteredTodos, updatedTodo]);
      localStorage.setItem(
        'todos',
        JSON.stringify([updatedTodo, ...filteredTodos])
      );
      setTodoText('');
      setEdit(false);
      setWillUpdateTodo('');
    } else {
      const newTodo = {
        id: uuidv4(),
        text: todoText,
        isDone: false,
      };
      setTodos([newTodo, ...todos]);
      localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
      setTodoText('');
    }
  };

  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    // setDone(!done);
    localStorage.setItem(
      'todos',
      JSON.stringify([updatedTodo, ...filteredTodos])
    );
  };
  return (
    <div className="container mt-4">
      <h1 className="text-center">My Todo</h1>
      <TodoForm
        todoText={todoText}
        setTodoText={setTodoText}
        edit={edit}
        onHandle={handleSubmit}
      />
      <Todo
        todos={todos}
        setTodos={setTodos}
        onDelete={deleteTask}
        setTodoText={setTodoText}
        setEdit={setEdit}
        setWillUpdateTodo={setWillUpdateTodo}
        changeIsDone={changeIsDone}
      />
    </div>
  );
}

export default App;
