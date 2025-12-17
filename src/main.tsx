import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import SplashScreen from './pages/SplashScreen';
import OnboardingPage from './pages/OnboardingPage';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import AccountCreatedRoute from './routes/AccountCreatedRoute';
import AccountSettingsStep2 from './pages/AccountSettingsStep2';
import AccountSettingsStep3 from './pages/AccountSettingsStep3';
import AccountUpdated from './pages/AccountUpdated';
import MainPage from './pages/MainPage';
import CategoriesPage from './pages/CategoriesPage';
import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage';
import FavoritesPage from './pages/FavoritesPage';
import CategorySubcategoriesPage from './pages/CategorySubcategoriesPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import CartPage from './pages/CartPage';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartContext'; 
import ProfilePage from './pages/ProfilePage';
import PersonalDataPage from './pages/PersonalDataPage';
import AdminProductNew from './pages/AdminProductNew';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';



const router = createBrowserRouter([
  { path: '/', element: <SplashScreen /> },
  { path: '/onboarding', element: <OnboardingPage /> },
  { path: '/welcome', element: <WelcomeScreen /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/register/success', element: <AccountCreatedRoute /> },
  { path: '/account-settings', element: <AccountSettingsPage /> },
  { path: '/account-settings/step2', element: <AccountSettingsStep2 /> },
  { path: '/account-settings/step3', element: <AccountSettingsStep3 /> },
  { path: '/account-updated', element: <AccountUpdated /> },
  { path: '/main-page', element: <MainPage /> },
    { path: '/search', element: <SearchPage /> },

  { path: '/product/:id', element: <ProductPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '/categories', element: <CategoriesPage /> },
    { path: '/categories/:slug', element: <CategorySubcategoriesPage /> },
      { path: '/categories/:slug/:subSlug', element: <CategoryProductsPage /> },
        { path: '/cart', element: <CartPage /> },
                { path: '/checkout', element: <CheckoutPage /> },
                                { path: '/order-success', element: <OrderSuccessPage /> },
          { path: '/profile', element: <ProfilePage /> },
            { path: '/profile/personal', element: <PersonalDataPage /> },
              
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminProducts />
      </ProtectedRoute>
    ),
  },
  {
  path: '/admin/products/new',
  element: (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminProductNew />
    </ProtectedRoute>
  ),
},
  {
    path: '/admin/orders',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminOrders />
      </ProtectedRoute>
    ),
  },




]);

ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
