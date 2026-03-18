import { EMAIL, PASSWORD } from '@/api/config/userConfig.api';
import { login, register, UserType } from '@/api/req/user.api';
import { IGlobalStore } from '@/store/interfaces';
import axios from 'axios';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { RootStore } from '../root';

type PrivateFields = '_user' | '_isLoading' | '_error' | '_initLoading';

export class UserStore implements IGlobalStore {
  readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable<this, PrivateFields>(this, {
      _user: observable,
      _isLoading: observable,
      _error: observable,
      _initLoading: observable,
      user: computed,
      isLoading: computed,
      error: computed,
      initLoading: computed,
      registerLoad: action,
      loginLoad: action,
      init: action,
      logOut: action.bound,
    });
  }

  private _user: UserType | null = null;
  private _isLoading: boolean = false;
  private _error: string = '';
  private _initLoading: boolean = true;

  get user(): UserType | null {
    return this._user;
  }
  get isLoading(): boolean {
    return this._isLoading;
  }
  get error(): string {
    return this._error;
  }
  get initLoading(): boolean {
    return this._initLoading;
  }

  registerLoad = async (formData: FormData): Promise<boolean> => {
    this._isLoading = true;
    this._error = '';

    const email = formData.get(EMAIL);
    const password = formData.get(PASSWORD);

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Invalid form data');
    }

    try {
      const response = await register({ email, password });
      const user = response.user;

      localStorage.setItem('jwt', response.jwt);
      localStorage.setItem('user', JSON.stringify(user));

      runInAction(() => {
        this._user = {
          email: user.email,
          id: user.id,
        };
      });

      this.rootStore.toastStore.show('User created', 'success');
      await this.rootStore.cartStore.mergeGuestCart();

      return true;
    } catch (error) {
      runInAction(() => {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          this._error = 'This user already exists';
        } else {
          this._error = 'An unknown error occurred. Please try again later';
        }

        this.rootStore.toastStore.show(this._error, 'error');
      });

      return false;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  };

  loginLoad = async (formData: FormData): Promise<boolean> => {
    this._isLoading = true;
    this._error = '';

    const email = formData.get(EMAIL);
    const password = formData.get(PASSWORD);

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Invalid form data');
    }

    try {
      const response = await login({ email, password });
      const user = response.user;

      localStorage.setItem('jwt', response.jwt);
      localStorage.setItem('user', JSON.stringify(user));

      runInAction(() => {
        this._user = {
          email: user.email,
          id: user.id,
        };
      });

      this.rootStore.toastStore.show('Welcome back!', 'success');
      await this.rootStore.cartStore.mergeGuestCart();

      return true;
    } catch (error) {
      runInAction(() => {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          this._error = 'Invalid email or password';
        } else {
          this._error = 'An unknown error occurred. Please try again later';
        }

        this.rootStore.toastStore.show(this._error, 'error');
      });

      return false;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  };

  logOut = (): void => {
    this.clear();
    this.rootStore.cartStore.clear();

    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  };

  clear = (): void => {
    this._user = null;
    this._isLoading = false;
    this._error = '';
  };

  init = async (): Promise<boolean> => {
    const jwt = localStorage.getItem('jwt');
    const user = localStorage.getItem('user');

    if (jwt && user) {
      try {
        runInAction(() => {
          this._user = JSON.parse(user);
        });
      } catch {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
      }
    }

    this._initLoading = false;

    return true;
  };

  destroy = (): void => {
    this.clear();
  };
}
