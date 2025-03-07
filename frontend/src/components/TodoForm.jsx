"use client"

import { useState, useEffect } from "react"
import { useTodoContext } from "../context/TodoContext"

function TodoForm() {
  const { addTodo, editTodo, editingTodo, setEditingTodo, users } = useTodoContext()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])
  const [mentionInput, setMentionInput] = useState("")
  const [mentions, setMentions] = useState([])

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title)
      setDescription(editingTodo.description || "")
      setPriority(editingTodo.priority)
      setTags(editingTodo.tags || [])
      setMentions(editingTodo.mentions || [])
    } else {
      resetForm()
    }
  }, [editingTodo])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setPriority("Medium")
    setTag("")
    setTags([])
    setMentionInput("")
    setMentions([])
  }

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTag("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleAddMention = () => {
    const username = mentionInput.startsWith("@") ? mentionInput.substring(1) : mentionInput

    const userExists = users.some((user) => user.username === username)

    if (username && !mentions.includes(username) && userExists) {
      setMentions([...mentions, username])
      setMentionInput("")
    } else if (!userExists && username) {
      alert(`User @${username} does not exist`)
    }
  }

  const handleRemoveMention = (mentionToRemove) => {
    setMentions(mentions.filter((m) => m !== mentionToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    const todoData = {
      title,
      description,
      priority,
      tags,
      mentions,
      notes: editingTodo?.notes || [],
    }

    if (editingTodo) {
      editTodo({ ...editingTodo, ...todoData })
    } else {
      addTodo(todoData)
    }

    resetForm()
    setEditingTodo(null)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{editingTodo ? "Edit Todo" : "Add New Todo"}</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add a tag"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((t, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="mentions" className="block text-sm font-medium text-gray-700 mb-1">
            Mention Users
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="mentions"
              value={mentionInput}
              onChange={(e) => setMentionInput(e.target.value)}
              placeholder="@username"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddMention}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Add
            </button>
          </div>

          {mentions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {mentions.map((m, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                >
                  @{m}
                  <button
                    type="button"
                    onClick={() => handleRemoveMention(m)}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {editingTodo && (
            <button
              type="button"
              onClick={() => {
                resetForm()
                setEditingTodo(null)
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            {editingTodo ? "Update Todo" : "Add Todo"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default TodoForm

