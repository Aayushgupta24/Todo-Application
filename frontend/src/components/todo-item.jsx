"use client"

import { Edit, Trash2, Eye, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTodoContext } from "@/context/todo-context"

export default function TodoItem({ todo, onViewDetails, onAddNotes }) {
  const { deleteTodo, setEditingTodo } = useTodoContext()

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

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{todo.title}</h3>

          {todo.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{todo.description}</p>}

          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className={getPriorityColor(todo.priority)}>
              {todo.priority}
            </Badge>

            {todo.tags &&
              todo.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}

            {todo.mentions &&
              todo.mentions.map((mention, index) => (
                <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800">
                  @{mention}
                </Badge>
              ))}

            {todo.notes && todo.notes.length > 0 && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                {todo.notes.length} {todo.notes.length === 1 ? "note" : "notes"}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onAddNotes} title="Add Notes">
            <MessageSquarePlus className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={onViewDetails} title="View Details">
            <Eye className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={() => setEditingTodo(todo)} title="Edit Todo">
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm("Are you sure you want to delete this todo?")) {
                deleteTodo(todo.id)
              }
            }}
            title="Delete Todo"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

