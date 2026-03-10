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
  | '_currentCategoryId'
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
      _currentCategoryId: observable,
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
      currentCategoryId: computed,
      error: computed,
      loadProductsList: action.bound,
      clearProductsList: action.bound,
      setupInfiniteScroll: action.bound,
      setSearchParam: action.bound,
      setCurrentCategoryId: action.bound,
      loadCategories: action.bound,
      setOpenCategoriesDropdown: action.bound,
      destroy: action.bound,
    });
  }

  private _productsList: ProductType[] = [];
  private _page: number = 1;
  private _searchParam: string = '';
  private _currentCategoryId: string | null = null;
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
  get currentCategoryId(): string | null {
    return this._currentCategoryId;
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
        categoryId: this._currentCategoryId,
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
  setCurrentCategoryId(category: string | null) {
    this._currentCategoryId = category;
  }

  setOpenCategoriesDropdown(isOpen: boolean) {
    this._isOpenCategoriesDropdown = isOpen;
  }

  destroy: VoidFunction = () => {
    this._productsList = [];
    this._page = 1;
    this._searchParam = '';
    this._currentCategoryId = null;
    this._total = 0;
    this._isAllLoadProducts = false;
    this._isInitLoading = true;
    this._isEmptySearchResult = false;
    this._error = null;
    this._categories = [];
    this._isOpenCategoriesDropdown = false;
  };
}
