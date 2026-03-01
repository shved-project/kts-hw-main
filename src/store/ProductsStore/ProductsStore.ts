import {
  getProducts,
  type ProductType,
  type titleQueryType,
} from 'api/products.api';
import { action, makeAutoObservable, runInAction } from 'mobx';
// 'Не удалось загрузить товары. Попробуйте позже'
const ERROR_MESSAGES = {
  apiError: 'Не удалось загрузить товары. Попробуйте позже',
  emptyProductsList: 'Ничего не найдено',
};

class ProductsStore {
  constructor() {
    makeAutoObservable(this, {
      loadProducts: action.bound,
    });
  }

  private _isLoading: boolean = false;
  private _error: string | null = null;
  private _productsList: ProductType[] = [];
  private _total: number = 0;

  private _page: number = 1;

  private _isAllProducts: boolean = false;

  get error(): string | null {
    return this._error;
  }
  get isLoading(): boolean {
    return this._isLoading;
  }
  get productsList(): ProductType[] {
    return this._productsList;
  }
  get page(): number {
    return this._page;
  }
  get total(): number {
    return this._total;
  }
  get isAllProducts(): boolean {
    return this._isAllProducts;
  }

  incrementPage(): void {
    this._page++;
  }

  resetSearch() {
    this._productsList = [];
    this._total = 0;
    this._page = 1;
    this._isAllProducts = false;
  }

  async loadProducts(titleQuery: titleQueryType): Promise<void> {
    if (this._isLoading || this._isAllProducts) return;

    this._isLoading = true;
    this._error = null;

    try {
      const response = await getProducts(this._page, titleQuery);

      if (response.data.length === 0) {
        runInAction(() => {
          this._error = ERROR_MESSAGES.emptyProductsList;
        });
      }

      runInAction(() => {
        this._productsList.push(...response.data);
        this._total = response.meta.pagination.total;
        this.incrementPage();
        this._isAllProducts = this._productsList.length >= this.total;
      });
    } catch {
      runInAction(() => {
        this._error = ERROR_MESSAGES.apiError;
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }
}

const productsStore = new ProductsStore();

export default productsStore;
