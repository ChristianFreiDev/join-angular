import {
  inject,
  Injectable,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Task } from './models/task.interface';
import { offlineContacts, offlineTasks } from './dummy-data';
import { Contact } from './models/contact.interface';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  onSnapshot,
  Unsubscribe,
  updateDoc,
  WithFieldValue,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit, OnDestroy {
  constructor() {}

  db = inject(Firestore);

  unsubTasks!: Unsubscribe;
  unsubContacts!: Unsubscribe;

  tasks = signal<Task[]>(offlineTasks);
  filteredTasks = signal<Task[]>(this.tasks());

  contacts = signal<Contact[]>(offlineContacts);
  filteredContacts = signal<Contact[]>(this.contacts());

  ngOnInit(): void {
    this.unsubTasks = this.subFirebaseCollection<Task>('tasks', this.tasks);
    this.unsubContacts = this.subFirebaseCollection<Contact>(
      'contacts',
      this.contacts
    );
  }

  ngOnDestroy(): void {
    this.unsubTasks();
    this.unsubContacts();
  }

  subFirebaseCollection<Type>(
    coll: string,
    arraySignal: WritableSignal<Type[]>
  ): Unsubscribe {
    return onSnapshot(collection(this.db, coll), (querySnapshot) => {
      const items: Type[] = querySnapshot.docs.map((doc) => doc.data() as Type);
      arraySignal.set(items);
    });
  }

  async addItem(
    item: WithFieldValue<DocumentData>,
    coll: string
  ): Promise<string | undefined> {
    try {
      const docRef = await addDoc(collection(this.db, coll), item);
      return docRef.id;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async updateItem(data: any, coll: string, id: string): Promise<void> {
    try {
      return await updateDoc(doc(this.db, coll, id), data);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteItem(coll: string, id: string): Promise<void> {
    try {
      return await deleteDoc(doc(this.db, coll, id));
    } catch (error) {
      console.error(error);
    }
  }

  async addTask(task: Task): Promise<string | undefined> {
    return await this.addItem(task, 'tasks');
  }

  async addContact(contact: Contact): Promise<string | undefined> {
    return await this.addItem(contact, 'contacts');
  }

  async updateTask(taskData: any, taskId: string): Promise<void> {
    return await this.updateItem(taskData, 'tasks', taskId);
  }

  async updateContact(contactData: any, taskId: string): Promise<void> {
    return await this.updateItem(contactData, 'contacts', taskId);
  }

  async deleteTask(taskId: string): Promise<void> {
    return await this.deleteItem('tasks', taskId);
  }

  async deleteContact(contactId: string): Promise<void> {
    return await this.deleteItem('contacts', contactId);
  }

  filterTasks(inputValue: string): void {
    if (inputValue === '') {
      this.filteredTasks.set(this.tasks());
    } else {
      this.filteredTasks.set(
        this.tasks().filter(
          (task) =>
            task.title.toLowerCase().includes(inputValue.toLowerCase()) ||
            task.description.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  }

  filterContacts(inputValue: string): void {
    if (inputValue === '') {
      this.filteredContacts.set(this.contacts());
    } else {
      this.filteredContacts.set(
        this.contacts().filter((contact) =>
          contact.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  }

  updateTaskStatus(id: string, status: string): void {
    this.tasks.update((values) => {
      values.forEach((val) => {
        if (val.id === id) {
          val.status = status;
        }
      });
      return [...values];
    });
  }

  getAssignees(assigneeIDs: string[]): Contact[] {
    return this.contacts().filter((item: Contact) =>
      assigneeIDs.includes(item.id)
    );
  }
}
