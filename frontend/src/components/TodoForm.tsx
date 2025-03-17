import { useState } from 'react';
import { useTodo } from '../context/TodoContext';

export function TodoForm() {
  const { addTodo } = useTodo();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const newTodo = {
        title: title.trim(),
        description: description.trim(),
        completed: false,
        // user field is now optional and not included
      };
      
      await addTodo(newTodo);
      
      // Clear form after successful submission
      setTitle('');
      setDescription('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to add todo');
      console.error('Error:', err);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={() => document.getElementById('todoForm')?.focus()}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <span>↗</span>Add Todo
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            id="todoForm"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            rows={3}
            className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
} 