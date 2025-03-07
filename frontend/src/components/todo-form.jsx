"use client"

import { useState, useEffect } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useTodoContext } from "@/context/todo-context"

export default function TodoForm() {
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
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex gap-2">
            <Input
              id="tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add a tag"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddTag} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((t, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {t}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="mentions" className="block text-sm font-medium text-gray-700 mb-1">
            Mention Users
          </label>
          <div className="flex gap-2">
            <Input
              id="mentions"
              value={mentionInput}
              onChange={(e) => setMentionInput(e.target.value)}
              placeholder="@username"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddMention} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {mentions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {mentions.map((m, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-blue-100">
                  @{m}
                  <button
                    type="button"
                    onClick={() => handleRemoveMention(m)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {editingTodo && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm()
                setEditingTodo(null)
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">{editingTodo ? "Update Todo" : "Add Todo"}</Button>
        </div>
      </div>
    </form>
  )
}

