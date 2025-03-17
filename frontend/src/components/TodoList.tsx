import { useTodo } from '../context/TodoContext';

interface Todo {
  _id: string;  // Changed from 'id' to '_id' to match MongoDB
  title: string;
  description?: string;
  completed: boolean;
}

export function TodoList() {
  const { todos } = useTodo();

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo._id}  // Changed from todo.id to todo._id
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {/* implement toggle */}}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <h3 className={`text-lg font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-gray-500 text-sm mt-1">{todo.description}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => {/* implement delete */}}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
} 