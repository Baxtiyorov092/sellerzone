import React from 'react';

const Logo = ({ variant = 'horizontal', size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20'
  };

  const isVertical = variant === 'vertical';

  return (
    <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center gap-3 ${className}`}>
      {/* Brand Icon */}
      <div className={`${sizes[size]} aspect-square relative group`}>
        <div className="absolute inset-0 bg-indigo-600 rounded-xl rotate-6 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-indigo-200"></div>
        <div className="absolute inset-0 bg-white border-2 border-indigo-600 rounded-xl flex items-center justify-center overflow-hidden">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-2/3 h-2/3 text-indigo-600 animate-in fade-in zoom-in duration-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Basket base */}
            <path 
              d="M6 10H18L17 19H7L6 10Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinejoin="round"
            />
            {/* Arrow/Growth */}
            <path 
              d="M12 14V6M12 6L9 9M12 6L15 9" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            {/* Dynamic dots */}
            <circle cx="9" cy="20" r="1" fill="currentColor" />
            <circle cx="15" cy="20" r="1" fill="currentColor" />
          </svg>
        </div>
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-sky-400 opacity-20 blur-lg rounded-full group-hover:opacity-40 transition-opacity"></div>
      </div>

      {/* Brand Text */}
      <div className={`flex flex-col ${isVertical ? 'items-center' : 'items-start'}`}>
        <h1 className={`${size === 'lg' || size === 'xl' ? 'text-2xl' : 'text-xl'} font-black tracking-tight flex items-center`}>
          <span className="text-slate-800">Seller</span>
          <span className="text-indigo-600 relative">
            Zone
            <span className="absolute -top-1 -right-2 w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
          </span>
        </h1>
        {isVertical && <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">Management System</p>}
      </div>
    </div>
  );
};

export default Logo;
