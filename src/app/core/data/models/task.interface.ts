import { Subtask } from './subtask.interface';

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeIds: string[];
  dueDate: string;
  priority: 'Urgent' | 'Medium' | 'Low';
  category: '' | 'User Story' | 'Technical Task';
  status: string;
  subtasks: Subtask[];
}
