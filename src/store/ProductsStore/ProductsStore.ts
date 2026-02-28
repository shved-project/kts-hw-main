import { getProducts, type ProductType } from 'api/products.api';
import { action, makeAutoObservable, runInAction } from 'mobx';

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

  async loadProducts(titleQuery: string | null): Promise<void> {
    if (this._isLoading || this._isAllProducts) return;

    this._isLoading = true;
    this._error = null;

    try {
      const response = await getProducts(this._page, titleQuery);

      runInAction(() => {
        this._productsList.push(...response.data);
        if (this.total === 0) this._total = response.meta.pagination.total;
        this.incrementPage();
        this._isAllProducts = this._productsList.length >= this.total;
      });
    } catch {
      runInAction(() => {
        this._error = 'Не удалось загрузить товары. Попробуйте позже';
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
