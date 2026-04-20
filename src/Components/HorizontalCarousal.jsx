import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchTrendingProducts } from '../services/products';

export default function HorizontalCarousal(){
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollRef = useRef(null);
    const isDraggingRef = useRef(false);
    const hasDraggedRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    
    // Physics-based scrolling refs
    const velX = useRef(0);
    const lastX = useRef(0);
    const requestRef = useRef();

    useEffect(() => {
        const loadData = async () => {
            const products = await fetchTrendingProducts();
            setItems(products);
        };
        loadData();
    }, []);

    // Physics engine loop for inertial scrolling
    const animate = () => {
        if (!isDraggingRef.current && scrollRef.current) {
            // Apply friction
            velX.current *= 0.95;
            
            if (Math.abs(velX.current) > 0.1) {
                const container = scrollRef.current;
                const maxScroll = container.scrollWidth - container.clientWidth;
                let newScrollLeft = container.scrollLeft - velX.current;
                
                // Constrain scroll
                if (newScrollLeft < 0) {
                    newScrollLeft = 0;
                    velX.current = 0;
                } else if (newScrollLeft > maxScroll) {
                    newScrollLeft = maxScroll;
                    velX.current = 0;
                }
                
                container.scrollLeft = newScrollLeft;
                requestRef.current = requestAnimationFrame(animate);
            } else if (Math.abs(velX.current) > 0) {
                velX.current = 0; // Ensure it stops completely
                
                // When speed is low, snap to nearest item
                const container = scrollRef.current;
                const itemsList = container.querySelectorAll('.carousel-item');
                if (itemsList.length === 0) return;

                const containerRect = container.getBoundingClientRect();
                const containerCenter = containerRect.left + containerRect.width / 2;

                let nearestIndex = 0;
                let minDistance = Infinity;

                itemsList.forEach((item, idx) => {
                    const rect = item.getBoundingClientRect();
                    const itemCenter = rect.left + rect.width / 2;
                    const distance = Math.abs(containerCenter - itemCenter);
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestIndex = idx;
                    }
                });
                
                // Final snap using the item's own position relative to the container's scroll
                const targetItem = itemsList[nearestIndex];
                const targetScrollLeft = targetItem.offsetLeft - (container.clientWidth / 2) + (targetItem.offsetWidth / 2);
                
                container.scrollTo({
                    left: targetScrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [items]);

    // Scroll listener to update active dot
    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (scrollRef.current && items.length > 0) {
                        const container = scrollRef.current;
                        
                        // Calculate progress based on scroll percentage instead of index
                        const maxScroll = container.scrollWidth - container.clientWidth;
                        if (maxScroll > 0) {
                            const scrollProgress = container.scrollLeft / maxScroll;
                            setScrollProgress(scrollProgress);
                        }

                        const itemsList = container.querySelectorAll('.carousel-item');
                        if (itemsList.length === 0) {
                            ticking = false;
                            return;
                        }

                        const containerRect = container.getBoundingClientRect();
                        const containerCenter = containerRect.left + containerRect.width / 2;

                        let nearestIndex = 0;
                        let minDistance = Infinity;

                        itemsList.forEach((item, idx) => {
                            const rect = item.getBoundingClientRect();
                            const itemCenter = rect.left + rect.width / 2;
                            const distance = Math.abs(containerCenter - itemCenter);
                            if (distance < minDistance) {
                                minDistance = distance;
                                nearestIndex = idx;
                            }
                        });

                        setActiveIndex(nearestIndex);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        const currentScrollRef = scrollRef.current;
        if (currentScrollRef) {
            currentScrollRef.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentScrollRef) currentScrollRef.removeEventListener('scroll', handleScroll);
        };
    }, [items]);

    const scrollToItem = (index) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const itemsList = container.querySelectorAll('.carousel-item');
            if (itemsList.length === 0 || !itemsList[index]) return;

            const targetItem = itemsList[index];
            const targetScrollLeft = targetItem.offsetLeft - (container.clientWidth / 2) + (targetItem.offsetWidth / 2);

            container.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth'
            });
            velX.current = 0; // Stop any ongoing inertia
        }
    };

    const handleStart = (clientX) => {
        isDraggingRef.current = true;
        hasDraggedRef.current = false;
        startXRef.current = clientX;
        scrollLeftRef.current = scrollRef.current.scrollLeft;
        lastX.current = clientX;
        velX.current = 0;
        
        if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grabbing';
            scrollRef.current.style.scrollBehavior = 'auto';
        }
    };

    const handleMove = (clientX) => {
        if (!isDraggingRef.current) return;
        
        const x = clientX;
        const walk = (x - startXRef.current);
        
        if (Math.abs(walk) > 5) hasDraggedRef.current = true;

        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
        }

        // Calculate velocity for momentum
        velX.current = x - lastX.current;
        lastX.current = x;
    };

    const handleEnd = () => {
        isDraggingRef.current = false;
        if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grab';
        }
        // Inertia animation continues in the animate() loop
        requestRef.current = requestAnimationFrame(animate);
    };

    return(
        <>
            <div className="text-white text-center mt-10">
                <h1 className="font-Great_Vibes md:text-7xl text-5xl  text-white">Trending One's</h1>
                <span className="text-xl mt-5 text-gray-300">Odd's everyone is eyeing</span>
            </div>
            <div className="mt-8 relative w-[90vw] m-auto group">
                <div 
                    ref={scrollRef}
                    className="overflow-x-hidden whitespace-nowrap py-10 md:px-5 flex gap-8 w-full no-scrollbar cursor-grab select-none px-[2vw] md:px-[40vw]"
                    style={{ 
                        WebkitOverflowScrolling: 'touch',
                        transform: 'translateZ(0)',
                        willChange: 'scroll-position'
                    }}
                    onMouseDown={(e) => handleStart(e.pageX)}
                    onMouseMove={(e) => handleMove(e.pageX)}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={(e) => handleStart(e.touches[0].pageX)}
                    onTouchMove={(e) => handleMove(e.touches[0].pageX)}
                    onTouchEnd={handleEnd}
                >
                    {items.map((item, index) => (
                        <Link 
                            to={`/product/${item.id}`} 
                            key={`${item.id}-${index}`} 
                            className="carousel-item relative shrink-0 block select-none"
                            draggable="false"
                            onDragStart={(e) => e.preventDefault()}
                            onClick={(e) => {
                                if (hasDraggedRef.current) e.preventDefault();
                            }}
                        >
                             <img 
                                src={item.image} 
                                alt={item.name} 
                                draggable="false"
                                className="md:h-[40vh] h-[30vh] lg:h-[60vh] md:w-[42vw] w-[60vw] lg:w-[28vw] object-cover rounded-2xl hover:scale-105 transform transition-transform duration-300 select-none" 
                            />
                        </Link>
                    ))}
                </div>

                {/* Progress Bar Indicator */}
                <div className="flex flex-col items-center gap-4 mt-4 pb-6 px-10 text-primary">
                    <div className="h-[2px] w-full max-w-[200px] bg-white/10 rounded-full overflow-hidden relative">
                        <div 
                            className="absolute top-0 left-0 h-full bg-primary transition-all duration-75 shadow-[0_0_8px_#f97316]"
                            style={{ 
                                width: `${scrollProgress * 100}%`,
                                willChange: 'width'
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
