import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  LogOut, 
  Package, 
  BarChart2, 
  History, 
  ShieldCheck, 
  Search, 
  ShoppingCart, 
  User, 
  Phone, 
  ChevronDown,
  Trash2,
  Plus,
  Minus,
  X,
  UserCheck
} from 'lucide-react';

const Sales = () => {
  const navigate = useNavigate();
  
  // Ma'lumotlar bazasi (Simulatsiya)
  const [products] = useState([
    { id: 1, name: 'Mevalar toplami', price: 45000, stock: 50, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Sabzavotlar seti', price: 32000, stock: 120, image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c12e8c?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Sut mahsulotlari', price: 12500, stock: 45, image: 'https://images.unsplash.com/photo-1550583724-125581fe2f8a?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Non va bulochka', price: 5000, stock: 200, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'Ichimliklar', price: 8000, stock: 85, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400' },
  ]);

  const customers = [
    { id: 1, name: 'Ali Valiyev', phone: '+998 90 123 45 67' },
    { id: 2, name: 'Guli Anvarova', phone: '+998 93 456 78 90' },
    { id: 3, name: 'Otabek Akramov', phone: '+998 99 777 66 55' },
  ];

  // State'lar
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Qidiruv logikasi
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  // Savat funksiyalari
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSearchTerm('');
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Hisob-kitoblar
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => navigate('/login');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8 h-full">
            <NavLink to="/products">
              <Package className="w-5 h-5" />
              <span>Mahsulotlar</span>
            </NavLink>
            <NavLink to="/sales" active>
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
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-semibold transition-colors py-2 px-4 rounded-xl hover:bg-red-50">
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Mahsulot qidirish */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Mahsulotlarni qidirish..."
                  className="w-full pl-14 pr-6 py-5 rounded-[2rem] border-none shadow-md focus:ring-2 focus:ring-purple-200 outline-none text-lg transition-all"
                />
              </div>

              {filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                  {filteredProducts.map(p => (
                    <button key={p.id} onClick={() => addToCart(p)} className="w-full flex items-center justify-between p-4 hover:bg-purple-50 transition-colors border-b border-gray-50 last:border-0 group">
                      <div className="flex items-center gap-4 text-left">
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-gray-900">{p.name}</p>
                          <p className="text-sm text-gray-500">Omborda: {p.stock} dona</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-purple-700">{p.price.toLocaleString()} UZS</p>
                        <span className="text-[10px] font-bold text-purple-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Qo'shish +</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dinamik Savat (Cart List) */}
            <div className="bg-white rounded-[2.5rem] shadow-md border border-gray-50 min-h-[500px] flex flex-col overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <ShoppingCart className="w-7 h-7 text-purple-700" />
                  Savat
                </h2>
                {cartItems.length > 0 && (
                  <button onClick={() => setCartItems([])} className="text-red-500 hover:text-red-700 font-bold flex items-center gap-2 transition-colors">
                    <Trash2 className="w-5 h-5" />
                    Tozalash
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto max-h-[450px] p-8 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-60 py-12">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                      <ShoppingCart className="w-12 h-12 text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-400">Savat bo‘sh</h3>
                    <p className="text-gray-400 mt-2">Xaridni boshlash uchun mahsulot qo'shing</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-3xl group transition-all hover:bg-white hover:shadow-lg border border-transparent hover:border-purple-100">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate text-lg">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-purple-700 font-black">{item.price.toLocaleString()} UZS</span>
                            <span className="text-gray-400 text-xs font-bold">× {item.quantity}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-3 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-500 transition-colors">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-black text-gray-900 text-lg">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-green-50 rounded-xl text-gray-400 hover:text-green-500 transition-colors">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-right min-w-[120px]">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-0.5">Jami</p>
                            <p className="font-black text-gray-900">{(item.price * item.quantity).toLocaleString()} UZS</p>
                          </div>

                          <button onClick={() => removeFromCart(item.id)} className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Xaridorlar Dropdown */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-md border border-gray-50">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-purple-700" />
                Xaridor tanlash
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Saqlangan xaridorlar</label>
                  <div className="relative group">
                    <select 
                      onChange={(e) => {
                        const customer = customers.find(c => c.id === parseInt(e.target.value));
                        setSelectedCustomer(customer || null);
                      }}
                      className="w-full appearance-none bg-slate-50 border border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer"
                    >
                      <option value="">Tanlang...</option>
                      {customers.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Tanlangan xaridor bloki */}
                {selectedCustomer && (
                  <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl animate-in zoom-in duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-purple-700 p-2 rounded-lg">
                        <UserCheck className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-black text-purple-900">{selectedCustomer.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
                      <Phone className="w-4 h-4" />
                      {selectedCustomer.phone}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hisob-kitob (Total Summary) */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-md border border-gray-50">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-gray-500 font-bold">
                  <span>Mahsulotlar soni</span>
                  <span className="text-gray-900 bg-slate-100 px-3 py-1 rounded-full text-sm">{totalItems} ta</span>
                </div>
                <hr className="border-gray-50" />
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-gray-400 font-black uppercase tracking-widest text-xs block mb-1">Jami summa</span>
                    <span className="text-3xl font-black text-purple-700">{totalAmount.toLocaleString()} <span className="text-sm">UZS</span></span>
                  </div>
                </div>
              </div>

              <button 
                disabled={cartItems.length === 0}
                className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-lg active:scale-[0.98] ${
                  cartItems.length === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-purple-700 text-white hover:bg-purple-800 shadow-purple-200'
                }`}
              >
                Savdoni yakunlash
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

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

export default Sales;
