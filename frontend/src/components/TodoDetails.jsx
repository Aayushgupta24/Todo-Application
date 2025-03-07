"use client"
import { useTodoContext } from "../context/TodoContext"

function TodoDetails({ todo, onClose }) {
  const { getUserById } = useTodoContext()

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

  const creator = getUserById(todo.userId)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold">{todo.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Created on {new Date(todo.createdAt).toLocaleDateString()}
            {creator && ` by ${creator.name}`}
          </p>

          <div className="space-y-4 mt-4">
            {todo.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-gray-700">{todo.description}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Priority</h4>
              <span
                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}
              >
                {todo.priority}
              </span>
            </div>

            {todo.tags && todo.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {todo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {todo.mentions && todo.mentions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Mentioned Users</h4>
                <div className="flex flex-wrap gap-2">
                  {todo.mentions.map((mention, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      @{mention}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {todo.notes && todo.notes.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {todo.notes.map((note, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <p className="text-gray-700">{note.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(note.createdAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoDetails

