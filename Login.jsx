import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login mantiqi bu yerda bo'ladi
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans">
      {/* Back to Home */}
      <Link 
        to="/" 
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-purple-700 transition-colors font-medium group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Bosh sahifaga qaytish
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-purple-700 p-3 rounded-2xl mb-4 shadow-lg shadow-purple-200">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Hisobingizga kiring</h1>
          <p className="text-gray-500 mt-2 text-center text-sm">
            SellerZone tizimiga xush kelibsiz!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email manzilingiz
            </label>
            <input 
              type="email" 
              required
              placeholder="example@mail.com"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Parol
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-gray-400"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button type="button" className="text-sm font-medium text-purple-700 hover:underline">
              Parolni unutdingizmi?
            </button>
          </div>

          <button 
            type="submit"
            className="w-full bg-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 active:scale-[0.98]"
          >
            Kirish
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-gray-50 pt-8">
          <p className="text-gray-600">
            Hisobingiz yo‘qmi?{' '}
            <Link to="/register" className="text-purple-700 font-bold hover:underline">
              Ro‘yxatdan o‘tish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
