import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingProducts } from '../services/products';

export default function HorizontalCarousal() {
    const [items, setItems] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            const products = await fetchTrendingProducts();
            setItems(products);
        };
        loadData();
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth * 0.8 
                : scrollLeft + clientWidth * 0.8;
            
            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    if (items.length === 0) return null;

    return (
        <section className="py-16 overflow-hidden relative">
            <div className="px-6 mb-10 text-center">
                <h2 className="font-Great_Vibes text-6xl md:text-8xl text-white mb-2">
                    Trending Ones
                </h2>
                <div className="flex items-center justify-center gap-3 text-zinc-300">
                    <div className="h-[1px] w-6 bg-primary/30" />
                    <p className="tracking-[0.3em] uppercase text-[10px]">Handpicked favorites</p>
                    <div className="h-[1px] w-6 bg-primary/30" />
                </div>
            </div>

            <div className="relative group px-4">
                {/* Desktop Navigation Buttons */}
                <button 
                    onClick={() => scroll('left')}
                    className="absolute left-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-black"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="absolute right-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-black"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-2 md:px-10 gap-4 md:gap-8 pb-8 scroll-smooth"
                    style={{ 
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="relative shrink-0 w-[75vw] md:w-[40vw] lg:w-[25vw] aspect-[3/4] rounded-2xl overflow-hidden snap-center bg-zinc-900 shadow-xl group/card"
                        >
                            <Link 
                                to={`/product/${item.id}`}
                                className="block w-full h-full"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-5">
                                    <h3 className="text-white font-Great_Vibes text-2xl md:text-4xl">{item.name}</h3>
                                    <p className="text-primary font-medium text-sm md:text-lg mt-0.5">{item.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <div className="shrink-0 w-4 h-full" />
                </div>
            </div>

            <div className="mt-8 text-center md:hidden">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full">
                    <span className="text-[9px] text-zinc-100 uppercase tracking-[0.3em]">Swipe to explore</span>
                </div>
            </div>
        </section>
    );
}

