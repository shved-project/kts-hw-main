import Home from 'pages/Home';
import App from '../App';
import Products from 'pages/Products';
import Product from 'pages/Product';
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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
