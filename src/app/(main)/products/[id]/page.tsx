import ProductDetail from './ProductDetail';

type PageProps = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return <ProductDetail productId={id} />;
};

export default ProductDetailPage;
