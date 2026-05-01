import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ShoppingBag,
    BarChart2,
    Package,
    ShieldCheck,
    Menu,
    X,
    ArrowRight,
    Zap
} from 'lucide-react';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Header */}
            <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                        <div className="bg-purple-700 p-2 rounded-lg transition-transform group-hover:rotate-12">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-gray-900">
                          Seller<span className="text-purple-700">Zone</span>
                        </span>
                    </Link>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="px-5 py-2 text-gray-600 font-medium hover:text-purple-700 transition-colors">
                            Kirish
                        </Link>
                        <Link to="/register" className="bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-800 transition-all shadow-md shadow-purple-200 active:scale-95">
                            Ro‘yxatdan o‘tish
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                        <Link to="/login" className="text-left py-2 font-medium text-gray-600">Kirish</Link>
                        <Link to="/register" className="bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-center">
                            Ro‘yxatdan o‘tish
                        </Link>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="max-w-7xl mx-auto lg:flex items-center gap-16">

                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-6">
                            <Zap className="w-4 h-4 fill-purple-700" />
                            <span>Yangi: SellerZone 2.0 endi tayyor!</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                            Kichik savdo do‘konlari uchun <br />
                            <span className="text-purple-700">boshqaruv tizimi</span>
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                            Mahsulotlarni boshqaring, savdolarni kuzating va omboringizni nazorat qiling.
                            SellerZone bilan biznesingizni yangi bosqichga olib chiqing.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="group bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-200 hover:bg-purple-800 transition-all flex items-center justify-center gap-2 active:scale-95">
                                Bepul boshlash
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/login" className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-purple-700 hover:text-purple-700 transition-all flex items-center justify-center active:scale-95">
                                Kirish
                            </Link>
                        </div>

                        {/* Feature Grid */}
                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FeatureLink
                                to="/products"
                                icon={<Package className="w-6 h-6" />}
                                title="Mahsulotlar"
                                desc="Barcha tovarlaringizni bir joyda hisobini yuriting."
                            />
                            <FeatureLink
                                to="/sales"
                                icon={<BarChart2 className="w-6 h-6" />}
                                title="Savdo"
                                desc="Kunlik va oylik savdo hisobotlarini tahlil qiling."
                            />
                            <FeatureLink
                                to="/history"
                                icon={<ShoppingBag className="w-6 h-6" />}
                                title="Ombor"
                                desc="Qoldiq mahsulotlarni avtomatik nazorat qiling."
                            />
                            <FeatureLink
                                to="/admin"
                                icon={<ShieldCheck className="w-6 h-6" />}
                                title="Admin"
                                desc="Xodimlar huquqlarini va xavfsizlikni boshqaring."
                            />
                        </div>
                    </div>

                    {/* Right Image Content */}
                    <div className="lg:w-1/2 mt-16 lg:mt-0 relative group">
                        <div className="absolute -inset-4 bg-purple-100 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/50 rounded-full blur-2xl animate-pulse"></div>

                        <div className="relative border-8 border-white rounded-[2rem] shadow-2xl overflow-hidden transform hover:-rotate-1 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1556742049-13d736c7a91d?auto=format&fit=crop&q=80&w=1000"
                                alt="SellerZone App"
                                className="w-full h-auto object-cover"
                            />

                            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20 hidden sm:block animate-bounce-slow">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                        <BarChart2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bugungi foyda</p>
                                        <p className="text-xl font-extrabold text-gray-900">+4.2M UZS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

// Yordamchi komponent: Feature Link
const FeatureLink = ({ icon, title, desc, to }) => (
    <Link to={to} className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all group block">
        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-700 mb-4 group-hover:bg-purple-700 group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </Link>
);

export default LandingPage;
