import { EMAIL, PASSWORD, USERNAME } from '@/api/config/userConfig.api';
import { register, UserType } from '@/api/req/user.api';
import { IGlobalStore } from '@/store/interfaces';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

type PrivateFields = '_user' | '_isLoading' | '_error';

export class UserStore implements IGlobalStore {
  readonly rootStore: object;

  constructor(rootStore: object) {
    this.rootStore = rootStore;

    makeObservable<this, PrivateFields>(this, {
      _user: observable,
      _isLoading: observable,
      _error: observable,
      user: computed,
      isLoading: computed,
      error: computed,
      registerLoad: action,
      init: action,
    });
  }

  private _user: UserType | null = null;
  private _isLoading: boolean = false;
  private _error: string = '';

  get user(): UserType | null {
    return this._user;
  }
  get isLoading(): boolean {
    return this._isLoading;
  }
  get error(): string {
    return this._error;
  }

  registerLoad = async (formData: FormData): Promise<void> => {
    this._isLoading = true;
    this._error = '';

    const email = formData.get(EMAIL);
    const username = formData.get(USERNAME);
    const password = formData.get(PASSWORD);

    if (
      typeof email !== 'string' ||
      typeof username !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new Error('Invalid form data');
    }

    try {
      const response = await register({
        email: email,
        username: username,
        password: password,
      });

      const user = response.user;

      runInAction(() => {
        this._user = {
          email: user.email,
          username: user.username,
          id: user.id,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      this._isLoading = false;
    }
  };

  clear = (): void => {
    this._user = null;
    this._isLoading = false;
    this._error = '';
  };

  init = async (): Promise<boolean> => {
    return true;
  };

  destroy = (): void => {
    this.clear();
  };
}
