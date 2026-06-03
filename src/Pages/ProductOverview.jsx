import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { fetchAllProducts } from '../services/products';
import CircularHorizontalScroll from '../Components/CircularHorizontalScroll';

const ProductOverview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Featured');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filteredAndSortedProducts = [...products]
    .filter(p => filterCategory === 'All' || (p.category && p.category.toLowerCase() === filterCategory.toLowerCase()))
    .sort((a, b) => {
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
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-zinc-400 text-xl font-Poppins tracking-widest">LOADING COLLECTION...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-transparent">
      <CircularHorizontalScroll />
      
      <div className="w-[90vw] max-w-7xl mx-auto text-zinc-300 text-sm font-medium p-4 mt-6">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2 text-zinc-500">•</span>
        <span className="text-white">Product Overview</span>
      </div>

      <div className="text-center mb-16 relative">
        <h1 className="text-white font-Great_Vibes text-7xl md:text-8xl mb-2 tracking-wider drop-shadow-lg">Our Collection</h1>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-60"></div>
        <p className="text-zinc-200 mt-6 font-Poppins text-xl max-w-2xl mx-auto px-4 leading-relaxed">
          Discover our exquisite range of handcrafted jewelry, where every piece tells a story of elegance and timeless beauty.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-8 px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Filter Scrollable Tabs */}
        <div className="flex overflow-x-auto w-full md:w-auto no-scrollbar gap-2 pb-2 md:pb-0">
          {['All', 'Anklets', 'Bracelets', 'Earrings', 'Necklaces', 'Pendants', 'Rings', 'Sets'].map(cat => (
             <button 
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 border border-white/5 ${filterCategory === cat ? 'bg-primary text-black shadow-[0_0_15px_rgba(251,112,16,0.3)]' : 'bg-white/5 text-zinc-300 hover:bg-white/15'}`}
             >
               {cat}
             </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-zinc-400 text-sm font-medium tracking-wide">Sort:</span>
            <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-black border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
            >
                <option value="Featured">Featured</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Top Rated">Top Rated</option>
            </select>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="col-span-full py-24 px-8 text-center max-w-xl mx-auto bg-black/40 border border-white/10 rounded-[2rem] backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col items-center relative overflow-hidden animate-fade-in">
              {/* Subtle top gold accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              {/* Elegant Glowing Icon */}
              <div className="relative w-20 h-20 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mb-8">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-25" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5h-1.875a6 6 0 0 0-11.25 0H6.125m15.75 0A3 3 0 0 1 22 10.5v8.25A3 3 0 0 1 19 21.75H5a3 3 0 0 1-3-3.25V10.5a3 3 0 0 1 2.125-2.875m15.75 0V6a6 6 0 0 0-12 0v1.5m12 0a2.25 2.25 0 0 0-2.25-2.25h-7.5A2.25 2.25 0 0 0 6.125 7.5" />
                </svg>
              </div>
              
              {/* Premium Typography */}
              <h3 className="text-white font-Great_Vibes text-5xl mb-4 tracking-wider">
                Curating New Brilliance
              </h3>
              
              <p className="text-zinc-400 font-Poppins text-xs md:text-sm font-light leading-relaxed mb-10 max-w-sm tracking-wide">
                We couldn't find any products matching this selection. Explore our other signature categories or view our full collection.
              </p>

              {/* Sleek Glass Button */}
              <button 
                onClick={() => setFilterCategory('All')}
                className="group/btn relative px-8 py-3.5 bg-transparent text-white border border-primary/30 hover:border-primary text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-full overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(251,112,16,0.05)] hover:shadow-[0_0_25px_rgba(251,112,16,0.2)]"
              >
                <span className="relative z-10 group-hover/btn:text-black transition-colors duration-500">Reset Filters</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 z-0" />
              </button>
            </div>
          ) : (
            filteredAndSortedProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-black/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 group h-full flex flex-col hover:border-primary/50 transition-all duration-700 hover:shadow-[0_0_50px_rgba(251,112,16,0.15)] cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt="" aria-hidden="true"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 w-fit">
                      {product.category}
                    </span>
                    {product.stock <= 5 && product.stock > 0 ? (
                      <span className="text-orange-400 text-[10px] font-bold tracking-widest uppercase bg-orange-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/30 w-fit">
                          Low Stock
                      </span>
                    ) : product.stock === 0 ? (
                      <span className="text-red-400 text-[10px] font-bold tracking-widest uppercase bg-red-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30 w-fit">
                          Out of Stock
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/20">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white text-2xl font-Poppins font-medium line-clamp-1 group-hover:text-primary transition-colors tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-primary font-bold text-xl font-Poppins whitespace-nowrap ml-4">
                      {product.price}
                    </p>
                  </div>

                  <p className="text-zinc-300 text-sm font-Poppins leading-relaxed mb-6 line-clamp-3 group-hover:text-white transition-colors">
                    {product.description || "A masterfully crafted piece designed to capture the essence of sophistication and grace. Perfect for any occasion that calls for a touch of brilliance."}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-400 opacity-80">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.12-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                     </svg>
                     <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">Ships in 2-3 Days</span>
                  </div>

                  <div className="flex flex-col gap-3 md:gap-4 mt-auto pt-6 border-t border-white/5">
                    <button 
                      onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                      }}
                      className="w-full group/btn relative overflow-hidden bg-white/5 text-white py-4 rounded-2xl font-bold transition-all duration-500 active:scale-[0.98] border border-white/10 hover:border-primary shadow-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-500 group-hover/btn:text-black">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                          </svg>
                          Add to Bag
                      </span>
                      <div className="absolute inset-0 bg-primary transform translate-y-full transition-transform duration-500 group-hover/btn:translate-y-0"></div>
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

export default ProductOverview;
