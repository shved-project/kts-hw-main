import { getProducts, type ProductType } from '@/api/products.api';
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
  | '_error'
  | '_productsList'
  | '_page'
  | '_total';

export class ProductsStore implements ILocalStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _productsList: observable,
      _page: observable,
      _total: observable,
      _isLoading: observable,
      _error: observable,
      productsList: computed,
      page: computed,
      isLoading: computed,
      error: computed,
      loadProductsList: action.bound,
    });
  }

  private _productsList: ProductType[] = [];
  private _page: number = 1;
  private _total: number = 0;
  private _isLoading: boolean = true;
  private _error: string | null = null;

  get productsList(): ProductType[] {
    return this._productsList;
  }
  get page(): number {
    return this._page;
  }
  get total(): number {
    return this._total;
  }
  get isLoading(): boolean {
    return this._isLoading;
  }
  get error(): string | null {
    return this._error;
  }

  async loadProductsList(): Promise<void> {
    this._isLoading = true;
    this._error = null;

    try {
      const response = await getProducts();

      runInAction(() => {
        this._productsList = response.data;
        this._page++;
        this._total = response.meta.pagination.total;
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

  destroy: VoidFunction = () => {
    this._productsList = [];
    this._page = 1;
    this._total = 0;
    this._isLoading = true;
    this._error = null;
  };
  // readonly filtersStore: FiltersStore;

  // constructor() {
  //   this.filtersStore = new FiltersStore(this);
  //   makeObservable<this, PrivateFields>(this, {
  //     _isLoading: observable,
  //     _error: observable,
  //     _productsList: observable,
  //     _total: observable,
  //     _page: observable,
  //     _isAllProducts: observable,
  //     _isEmptySearchResult: observable,
  //     error: computed,
  //     isLoading: computed,
  //     productsList: computed,
  //     page: computed,
  //     total: computed,
  //     isAllProducts: computed,
  //     isEmptySearchResult: computed,
  //     incrementPage: action,
  //     resetAndLoad: action,
  //     loadProducts: action,
  //     setupInfiniteScroll: action,
  //     destroy: action,
  //   });
  // }

  // private _isLoading: boolean = false;
  // private _error: string | null = null;
  // private _productsList: ProductType[] = [];
  // private _total: number = 0;
  // private _isEmptySearchResult: boolean = false;

  // private _page: number = 1;

  // private _isAllProducts: boolean = false;

  // get error(): string | null {
  //   return this._error;
  // }
  // get isLoading(): boolean {
  //   return this._isLoading;
  // }
  // get productsList(): ProductType[] {
  //   return this._productsList;
  // }
  // get page(): number {
  //   return this._page;
  // }
  // get total(): number {
  //   return this._total;
  // }
  // get isAllProducts(): boolean {
  //   return this._isAllProducts;
  // }
  // get isEmptySearchResult(): boolean {
  //   return this._isEmptySearchResult;
  // }

  // incrementPage = (): void => {
  //   this._page++;
  // };

  // resetAndLoad = (): void => {
  //   runInAction(() => {
  //     this._productsList = [];
  //     this._page = 1;
  //     this._total = 0;
  //     this._isAllProducts = false;
  //   });
  //   this.loadProducts(true);
  // };

  // loadProducts = async (reset: boolean = false): Promise<void> => {
  //   if (this._isLoading) return;
  //   if (!reset && this._isAllProducts) return;

  //   const { search, categoryId } = this.filtersStore;

  //   this._isLoading = true;
  //   this._error = null;
  //   try {
  //     const response = await getProducts({
  //       page: this._page,
  //       search: search || undefined,
  //       categoryId: categoryId ?? undefined,
  //     });

  //     runInAction(() => {
  //       if (reset) {
  //         this._productsList = response.data;
  //       } else {
  //         this._productsList.push(...response.data);
  //       }
  //       this._total = response.meta.pagination.total;
  //       this._page++;
  //       this._isAllProducts =
  //         this._productsList.length >= response.meta.pagination.total;
  //       this._isEmptySearchResult = response.data.length === 0;
  //     });
  //   } catch {
  //     runInAction(() => {
  //       this._error = 'Не удалось загрузить товары. Попробуйте позже';
  //     });
  //   } finally {
  //     runInAction(() => {
  //       this._isLoading = false;
  //     });
  //   }
  // };

  // setupInfiniteScroll = (element: HTMLElement | null): (() => void) => {
  //   return setupInfiniteScrollUtil(
  //     element,
  //     this.loadProducts,
  //     () => this._page === 1
  //   );
  // };

  // destroy = (): void => {
  //   this.filtersStore.destroy();
  //   this._productsList = [];
  //   this._error = null;
  //   this._page = 1;
  //   this._total = 0;
  //   this._isAllProducts = false;
  //   this._isEmptySearchResult = false;
  // };
}
