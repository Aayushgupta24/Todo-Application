"use client"

import { useState } from "react"
import { TodoProvider } from "./context/TodoContext"
import Header from "./components/Header"
import TodoList from "./components/TodoList"
import TodoForm from "./components/TodoForm"
import UserList from "./components/UserList"
import './main.css';

function App() {
  const [activeTab, setActiveTab] = useState("todos")

  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="mt-8">
            {activeTab === "todos" ? (
              <div className="space-y-6">
                <TodoForm />
                <TodoList />
              </div>
            ) : (
              <UserList />
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

