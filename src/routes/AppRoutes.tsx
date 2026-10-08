import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';

import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  const token = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={token ? '/' : '/login'}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}