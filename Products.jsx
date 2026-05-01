import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, Package, BarChart2, History, ShieldCheck, Search, Plus } from 'lucide-react';

const Products = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Mevalar toplami', price: '45 000', stock: 50, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Sabzavotlar seti', price: '32 000', stock: 120, image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c12e8c?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Sut mahsulotlari', price: '12 500', stock: 45, image: 'https://images.unsplash.com/photo-1550583724-125581fe2f8a?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Non va bulochka', price: '5 000', stock: 200, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'Ichimliklar', price: '8 000', stock: 85, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400' },
    { id: 6, name: 'Shirinliklar', price: '25 000', stock: 30, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left: Menu Links */}
          <div className="flex items-center gap-8 h-full">
            <NavLink to="/products" active>
              <Package className="w-5 h-5" />
              <span>Mahsulotlar</span>
            </NavLink>
            <NavLink to="/sales">
              <BarChart2 className="w-5 h-5" />
              <span>Savdo</span>
            </NavLink>
            <NavLink to="/history">
              <History className="w-5 h-5" />
              <span>Tarix</span>
            </NavLink>
            <NavLink to="/admin">
              <ShieldCheck className="w-5 h-5" />
              <span>Admin</span>
            </NavLink>
          </div>

          {/* Right: Logo & Logout */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer hidden md:flex">
              <div className="bg-purple-700 p-1.5 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Seller<span className="text-purple-700">Zone</span>
              </span>
            </div>
            
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-semibold transition-colors py-2 px-4 rounded-xl hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mahsulotlar</h1>
            <p className="text-gray-500 mt-1">Barcha mahsulotlaringizni boshqaring va nazorat qiling</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Qidiruv..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
            <button className="bg-purple-700 text-white p-3 md:px-6 md:py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 active:scale-95">
              <Plus className="w-6 h-6" />
              <span className="hidden md:inline">Yangi qo'shish</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-[2.5rem] p-4 shadow-md hover:shadow-xl transition-all border border-gray-50 group">
              {/* Product Image */}
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-purple-700">
                  {product.id}# ID
                </div>
              </div>

              {/* Product Info */}
              <div className="px-2 pb-2">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-purple-700">{product.price} <span className="text-sm font-bold uppercase">so'm</span></span>
                  </div>
                  <div className="bg-slate-100 px-4 py-2 rounded-2xl text-slate-600 text-sm font-bold">
                    omborda: {product.stock} dona
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Helper Component for Nav Links
const NavLink = ({ to, children, active = false }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 px-1 h-full font-bold transition-all relative group ${
      active ? 'text-purple-700' : 'text-gray-500 hover:text-purple-600'
    }`}
  >
    {children}
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-700 rounded-t-full"></div>
    )}
  </Link>
);

export default Products;
