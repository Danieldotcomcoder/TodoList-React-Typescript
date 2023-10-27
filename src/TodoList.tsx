import React, { useState } from 'react';
import { Todo } from './type';
import copy from 'clipboard-copy';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const addTodo: (text: string) => void = (text) => {
    const newTodos = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const handleSubmit: (event: React.FormEvent) => void = (event) => {
    event.preventDefault();
    addTodo(value);
    setValue('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {todos
        .filter((todo) => todo.text.includes(searchValue))
        .map((todo, i) => (
          <div key={i}>
            <span
              style={{
                textDecoration: todo.complete ? 'line-through' : undefined,
              }}
            >
              {todo.text}
            </span>
          </div>
        ))}
    </div>
  );
};

export default TodoList;
