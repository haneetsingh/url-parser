import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunction,
} from 'react-router-dom';
import { Paths } from './routes';
import './index.css';
import App, { loader as rootLoader } from './App';
import ErrorPage from './components/NotFoundPage';
import Document, { loader as documentLoader } from './components/Document';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader as LoaderFunction,
    children: [
      {
        path: Paths.document,
        element: <Document />,
        loader: documentLoader as LoaderFunction,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>);
