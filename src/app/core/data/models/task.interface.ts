import { Subtask } from "./subtask.interface"

export interface Task {
    title: string
    description: string
    id: number
    collaborators: number[]
    dueDate: string
    priority: string
    category: string
    status: string
    subtasks: Subtask[]
}