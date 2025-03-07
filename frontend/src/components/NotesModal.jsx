"use client"

import { useState } from "react"
import { useTodoContext } from "../context/TodoContext"

function NotesModal({ todo, onClose }) {
  const { addNote } = useTodoContext()
  const [noteContent, setNoteContent] = useState("")

  const handleSubmit = () => {
    if (noteContent.trim()) {
      addNote(todo.id, noteContent)
      setNoteContent("")
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Add Note to "{todo.title}"</h2>
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

          <div className="mt-2">
            <textarea
              placeholder="Enter your note here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesModal

