import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { useProducts } from './ProductContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser } = useProducts();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [toast, setToast] = useState(false);
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
    
    const newUser = registerUser(formData);
    
    if (newUser) {
      setToast(true);
      setTimeout(() => {
        setToast(false);
        navigate('/login'); // Muvaffaqiyatli ro'yxatdan o'tgach /login sahifasiga yo'naltirish
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans">
      {toast && (
        <div className="fixed top-10 flex items-center gap-3 px-6 py-4 bg-green-600 text-white rounded-2xl shadow-2xl animate-bounce z-50">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">Muvaffaqiyatli ro'yxatdan o'tdingiz! Kirish sahifasiga yo'naltirilmoqda...</span>
        </div>
      )}

      <Link to="/" className="mb-8 flex items-center gap-2 text-gray-500 hover:text-purple-700 transition-colors font-medium group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Bosh sahifaga qaytish
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-purple-700 p-3 rounded-2xl mb-4 shadow-lg shadow-purple-200">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Ro‘yxatdan o‘tish</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange} 
              required 
              placeholder="Ism" 
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 outline-none transition-all" 
            />
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange} 
              required 
              placeholder="Familiya" 
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 outline-none transition-all" 
            />
          </div>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
            required 
            placeholder="Email" 
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 outline-none transition-all" 
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              value={formData.password}
              onChange={handleChange} 
              required 
              placeholder="Parol" 
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 outline-none transition-all" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button type="submit" className="w-full bg-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-800 shadow-lg active:scale-95 transition-all">
            Ro‘yxatdan o‘tish
          </button>
        </form>
        
        <p className="mt-8 text-center text-gray-500">
          Akkauntingiz bormi? <Link to="/login" className="text-purple-700 font-bold hover:underline">Kirish</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
