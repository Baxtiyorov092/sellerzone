import React from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useProducts } from './ProductContext';
import { LogOut, Package, BarChart2, History, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useProducts();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-1 h-full font-bold transition-all relative ${
          isActive ? 'text-purple-700' : 'text-gray-500 hover:text-purple-600'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
        {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-700 rounded-t-full"></div>}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12 h-full">
            <Link to="/products" className="hover:opacity-80 transition-opacity">
              <Logo size="md" />
            </Link>
            
            <div className="flex items-center gap-8 h-full">
              <NavItem to="/products" icon={Package} label="Mahsulotlar" />
              <NavItem to="/sales" icon={BarChart2} label="Savdo" />
              <NavItem to="/history" icon={History} label="Tarix" />
              
              {user?.role === 'admin' && (
                <NavItem to="/admin" icon={ShieldCheck} label="Admin" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-black text-slate-800 leading-none">{user?.name || user?.email?.split('@')[0]}</span>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">{user?.role}</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-semibold transition-colors py-2 px-4 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100"
            >
              <LogOut className="w-5 h-5" /> Chiqish
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
