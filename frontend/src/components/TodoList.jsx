"use client"

import { useState, useEffect } from "react"
import { useTodoContext } from "../context/TodoContext"
import TodoItem from "./TodoItem"
import TodoDetails from "./TodoDetails"
import NotesModal from "./NotesModal"

const ITEMS_PER_PAGE = 5

function TodoList() {
  const { todos, activeUser } = useTodoContext()
  const [filteredTodos, setFilteredTodos] = useState([])
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [todoForNotes, setTodoForNotes] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("")
  const [filterTag, setFilterTag] = useState("")
  const [filterUser, setFilterUser] = useState("")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [allTags, setAllTags] = useState([])
  const [allMentions, setAllMentions] = useState([])

  // Extract all unique tags and mentions
  useEffect(() => {
    const tags = new Set()
    const mentions = new Set()

    todos.forEach((todo) => {
      todo.tags?.forEach((tag) => tags.add(tag))
      todo.mentions?.forEach((mention) => mentions.add(mention))
    })

    setAllTags(Array.from(tags))
    setAllMentions(Array.from(mentions))
  }, [todos])

  // Filter and sort todos
  useEffect(() => {
    let result = [...todos]

    // Filter by active user
    if (activeUser) {
      result = result.filter((todo) => todo.userId === activeUser.id)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(term) ||
          (todo.description && todo.description.toLowerCase().includes(term)),
      )
    }

    // Filter by priority
    if (filterPriority) {
      result = result.filter((todo) => todo.priority === filterPriority)
    }

    // Filter by tag
    if (filterTag) {
      result = result.filter((todo) => todo.tags?.includes(filterTag))
    }

    // Filter by mentioned user
    if (filterUser) {
      result = result.filter((todo) => todo.mentions?.includes(filterUser))
    }

    // Sort todos
    result.sort((a, b) => {
      if (sortBy === "createdAt") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === "priority") {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      } else {
        return a.title.localeCompare(b.title)
      }
    })

    // Apply sort order
    if (sortOrder === "desc") {
      result.reverse()
    }

    setFilteredTodos(result)
    setCurrentPage(1)
  }, [todos, activeUser, searchTerm, filterPriority, filterTag, filterUser, sortBy, sortOrder])

  // Calculate pagination
  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE)
  const paginatedTodos = filteredTodos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleExport = () => {
    const dataToExport = activeUser ? todos.filter((todo) => todo.userId === activeUser.id) : todos

    const dataStr = JSON.stringify(dataToExport, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `todos-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const resetFilters = () => {
    setSearchTerm("")
    setFilterPriority("")
    setFilterTag("")
    setFilterUser("")
    setSortBy("createdAt")
    setSortOrder("desc")
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              {sortOrder === "asc" ? "Asc" : "Desc"}
            </button>

            <button
              onClick={handleExport}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <div className="w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>

          <div className="w-full md:w-auto">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full md:w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {allTags.length > 0 && (
            <div className="w-full md:w-auto">
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="w-full md:w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Tags</option>
                {allTags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          )}

          {allMentions.length > 0 && (
            <div className="w-full md:w-auto">
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="w-full md:w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Users</option>
                {allMentions.map((mention, index) => (
                  <option key={index} value={mention}>
                    @{mention}
                  </option>
                ))}
              </select>
            </div>
          )}

          {(searchTerm || filterPriority || filterTag || filterUser) && (
            <button onClick={resetFilters} className="px-3 py-2 text-gray-600 hover:text-gray-900">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="divide-y">
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onViewDetails={() => setSelectedTodo(todo)}
              onAddNotes={() => setTodoForNotes(todo)}
            />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No todos found. {filteredTodos.length === 0 && todos.length > 0 ? "Try adjusting your filters." : ""}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 flex justify-center">
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selectedTodo && <TodoDetails todo={selectedTodo} onClose={() => setSelectedTodo(null)} />}

      {todoForNotes && <NotesModal todo={todoForNotes} onClose={() => setTodoForNotes(null)} />}
    </div>
  )
}

export default TodoList

