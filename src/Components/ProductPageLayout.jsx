import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import CircularHorizontalScroll from './CircularHorizontalScroll';
import { fetchFestiveEdit } from '../services/products';
import Breadcrumbs from './Breadcrumbs';

const ProductPageLayout = ({ title, products, isLoading }) => {
  const [config, setConfig] = useState(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [showBlur, setShowBlur] = useState(false);
  const [filterOption, setFilterOption] = useState('All');
  const [sortOption, setSortOption] = useState('Featured');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadConfig = async () => {
      const data = await fetchFestiveEdit();
      if (data && data.categories) {
        // Convert array to the map format expected by the component
        const metadataMap = {};
        data.categories.forEach(cat => {
          metadataMap[cat.name] = { image: cat.image, subtitle: cat.subtitle };
        });
        setConfig(metadataMap);
      }
      setIsConfigLoading(false);
    };
    loadConfig();
  }, []);

  const fullyLoading = isLoading || isConfigLoading;

  const filteredProducts = products.filter(product => {
      if (filterOption === 'All') return true;
      
      // If the product has a specific type assigned from the admin panel, use it directly
      if (product.type) {
          return product.type.toLowerCase() === filterOption.toLowerCase();
      }
      
      // Fallback for older products without a type assigned
      const searchStr = `${product.name} ${product.description || ''} ${product.metalColor || ''} ${product.material || ''}`.toLowerCase();
      const filterTerm = filterOption.toLowerCase();
      const filterSingular = filterTerm.endsWith('s') ? filterTerm.slice(0, -1) : filterTerm;
      
      return searchStr.includes(filterTerm) || searchStr.includes(filterSingular);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  // Dynamic path generator mapping current layout context down to the component
  const breadcrumbPaths = [
    { name: title, url: '' } // Last entry reflects active category, url left blank
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen selection:bg-primary/30">
      <div className="px-4">
        <CircularHorizontalScroll />
        
        <div className="max-w-7xl mx-auto mb-12">
          {/* Implemented custom Breadcrumbs component over static text string */}
          <Breadcrumbs paths={breadcrumbPaths} />
        </div>
      </div>

      <div className="relative h-[35vh] md:h-[65vh] -mt-4 md:-mt-8 mb-12 md:mb-16 flex items-center justify-center overflow-hidden w-full animate-fade-in">
        {/* Hero Background Image */}
        {fullyLoading ? (
          <div className="absolute inset-0 z-0 bg-zinc-900 animate-pulse"></div>
        ) : (
          <div className="absolute inset-0 z-0">
            <img 
              src={config?.[title]?.image || '/stock1.jpeg'} 
              alt="" 
              className="w-full h-full object-cover scale-110 md:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/95"></div>
          </div>
        )}

        {/* Content */}
        {fullyLoading ? (
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 md:space-y-6 px-6 w-full">
            <div className="w-48 md:w-64 h-2 bg-zinc-800 rounded animate-pulse"></div>
            <div className="w-64 md:w-96 h-12 md:h-24 bg-zinc-800 rounded animate-pulse"></div>
            <div className="w-32 md:w-48 h-3 bg-zinc-800 rounded animate-pulse"></div>
          </div>
        ) : (
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
              {config?.[title]?.subtitle || 'Curated pieces of elegance'}
            </p>
          </div>
        )}
      </div>

      <div className="px-4">
        <div className="max-w-7xl mx-auto mb-6 sm:mb-10 flex justify-end">
          <div className="flex flex-row items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full">
              {title === 'Earrings' && (
                <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none">
                    <span className="text-zinc-400 text-xs sm:text-sm font-medium tracking-wide">Type:</span>
                    <select 
                      value={filterOption}
                      onChange={(e) => setFilterOption(e.target.value)}
                      className="bg-[#111] border border-white/10 text-white text-xs sm:text-sm rounded-xl px-2 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer w-full sm:w-auto"
                    >
                        <option value="All">All</option>
                        <option value="Hoops">Hoops</option>
                        <option value="Gold plated">Gold plated</option>
                        <option value="Simple">Simple</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Black Metal">Black Metal</option>
                        <option value="Rose Gold">Rose Gold</option>
                        <option value="Cuffs">Cuffs</option>
                        <option value="Long">Long</option>
                    </select>
                </div>
              )}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none">
                  <span className="text-zinc-400 text-xs sm:text-sm font-medium tracking-wide">Sort:</span>
                  <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-[#111] border border-white/10 text-white text-xs sm:text-sm rounded-xl px-2 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer w-full sm:w-auto"
              >
                  <option value="Featured">Featured</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Top Rated">Top Rated</option>
              </select>
          </div>
        </div>
      </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-3 gap-y-4 md:gap-x-12 md:gap-y-16 max-w-7xl mx-auto">
          {fullyLoading ? (
            [...Array(4)].map((_, idx) => (
              <div 
                key={idx} 
                className="group relative flex flex-col md:flex-row h-auto md:h-96 transition-all duration-700 bg-[#111] rounded-xl md:rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl animate-pulse"
              >
                <div className="w-full md:w-[60%] h-48 sm:h-64 md:h-full relative overflow-hidden bg-zinc-800/50"></div>
                <div className="w-full md:w-[40%] p-4 md:p-10 flex flex-col justify-between bg-gradient-to-br from-[#111] to-[#000]">
                  <div className="space-y-4">
                    <div className="w-20 h-2 bg-zinc-800/80 rounded mx-auto md:mx-0"></div>
                    <div className="w-full h-6 bg-zinc-800 rounded"></div>
                    <div className="w-1/2 h-6 bg-zinc-800 rounded mx-auto md:mx-0"></div>
                  </div>
                  <div className="mt-8 w-full h-10 bg-zinc-800/80 rounded-lg"></div>
                </div>
              </div>
            ))
          ) : sortedProducts.length === 0 ? (
            <div className="col-span-full py-24 px-8 text-center max-w-xl mx-auto bg-black/40 border border-white/10 rounded-[2rem] backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col items-center relative overflow-hidden animate-fade-in">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="relative w-20 h-20 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mb-8">
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-25" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5h-1.875a6 6 0 0 0-11.25 0H6.125m15.75 0A3 3 0 0 1 22 10.5v8.25A3 3 0 0 1 19 21.75H5a3 3 0 0 1-3-3.25V10.5a3 3 0 0 1 2.125-2.875m15.75 0V6a6 6 0 0 0-12 0v1.5m12 0a2.25 2.25 0 0 0-2.25-2.25h-7.5A2.25 2.25 0 0 0 6.125 7.5" />
                </svg>
              </div>
              
              <h3 className="text-white font-Great_Vibes text-5xl mb-4 tracking-wider">
                Curating New Brilliance
              </h3>
              
              <p className="text-zinc-400 font-Poppins text-xs md:text-sm font-light leading-relaxed mb-10 max-w-sm tracking-wide">
                Our master artisans are currently crafting new signature designs for this collection. Please explore our other signature categories.
              </p>

              <button 
                onClick={() => navigate('/products')}
                className="group/btn relative px-8 py-3.5 bg-transparent text-white border border-primary/30 hover:border-primary text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-full overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(251,112,16,0.05)] hover:shadow-[0_0_25px_rgba(251,112,16,0.2)]"
              >
                <span className="relative z-10 group-hover/btn:text-black transition-colors duration-500">Explore Collections</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 z-0" />
              </button>
            </div>
          ) : (
            sortedProducts.map((item, index) => (
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
                  
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                  
                  {/* Stock Status Badges - Reworked Premium Borderless Design */}
                  {/* Stock Status Badges - Reworked Premium Design */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-20 pointer-events-none">
                    {item.stock <= 5 && item.stock > 0 ? (
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-md shadow-lg">
                        <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent text-[9px] font-Poppins font-bold tracking-[0.2em] uppercase">
                          Limited Stock
                        </span>
                      </div>
                    ) : item.stock === 0 ? (
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-md shadow-lg">
                        <span className="bg-gradient-to-r from-zinc-400 to-zinc-600 bg-clip-text text-transparent text-[9px] font-Poppins font-bold tracking-[0.2em] uppercase">
                          Out of Stock
                        </span>
                      </div>
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
                        if (item.stock === 0) return;
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
                      disabled={item.stock === 0}
                      className={`w-full py-2.5 md:py-4 rounded-lg font-Poppins text-[9px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] uppercase transition-all duration-500 border flex items-center justify-center ${
                        item.stock === 0 
                          ? 'bg-zinc-900/50 text-zinc-600 border-white/5 cursor-not-allowed' 
                          : 'bg-white/5 hover:bg-white text-zinc-100 hover:text-black border-white/10 active:scale-[0.98]'
                      }`}
                    >
                      {item.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPageLayout;
