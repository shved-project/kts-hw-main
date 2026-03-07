import { getProduct, type ProductType } from '@/api/products.api';
import axios from 'axios';
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import type { ILocalStore } from '@/store/interfaces';

type PrivateFields =
  | '_isLoading'
  | '_hasInitiallyLoaded'
  | '_error'
  | '_product';

export class ProductDetailsStore implements ILocalStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,
      _hasInitiallyLoaded: observable,
      _error: observable,
      _product: observable.ref,
      isLoading: computed,
      hasInitiallyLoaded: computed,
      error: computed,
      product: computed,
      loadProduct: action,
      destroy: action,
    });
  }

  private _isLoading = false;
  private _hasInitiallyLoaded = false;
  private _error: string | null = null;
  private _product: ProductType | null = null;

  get isLoading(): boolean {
    return this._isLoading;
  }

  get hasInitiallyLoaded(): boolean {
    return this._hasInitiallyLoaded;
  }

  get error(): string | null {
    return this._error;
  }

  get product(): ProductType | null {
    return this._product;
  }

  loadProduct = async (id: string): Promise<void> => {
    this._isLoading = true;
    this._error = null;
    try {
      const response = await getProduct(id);

      runInAction(() => {
        this._product = response;
        this._hasInitiallyLoaded = true;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          runInAction(() => {
            this._error = 'Товар не найден';
            this._hasInitiallyLoaded = true;
          });
        } else {
          runInAction(() => {
            this._error = 'Не удалось загрузить товар. Попробуйте позже';
            this._hasInitiallyLoaded = true;
          });
        }
      } else {
        runInAction(() => {
          this._error = 'Произошла неизвестная ошибка. Попробуйте позже';
          this._hasInitiallyLoaded = true;
        });
      }
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  };

  destroy = (): void => {
    this._product = null;
    this._error = null;
    this._isLoading = false;
    this._hasInitiallyLoaded = false;
  };
}
