import Home from 'pages/Home';
import App from '../App';
import Products from 'pages/Products';
import Product from 'pages/Product';
import { createBrowserRouter } from 'react-router';
import routerData from './routerData';
import NotFound from 'pages/NotFound';
import productsStore from 'store/ProductsStore';

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
        loader: ({ request }) => {
          const url = new URL(request.url);
          const title = url.searchParams.get('title');

          console.log(title);

          productsStore.searchProducts();

          productsStore.loadProducts(title);
        },
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
