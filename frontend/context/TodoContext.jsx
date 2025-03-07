"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Sample users data
const sampleUsers = [
  { id: "1", name: "John Doe", username: "johndoe" },
  { id: "2", name: "Jane Smith", username: "janesmith" },
  { id: "3", name: "Bob Johnson", username: "bobjohnson" },
  { id: "4", name: "Alice Williams", username: "alicew" },
  { id: "5", name: "Charlie Brown", username: "charlieb" },
]

// Sample todos data
const sampleTodos = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the project proposal for the client meeting",
    priority: "High",
    tags: ["work", "proposal"],
    mentions: ["janesmith"],
    notes: [{ id: "1", content: "Include budget estimates", createdAt: new Date().toISOString() }],
    userId: "1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and vegetables",
    priority: "Medium",
    tags: ["personal", "shopping"],
    mentions: [],
    notes: [],
    userId: "1",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "3",
    title: "Review pull request",
    description: "Review the PR for the new feature implementation",
    priority: "High",
    tags: ["work", "code"],
    mentions: ["bobjohnson", "charlieb"],
    notes: [],
    userId: "2",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: "4",
    title: "Plan team meeting",
    description: "Prepare agenda for the weekly team meeting",
    priority: "Medium",
    tags: ["work", "meeting"],
    mentions: ["johndoe", "alicew"],
    notes: [],
    userId: "3",
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    id: "5",
    title: "Exercise",
    description: "30 minutes of cardio and strength training",
    priority: "Low",
    tags: ["personal", "health"],
    mentions: [],
    notes: [],
    userId: "4",
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
  },
]

const TodoContext = createContext()

export function useTodoContext() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider")
  }
  return context
}

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([])
  const [users] = useState(sampleUsers)
  const [activeUser, setActiveUser] = useState(null)
  const [editingTodo, setEditingTodo] = useState(null)

  // Initialize with sample data
  useEffect(() => {
    setTodos(sampleTodos)
    setActiveUser(sampleUsers[0])
  }, [])

  const addTodo = (todoData) => {
    const newTodo = {
      ...todoData,
      id: Date.now().toString(),
      userId: activeUser?.id || "1",
      createdAt: new Date().toISOString(),
    }

    setTodos((prev) => [...prev, newTodo])
  }

  const editTodo = (updatedTodo) => {
    setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const addNote = (todoId, content) => {
    const newNote = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
    }

    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            notes: [...(todo.notes || []), newNote],
          }
        }
        return todo
      }),
    )
  }

  const getUserById = (id) => {
    return users.find((user) => user.id === id)
  }

  const value = {
    todos,
    users,
    activeUser,
    editingTodo,
    addTodo,
    editTodo,
    deleteTodo,
    addNote,
    setActiveUser,
    setEditingTodo,
    getUserById,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export default TodoProvider

