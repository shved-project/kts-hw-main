import type { ProductType } from '@/api/req/products.api';
import { makeObservable, observable, computed, action } from 'mobx';
import type { IGlobalStore } from '@/store/interfaces';
import {
  addToCart,
  CartItemType,
  getCart,
  removeFromCart,
} from '@/api/req/cart.api';
import axios from 'axios';
import { RootStore } from '../root';

type PrivateFields = '_items';

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
    });
  }

  private _items: CartItemType[] = [];

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

  private handleAuthError = (error: unknown): boolean => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        this.rootStore.toastStore.show(
          'Please log in to manage your cart',
          'error'
        );
        return true;
      }
    }
    return false;
  };

  addItem = async (
    product: ProductType,
    quantity: number = 1
  ): Promise<{ success: boolean; notAuthorized: boolean }> => {
    const existing = this._items.find((item) => item.product.id === product.id);
    const originalQuantity = existing?.quantity || 0;

    if (existing) {
      existing.quantity += quantity;
    } else {
      this._items.push({ product, quantity });
    }

    try {
      await addToCart(product.id, quantity);
      return { success: true, notAuthorized: false };
    } catch (error) {
      if (existing) {
        existing.quantity = originalQuantity;
      } else {
        this._items = this._items.filter(
          (item) => item.product.id !== product.id
        );
      }

      if (this.handleAuthError(error)) {
        return { success: false, notAuthorized: true };
      }

      this.rootStore.toastStore.show(
        'Failed to add item to cart. Please try again.',
        'error'
      );
      return { success: false, notAuthorized: false };
    }
  };

  removeOneItem = async (id: number): Promise<void> => {
    const itemIndex = this._items.findIndex((item) => item.product.id === id);
    if (itemIndex === -1) return;

    const item = this._items[itemIndex];

    const originalItems = [...this._items];

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this._items.splice(itemIndex, 1);
    }

    try {
      await removeFromCart(id, 1);
    } catch (error) {
      this._items = originalItems;

      if (!this.handleAuthError(error)) {
        this.rootStore.toastStore.show(
          'Failed to remove the item from your cart. Please try again.',
          'error'
        );
      }
    }
  };

  removeItem = async (id: number): Promise<void> => {
    const itemExists = this._items.find((item) => item.product.id === id);
    if (!itemExists) return;

    const originalItems = [...this._items];

    this._items = this._items.filter((item) => item.product.id !== id);

    try {
      await removeFromCart(id, itemExists.quantity);
    } catch (error) {
      this._items = originalItems;

      if (!this.handleAuthError(error)) {
        this.rootStore.toastStore.show(
          'Failed to remove the item from your cart. Please try again.',
          'error'
        );
      }
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

  clear = (): void => {
    this._items = [];
  };

  init = async (): Promise<boolean> => {
    if (!this.rootStore.userStore.user) {
      this.clear();
      return true;
    }

    try {
      const response = await getCart();
      this._items = response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          this.clear();
        }
      }
    }
    return true;
  };

  destroy = (): void => {
    this.clear();
  };
}
