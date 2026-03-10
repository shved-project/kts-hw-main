import { Suspense } from 'react';
import ProductDetail from './ProductDetail';
import Loader from '@/components/Loader';
import styles from './ProductDetail.module.scss';
import { Metadata } from 'next';
import { getProduct } from '@/api/products.api';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProduct(id);

    return {
      title: product.title,
      description: product.description?.substring(0, 160),
      openGraph: {
        title: product.title,
        description: product.description?.substring(0, 160),
        images: product.images?.length ? [product.images[0]] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description?.substring(0, 160),
        images: product.images?.length ? [product.images[0]] : [],
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <Suspense fallback={<Loader className={styles.product__loader} />}>
      <ProductDetail productId={id} />
    </Suspense>
  );
};

export default ProductDetailPage;
