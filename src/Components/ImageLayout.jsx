import { useState, useEffect } from 'react';
import { fetchFestiveEdit } from '../services/products';

export default function ImageLayout(){
    const [content, setContent] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const loadContent = async () => {
            const data = await fetchFestiveEdit();
            setContent(data);
        };
        loadContent();
    }, []);

    useEffect(() => {
        if (!content?.carousel || content.carousel.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % content.carousel.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, [content]);

    if (!content) return null; // Or skeleton

    return (
        <section className="relative w-[85vw] md:w-[85vw] m-auto font-Poppins">
            {/* Header Section - Modern Desktop, Traditional Mobile */}
            <div className="relative mb-8 md:mb-2">
                {/* Desktop Header */}
                <div className="hidden md:flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Curated Collection</h2>
                        <h1 className="text-9xl font-Great_Vibes text-primary leading-tight">
                            Festive Edit
                        </h1>
                    </div>
                    <p className="max-w-md text-gray-600 text-lg leading-relaxed mb-8">
                        Discover our handpicked selection of timeless pieces designed to illuminate your celebrations with elegance and grace.
                    </p>
                </div>

                {/* Mobile Header (Restored Original Style) */}
                <h1 className="md:hidden absolute top-4 right-4 text-white text-right text-6xl font-Great_Vibes z-10 flex flex-col leading-tight pointer-events-none">
                    <span>Festive</span>
                    <span>Edit</span>
                </h1>
            </div>

            {/* Grid Container */}
            <div className="md:grid md:grid-cols-12 md:grid-rows-2 md:gap-4 md:h-[80vh] flex flex-col gap-5">
                {/* Item 1 - Auto Carousel */}
                <div className="md:col-span-6 md:row-span-2 relative group overflow-hidden rounded-4xl md:rounded-3xl h-[40vh] md:h-auto">
                    {content.carousel && content.carousel.map((item, index) => (
                        <div 
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img 
                                src={item.src} 
                                alt={item.alt} 
                                className="w-full h-full object-cover transform transition-transform duration-10000 md:group-hover:scale-110" 
                            />
                            
                            {/* Slide-specific Text Overlay */}
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 md:p-10 text-white">
                                <div className={`transition-all duration-1000 delay-300 transform ${
                                    index === currentImageIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                }`}>
                                    <h3 className="text-3xl md:text-5xl font-Great_Vibes leading-tight max-w-[280px] md:max-w-md">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base uppercase tracking-[0.2em] font-light mt-3 opacity-90 border-l-2 border-white/30 pl-4">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {content.carousel.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Item 2 */}
                <div className="md:col-span-3 md:row-span-1 relative group overflow-hidden rounded-4xl md:rounded-3xl h-[22vh] md:h-auto">
                    {content.items[1] && (
                        <img 
                            src={content.items[1].src} 
                            alt={content.items[1].alt} 
                            className="w-full h-full object-cover transform transition-transform duration-700 md:group-hover:scale-110 hover:scale-105" 
                        />
                    )}
                </div>

                {/* Item 3 */}
                <div className="md:col-span-3 md:row-span-1 relative group overflow-hidden rounded-4xl md:rounded-3xl h-[22vh] md:h-auto md:block hidden">
                    {content.items[2] && (
                        <img 
                            src={content.items[2].src} 
                            alt={content.items[2].alt} 
                            className="w-full h-full object-cover transform transition-transform duration-700 md:group-hover:scale-110 hover:scale-105" 
                        />
                    )}
                </div>

                {/* Item 4 */}
                <div className="md:col-span-6 md:row-span-1 relative group overflow-hidden rounded-4xl md:rounded-3xl h-[22vh] md:h-auto">
                    {content.items[3] && (
                        <img 
                            src={content.items[3].src} 
                            alt={content.items[3].alt} 
                            className="w-full h-full object-cover transform transition-transform duration-700 md:group-hover:scale-110 hover:scale-105" 
                        />
                    )}
                </div>
            </div>

            {/* Banner Section */}
            <div className="mt-8 md:mt-12 relative h-[22vh] md:h-[45vh] rounded-4xl md:rounded-[2.5rem] overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black/30 md:bg-black/30 md:group-hover:bg-black/10 transition-colors duration-700 z-10" />
                <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-5xl md:text-8xl font-Great_Vibes z-20 md:group-hover:scale-105 transition-transform duration-700 pointer-events-none w-full px-4">
                    Traditional Coming Soon
                </h2> 
                <img 
                    src={content.banner.src} 
                    alt={content.banner.alt} 
                    className="w-full h-full object-cover transform transition-transform duration-1000 md:group-hover:scale-105"
                />
            </div>
        </section>
    )
}



