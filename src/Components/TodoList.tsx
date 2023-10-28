import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { v4 as uuidv4 } from 'uuid';
import paste from '../assets/paste.png';
import remove from '../assets/delete.png';
import '../Styling/App.css';

type Todo = {
  id: string;
  text: string;
  category: string;
  complete: boolean;
};

const TodoList: React.FC = () => {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Normal');
  const [searchValue, setSearchValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const categories = [
    'Normal',
    'Home',
    'Work',
    'Learning',
    'Personal',
    'Urgent',
  ];

  const addTodo: (text: string, category: string) => void = (
    text,
    category
  ) => {
    if (text) {
      const newTodos = [
        ...todos,
        { id: uuidv4(), text, category, complete: false },
      ];
      setTodos(newTodos);
    } else {
      setError('Todo cant be empty');
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  const handleSubmit: (event: React.FormEvent) => void = (event) => {
    event.preventDefault();
    addTodo(value, category);
    setValue('');
    setCategory('Normal');
  };

  const handleCopy: (text: string) => void = (text) => {
    copy(text);
    setInfo('Copied To Clipboard');
    setTimeout(() => {
      setInfo('');
    }, 1000);
  };

  const saveTodos = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const loadTodos = (): Todo[] => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  };

  const handleComplete: (id: string) => void = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(newTodos);
  };

  const handleDelete: (id: string) => void = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  useEffect(() => {
    const loadedTodos = loadTodos();
    if (loadedTodos.length > 0) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <div className="app">
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <div className='info'>{info}</div>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <form className="form" onSubmit={handleSubmit}>
        <div className="input">
          <input
            className="todo-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add Your Todo Here ...."
          />
          <button className="submit-button" type="submit">
            Add
          </button>
        </div>
        <div className="error">{error}</div>

        <select
          id="category"
          className="select-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>
      <div>
        {todos
          .filter((todo) =>
            todo.text.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((todo) => (
            <div key={todo.id} className="todo-item" ata-testid={todo.id === 'test-todo' ? 'test-todo-item' : `todo-item-${todo.id}`}>
              <div className="todo-item-details">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={todo.complete}
                  onChange={() => handleComplete(todo.id)}
                  alt='checkbox'
                />
                <span
                  className={`todo-text ${todo.complete ? 'completed' : ''}`}
                >
                  {todo.text} ({todo.category})
                </span>
              </div>

              <div className="copy-delete">
                <span
                  className="copy-button"
                  onClick={() => handleCopy(todo.text)}
                >
                  <img src={paste} alt="copy" />
                </span>
                <span
                  className="delete-button"
                  onClick={() => handleDelete(todo.id)}
                >
                  <img src={remove} alt="Delete" />
                </span>
              </div>
              
            </div>
            
          ))}
          
      </div>
    </div>
  );
};

export default TodoList;
