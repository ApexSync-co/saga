import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Static category data — these are the fixed categories in the store
const CATEGORIES = [
  { id: 'bangles', name: 'Bangles', handle: 'bangles', image: '/Bangles.png' },
  { id: 'bracelets', name: 'Bracelets', handle: 'bracelets', image: '/Bracelets.jpeg' },
  { id: 'earrings', name: 'Earrings', handle: 'earrings', image: '/stock3.jpeg' },
  { id: 'necklaces', name: 'Necklaces', handle: 'necklaces', image: '/Necklace.jpeg' },
  { id: 'pendants', name: 'Pendants', handle: 'pendants', image: '/Pendant.jpeg' },
  { id: 'rings', name: 'Rings', handle: 'rings', image: '/Rings.jpeg' },
  { id: 'sets', name: 'Sets', handle: 'sets', image: '/Sets.jpg' },
];

function CircularHorizontalScroll() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const categories = CATEGORIES;

  const handleCategoryClick = (handle) => {
    navigate(`/${handle}`);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:py-10 relative group/scroll w-full">


      <div
        ref={scrollRef}
        className="flex overflow-x-auto whitespace-nowrap py-4 md:py-6 px-4 md:px-12 w-full no-scrollbar scroll-smooth gap-6 md:gap-12 lg:gap-16 lg:justify-center"
      >
        {[...categories].map((category, index) => (
          <div
            key={`${category.id}-${index}`}
            className="shrink-0 flex flex-col items-center gap-3 md:gap-4 group cursor-pointer w-20 md:w-auto"
            onClick={() => handleCategoryClick(category.handle)}
          >
            {/* Image Container with Gradient Ring Effect */}
            <div className="w-20 h-20 md:w-38 md:h-38 rounded-full md:p-[3px] 
                            bg-zinc-900 md:bg-gradient-to-br md:from-zinc-700 md:to-zinc-800 
                            md:group-hover:from-primary md:group-hover:to-primary/50
                            transition-all duration-500 md:shadow-lg md:group-hover:shadow-primary/20
                            flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 md:border-[3px] md:border-zinc-950 relative bg-zinc-900">
                <img
                  src={category.image}
                  alt="" aria-hidden="true"
                  className="w-full h-full object-cover md:opacity-90 md:group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            <span className="text-zinc-400 text-[9px] tracking-widest md:text-sm md:font-medium md:tracking-wider md:tracking-[0.2em] uppercase 
                           group-hover:text-primary transition-colors duration-300 md:transform md:group-hover:-translate-y-1">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CircularHorizontalScroll;
