import React, { useState, useRef, useEffect } from 'react';
import './App.css';
// import Header from './Components/Header';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todo';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  // display the local  storage on reload
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // save on local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodo = [...todos];
    const todo = newTodo.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodo);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  // clear list
  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <div className="wrapper">
        <input ref={todoNameRef} type="text" />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodo}>Clear Completed Todos</button>
      </div>
      <p>{todos.filter(todo => !todo.complete).length} Left to do</p>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  );
}

export default App;
