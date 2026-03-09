'use client';

import { ProductDetailsStore, ProductDetailsStoreProvider } from '@/store';
import { useLocalStore } from '@/store/hooks';
import { useParams } from 'next/navigation';

const AddToCartProvider = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  const store = useLocalStore(() => new ProductDetailsStore(), [id]);

  return (
    <ProductDetailsStoreProvider store={store}>
      {children}
    </ProductDetailsStoreProvider>
  );
};

export default AddToCartProvider;
