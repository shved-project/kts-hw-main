import {
  getProductCategories,
  getProducts,
  ProductCategoryType,
  type ProductType,
} from '@/api/products.api';
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import type { ILocalStore } from '@/store/interfaces';
import { setupInfiniteScroll as setupInfiniteScrollUtil } from './infiniteScroll';

type PrivateFields =
  | '_isInitLoading'
  | '_error'
  | '_productsList'
  | '_isLoading'
  | '_isEmptySearchResult'
  | '_page'
  | '_searchParam'
  | '_currentCategory'
  | '_total'
  | '_isAllLoadProducts'
  | '_categories'
  | '_isOpenCategoriesDropdown';

export class ProductsStore implements ILocalStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _productsList: observable,
      _page: observable,
      _searchParam: observable,
      _currentCategory: observable,
      _total: observable,
      _isAllLoadProducts: observable,
      _isLoading: observable,
      _isInitLoading: observable,
      _isEmptySearchResult: observable,
      _error: observable,
      _categories: observable,
      _isOpenCategoriesDropdown: observable,
      productsList: computed,
      page: computed,
      searchParam: computed,
      currentCategory: computed,
      error: computed,
      loadProductsList: action.bound,
      clearProductsList: action.bound,
      setupInfiniteScroll: action.bound,
      setSearchParam: action.bound,
      setCurrentCategory: action.bound,
      loadCategories: action.bound,
      setOpenCategoriesDropdown: action.bound,
      destroy: action.bound,
    });
  }

  private _productsList: ProductType[] = [];
  private _page: number = 1;
  private _searchParam: string = '';
  private _currentCategory: ProductCategoryType | null = null;
  private _total: number = 0;
  private _isAllLoadProducts: boolean = false;
  private _isLoading: boolean = false;
  private _isInitLoading: boolean = true;
  private _isEmptySearchResult: boolean = false;
  private _error: string | null = null;
  private _categories: ProductCategoryType[] = [];
  private _isOpenCategoriesDropdown: boolean = false;

  get productsList(): ProductType[] {
    return this._productsList;
  }
  get page(): number {
    return this._page;
  }
  get searchParam(): string {
    return this._searchParam;
  }
  get currentCategory(): ProductCategoryType | null {
    return this._currentCategory;
  }
  get total(): number {
    return this._total;
  }
  get isInitLoading(): boolean {
    return this._isInitLoading;
  }
  get isEmptySearchResult(): boolean {
    return this._isEmptySearchResult;
  }
  get isAllLoadProducts(): boolean {
    return this._isAllLoadProducts;
  }
  get error(): string | null {
    return this._error;
  }
  get categories(): ProductCategoryType[] {
    return this._categories;
  }
  get isOpenCategoriesDropdown(): boolean {
    return this._isOpenCategoriesDropdown;
  }

  async loadProductsList(): Promise<void> {
    if (this._isAllLoadProducts || this._isLoading) return;

    this._isLoading = true;
    this._error = null;

    try {
      const response = await getProducts({
        page: this._page,
        search: this._searchParam,
        categoryId: this._currentCategory?.id,
      });

      runInAction(() => {
        if (this._isInitLoading) {
          this._isInitLoading = false;
        }
        if (response.data.length === 0) {
          this._isEmptySearchResult = true;
        } else {
          this._isEmptySearchResult = false;
        }

        this._productsList = [...this._productsList, ...response.data];
        this._page++;
        this._total = response.meta.pagination.total;
        this._isAllLoadProducts = this._productsList.length >= this._total;
      });
    } catch {
      runInAction(() => {
        this._isInitLoading = false;
        this._error = 'Failed to load products. Please try again later.';
      });
    } finally {
      this._isLoading = false;
    }
  }

  loadCategories = async (): Promise<void> => {
    const res = await getProductCategories();
    runInAction(() => {
      this._categories = res.data;
    });
  };

  clearProductsList() {
    this._productsList = [];
    this._page = 1;
    this._total = 0;
    this._isAllLoadProducts = false;
    this._isInitLoading = true;
  }

  setupInfiniteScroll(element: HTMLElement | null) {
    return setupInfiniteScrollUtil(element, () => this.loadProductsList());
  }

  setSearchParam(search: string) {
    this._searchParam = search;
  }
  setCurrentCategory(category: ProductCategoryType | null) {
    this._currentCategory = category;
  }

  setOpenCategoriesDropdown(isOpen: boolean) {
    this._isOpenCategoriesDropdown = isOpen;
  }

  destroy: VoidFunction = () => {
    this._productsList = [];
    this._page = 1;
    this._searchParam = '';
    this._currentCategory = null;
    this._total = 0;
    this._isAllLoadProducts = false;
    this._isInitLoading = true;
    this._isEmptySearchResult = false;
    this._error = null;
    this._categories = [];
    this._isOpenCategoriesDropdown = false;
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
