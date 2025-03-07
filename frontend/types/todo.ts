import type { Note } from "./note"

export interface Todo {
  id: string
  title: string
  description?: string
  priority: string
  tags?: string[]
  mentions?: string[]
  notes?: Note[]
  userId: string
  createdAt: string
}

