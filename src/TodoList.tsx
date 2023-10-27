import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string;
  text: string;
  category: string;
  complete: boolean;
};

const TodoList: React.FC = () => {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const categories = ['Home', 'Work', 'Learning', 'Personal', 'Urgent'];

  const addTodo: (text: string, category: string) => void = (
    text,
    category
  ) => {
    const newTodos = [...todos, { id: uuidv4(), text, category, complete: false }];
    setTodos(newTodos);
  };

  const handleSubmit: (event: React.FormEvent) => void = (event) => {
    event.preventDefault();
    addTodo(value, category);
    setValue('');
    setCategory('');
  };

  const handleCopy: (text: string) => void = (text) => {
    copy(text);
  };

  const saveTodos = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const loadTodos = (): Todo[] => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  };

  const handleComplete: (id: string) => void = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(newTodos);
  };

  const handleDelete: (id: string) => void = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Todo"
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit">Add Todo</button>
      </form>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {todos.filter(todo => todo.text.includes(searchValue)).map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={() => handleComplete(todo.id)}
          />
          <span
            style={{
              textDecoration: todo.complete ? 'line-through' : undefined,
            }}
          >
            {todo.text} ({todo.category})
          </span>
          <button onClick={() => handleCopy(todo.text)}>Copy</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;