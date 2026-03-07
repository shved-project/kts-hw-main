'use client';

import { createLocalContext } from '@/store/createLocalContext';
import { ProductDetailsStore } from './ProductDetailsStore';

export const {
  Provider: ProductDetailsStoreProvider,
  useStore: useProductDetailsStore,
} = createLocalContext(ProductDetailsStore);
