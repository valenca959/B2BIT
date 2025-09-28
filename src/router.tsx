import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AuthLayout from './components/AuthLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/',
        element: <Navigate to="/profile" replace />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}