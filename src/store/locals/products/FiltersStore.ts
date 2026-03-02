import debounce from 'lodash.debounce';
import {
  getProductCategories,
  type ProductCategoryType,
} from 'api/products.api';
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import type { ILocalStore } from 'store/interfaces';

const DEBOUNCE_MS = 500;
const QUERY_SEARCH = 'search';
const QUERY_CATEGORY = 'category';

type ProductsStoreRef = {
  resetAndLoad: () => void;
};

type PrivateFields =
  | '_search'
  | '_categoryId'
  | '_categories'
  | '_currentCategoryTitle'
  | '_isDropdownOpen';

export type QueryParams = Record<string, string>;

export class FiltersStore implements ILocalStore {
  private readonly productsStore: ProductsStoreRef;

  private _syncUrlCallback: (() => void) | null = null;

  private readonly debouncedApplySearch = debounce(() => {
    this.applySearch();
    this._syncUrlCallback?.();
  }, DEBOUNCE_MS);

  private readonly debouncedSyncUrl = debounce(() => {
    this._syncUrlCallback?.();
  }, DEBOUNCE_MS);

  constructor(productsStore: ProductsStoreRef) {
    this.productsStore = productsStore;
    makeObservable<this, PrivateFields>(this, {
      _search: observable,
      _categoryId: observable,
      _categories: observable,
      _currentCategoryTitle: observable,
      _isDropdownOpen: observable,
      search: computed,
      categoryId: computed,
      categories: computed,
      currentCategoryTitle: computed,
      isDropdownOpen: computed,
      setSearch: action,
      setCategoryId: action,
      setIsDropdownOpen: action,
      loadCategories: action,
      applySearch: action,
      applyCategory: action,
      setCurrentCategoryTitle: action,
      setSearchAndApply: action,
      destroy: action,
    });
  }

  private _search = '';
  private _categoryId: number | null = null;
  private _categories: ProductCategoryType[] = [];
  private _currentCategoryTitle: string = 'All categories';
  private _isDropdownOpen: boolean = false;

  get search(): string {
    return this._search;
  }

  get categoryId(): number | null {
    return this._categoryId;
  }

  get categories(): ProductCategoryType[] {
    return this._categories;
  }

  get currentCategoryTitle(): string {
    return this._currentCategoryTitle;
  }

  get isDropdownOpen(): boolean {
    return this._isDropdownOpen;
  }

  setCurrentCategoryTitle = (title: string): void => {
    this._currentCategoryTitle = title;
  };

  setIsDropdownOpen = (isOpen: boolean): void => {
    this._isDropdownOpen = isOpen;
  };

  setSearch = (value: string): void => {
    this._search = value;
  };

  setCategoryId = (id: number | null): void => {
    this._categoryId = id;
  };

  setSearchAndApply = (value: string): void => {
    this._search = value;
    this.debouncedApplySearch();
    this.debouncedSyncUrl();
  };

  getQueryParams = (): QueryParams => {
    const params: QueryParams = {};
    if (this._search) params[QUERY_SEARCH] = this._search;
    if (this._categoryId != null)
      params[QUERY_CATEGORY] = String(this._categoryId);
    return params;
  };

  cancelDebouncedApply = (): void => {
    this.debouncedApplySearch.cancel();
    this.debouncedSyncUrl.cancel();
  };

  setSyncUrlCallback = (cb: (() => void) | null): void => {
    this._syncUrlCallback = cb;
  };

  loadCategories = async (): Promise<void> => {
    const res = await getProductCategories();
    runInAction(() => {
      this._categories = res.data;
    });
  };

  applySearch = (): void => {
    this.productsStore.resetAndLoad();
  };

  applyCategory = (categoryId: number | null): void => {
    this._categoryId = categoryId;
    this.productsStore.resetAndLoad();
  };

  destroy = (): void => {
    this.cancelDebouncedApply();
    this.setSyncUrlCallback(null);
    this._search = '';
    this._categoryId = null;
    this._categories = [];
    this._currentCategoryTitle = 'All categories';
    this._isDropdownOpen = false;
  };
}
