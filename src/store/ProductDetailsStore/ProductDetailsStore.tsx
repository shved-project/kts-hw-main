import { getProduct, type ProductType } from 'api/products.api';
import axios from 'axios';
import { makeAutoObservable, observable, runInAction } from 'mobx';

type PriveteFields = '_product';

class ProductDetailsStore {
  constructor() {
    makeAutoObservable<this, PriveteFields>(this, {
      _product: observable.ref,
    });
  }

  private _isLoading = false;
  private _error: string | null = null;
  private _product: ProductType | null = null;

  get isLoading(): boolean {
    return this._isLoading;
  }
  get error(): string | null {
    return this._error;
  }
  get product(): ProductType | null {
    return this._product;
  }

  async loadProduct(id: string): Promise<void> {
    this._isLoading = true;
    this._error = null;
    try {
      const response = await getProduct(id);

      runInAction(() => {
        this._product = response;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          runInAction(() => {
            this._error = 'Товар не найден';
          });
        } else {
          runInAction(() => {
            this._error = 'Не удалось загрузить товар. Попробуйте позже';
          });
        }
      } else {
        runInAction(() => {
          this._error = 'Произошла неизвестная ошибка. Попробуйте позже';
        });
      }
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }
}

const productDetailsStore = new ProductDetailsStore();

export default productDetailsStore;
