import router from 'config/router';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './styles/global.scss';
import 'config/configureMobX';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
