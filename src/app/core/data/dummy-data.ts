import { Contact } from './models/contact.interface';
import { Task } from './models/task.interface';

export const offlineTasks: Task[] = [
  {
    title: 'Implement Drag & Drop Feature',
    description:
      'It must be possible to drag a task from one column (or row) to another. The user will be given feedback by slightly rotating the task once the user clicks on the task to drag it and by highlighting the area in which the task can be dropped.',
    id: self.crypto.randomUUID(),
    assigneeIds: [
      'c8ec1976-1f8a-49bb-a36d-21320f2ef41f',
      'dfd10b8c-907d-4bdc-a767-9a284a0795d2',
    ],
    dueDate: '2026-05-20',
    priority: 'Urgent',
    category: 'User Story',
    status: 'To do',
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: 'Enable drag & drop.',
        done: true,
      },
      {
        id: self.crypto.randomUUID(),
        title: 'Implement task rotation feature.',
        done: true,
      },
    ],
  },
  {
    title: 'Create Contacts Page',
    description:
      'Build a contacts page where users can add contacts, edit them, or delete them.',
    id: self.crypto.randomUUID(),
    assigneeIds: [
      'f2cc98c6-1348-4a3e-bb73-4e1f6e0c3cea',
      '01609a52-d961-4ad4-8bd8-dc3d5bf419fd',
    ],
    dueDate: '2026-05-26',
    priority: 'Medium',
    category: 'User Story',
    status: 'In progress',
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: 'Create contacts page.',
        done: true,
      },
      {
        id: self.crypto.randomUUID(),
        title: 'Implement editing feature.',
        done: false,
      },
      {
        id: self.crypto.randomUUID(),
        title: 'Implement deletion.',
        done: false,
      },
    ],
  },
  {
    title: 'Create Database Connection',
    description:
      'Enable storing data in/retrieving data from a remote database.',
    id: self.crypto.randomUUID(),
    assigneeIds: [
      '8ca3d120-867a-460c-8cca-8a1f2a7kea80',
      '01609a52-d961-4ad4-8bd8-dc3d5bf419fd',
    ],
    dueDate: '2026-05-27',
    priority: 'Low',
    category: 'Technical Task',
    status: 'Await feedback',
    subtasks: [],
  },
  {
    title: 'Remember Me',
    description:
      'Users want to be remembered so that they do not have to log in every time they visit the website.',
    id: self.crypto.randomUUID(),
    assigneeIds: [
      'f2cc98c6-1348-4a3e-bb73-4e1f6e0c3cea',
      'e9b733b9-a9ea-4169-ab63-d424af96a322',
    ],
    dueDate: '2026-05-27',
    priority: 'Medium',
    category: 'User Story',
    status: 'Await feedback',
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: 'Add checkbox.',
        done: true,
      },
      {
        id: self.crypto.randomUUID(),
        title: 'Store required user data.',
        done: false,
      },
      {
        id: self.crypto.randomUUID(),
        title: 'Delete user data when user logs out.',
        done: true,
      },
    ],
  },
  {
    title: 'Adding Tasks',
    description: 'Users want to add tasks to the board.',
    id: self.crypto.randomUUID(),
    assigneeIds: [
      '2e6f1eb7-3d99-4101-9062-a1f70114572c',
      '9affdcsd-2209-4f8a-a376-3e44b9a28543',
      'c8ec1976-1f8a-49bb-a36d-21320f2ef41f',
    ],
    dueDate: '2026-05-28',
    priority: 'Urgent',
    category: 'User Story',
    status: 'Done',
    subtasks: [
      {
        id: self.crypto.randomUUID(),
        title: 'Create form for adding tasks.',
        done: true,
      },
      {
        id: self.crypto.randomUUID(),
        title: 'Validate inputs.',
        done: true,
      },
    ],
  },
];

export const offlineContacts: Contact[] = [
  {
    name: 'Alexander Müller',
    id: '9affdcsd-2209-4f8a-a376-3e44b9a28543',
    color: 'user-color6',
    eMail: 'alexm23452@gmail.com',
    phone: '0160 246466363',
  },
  {
    name: 'Anne Wendt',
    id: 'c8ec1976-1f8a-49bb-a36d-21320f2ef41f',
    color: 'user-color9',
    eMail: 'awendt95@gmail.com',
    phone: '0170 234664577',
  },
  {
    name: 'Benjamin Bart',
    id: 'dfd10b8c-907d-4bdc-a767-9a284a0795d2',
    color: 'user-color4',
    eMail: 'bbbart@web.de',
    phone: '0153 3466363646',
  },
  {
    name: 'Berthold Sand',
    id: '38159b16-1935-4210-8f8f-241a1e1ffea9',
    color: 'user-color12',
    eMail: 'bertsand@googlemail.com',
    phone: '0150 24624628',
  },
  {
    name: 'Max Zeller',
    id: '8ca3d120-867a-460c-8cca-8a1f2a7kea80',
    color: 'user-color2',
    eMail: 'max-zeller35@gmail.com',
    phone: '0148 23552873',
  },
  {
    name: 'Johann Schmitt',
    id: 'f2cc98c6-1348-4a3e-bb73-4e1f6e0c3cea',
    color: 'user-color2',
    eMail: 'johannschmitt@yahoo.com',
    phone: '0163 65876585',
  },
  {
    name: 'Maria Heck',
    id: '01609a52-d961-4ad4-8bd8-dc3d5bf419fd',
    color: 'user-color8',
    eMail: 'maria-heck@web.de',
    phone: '0154 312748983',
  },
  {
    name: 'Martin Huber',
    id: '34e08ac2-e60c-470e-b624-39f46f678c2f',
    color: 'user-color6',
    eMail: 'mhub74@gmx.net',
    phone: '0159 2132352537',
  },
  {
    name: 'Ella Schäfer',
    id: '2e6f1eb7-3d99-4101-9062-a1f70114572c',
    color: 'user-color7',
    eMail: 'ellas99@gmail.com',
    phone: '0157 123643648',
  },
  {
    name: 'Peter Krüger',
    id: 'e9b733b9-a9ea-4169-ab63-d424af96a322',
    color: 'user-color13',
    eMail: 'pkrueg@gmx.net',
    phone: '0171 2345234767',
  },
];
