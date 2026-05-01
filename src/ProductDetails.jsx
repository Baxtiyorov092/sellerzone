import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useProducts } from './ProductContext';
import { useCart } from './CartContext';
import { ArrowLeft, Plus, CheckCircle2 } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-black text-gray-400 mb-4">Mahsulot topilmadi!</h2>
          <Link to="/products" className="text-purple-700 font-bold hover:underline">Mahsulotlarga qaytish</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/sales');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start pt-10">
      <div className="w-full max-w-5xl">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-700 font-semibold mb-8 group transition-all">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Mahsulotlarga qaytish
        </Link>

        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-gray-200/50 flex flex-col lg:flex-row gap-12 border border-gray-50">
          <div className="lg:w-1/2">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-inner bg-slate-50 border border-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold w-fit mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" /> <span>Sotuvda mavjud</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-6">{product.name}</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{product.description || "Ushbu mahsulot haqida ma'lumot kiritilmagan."}</p>
            
            <div className="space-y-6 mb-10">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Narxi</span>
                <span className="text-4xl font-black text-purple-700">{product.price.toLocaleString()} <span className="text-lg font-bold">UZS</span></span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-4 rounded-2xl flex flex-col flex-1"><span className="text-gray-500 text-xs font-bold uppercase mb-1">Omborda</span><span className="text-xl font-bold text-gray-900">{product.stock} dona</span></div>
                <div className="bg-slate-100 p-4 rounded-2xl flex flex-col flex-1"><span className="text-gray-500 text-xs font-bold uppercase mb-1">ID Raqami</span><span className="text-xl font-bold text-gray-900">#{product.id}</span></div>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-purple-700 text-white py-5 rounded-2xl font-black text-xl hover:bg-purple-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
            >
              <Plus className="w-6 h-6" /> Sotuvga qo‘shish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
