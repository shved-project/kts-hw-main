import type { ProductType } from '@/api/req/products.api';
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import type { IGlobalStore } from '@/store/interfaces';
import {
  addToCart,
  CartItemType,
  getCart,
  removeFromCart,
} from '@/api/req/cart.api';
import axios from 'axios';
import { RootStore } from '../root';

const GUEST_CART_KEY = 'guest_cart';

type PrivateFields =
  | '_items'
  | 'updateItemQuantity'
  | 'addNewItem'
  | 'removeItemAtIndex'
  | 'setItems';

export class CartStore implements IGlobalStore {
  readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable<this, PrivateFields>(this, {
      _items: observable,
      items: computed,
      totalCount: computed,
      totalPrice: computed,
      addItem: action,
      removeItem: action,
      removeOneItem: action,
      increaseQuantity: action,
      clear: action,
      init: action,
      destroy: action,
      updateItemQuantity: action,
      addNewItem: action,
      removeItemAtIndex: action,
      setItems: action,
    });
  }

  private _items: CartItemType[] = [];

  private get isGuest(): boolean {
    return !this.rootStore.userStore.user;
  }

  get items(): CartItemType[] {
    return this._items;
  }

  get totalCount(): number {
    return this._items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this._items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  isInCart = (documentId: string): boolean => {
    return this._items.some((item) => item.product.documentId === documentId);
  };

  private _saveToLocalStorage = (): void => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(this._items));
    } catch {
      /* localStorage may be unavailable */
    }
  };

  private _loadFromLocalStorage = (): CartItemType[] => {
    try {
      const raw = localStorage.getItem(GUEST_CART_KEY);
      if (raw) {
        return JSON.parse(raw) as CartItemType[];
      }
    } catch {
      /* corrupted data or unavailable */
    }
    return [];
  };

  private _clearLocalStorage = (): void => {
    try {
      localStorage.removeItem(GUEST_CART_KEY);
    } catch {
      /* localStorage may be unavailable */
    }
  };

  private handleApiError = (error: unknown, message: string): void => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        this.rootStore.toastStore.show(
          'Please log in to manage your cart',
          'error'
        );
        return;
      }
    }
    this.rootStore.toastStore.show(message, 'error');
  };

  private updateItemQuantity = action(
    (item: CartItemType, newQuantity: number) => {
      item.quantity = newQuantity;
    }
  );

  private addNewItem = action((product: ProductType, quantity: number) => {
    this._items.push({ product, quantity });
  });

  private removeItemAtIndex = action((index: number) => {
    this._items.splice(index, 1);
  });

  private setItems = action((items: CartItemType[]) => {
    this._items = items;
  });

  addItem = async (
    product: ProductType,
    quantity: number = 1
  ): Promise<{ success: boolean }> => {
    const existing = this._items.find((item) => item.product.id === product.id);
    const originalItems = [...this._items];

    if (existing) {
      this.updateItemQuantity(existing, existing.quantity + quantity);
    } else {
      this.addNewItem(product, quantity);
    }

    if (this.isGuest) {
      this._saveToLocalStorage();
      return { success: true };
    }

    try {
      await addToCart(product.id, quantity);
      return { success: true };
    } catch (error) {
      runInAction(() => {
        this._items = originalItems;
      });
      this.handleApiError(
        error,
        'Failed to add item to cart. Please try again.'
      );
      return { success: false };
    }
  };

  removeOneItem = async (id: number): Promise<void> => {
    const itemIndex = this._items.findIndex((item) => item.product.id === id);
    if (itemIndex === -1) return;

    const originalItems = [...this._items];
    const item = this._items[itemIndex];

    if (item.quantity > 1) {
      this.updateItemQuantity(item, item.quantity - 1);
    } else {
      this.removeItemAtIndex(itemIndex);
    }

    if (this.isGuest) {
      this._saveToLocalStorage();
      return;
    }

    try {
      await removeFromCart(id, 1);
    } catch (error) {
      runInAction(() => {
        this._items = originalItems;
      });
      this.handleApiError(
        error,
        'Failed to remove the item from your cart. Please try again.'
      );
    }
  };

  removeItem = async (id: number): Promise<void> => {
    const itemExists = this._items.find((item) => item.product.id === id);
    if (!itemExists) return;

    const originalItems = [...this._items];
    const itemQuantity = itemExists.quantity;

    this.setItems(this._items.filter((item) => item.product.id !== id));

    if (this.isGuest) {
      this._saveToLocalStorage();
      return;
    }

    try {
      await removeFromCart(id, itemQuantity);
    } catch (error) {
      runInAction(() => {
        this._items = originalItems;
      });
      this.handleApiError(
        error,
        'Failed to remove the item from your cart. Please try again.'
      );
    }
  };

  increaseQuantity = (id: number): void => {
    const item = this._items.find((i) => i.product.id === id);
    if (item) {
      this.addItem(item.product, 1);
    }
  };

  decreaseQuantity = (id: number): void => {
    this.removeOneItem(id);
  };

  clear = action((): void => {
    this._items = [];
  });

  mergeGuestCart = async (): Promise<void> => {
    const guestItems = this._loadFromLocalStorage();

    if (guestItems.length === 0) {
      await this.init();
      return;
    }

    try {
      for (const item of guestItems) {
        await addToCart(item.product.id, item.quantity);
      }
    } catch {
      /* partial merge is acceptable — server has what it received */
    }

    this._clearLocalStorage();

    try {
      const response = await getCart();
      runInAction(() => {
        this._items = response;
      });
    } catch {
      /* cart will load on next init */
    }
  };

  init = async (): Promise<boolean> => {
    if (this.isGuest) {
      const guestItems = this._loadFromLocalStorage();
      runInAction(() => {
        this._items = guestItems;
      });
      return true;
    }

    try {
      const response = await getCart();
      runInAction(() => {
        this._items = response;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          this.rootStore.userStore.logOut();
          const guestItems = this._loadFromLocalStorage();
          runInAction(() => {
            this._items = guestItems;
          });
        }
      }
    }
    return true;
  };

  destroy = (): void => {
    this.clear();
  };
}
