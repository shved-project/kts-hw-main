import type { ProductType } from '@/api/products.api';
import { makeObservable, observable, computed, action } from 'mobx';
import type { IGlobalStore } from '@/store/interfaces';

export type CartItemType = {
  product: ProductType;
  quantity: number;
};

type PrivateFields = '_items';

export class CartStore implements IGlobalStore {
  readonly rootStore: object;

  constructor(rootStore: object) {
    this.rootStore = rootStore;
    makeObservable<this, PrivateFields>(this, {
      _items: observable,
      items: computed,
      totalCount: computed,
      totalPrice: computed,
      addItem: action,
      removeItem: action,
      increaseQuantity: action,
      decreaseQuantity: action,
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

  addItem = (product: ProductType, quantity: number = 1): void => {
    const existing = this._items.find(
      (item) => item.product.documentId === product.documentId
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      this._items.push({ product, quantity });
    }
  };

  removeItem = (documentId: string): void => {
    this._items = this._items.filter(
      (item) => item.product.documentId !== documentId
    );
  };

  increaseQuantity = (documentId: string): void => {
    const item = this._items.find((i) => i.product.documentId === documentId);
    if (item) item.quantity++;
  };

  decreaseQuantity = (documentId: string): void => {
    const item = this._items.find((i) => i.product.documentId === documentId);
    if (!item) return;
    item.quantity = Math.max(0, item.quantity - 1);
    if (item.quantity === 0) {
      this.removeItem(documentId);
    }
  };

  clear = (): void => {
    this._items = [];
  };

  init = async (): Promise<boolean> => {
    return true;
  };

  destroy = (): void => {
    this.clear();
  };
}
