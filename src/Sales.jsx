import React, { useState, useMemo, useEffect } from 'react';
import { useProducts } from './ProductContext';
import { useCart } from './CartContext';
import { 
  Search as SearchIcon, 
  ShoppingCart as ShoppingCartIcon, 
  User as UserIcon, 
  Phone as PhoneIcon, 
  ChevronDown as ChevronDownIcon,
  Trash2 as Trash2Icon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  UserCheck as UserCheckIcon,
  UserPlus as UserPlusIcon,
  AlertCircle as AlertCircleIcon,
  CheckCircle as CheckCircleIcon,
  CreditCard as CreditCardIcon,
  Banknote as BanknoteIcon,
  X as XIcon
} from 'lucide-react';

const Sales = () => {
  const { products } = useProducts();
  const { 
    cartItems, 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    totalAmount, 
    totalItems 
  } = useCart();
  
  // LocalStorage-dan xaridorlarni yuklash yoki default qiymat berish
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Ali Valiyev', phone: '+998 90 123 45 67' },
      { id: 2, name: 'Guli Anvarova', phone: '+998 93 456 78 90' },
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Naqd');
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Xaridorlar o'zgarganda LocalStorage-ga saqlash
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, products]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
      c.phone.includes(customerSearch)
    );
  }, [customerSearch, customers]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setSearchTerm('');
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    
    // Validatsiya
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) {
      showToast('Ma\'lumotlarni to\'liq kiriting!', 'error');
      return;
    }

    const customerToAdd = {
      id: Date.now(),
      name: newCustomer.name,
      phone: newCustomer.phone
    };

    // State yangilanishi
    const updatedCustomers = [...customers, customerToAdd];
    setCustomers(updatedCustomers);
    
    // Avtomatik tanlash
    setSelectedCustomer(customerToAdd);
    
    // Formani tozalash va yopish
    setNewCustomer({ name: '', phone: '' });
    setShowAddCustomer(false);
    showToast('Yangi xaridor muvaffaqiyatli qo\'shildi!', 'success');
  };

  const handleCompleteSale = () => {
    if (!selectedCustomer) {
      showToast('Xaridor nomini kiriting yoki tanlang!');
      return;
    }
    if (cartItems.length === 0) {
      showToast('Savatda mahsulot yo\'q!');
      return;
    }

    showToast(`Savdo muvaffaqiyatli yakunlandi! (${paymentMethod})`, 'success');
    clearCart();
    setSelectedCustomer(null);
    setPaymentMethod('Naqd');
  };

  return (
    <div className="text-gray-900 min-h-[80vh] flex flex-col items-center justify-start pt-10">
      {toast.show && (
        <div className={`fixed top-24 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300 ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircleIcon className="w-6 h-6" /> : <AlertCircleIcon className="w-6 h-6" />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      {/* Modal for Adding Customer */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black flex items-center gap-3"><UserPlusIcon className="text-purple-700" /> Yangi xaridor</h3>
              <button onClick={() => setShowAddCustomer(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><XIcon /></button>
            </div>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">F.I.SH</label>
                <input 
                  type="text" 
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-200 font-bold"
                  placeholder="Masalan: Ali Valiyev"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Telefon raqam</label>
                <input 
                  type="text" 
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-200 font-bold"
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <button type="submit" className="w-full py-5 bg-purple-700 text-white rounded-2xl font-black text-lg hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 mt-4">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Mahsulotlarni qidirish..."
              className="w-full pl-14 pr-6 py-5 rounded-[2rem] border-none shadow-md outline-none text-lg focus:ring-2 focus:ring-purple-200 transition-all"
            />
            {filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[2rem] shadow-xl z-40 border overflow-hidden">
                {filteredProducts.map(p => (
                  <button key={p.id} onClick={() => handleAddToCart(p)} className="w-full flex items-center justify-between p-4 hover:bg-purple-50 transition-colors border-b last:border-0">
                    <div className="flex items-center gap-4">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="text-left">
                        <p className="font-bold">{p.name}</p>
                        <p className="text-xs text-gray-500">Omborda: {p.stock} dona</p>
                      </div>
                    </div>
                    <span className="font-black text-purple-700">{p.price.toLocaleString()} UZS</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-md border border-gray-50 flex flex-col min-h-[500px]">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-2xl font-black flex items-center gap-3"><ShoppingCartIcon className="w-7 h-7 text-purple-700" /> Savat</h2>
              {cartItems.length > 0 && (
                <button onClick={clearCart} className="text-red-500 font-bold flex items-center gap-2"><Trash2Icon className="w-5 h-5" /> Tozalash</button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto max-h-[450px] p-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60"><ShoppingCartIcon className="w-16 h-16 mb-4" /><p className="text-xl font-bold">Savat bo'sh</p></div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover shadow-inner" />
                      <div className="flex-1">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-purple-700 font-black">{item.price.toLocaleString()} UZS</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white rounded-2xl p-1.5 shadow-sm border">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2"><MinusIcon className="w-4 h-4" /></button>
                        <span className="font-black w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2"><PlusIcon className="w-4 h-4" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 p-2"><Trash2Icon className="w-6 h-6" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-md border border-gray-50">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-gray-900"><UserIcon className="w-6 h-6 text-purple-700" /> Xaridor</h3>
            <div className="relative mb-4">
              <div onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)} className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-700 cursor-pointer flex justify-between items-center">
                <span>{selectedCustomer ? selectedCustomer.name : 'Xaridorni tanlang...'}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isCustomerDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              {isCustomerDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">
                  <div className="p-3 border-b"><div className="relative"><SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" autoFocus value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} placeholder="Qidirish..." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl outline-none text-sm font-bold" /></div></div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map(c => (<button key={c.id} onClick={() => { setSelectedCustomer(c); setIsCustomerDropdownOpen(false); setCustomerSearch(''); }} className="w-full text-left px-5 py-3 hover:bg-purple-50 transition-colors border-b last:border-0"><p className="font-bold">{c.name}</p><p className="text-xs text-gray-500">{c.phone}</p></button>))
                    ) : (
                      <p className="p-4 text-center text-gray-400 text-sm">Xaridor topilmadi</p>
                    )}
                  </div>
                  <button onClick={() => { setShowAddCustomer(true); setIsCustomerDropdownOpen(false); }} className="w-full p-4 text-purple-700 font-black hover:bg-purple-50 flex items-center justify-center gap-2 border-t"><UserPlusIcon className="w-5 h-5" /> Yangi xaridor qo'shish</button>
                </div>
              )}
            </div>
            
            {selectedCustomer && (
              <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 mb-6 animate-in zoom-in duration-300">
                <div className="flex items-center gap-3 mb-2"><UserCheckIcon className="w-5 h-5 text-purple-700" /><span className="font-black text-purple-900">{selectedCustomer.name}</span></div>
                <div className="flex items-center gap-2 text-purple-600 font-bold text-sm"><PhoneIcon className="w-4 h-4" /> {selectedCustomer.phone}</div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-50">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">To'lov turi</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setPaymentMethod('Naqd')}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                    paymentMethod === 'Naqd' 
                    ? 'bg-purple-700 text-white shadow-lg shadow-purple-200' 
                    : 'bg-slate-100 text-gray-500 hover:bg-slate-200'
                  }`}
                >
                  <BanknoteIcon className="w-5 h-5" />
                  Naqd
                </button>
                <button 
                  onClick={() => setPaymentMethod('Karta')}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                    paymentMethod === 'Karta' 
                    ? 'bg-purple-700 text-white shadow-lg shadow-purple-200' 
                    : 'bg-slate-100 text-gray-500 hover:bg-slate-200'
                  }`}
                >
                  <CreditCardIcon className="w-5 h-5" />
                  Karta
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-md border border-gray-50">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-gray-500 font-bold"><span>Mahsulotlar soni</span><span className="text-gray-900 bg-slate-100 px-3 py-1 rounded-full text-sm">{totalItems} ta</span></div>
              <hr className="border-gray-50" />
              <div className="flex justify-between items-end"><div><p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-1">Jami summa</p><p className="text-3xl font-black text-purple-700">{totalAmount.toLocaleString()} <span className="text-sm font-bold uppercase ml-1">UZS</span></p></div></div>
            </div>
            <button onClick={handleCompleteSale} className="w-full py-5 rounded-2xl font-black text-xl bg-purple-700 text-white hover:bg-purple-800 transition-all shadow-xl shadow-purple-200 active:scale-[0.98]">Savdoni yakunlash</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
