import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from './TodoList';

// Mock the clipboard API
// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

test('adds a new todo', () => {
  render(<TodoList />);

  // Type into the input field
  fireEvent.change(screen.getByPlaceholderText('Todo'), { target: { value: 'New Todo' } });
  fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Home' } });

  // Click the "Add Todo" button
  fireEvent.click(screen.getByText('Add Todo'));

  // Check if the new todo was added
  expect(screen.getByText('New Todo (Home)')).toBeInTheDocument();
});

test('copies a todo', () => {
  const clipboardSpy = jest.spyOn(navigator.clipboard, 'writeText');

  render(<TodoList />);

  // Add a new todo
  fireEvent.change(screen.getByPlaceholderText('Todo'), { target: { value: 'New Todo' } });
  fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Home' } });
  fireEvent.click(screen.getByText('Add Todo'));

  // Click the "Copy" button of the new todo
  fireEvent.click(screen.getByText('Copy'));

  // Check if the text of the new todo was copied to the clipboard
  expect(clipboardSpy).toHaveBeenCalledWith('New Todo');
});
