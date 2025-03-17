import React, { createContext, useContext, useState } from 'react';

interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  // Add other todo properties as needed
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, '_id'>) => Promise<void>;
  // Add other functions as needed
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = async (newTodo: Omit<Todo, '_id'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add todo');
      }

      const data = await response.json();
      setTodos(prevTodos => [...prevTodos, data]);
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
} 