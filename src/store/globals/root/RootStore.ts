import { CartStore } from '@/store/globals/cart';

export interface IRootStore {
  readonly cartStore: CartStore;
}

export class RootStore implements IRootStore {
  readonly cartStore: CartStore;

  constructor() {
    this.cartStore = new CartStore(this);
  }

  destroy = (): void => {
    this.cartStore.destroy();
  };
}
