import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, Package, BarChart2, History, ShieldCheck, ArrowLeft, Plus, CheckCircle2 } from 'lucide-react';

const ProductDetails = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* Navbar (Same as Products page) */}
      <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
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
        {/* Back Link */}
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-700 transition-colors font-semibold mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Mahsulotlarga qaytish
        </Link>

        {/* Product Details Layout */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-gray-200/50 flex flex-col lg:flex-row gap-12 border border-gray-50">
          
          {/* Left: Product Image */}
          <div className="lg:w-1/2">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-inner bg-slate-50 border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1000" 
                alt="Mevalar toplami" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold w-fit mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sotuvda mavjud</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Mevalar to‘plami
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Yangi terilgan organik mevalar to'plami. Bizning barcha mevalarimiz vitaminlarga boy, hech qanday kimyoviy o'g'itlarsiz yetishtirilgan. Kunlik iste'mol uchun eng yaxshi tanlov.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Narxi</span>
                <span className="text-4xl font-black text-purple-700">45 000 <span className="text-lg">UZS</span></span>
              </div>

              <hr className="border-gray-100" />

              <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-4 rounded-2xl flex flex-col">
                  <span className="text-gray-500 text-xs font-bold uppercase mb-1">Omborda</span>
                  <span className="text-xl font-bold text-gray-900">50 dona</span>
                </div>
                <div className="bg-slate-100 p-4 rounded-2xl flex flex-col">
                  <span className="text-gray-500 text-xs font-bold uppercase mb-1">ID Raqami</span>
                  <span className="text-xl font-bold text-gray-900">#MZ-2024</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-purple-700 text-white py-5 rounded-2xl font-black text-xl hover:bg-purple-800 transition-all shadow-xl shadow-purple-200 active:scale-[0.98] flex items-center justify-center gap-3 mt-auto">
              <Plus className="w-6 h-6" />
              Sotuvga qo‘shish
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// NavLink Component
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

export default ProductDetails;
