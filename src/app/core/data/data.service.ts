import {
  computed,
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
  setDoc,
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

  unsubTasks: Unsubscribe | undefined;
  unsubContacts: Unsubscribe | undefined;

  tasks = signal<Task[]>([]);
  taskFilterInputValue = signal<string>('');
  filteredTasks = computed(() => this.filterTasks(this.taskFilterInputValue()));
  contacts = signal<Contact[]>(offlineContacts);
  contactFilterInputValue = signal<string>('');
  filteredContacts = computed(() =>
    this.filterContacts(this.contactFilterInputValue())
  );
  selectedContact = signal<Contact | undefined>(undefined);

  constructor() {
    // this.addDummyData();
  }

  initSubscriptionsIfNecessary() {
    if (this.unsubTasks === undefined) {
      this.unsubTasks = this.subFirebaseCollection<Task>('tasks', this.tasks);
    }
    if (this.unsubContacts === undefined) {
      this.unsubContacts = this.subFirebaseCollection<Contact>(
        'contacts',
        this.contacts
      );
    }
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  /**
   * This method adds dummy data to the database.
   */
  addDummyData(): void {
    this.tasks().forEach((task) => {
      this.addTask(task);
    });
    this.contacts().forEach((contact) => {
      this.addContact(contact);
    });
  }

  /**
   * This method unsubscribes from the tasks and the contacts if the subscriptions exist.
   */
  unsub(): void {
    if (this.unsubTasks) {
      this.unsubTasks();
      this.unsubTasks = undefined;
    }
    if (this.unsubContacts) {
      this.unsubContacts();
      this.unsubContacts = undefined;
    }
  }

  /**
   * This method subscribes to a collection of a certain type and stores the results in a signal.
   */
  subFirebaseCollection<Type>(
    coll: string,
    arraySignal: WritableSignal<Type[]>
  ): Unsubscribe {
    return runInInjectionContext(this.environmentInjector, () => {
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
    });
  }

  /**
   * This method adds an item to a certain collection.
   */
  async addItem(
    item: WithFieldValue<DocumentData>,
    coll: string
  ): Promise<string | undefined> {
    try {
      if (item['id']) {
        await runInInjectionContext(
          this.environmentInjector,
          async () => await setDoc(doc(this.db, coll, item['id']), item)
        );
        return item['id'];
      } else {
        const docRef = await runInInjectionContext(
          this.environmentInjector,
          async () => await addDoc(collection(this.db, coll), item)
        );
        return docRef.id;
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * This method changes an item with a certain id in a certain collection.
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
   * This method removes an item with a certain id from a certain collection.
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
   * This method adds a task to the tasks collection.
   */
  async addTask(task: Task): Promise<string | undefined> {
    return await this.addItem(task, 'tasks');
  }

  /**
   * This method adds a contact to the contacts collection.
   */
  async addContact(contact: Contact): Promise<string | undefined> {
    return await this.addItem(contact, 'contacts');
  }

  /**
   * This method changes a task with a certain id based on some data.
   */
  async updateTask(taskData: any, taskId: string): Promise<void> {
    return await this.updateItem(taskData, 'tasks', taskId);
  }

  /**
   * This method selects or deselects a subtask.
   */
  async selectOrDeselectSubtask(
    taskId: string,
    subtaskId: string
  ): Promise<void> {
    const task = this.tasks().find((task) => task.id === taskId);
    if (task) {
      const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
      if (subtask) {
        subtask.done = !subtask.done;
      }
      return await this.updateTask(task, taskId);
    }
  }

  /**
   * This method changes a contact with a certain id based on some data.
   */
  async updateContact(contactData: any, contactId: string): Promise<void> {
    return await this.updateItem(contactData, 'contacts', contactId);
  }

  /**
   * This method removes a task with a certain id.
   */
  async deleteTask(taskId: string): Promise<void> {
    return await this.deleteItem('tasks', taskId);
  }

  /**
   * This method removes a contact from all tasks.
   */
  async deleteContactFromAllTasks(contactId: string): Promise<void> {
    try {
      this.tasks().forEach((task) => {
        const index = task.assigneeIds.indexOf(contactId);
        if (index !== -1) {
          task.assigneeIds.splice(index, 1);
        }
        this.updateTask(task, task.id);
      });
    } catch (error) {
      console.error(error);
      return Promise.reject('Contact could not be deleted from all tasks.');
    }
  }

  /**
   * This method removes a contact with a certain id.
   */
  async deleteContact(contactId: string): Promise<void> {
    try {
      const result = await this.deleteItem('contacts', contactId);
      await this.deleteContactFromAllTasks(contactId);
      this.selectedContact.set(undefined);
      return result;
    } catch (error) {
      console.error(error);
      return Promise.reject('Contact could not be deleted.');
    }
  }

  /**
   * This method filters the tasks based on some input string.
   */
  filterTasks(inputValue: string): Task[] {
    if (inputValue === '') {
      return this.tasks();
    } else {
      return this.tasks().filter(
        (task) =>
          task.title.toLowerCase().includes(inputValue.toLowerCase()) ||
          task.description.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
  }

  /**
   * This method filters the contacts based on some input string.
   */
  filterContacts(inputValue: string): Contact[] {
    if (inputValue === '') {
      return this.contacts();
    } else {
      return this.contacts().filter((contact) =>
        contact.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
  }

  /**
   * This method returns all contacts that match the assignee IDs.
   */
  getAssignees(assigneeIds: string[]): Contact[] {
    return this.contacts().filter((item: Contact) =>
      assigneeIds.includes(item.id)
    );
  }

  /**
   * This method refreshes the contacts to manually trigger computed signals when necessary.
   */
  refreshContacts() {
    this.contacts.set([...this.contacts()]);
  }
}
