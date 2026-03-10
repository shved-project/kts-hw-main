'use client';

import { createLocalContext } from '@/store/createLocalContext';
import { ProductsStore } from './ProductsStore';

export const { Provider: ProductsStoreProvider, useStore: useProductsStore } =
  createLocalContext(ProductsStore);
