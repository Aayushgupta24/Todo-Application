import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useTodoContext } from "@/context/todo-context"

export default function TodoDetails({ todo, onClose }) {
  const { getUserById } = useTodoContext()

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

  const creator = getUserById(todo.userId)

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{todo.title}</DialogTitle>
          <DialogDescription>
            Created on {new Date(todo.createdAt).toLocaleDateString()}
            {creator && ` by ${creator.name}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {todo.description && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
              <p className="text-gray-700">{todo.description}</p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Priority</h4>
            <Badge variant="outline" className={getPriorityColor(todo.priority)}>
              {todo.priority}
            </Badge>
          </div>

          {todo.tags && todo.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {todo.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {todo.mentions && todo.mentions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Mentioned Users</h4>
              <div className="flex flex-wrap gap-2">
                {todo.mentions.map((mention, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800">
                    @{mention}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {todo.notes && todo.notes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {todo.notes.map((note, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-700">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(note.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

