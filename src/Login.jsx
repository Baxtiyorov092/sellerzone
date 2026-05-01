import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useProducts } from './ProductContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputEmail = email.toLowerCase().trim();
    const inputPassword = password.trim();

    const loggedInUser = login(inputEmail, inputPassword);
    
    if (loggedInUser) {
      // Muvaffaqiyatli kirish: /products sahifasiga yo'naltirish
      navigate('/products');
    } else {
      setError('Email yoki parol noto\'g\'ri!');
      
      // Debug ma'lumotlari
      console.log('Xatolik: Kirish muvaffaqiyatsiz.');
      console.log('Kiritilgan Email:', inputEmail);
      console.log('Kiritilgan Parol:', inputPassword);
      
      // Bazadagi foydalanuvchilarni ko'rish uchun localStorage'dan tekshirish
      const storedUsers = JSON.parse(localStorage.getItem('staff')) || [];
      console.log('Bazadagilar (staff):', storedUsers);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans">
      <Link to="/" className="mb-8 flex items-center gap-2 text-gray-500 hover:text-purple-700 transition-colors font-medium group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Bosh sahifaga qaytish
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-purple-700 p-3 rounded-2xl mb-4 shadow-lg shadow-purple-200">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Kirish</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</p>}
          
          <input 
            type="email" 
            required 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 outline-none transition-all" 
          />
          
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              required 
              placeholder="Parol" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-purple-600 outline-none transition-all" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button type="submit" className="w-full bg-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-800 transition-all shadow-lg active:scale-[0.98]">
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
