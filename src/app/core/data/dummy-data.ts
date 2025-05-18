import { Task } from "./models/task.interface";

export const offlineTasks: Task[] = [
    {
        title: 'Implement Drag & Drop Feature',
        description: 'It must be possible to drag a task from one column (or row) to another. The user will be given feedback by slightly rotating the task once the user clicks on the task to drag it and by highlighting the area in which the task can be dropped.',
        id: 0,
        collaborators: [1, 2],
        dueDate: '2026-05-20',
        priority: 'Urgent',
        category: 'User Story',
        status: 'To do',
        subtasks: [
            {
                title: 'Enable drag & drop.',
                done: true
            },
            {
                title: 'Implement task rotation feature.',
                done: true
            }
        ]
    },
    {
        title: 'Create Contacts Page',
        description: 'Build a contacts page where users can add contacts, edit them, or delete them.',
        id: 1,
        collaborators: [1, 3, 4],
        dueDate: '2026-05-26',
        priority: 'Medium',
        category: 'User Story',
        status: 'In progress',
        subtasks: [
            {
                title: 'Create contacts page.',
                done: true
            },
            {
                title: 'Implement editing feature.',
                done: false
            },
            {
                title: 'Implement deletion.',
                done: false
            }
        ]
    },
    {
        title: 'Create Database Connection',
        description: 'Enable storing data in/retrieving data from a remote database.',
        id: 2,
        collaborators: [2, 3],
        dueDate: '2026-05-27',
        priority: 'Low',
        category: 'Technical Task',
        status: 'Await feedback',
        subtasks: []
    },
    {
        title: 'Remember Me',
        description: 'Users want to be remembered so that they do not have to log in every time they visit the website.',
        id: 3,
        collaborators: [1, 2, 3, 4],
        dueDate: '2026-05-27',
        priority: 'Medium',
        category: 'User Story',
        status: 'Await feedback',
        subtasks: [            {
            title: 'Add checkbox.',
            done: true
        },
        {
            title: 'Store required user data.',
            done: false
        },
        {
            title: 'Delete user data when user logs out.',
            done: true
        }]
    },
    {
        title: 'Adding Tasks',
        description: 'Users want to add tasks to the board.',
        id: 4,
        collaborators: [1, 2],
        dueDate: '2026-05-28',
        priority: 'Urgent',
        category: 'User Story',
        status: 'Done',
        subtasks: [
            {
                title: 'Create form for adding tasks.',
                done: true
            },
            {
                title: 'Validate inputs.',
                done: true
            }
        ]
    },
  ];