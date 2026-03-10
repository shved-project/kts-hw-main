import { Metadata } from 'next';
import Cart from './Cart';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your items and proceed to checkout securely.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Your Shopping Cart | Lalasia',
    description: 'Review and checkout your unique finds from Lalasia.',
  },
  twitter: {
    card: 'summary',
    title: 'Shopping Cart | Lalasia',
    description: 'Review your items and proceed to checkout.',
  },
};

const CartPage = () => {
  return <Cart />;
};

export default CartPage;
