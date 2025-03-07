"use client"
import { useTodoContext } from "../context/TodoContext"

function TodoItem({ todo, onViewDetails, onAddNotes }) {
  const { deleteTodo, setEditingTodo } = useTodoContext()

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{todo.title}</h3>

          {todo.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{todo.description}</p>}

          <div className="flex flex-wrap gap-2 mt-2">
            <span
              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}
            >
              {todo.priority}
            </span>

            {todo.tags &&
              todo.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}

            {todo.mentions &&
              todo.mentions.map((mention, index) => (
                <span
                  key={index}
                  className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  @{mention}
                </span>
              ))}

            {todo.notes && todo.notes.length > 0 && (
              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {todo.notes.length} {todo.notes.length === 1 ? "note" : "notes"}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAddNotes}
            title="Add Notes"
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>

          <button
            onClick={onViewDetails}
            title="View Details"
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          <button
            onClick={() => setEditingTodo(todo)}
            title="Edit Todo"
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this todo?")) {
                deleteTodo(todo.id)
              }
            }}
            title="Delete Todo"
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem

