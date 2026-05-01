import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from './ProductContext';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';

const Products = () => {
  const { products, user, updateProduct, deleteProduct } = useProducts();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: ''
  });

  const handleEditClick = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      image: product.image
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Haqiqatdan ham ushbu mahsulotni o\'chirmoqchimisiz?')) {
      deleteProduct(id);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
      return;
    }

    updateProduct(editingProduct.id, {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    });
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mahsulotlar</h1>
          <p className="text-gray-500 mt-1">
            Xush kelibsiz, <span className="font-bold text-purple-700">{user?.name || user?.email}</span> ({user?.role})
          </p>
        </div>
        {products.length > 0 && ( // Agar mahsulotlar mavjud bo'lsa, "Yangi qo'shish" tugmasini ko'rsatish
          <Link 
            to="/add-product" 
            className="bg-purple-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-purple-800 shadow-lg active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6" /> Yangi qo'shish
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md text-center">
          <p className="text-xl text-gray-700 mb-6">
            Hali mahsulotlar yo'q. Birinchisini qo'shing!
          </p>
          <Link to="/add-product" className="flex items-center gap-2 px-6 py-3 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800 transition-colors">
            <Plus className="w-5 h-5" /> Birinchi mahsulotni qo'shish
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-[2.5rem] p-4 shadow-md hover:shadow-xl transition-all border border-gray-50 group relative"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-purple-700">{product.price.toLocaleString()} <span className="text-sm font-bold">so'm</span></span>
                    <div className="bg-slate-100 px-4 py-2 rounded-2xl text-slate-600 text-sm font-bold">Omborda: {product.stock}</div>
                  </div>
                </div>
              </Link>
              
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={(e) => handleEditClick(e, product)}
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg transition-all"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => handleDeleteClick(e, product.id)}
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-xl text-red-600 hover:bg-red-600 hover:text-white shadow-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-2xl shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Pencil className="text-purple-700" /> Mahsulotni tahrirlash
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mahsulot nomi *</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-200 font-bold"
                      placeholder="Mahsulot nomi"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Narxi (so'm) *</label>
                    <input 
                      type="number" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-200 font-bold"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Soni (dona) *</label>
                    <input 
                      type="number" 
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-200 font-bold"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tavsifi</label>
                    <textarea 
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-200 font-bold resize-none"
                      placeholder="Mahsulot haqida ma'lumot..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mahsulot rasmi</label>
                    <div className="relative group/upload h-32 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-all overflow-hidden cursor-pointer">
                      {formData.image ? (
                        <>
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 flex items-center justify-center transition-opacity">
                            <Upload className="text-white w-8 h-8" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <Upload className="w-8 h-8" />
                          <span className="text-xs font-bold">Rasm yuklash</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="flex-2 py-4 px-12 bg-purple-700 text-white rounded-2xl font-black text-lg hover:bg-purple-800 transition-all shadow-lg shadow-purple-200"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
