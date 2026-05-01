import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider, useProducts } from './ProductContext';
import { CartProvider } from './CartContext';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import Sales from './Sales';
import History from './History';
import AddProduct from './AddProduct';
import ProductDetails from './ProductDetails';
import Admin from './Admin';
import MainLayout from './MainLayout';
import Dashboard from './Dashboard'; // Dashboard komponentini import qilish

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useProducts();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Kirish taqiqlangan!</h1>
          <p className="text-gray-600 mb-4">Ushbu sahifaga kirish uchun ruxsatingiz yo'q.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Barcha ichki sahifalar uchun umumiy Layout */}
            <Route element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard yo'nalishini qo'shish */}
              <Route path="/products" element={<Products />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/history" element={<History />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/add-product" element={<AddProduct />} />
              
              {/* Faqat Admin kira oladigan sahifa */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Admin />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
