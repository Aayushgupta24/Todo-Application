"use client"

import { useState } from "react"
import TodoList from "./todo-list"
import TodoForm from "./todo-form"
import UserList from "./user-list"
import Header from "./header"
import { TodoProvider } from "@/context/todo-context"

export default function TodoApp() {
  const [activeTab, setActiveTab] = useState("todos")

  return (
    <TodoProvider>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
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
    </TodoProvider>
  )
}

