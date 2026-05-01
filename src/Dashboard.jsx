import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Home, Package, ShoppingCart, Warehouse, Settings, PlusCircle } from 'lucide-react';
import { useProducts } from './ProductContext'; // Mahsulotlar va foydalanuvchi ma'lumotlari uchun

const Dashboard = () => {
  const { user, products, logout } = useProducts(); // user va products ni ProductContext'dan olamiz

  // Foydalanuvchi mahsulotlari bo'lmasa ko'rsatiladigan holat
  const hasProducts = products && products.length > 0;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <ShoppingBag className="w-8 h-8 text-purple-700" />
          <span className="text-2xl font-bold text-gray-800">SellerZone</span>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="mb-4">
              <Link to="/dashboard" className="flex items-center gap-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors">
                <Home className="w-5 h-5" />
                Asosiy
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors">
                <Package className="w-5 h-5" />
                Mahsulotlar
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/sales" className="flex items-center gap-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5" />
                Savdo
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/warehouse" className="flex items-center gap-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors">
                <Warehouse className="w-5 h-5" />
                Ombor
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center gap-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                Sozlamalar
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-purple-700" />
            <span className="text-xl font-bold text-gray-800">SellerZone</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5" />
              <span>{user ? user.name || user.email : 'Foydalanuvchi'}</span>
            </div>
            <button 
              onClick={logout} 
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Chiqish
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Asosiy Panel</h1>

          {!hasProducts ? (
            <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md text-center">
              <p className="text-xl text-gray-700 mb-6">
                Hush kelibsiz! Sizda hali do'kon ma'lumotlari mavjud emas.
              </p>
              <Link to="/add-product" className="flex items-center gap-2 px-6 py-3 bg-[#4d47e5] text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors">
                <PlusCircle className="w-5 h-5" />
                Birinchi mahsulotni qo'shish
              </Link>
            </div>
          ) : (
            <div>
              {/* Statistikalar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-600 mb-2">Savdo</h2>
                  <p className="text-3xl font-bold text-gray-800">0 so'm</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-600 mb-2">Foyda</h2>
                  <p className="text-3xl font-bold text-gray-800">0 so'm</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-600 mb-2">Mijozlar</h2>
                  <p className="text-3xl font-bold text-gray-800">0 ta</p>
                </div>
              </div>
              {/* Mahsulotlar ro'yxati yoki boshqa kontent bu yerda bo'lishi mumkin */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Mavjud Mahsulotlar</h2>
                {/* Bu yerda mahsulotlar ro'yxati ko'rsatiladi */}
                <p>Mahsulotlaringiz ro'yxati...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
