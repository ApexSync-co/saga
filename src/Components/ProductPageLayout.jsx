import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import CircularHorizontalScroll from './CircularHorizontalScroll';

const CATEGORY_METADATA = {
  'Bangles': { image: '/Bangles.png', subtitle: 'Exquisite wrist adornments' },
  'Bracelets': { image: '/Bracelets.jpeg', subtitle: 'Elegant modern classics' },
  'Earrings': { image: '/stock3.jpeg', subtitle: 'Radiance for your ears' },
  'Necklaces': { image: '/Necklace.jpeg', subtitle: 'Majestic neckpieces' },
  'Pendants': { image: '/Pendant.jpeg', subtitle: 'Heartfelt brilliance' },
  'Rings': { image: '/Rings.jpeg', subtitle: 'Symbols of eternity' },
  'Sets': { image: '/Sets.jpg', subtitle: 'Complete heritage ensembles' },
};

const ProductPageLayout = ({ title, products }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [showBlur, setShowBlur] = useState(false);
  const [sortOption, setSortOption] = useState('Featured');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const sortedProducts = [...products].sort((a, b) => {
      if (sortOption === 'Price: Low to High') {
          return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
      }
      if (sortOption === 'Price: High to Low') {
          return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
      }
      if (sortOption === 'Top Rated') {
          return (b.rating || 5) - (a.rating || 5);
      }
      return 0;
  });

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
      queueMicrotask(() => setShowBlur(false));
    }
    return () => clearTimeout(timer);
  }, [hoveredId, isScrolling]);

  return (
    <div className="pt-28 pb-20 min-h-screen selection:bg-primary/30">
      <div className="px-4">
        <CircularHorizontalScroll />
        
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex items-center space-x-2 text-zinc-500 text-xs font-medium tracking-widest uppercase">
            <Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">{title}</span>
          </div>
        </div>
      </div>

      <div className="relative h-[35vh] md:h-[65vh] -mt-4 md:-mt-8 mb-12 md:mb-16 flex items-center justify-center overflow-hidden w-full animate-fade-in">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={CATEGORY_METADATA[title]?.image || '/stock1.jpeg'} 
            alt="" 
            className="w-full h-full object-cover scale-110 md:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6 opacity-80">
            <span className="w-8 md:w-12 h-[1px] bg-primary"></span>
            <span className="text-zinc-300 text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] font-medium whitespace-nowrap">Saga Collection</span>
            <span className="w-8 md:w-12 h-[1px] bg-primary"></span>
          </div>
          
          <h1 className="text-white font-Great_Vibes text-5xl md:text-9xl mb-2 md:mb-4 tracking-wider drop-shadow-2xl">
            {title}
          </h1>
          
          <p className="text-zinc-300 text-[10px] md:text-lg font-Poppins tracking-[0.15em] md:tracking-[0.2em] uppercase opacity-70 max-w-[250px] md:max-w-none mx-auto">
            {CATEGORY_METADATA[title]?.subtitle || 'Curated pieces of elegance'}
          </p>
        </div>
      </div>

      <div className="px-4">
        <div className="max-w-7xl mx-auto mb-10 flex justify-end">
          <div className="flex items-center gap-3">
              <span className="text-zinc-400 text-sm font-medium tracking-wide">Sort:</span>
              <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-[#111] border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
              >
                  <option value="Featured">Featured</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Top Rated">Top Rated</option>
              </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-3 gap-y-4 md:gap-x-12 md:gap-y-16 max-w-7xl mx-auto">
          {sortedProducts.map((item, index) => (
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
              <div className="w-full md:w-[60%] h-48 sm:h-64 md:h-full relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt="" aria-hidden="true" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                />
                
                {/* Radial Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                
                {/* Stock Status Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.stock <= 5 && item.stock > 0 ? (
                    <span className="text-orange-400 text-[10px] font-bold tracking-widest uppercase bg-orange-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/30 w-fit">
                      Low Stock
                    </span>
                  ) : item.stock === 0 ? (
                    <span className="text-red-400 text-[10px] font-bold tracking-widest uppercase bg-red-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30 w-fit">
                      Out of Stock
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-[40%] p-4 md:p-10 flex flex-col justify-between bg-gradient-to-br from-[#111] to-[#000]">
                <div className="space-y-2 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="h-[1px] w-4 md:w-8 bg-primary/40"></span>
                      <p className="text-zinc-500 font-Poppins text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.5em] uppercase italic">Signature</p>
                    </div>
                  </div>

                  <h3 className="text-white text-center text-base md:text-2xl md:tracking-wider font-Great_Vibes font-medium leading-tight group-hover:text-primary transition-colors duration-500 line-clamp-1 md:line-clamp-2">
                    {item.name}
                  </h3>

                   <p className="font-Poppins text-[12px] md:text-2xl text-center tracking-tight text-white mb-2">{item.price}</p>
                   
                   {/* Minimalistic Star + Number Rating - Larger Stars */}
                   <div className="flex justify-center items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-[12px] md:text-[18px] ${i < Math.floor(item.rating || 5) ? 'text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' : 'text-zinc-800'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                   </div>

                    <div className="flex items-center justify-center gap-2 mt-4 opacity-70">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-green-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Ships in 2-3 Days</span>
                    </div>
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
    </div>
  );
};

export default ProductPageLayout;
