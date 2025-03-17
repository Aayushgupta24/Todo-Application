import { TodoProvider } from './context/TodoContext';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Todo App</h1>
        <TodoProvider>
          <div className="bg-white rounded-lg shadow-md p-6">
            <TodoForm />
            <TodoList />
          </div>
        </TodoProvider>
      </div>
    </div>
  );
}

export default App; 