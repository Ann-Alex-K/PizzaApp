import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Product } from './pages/Product/Product';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { Layout } from './layout/Menu/Layout.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { lazy } from 'react';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Register } from './pages/Register/Register.tsx';
import { Login } from './pages/Login/Login.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '*',
        element: <Error />,
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <Error />,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(
                () =>
                  resolve(
                    axios
                      .get(`${PREFIX}/products/${params.id}`)
                      .then(data => data)
                  ).catch(err => {
                    reject(err);
                  }),
                1000
              );
            }),
          });

          // return defer({
          //   data: axios
          //     .get(`${PREFIX}/products/${params.id}`)
          //     .then(data => data),
          // });

          // await new Promise<void>(resolve => setTimeout(resolve, 1000));
          // const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          // return data;
        },
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
