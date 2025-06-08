import {
  EnvironmentInjector,
  inject,
  Injectable,
  OnDestroy,
  runInInjectionContext,
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
export class DataService implements OnDestroy {
  db = inject(Firestore);
  environmentInjector = inject(EnvironmentInjector);

  unsubTasks!: Unsubscribe;
  unsubContacts!: Unsubscribe;

  tasks = signal<Task[]>(offlineTasks);
  filteredTasks = signal<Task[]>(this.tasks());

  contacts = signal<Contact[]>(offlineContacts);
  filteredContacts = signal<Contact[]>(this.contacts());

  constructor() {
    this.unsubTasks = this.subFirebaseCollection<Task>('tasks', this.tasks);
    this.unsubContacts = this.subFirebaseCollection<Contact>(
      'contacts',
      this.contacts
    );
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  /**
   * This function unsubscribes from the tasks and the contacts if the subscriptions exist.
   */
  unsub(): void {
    if (this.unsubTasks) {
      this.unsubTasks();
    }
    if (this.unsubContacts) {
      this.unsubContacts();
    }
  }

  /**
   * This function subscribes to a collection of a certain type and stores the results in a signal.
   */
  subFirebaseCollection<Type>(
    coll: string,
    arraySignal: WritableSignal<Type[]>
  ): Unsubscribe {
    return onSnapshot(collection(this.db, coll), (querySnapshot) => {
      try {
        const items: Type[] = querySnapshot.docs.map((doc) => {
          const item = doc.data();
          item['id'] = doc.id;
          return item as Type;
        });
        arraySignal.set(items);
      } catch (error) {
        console.error(error);
      }
    });
  }

  /**
   * This function adds an item to a certain collection.
   */
  async addItem(
    item: WithFieldValue<DocumentData>,
    coll: string
  ): Promise<string | undefined> {
    try {
      const docRef = await runInInjectionContext(
        this.environmentInjector,
        async () => await addDoc(collection(this.db, coll), item)
      );
      return docRef.id;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * This function changes an item with a certain id in a certain collection.
   */
  async updateItem(data: any, coll: string, id: string): Promise<void> {
    try {
      return await runInInjectionContext(
        this.environmentInjector,
        async () => await updateDoc(doc(this.db, coll, id), data)
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * This function removes an item with a certain id from a certain collection.
   */
  async deleteItem(coll: string, id: string): Promise<void> {
    try {
      return await runInInjectionContext(
        this.environmentInjector,
        async () => await deleteDoc(doc(this.db, coll, id))
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * This function adds a task to the tasks collection.
   */
  async addTask(task: Task): Promise<string | undefined> {
    return await this.addItem(task, 'tasks');
  }

  /**
   * This function adds a contact to the contacts collection.
   */
  async addContact(contact: Contact): Promise<string | undefined> {
    return await this.addItem(contact, 'contacts');
  }

  /**
   * This function changes a task with a certain id based on some data.
   */
  async updateTask(taskData: any, taskId: string): Promise<void> {
    return await this.updateItem(taskData, 'tasks', taskId);
  }

  /**
   * This function changes a contact with a certain id based on some data.
   */
  async updateContact(contactData: any, taskId: string): Promise<void> {
    return await this.updateItem(contactData, 'contacts', taskId);
  }

  /**
   * This function removes a task with a certain id.
   */
  async deleteTask(taskId: string): Promise<void> {
    return await this.deleteItem('tasks', taskId);
  }

  /**
   * This function removes a contact with a certain id.
   */
  async deleteContact(contactId: string): Promise<void> {
    return await this.deleteItem('contacts', contactId);
  }

  /**
   * This function filters the tasks based on some input string.
   */
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

  /**
   * This function filters the contacts based on some input string.
   */
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

  /**
   * This function returns all contacts that match the assignee IDs.
   */
  getAssignees(assigneeIds: string[]): Contact[] {
    return this.contacts().filter((item: Contact) =>
      assigneeIds.includes(item.id)
    );
  }
}
