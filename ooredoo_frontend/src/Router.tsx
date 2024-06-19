import React from 'react'
import './index.css'
import { QueryProvider } from "@/lib/react-query/QueryProvider.tsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './_auth/pages/Login/Login.tsx';
import { NotFoundPage } from './components/NotFound/NotFoundPage.tsx';
import { Settings } from './_root/pages/Settings.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import AuthLayout from './_auth/AuthLayout.tsx';
import { ListChannels } from './_root/pages/ListChannels.tsx';
import { Root } from './Root.tsx';

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: 'settings',
          element: <Settings />
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    }
  ]);