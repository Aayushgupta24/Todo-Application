"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useTodoContext } from "@/context/todo-context"

export default function NotesModal({ todo, onClose }) {
  const { addNote } = useTodoContext()
  const [noteContent, setNoteContent] = useState("")

  const handleSubmit = () => {
    if (noteContent.trim()) {
      addNote(todo.id, noteContent)
      setNoteContent("")
      onClose()
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Note to "{todo.title}"</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <Textarea
            placeholder="Enter your note here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            rows={5}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

