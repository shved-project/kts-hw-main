import { Metadata } from 'next';
import Products from './products/Products';

export const metadata: Metadata = {
  title: 'All Products',
  description:
    'Browse our complete collection of handmade goods, vintage items, and creative supplies from talented sellers worldwide.',
  keywords: [
    'handmade products',
    'vintage items',
    'artisan goods',
    'unique gifts',
    'craft supplies',
  ],
  openGraph: {
    title: 'All Products | Lalasia',
    description: 'Browse thousands of unique items from independent creators.',
  },
};

const ProductsPage = () => {
  return <Products />;
};

export default ProductsPage;
