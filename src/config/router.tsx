import Home from 'pages/Home';
import App from '../App';
import Products from 'pages/Products';
import Product from 'pages/Product';
import Cart from 'pages/Cart';
import { createBrowserRouter } from 'react-router';
import routerData from './routerData';
import NotFound from 'pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routerData.products.href,
        element: <Products />,
      },
      {
        path: routerData.product.href,
        element: <Product />,
      },
      {
        path: routerData.cart.href,
        element: <Cart />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
