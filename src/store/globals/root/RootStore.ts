import { CartStore } from '@/store/globals/cart';
import { ThemeStore } from '@/store/globals/theme';

export interface IRootStore {
  readonly cartStore: CartStore;
  readonly themeStore: ThemeStore;
}

export class RootStore implements IRootStore {
  readonly cartStore: CartStore;
  readonly themeStore: ThemeStore;

  constructor() {
    this.cartStore = new CartStore(this);
    this.themeStore = new ThemeStore();
  }

  destroy = (): void => {
    this.cartStore.destroy();
  };
}
