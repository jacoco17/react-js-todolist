import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

const API_URL = 'http://localhost:3000/todos';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, completed: false }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateTodo = async (id, text) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="todo-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading todos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todo-container">
        <div className="error-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo List</h1>
        <p className="subtitle">Stay organized and boost your productivity</p>
      </div>
      
      <TodoForm onSubmit={handleAddTodo} />
      
      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v4" />
              <path d="M12 18v4" />
              <path d="M4.93 4.93l2.83 2.83" />
              <path d="M16.24 16.24l2.83 2.83" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
              <path d="M4.93 19.07l2.83-2.83" />
              <path d="M16.24 7.76l2.83-2.83" />
            </svg>
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList; 