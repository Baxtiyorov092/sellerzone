import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Phone, 
  ChevronRight, 
  ShoppingBasket,
  TrendingUp,
  CreditCard,
  Users
} from 'lucide-react';

const History = () => {
  // Bugungi sanani formatlash (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  // Simulyatsiya qilingan savdolar ma'lumotlari
  const salesHistory = [
    {
      id: "INV-001",
      customer: { name: "Ali Valiyev", phone: "+998 90 123 45 67" },
      date: "2024-05-20",
      time: "14:30",
      items: [
        { name: "Mevalar toplami", qty: 2, price: 45000 },
        { name: "Sut", qty: 3, price: 12000 }
      ],
      totalAmount: 126000
    },
    {
      id: "INV-002",
      customer: { name: "Guli Anvarova", phone: "+998 93 456 78 90" },
      date: "2024-05-20",
      time: "16:45",
      items: [
        { name: "Sabzavotlar seti", qty: 1, price: 32000 }
      ],
      totalAmount: 32000
    },
    {
      id: "INV-003",
      customer: { name: "Otabek Akramov", phone: "+998 99 777 66 55" },
      date: "2024-05-19",
      time: "10:15",
      items: [
        { name: "Ichimliklar", qty: 5, price: 8000 }
      ],
      totalAmount: 40000
    }
  ];

  // Tanlangan sanaga qarab filtrlash
  const filteredSales = useMemo(() => {
    return salesHistory.filter(sale => sale.date === selectedDate);
  }, [selectedDate, salesHistory]);

  // Statistika hisoblash
  const stats = useMemo(() => {
    const totalSales = filteredSales.length;
    const totalItems = filteredSales.reduce((acc, sale) => 
      acc + sale.items.reduce((sum, item) => sum + item.qty, 0), 0
    );
    const totalRevenue = filteredSales.reduce((acc, sale) => acc + sale.totalAmount, 0);

    return { totalSales, totalItems, totalRevenue };
  }, [filteredSales]);

  return (
    <div className="w-full flex flex-col items-start">
      {/* Header & Date Picker */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 text-left">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Sotilgan mahsulotlar</h1>
          <p className="text-gray-500 mt-1">Savdo tarixini ko'rish va tahlil qilish</p>
        </div>

        <div className="relative group self-start md:self-center">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600 pointer-events-none" />
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-3.5 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-100 shadow-sm transition-all cursor-pointer"
          />
        </div>
      </div>

      {/* Sales List */}
      <div className="w-full space-y-4 mb-12">
        {filteredSales.length === 0 ? (
          <div className="w-full bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">Bu kunda savdolar mavjud emas</h3>
            <p className="text-gray-400 mt-2">Boshqa sanani tanlab ko'ring</p>
          </div>
        ) : (
          filteredSales.map((sale) => (
            <div key={sale.id} className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 hover:shadow-md transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
              <div className="flex items-center gap-6">
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <Users className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-lg">{sale.customer.name}</h4>
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-bold mt-1">
                    <Phone className="w-3.5 h-3.5" />
                    {sale.customer.phone}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 md:ml-12">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Vaqt</span>
                  <span className="font-bold text-gray-700">{sale.time}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Mahsulotlar</span>
                  <span className="font-bold text-gray-700">{sale.items.length} tur / {sale.items.reduce((s, i) => s + i.qty, 0)} ta</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Jami summa</span>
                  <span className="font-black text-purple-700">{sale.totalAmount.toLocaleString()} UZS</span>
                </div>
              </div>

              <button className="bg-slate-50 p-3 rounded-xl text-gray-400 group-hover:bg-purple-700 group-hover:text-white transition-all self-end md:self-center">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Statistics Summary */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />}
          label="Jami savdolar"
          value={`${stats.totalSales} ta`}
        />
        <StatCard 
          icon={<ShoppingBasket className="w-6 h-6" />}
          label="Sotilgan mahsulotlar"
          value={`${stats.totalItems} ta`}
        />
        <StatCard 
          icon={<CreditCard className="w-6 h-6" />}
          label="Umumiy daromad"
          value={`${stats.totalRevenue.toLocaleString()} UZS`}
          highlight
        />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, highlight = false }) => (
  <div className="w-full bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-5 text-left">
    <div className={`p-4 rounded-2xl ${highlight ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-700'}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-black ${highlight ? 'text-purple-700' : 'text-gray-900'}`}>{value}</p>
    </div>
  </div>
);

export default History;
