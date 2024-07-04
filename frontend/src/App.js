import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';

const PrivateRoute = ({ children }) => {
  const userString = localStorage.getItem("user");
  if (!userString) {
    return <Navigate to="/auth" replace />;
  }

  const user = JSON.parse(userString);
  if (!user.role) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const userString = localStorage.getItem("user");
  if (!userString) {
    return <Navigate to="/auth" replace />;
  }

  const user = JSON.parse(userString);
  // debugger
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const PrivateLayout = () => (
  <PrivateRoute>
    <Outlet />
  </PrivateRoute>
);

const AdminLayout = () => (
  <AdminRoute>
    <Outlet />
  </AdminRoute>
);

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'users',
            element: <UserManagement />,
          },
        ]
      },
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;