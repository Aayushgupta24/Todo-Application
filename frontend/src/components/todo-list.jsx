"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TodoItem from "./todo-item"
import TodoDetails from "./todo-details"
import NotesModal from "./notes-modal"
import { useTodoContext } from "@/context/todo-context"

const ITEMS_PER_PAGE = 5

export default function TodoList() {
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
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }}
              className="flex items-center gap-1"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === "asc" ? "Asc" : "Desc"}
            </Button>

            <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <div className="w-full md:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date Created</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-auto">
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {allTags.length > 0 && (
            <div className="w-full md:w-auto">
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map((tag, index) => (
                    <SelectItem key={index} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {allMentions.length > 0 && (
            <div className="w-full md:w-auto">
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {allMentions.map((mention, index) => (
                    <SelectItem key={index} value={mention}>
                      @{mention}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(searchTerm || filterPriority || filterTag || filterUser) && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="flex items-center gap-1">
              Clear Filters
            </Button>
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {selectedTodo && <TodoDetails todo={selectedTodo} onClose={() => setSelectedTodo(null)} />}

      {todoForNotes && <NotesModal todo={todoForNotes} onClose={() => setTodoForNotes(null)} />}
    </div>
  )
}

