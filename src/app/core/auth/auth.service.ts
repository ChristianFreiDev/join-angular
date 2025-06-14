import {
  computed,
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  signal,
} from '@angular/core';
import {
  Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';
import { getUserColor } from '../utils/user-utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private dataService = inject(DataService);
  private environmentInjector = inject(EnvironmentInjector);
  currentUserUid = signal<string | undefined>(undefined);
  isUserLoggedIn = computed(() => this.currentUserUid() !== undefined);

  constructor() {
    this.auth.setPersistence(browserSessionPersistence);
    this.monitorAuthState();
  }

  /**
   * This method sets the persistence based on whether the user wants to be remembered or not.
   */
  rememberMe(shouldRemember: boolean): void {
    if (shouldRemember) {
      this.auth.setPersistence(browserLocalPersistence);
    } else {
      this.auth.setPersistence(browserSessionPersistence);
    }
  }

  /**
   * This method signs in a user.
   * runInInjectionContext is used to prevent a Firebase warning.
   */
  async signIn(email: string, password: string): Promise<void> {
    try {
      await runInInjectionContext(
        this.environmentInjector,
        async () => await signInWithEmailAndPassword(this.auth, email, password)
      );
    } catch (error) {
      console.error(error);
      return Promise.reject('Signing in failed.');
    }
  }

  /**
   * This method creates a new user and also adds the user to the list of contacts.
   * runInInjectionContext is used to prevent a Firebase warning.
   */
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const userCredential = await runInInjectionContext(
        this.environmentInjector,
        async () =>
          await createUserWithEmailAndPassword(this.auth, email, password)
      );
      await this.dataService.addContact({
        id: userCredential.user.uid,
        name: name,
        color: getUserColor(),
        email: email,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject('User creation failed.');
    }
  }

  /**
   * This method monitors the auth state and performs the appropriate actions when a user signs in or out.
   */
  async monitorAuthState(): Promise<void> {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUserUid.set(user.uid);
        this.router.navigateByUrl('main/summary');
      } else {
        this.currentUserUid.set(undefined);
        const url = this.router.url;
        if (url !== '/signup') {
          this.router.navigateByUrl('login');
        }
      }
    });
  }

  /**
   * This method signs out a user.
   * All Firebase subscriptions must be unsubscribed before calling this method because an active subscription without auth will trigger an error.
   * runInInjectionContext is used to prevent a Firebase warning.
   */
  async logOut(): Promise<void> {
    runInInjectionContext(this.environmentInjector, async () => {
      await signOut(this.auth);
    });
  }
}
