import { useState, useEffect } from 'react';
import { fetchFestiveEdit } from '../services/products';
import { useNavigate } from 'react-router-dom';

const FestiveCarousel = ({ carousel }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!carousel || carousel.length === 0) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % carousel.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [carousel]);

    if (!carousel) return null;

    return (
        <div className="md:col-span-6 md:row-span-2 relative group overflow-hidden rounded-4xl md:rounded-[2rem] min-h-[60svh] md:h-auto shadow-2xl">
            {carousel.map((item, index) => (
                <div 
                    key={index}
                    onClick={() => navigate('/products')}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img 
                        src={item.src} 
                        alt={item.alt} 
                        className="w-full h-full object-cover transform transition-transform duration-10000 md:group-hover:scale-110" 
                        loading="lazy"
                    />
                    
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
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {carousel.map((_, index) => (
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
    );
};

export default function ImageLayout(){
    const [content, setContent] = useState(null);

    useEffect(() => {
        const loadContent = async () => {
            const data = await fetchFestiveEdit();
            setContent(data);
        };
        loadContent();
    }, []);

    if (!content) {
        return (
            <section className="w-[90vw] md:w-[85vw] lg:w-[75vw] m-auto md:py-16 animate-pulse">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-12 px-4">
                    <div className="h-24 w-64 bg-white/10 rounded-xl" />
                    <div className="h-16 w-full md:max-w-xs bg-white/5 rounded-lg" />
                </div>
                <div className="md:grid md:grid-cols-12 md:grid-rows-2 md:gap-4 lg:gap-6 md:h-[85vh] flex flex-col gap-5 px-4 md:px-0">
                    <div className="md:col-span-6 md:row-span-2 bg-white/5 rounded-4xl h-[50vh] md:h-auto shadow-2xl" />
                    <div className="md:col-span-3 md:row-span-1 bg-white/5 rounded-4xl h-[22vh] md:h-auto" />
                    <div className="md:col-span-3 md:row-span-1 bg-white/5 rounded-4xl h-[22vh] md:h-auto md:block hidden" />
                    <div className="md:col-span-6 md:row-span-1 bg-white/5 rounded-4xl h-[22vh] md:h-auto" />
                </div>
            </section>
        );
    }

    return(
        <section className="w-[93vw] md:w-[85vw] lg:w-[75vw] mt-4 md:mt-0 m-auto md:py-2">
        
            <div className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-12 px-4">
                <h1 className="text-primary text-6xl md:text-8xl lg:text-9xl font-Great_Vibes leading-[0.8] drop-shadow-2xl">
                    Chosen For You
                </h1>
                <p className="text-zinc-400 md:max-w-[280px] lg:max-w-xs text-sm md:text-base leading-relaxed tracking-wide font-light italic border-l border-primary/30 pl-6">
                    High taste, Low compromise.<br />
                    Prices made to feel like Yours,<br />
                    Instantly
                </p>
            </div>

            {/* Grid Container */}
            <div className="md:grid md:grid-cols-12 md:grid-rows-2 md:gap-4 lg:gap-6 md:h-[85vh] flex flex-col gap-5 px-4 md:px-0">
                {/* Item 1 - Auto Carousel extracted for performance */}
                <FestiveCarousel carousel={content.carousel} />

                {/* Item 2 */}
                <div className="md:col-span-3 md:row-span-1 relative group overflow-hidden rounded-4xl md:rounded-3xl h-[25dvh] md:h-auto">
                    {content.items[1] && (
                        <img 
                            src={content.items[1].src} 
                            alt={content.items[1].alt} 
                            className="w-full h-full object-cover transform transition-transform duration-700 md:group-hover:scale-110 hover:scale-105" 
                            loading="lazy"
                        />
                    )}
                </div>

                {/* Item 3 */}
                <div className="md:col-span-3 md:row-span-1 relative group overflow-hidden rounded-4xl md:rounded-3xl h-[25dvh] md:h-auto md:block hidden">
                    {content.items[2] && (
                        <img 
                            src={content.items[2].src} 
                            alt={content.items[2].alt} 
                            className="w-full h-full object-cover transform transition-transform duration-700 md:group-hover:scale-110 hover:scale-105" 
                            loading="lazy"
                        />
                    )}
                </div>

                {/* Item 4 */}
                <div className="md:col-span-6 md:row-span-1 relative group overflow-hidden rounded-4xl md:rounded-3xl h-[25dvh] md:h-auto">
                    {content.items[3] && (
                        <img 
                            src={content.items[3].src} 
                            alt={content.items[3].alt} 
                            className="w-full h-full object-cover transform transition-transform duration-700 md:group-hover:scale-110 hover:scale-105" 
                            loading="lazy"
                        />
                    )}
                </div>
            </div>

            {/* Banner Section */}
            <div className="mt-4 md:mt-12 relative h-[25vh] md:h-[45vh] rounded-4xl md:rounded-[2.5rem] overflow-hidden group cursor-pointer mx-4 md:mx-0">
                {/* <div className="absolute inset-0 bg-black/30 md:bg-black/30 md:group-hover:bg-black/10 transition-colors duration-700 z-10" /> */}

                <img 
                    src={content.banner.src} 
                    alt={content.banner.alt} 
                    className="w-full h-full object-cover transform transition-transform duration-1000 md:group-hover:scale-105"
                    loading="lazy"
                />
            </div>
        </section>
    )
}



