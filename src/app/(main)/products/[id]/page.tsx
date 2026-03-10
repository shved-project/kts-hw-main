import { Suspense } from 'react';
import ProductDetail from './ProductDetail';
import Loader from '@/components/Loader';
import styles from './ProductDetail.module.scss';

type PageProps = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <Suspense fallback={<Loader className={styles.product__loader} />}>
      <ProductDetail productId={id} />
    </Suspense>
  );
};

export default ProductDetailPage;
