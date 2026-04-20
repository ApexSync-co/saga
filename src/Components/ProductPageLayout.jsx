import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import CircularHorizontalScroll from './CircularHorizontalScroll';

const ProductPageLayout = ({ title, products }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [showBlur, setShowBlur] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (hoveredId && !isScrolling) {
      timer = setTimeout(() => {
        setShowBlur(true);
      }, 1250);
    } else {
      setShowBlur(false);
    }
    return () => clearTimeout(timer);
  }, [hoveredId, isScrolling]);

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen selection:bg-primary/30"    
    >
      <CircularHorizontalScroll />
      
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center space-x-2 text-zinc-500 text-xs font-medium tracking-widest uppercase">
          <Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-300">{title}</span>
        </div>
      </div>

      <div className="relative mb-20">
        <h1 className="text-white text-center font-Great_Vibes text-7xl md:text-9xl tracking-wider relative z-10 opacity-90 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          {title}
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-primary/10 blur-[100px] pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-x-3 gap-y-8 md:gap-x-12 md:gap-y-16 max-w-7xl mx-auto px-3 md:px-0">
        {products.map((item, index) => (
          <div 
            key={item.id} 
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => navigate(`/product/${item.id}`)}
            className={`group relative flex flex-col md:flex-row h-auto md:h-96 transition-all duration-700 cursor-pointer 
            bg-[#111] rounded-xl md:rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl
            hover:border-primary/20 hover:shadow-primary/5 hover:scale-[1.01]
            ${showBlur && hoveredId !== item.id ? 'md:opacity-40 md:blur-sm' : 'z-10'}
            ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}
            `}
          >
            {/* Image Section */}
            <div className="w-full md:w-[60%] h-48 sm:h-64 md:h-full relative overflow-hidden bg-zinc-900">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
              />
              
              {/* Radial Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
              

            </div>

            {/* Content Section */}
            <div className="w-full md:w-[40%] p-4 md:p-10 flex flex-col justify-between bg-gradient-to-br from-[#111] to-[#000]">
              <div className="space-y-2 md:space-y-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="h-[1px] w-4 md:w-8 bg-primary/40"></span>
                  <p className="text-zinc-500 font-Poppins text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.5em] uppercase italic">Signature</p>
                </div>
                <h3 className="text-white text-center text-base md:text-3xl md:tracking-wider font-Great_Vibes font-medium leading-tight group-hover:text-primary transition-colors duration-500 line-clamp-1 md:line-clamp-2">
                  {item.name}
                </h3>

                 <p className="font-Poppins text-[12px] md:text-2xl text-center tracking-tight text-white">{item.price}</p>
              </div>

              <div className="mt-4 md:mt-0 flex flex-col gap-3 md:gap-4">
                <div className="hidden md:flex gap-1">
                  <span className="h-[1px] w-4 md:w-full bg-primary/40"></span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                    const btn = e.currentTarget;
                    const originalText = btn.textContent;
                    btn.textContent = "✓";
                    btn.classList.add('bg-primary', 'text-black', 'border-primary');
                    setTimeout(() => {
                      btn.textContent = originalText;
                      btn.classList.remove('bg-primary', 'text-black', 'border-primary');
                    }, 2000);
                  }}
                  className="w-full bg-white/5 hover:bg-white text-zinc-100 hover:text-black py-2.5 md:py-4 rounded-lg font-Poppins text-[9px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] uppercase transition-all duration-500 border border-white/10 active:scale-[0.98] flex items-center justify-center"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPageLayout;
