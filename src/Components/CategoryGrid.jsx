import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFestiveEdit } from '../services/products';

export default function CategoryGrid(){
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchFestiveEdit();
            if (data && data.categories) {
                // Map the data to the format expected by the grid
                const mapped = data.categories.map(cat => ({
                    handle: cat.id,
                    title: cat.id === 'sets' ? 'The Sets Collection' : cat.name,
                    isSets: cat.id === 'sets', // Flag added here to identify the sets collection
                    image: cat.image,
                    position: cat.position || 'center',
                    fit: cat.fit || 'cover',
                    scale: cat.scale || 1
                }));
                setCategories(mapped);
            }
        };
        loadCategories();
    }, []);

    return(
        <>
        <div className="mb-16">
        <div className="text-white flex flex-col gap-2 text-center w-[80vw] m-auto mt-4">
        <h1 className="text-xl md:text-4xl tracking-wide">Find your <span className="text-primary px-2 text-5xl md:text-8xl font-Great_Vibes tracking-wider">Perfect</span> one</h1>
        <span className="md:text-xl md:mt-2">Shop by Category</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-[95vw] md:w-[80vw] mx-auto my-6 auto-rows-[200px] md:auto-rows-[300px]">
            {categories.map((cat, index) => {
                let spanClass = "";
                if (index === 0) {
                    spanClass = "col-span-2 md:col-span-4 row-span-1 md:row-span-2 lg:row-span-1"; // Hero
                } else if (index === 1 || index === 2) {
                    spanClass = "col-span-1 md:col-span-2"; // Half width
                } else {
                    spanClass = "col-span-1 md:col-span-1"; // Quarter width
                }

                // Dynamic font and uppercase handling based on whether it is the sets collection
                const fontClass = cat.isSets 
                    ? "font-Great_Vibes normal-case tracking-wide text-3xl md:text-6xl" 
                    : "font-Poppins uppercase tracking-widest";

                return (
                    <div 
                        key={cat.handle} 
                        className={`cursor-pointer group overflow-hidden rounded-2xl relative shadow-lg ${spanClass}`} 
                        onClick={() => navigate(`/${cat.handle}`)}
                    >
                        <div className="absolute inset-0 overflow-hidden">
                            <img 
                                src={cat.image} 
                                alt="" aria-hidden="true" 
                                className="w-full h-full transition-transform duration-[1.5s] group-hover:scale-[1.1]" 
                                style={{ 
                                    objectFit: cat.fit || 'cover',
                                    objectPosition: cat.position || 'center',
                                    transform: `scale(${cat.scale || 1})`
                                }}
                                loading="lazy" 
                            />
                        </div>
                        
                        {/* Overlay Gradient & Text */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col ${index === 0 ? 'justify-center items-center' : 'justify-end'} p-6 md:p-8`}>
                            {index !== 0 && <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-1 md:mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">Explore</span>}
                            <h1 className={`${fontClass} ${index === 0 ? 'text-2xl md:text-5xl font-medium text-white text-center' : 'text-lg md:text-2xl font-medium text-white'} transition-colors`}>
                                {cat.title}
                            </h1>
                            {index === 0 && (
                                <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 font-medium">
                                    Explore Collection
                                </span>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
        </>
    )
}
