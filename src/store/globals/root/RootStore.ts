import { CartStore } from '@/store/globals/cart';
import { ThemeStore } from '@/store/globals/theme';
import { UserStore } from '../user/UserStore';

export interface IRootStore {
  readonly cartStore: CartStore;
  readonly themeStore: ThemeStore;
  readonly userStore: UserStore;
}

export class RootStore implements IRootStore {
  readonly cartStore: CartStore;
  readonly userStore: UserStore;
  readonly themeStore: ThemeStore;

  constructor() {
    this.cartStore = new CartStore(this);
    this.userStore = new UserStore(this);
    this.themeStore = new ThemeStore();
  }

  destroy = (): void => {
    this.cartStore.destroy();
  };
}
