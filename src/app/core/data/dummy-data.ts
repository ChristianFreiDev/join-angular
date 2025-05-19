import { Contact } from "./models/contact.interface";
import { Task } from "./models/task.interface";

export const offlineTasks: Task[] = [
    {
        title: 'Implement Drag & Drop Feature',
        description: 'It must be possible to drag a task from one column (or row) to another. The user will be given feedback by slightly rotating the task once the user clicks on the task to drag it and by highlighting the area in which the task can be dropped.',
        id: 0,
        assignees: [1, 2],
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
        assignees: [1, 3, 4],
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
        assignees: [2, 3],
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
        assignees: [1, 2, 3, 4],
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
        assignees: [1, 2],
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

export const offlineContacts: Contact[] =  [
    {
        name: 'Alexander Müller',
        id: 5,
        color: 'user-color6',
        eMail: 'alexm23452@gmail.com',
        phone: '0160 246466363'
    },
    {
        name: 'Anne Wendt',
        id: 4,
        color: 'user-color9',
        eMail: 'awendt95@gmail.com',
        phone: '0170 234664577'
    },
    {
        name: 'Benjamin Bart',
        id: 6,
        color: 'user-color4',
        eMail: 'bbbart@web.de',
        phone: '0153 3466363646'
    },
    {
        name: 'Berthold Sand',
        id: 7,
        color: 'user-color12',
        eMail: 'bertsand@googlemail.com',
        phone: '0150 24624628'
    },
    {
        name: 'Max Zeller',
        id: 1,
        color: 'user-color2',
        eMail: 'max-zeller35@gmail.com',
        phone: '0148 23552873'
    },
    {
        name: 'Johann Schmitt',
        id: 2,
        color: 'user-color2',
        eMail: 'johannschmitt@yahoo.com',
        phone: '0163 65876585'
    },
    {
        name: 'Maria Heck',
        id: 3,
        color: 'user-color8',
        eMail: 'maria-heck@web.de',
        phone: '0154 312748983'
    },
    {
        name: 'Martin Huber',
        id: 8,
        color: 'user-color6',
        eMail: 'mhub74@gmx.net',
        phone: '0159 2132352537'
    },
    {
        name: 'Ella Schäfer',
        id: 9,
        color: 'user-color7',
        eMail: 'ellas99@gmail.com',
        phone: '0157 123643648'
    },
    {
        name: 'Peter Krüger',
        id: 10,
        color: 'user-color13',
        eMail: 'pkrueg@gmx.net',
        phone: '0171 2345234767'
    }
];