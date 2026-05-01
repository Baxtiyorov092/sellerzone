import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ro'yxatdan o'tish mantiqi bu yerda bo'ladi
    console.log('Ro\'yxatdan o\'tish ma\'lumotlari:', formData);
    navigate('/login'); 
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
          <h1 className="text-2xl font-bold text-gray-900">Ro‘yxatdan o‘tish</h1>
          <p className="text-gray-500 mt-2 text-center text-sm">
            SellerZone tizimiga yangi hisob yarating!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ism
              </label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Ali"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Familiya
              </label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Valiyev"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tug‘ilgan sana
            </label>
            <input 
              type="date" 
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email manzilingiz
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
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

          <button 
            type="submit"
            className="w-full bg-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 active:scale-[0.98]"
          >
            Ro‘yxatdan o‘tish
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-gray-50 pt-8">
          <p className="text-gray-600">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-purple-700 font-bold hover:underline">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
