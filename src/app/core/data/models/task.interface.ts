import { Subtask } from "./subtask.interface"

export interface Task {
    title: string
    description: string
    id: number
    collaborators: number[]
    dueDate: string
    priority: 'Urgent' | 'Medium' | 'Low'
    category: '' | 'User Story' | 'Technical Task'
    status: string
    subtasks: Subtask[]
}