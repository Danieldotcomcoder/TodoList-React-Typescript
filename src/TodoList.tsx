import React, { useState } from 'react';
import { Todo } from './type';
import copy from 'clipboard-copy';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Home', 'Work', 'Learning', 'Personal', 'Urgent'];

  const addTodo: (text: string, category: string) => void = (
    text,
    category
  ) => {
    const newTodos = [...todos, { text, category, complete: false }];
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
      {todos.map((todo, i) => (
        <div key={i}>
          <span
            style={{
              textDecoration: todo.complete ? 'line-through' : undefined,
            }}
          >
            {todo.text} ({todo.category})
          </span>
          <button onClick={() => handleCopy(todo.text)}>Copy</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
