import { createContext, useContext, useState } from "react"

const TodoContext = createContext()

export function TodoProvider({ children }) {
  const [users, setUsers] = useState([])
  const [activeUser, setActiveUser] = useState(null)
  const [todos, setTodos] = useState([])

  const value = {
    users,
    setUsers,
    activeUser,
    setActiveUser,
    todos,
    setTodos
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodoContext() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider")
  }
  return context
} 