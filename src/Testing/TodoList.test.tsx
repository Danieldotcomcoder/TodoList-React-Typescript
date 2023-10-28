import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

describe('TodoList', () => {
  test('renders App component without crashing', () => {
    render(<App />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  test('allows users to add a todo', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add Your Todo Here ....');
    userEvent.type(input, 'Test Todo');
    const addButton = screen.getByText('Add');
    userEvent.click(addButton);
    const todoText = await screen.findByText('Test Todo (Normal)');
    expect(todoText).toBeInTheDocument();
  });

  test('shows error when trying to add an empty todo', () => {
    render(<App />);
    const addButton = screen.getByText('Add');
    userEvent.click(addButton);
    expect(screen.getByText('Todo cant be empty')).toBeInTheDocument();
  });

});
