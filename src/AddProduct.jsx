import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from './ProductContext';
import { Package, ArrowLeft, Image as ImageIcon, Plus, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    stock: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setStatus({ type: 'error', message: 'Rasm hajmi 2MB dan oshmasligi kerak!' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.image || !formData.price || !formData.stock) {
      setStatus({ type: 'error', message: 'Barcha maydonlarni to\'ldiring!' });
      return;
    }

    const newProduct = {
      ...formData,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock)
    };

    addProduct(newProduct);
    setStatus({ type: 'success', message: 'Mahsulot muvaffaqiyatli qo\'shildi!' });
    
    setTimeout(() => {
      navigate('/products');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-700 font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Mahsulotlarga qaytish
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-50">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-purple-100 p-4 rounded-2xl">
              <Package className="w-8 h-8 text-purple-700" />
            </div>
            <h1 className="text-3xl font-black text-gray-900">Yangi mahsulot</h1>
          </div>

          {status.message && (
            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${
              status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="font-bold">{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Mahsulot nomi *</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Masalan: Olma"
                className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-purple-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Mahsulot rasmi *</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden" 
                ref={fileInputRef}
              />
              
              {!formData.image ? (
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="w-full aspect-video bg-slate-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all group"
                >
                  <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-purple-700" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-700">Rasm yuklash uchun bosing</p>
                    <p className="text-sm text-gray-400 font-medium mt-1">PNG, JPG, WEBP (Max: 2MB)</p>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-gray-100 shadow-md">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-xl shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Tavsif</label>
              <textarea 
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Mahsulot haqida qisqacha..."
                className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-purple-100 transition-all resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Narx (so'm) *</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Soni (dona) *</label>
                <input 
                  type="number" 
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-purple-700 text-white py-5 rounded-2xl font-black text-xl hover:bg-purple-800 transition-all shadow-xl shadow-purple-200 active:scale-95 flex items-center justify-center gap-3 mt-8"
            >
              <Plus className="w-6 h-6" />
              Mahsulot qo'shish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
