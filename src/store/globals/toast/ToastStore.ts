import { IGlobalStore } from '@/store/interfaces';
import { action, makeObservable, observable, runInAction } from 'mobx';

export type ToastStatus = 'success' | 'error';

export class ToastStore implements IGlobalStore {
  readonly rootStore: object;

  message: string = '';
  status: ToastStatus = 'success';
  isVisible: boolean = false;

  private timeoutId?: number;

  constructor(rootStore: object) {
    this.rootStore = rootStore;

    makeObservable(this, {
      message: observable,
      status: observable,
      isVisible: observable,
      show: action.bound,
      hide: action,
      clear: action,
    });
  }

  show(
    message: string,
    status: ToastStatus = 'success',
    duration: number = 5000
  ) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    runInAction(() => {
      this.message = message;
      this.status = status;
      this.isVisible = true;
    });

    this.timeoutId = window.setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    runInAction(() => {
      this.isVisible = false;
    });
  }

  clear() {
    this.message = '';
    this.status = 'success';
    this.isVisible = false;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  init = async (): Promise<boolean> => true;

  destroy = (): void => {
    this.clear();
  };
}
