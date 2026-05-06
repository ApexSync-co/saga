import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import Search from './Search';

function Navbar(){

   const [isOpen, setIsOpen] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [isVisible, setIsVisible] = useState(true);
   const lastScrollY = useRef(0);
   const { getCartCount } = useCart();
   const auth = useAuth() || {};
   const { isAuthenticated, user, logout } = auth;
   const cartCount = getCartCount();

   useEffect(() => {
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY.current) {
            // Scrolling down
            setIsVisible(false);
        } else {
            // Scrolling up
            setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
   }, []);

    return(
        <>
        <nav className={`flex justify-between items-center py-4 fixed top-0 w-full z-50 transition-transform duration-300 bg-black/80 backdrop-blur-sm shadow-lg border-b border-primary/20 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} >
            <ul className=" flex gap-10 mx-10 max-w-fit relative z-50">
                <button 
                    className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 overflow-hidden hover:opacity-70 transition-opacity" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span 
                        className={`h-[3px] w-6 bg-primary rounded transition-all duration-500 ease-in-out transform ${
                            isOpen ? "rotate-45 translate-y-[9px]" : ""
                        }`}
                    ></span>
                    <span 
                        className={`h-[3px] w-6 bg-primary rounded transition-all duration-500 ease-in-out ${
                            isOpen ? "opacity-0 translate-x-10" : "opacity-100"
                        }`}
                    ></span>
                    <span 
                        className={`h-[3px] w-6 bg-primary rounded transition-all duration-500 ease-in-out transform ${
                            isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                        }`}
                    ></span>
                </button>
            </ul>

           <Link to="/" className="flex items-center justify-center group">
                <div className="relative">
                    <img src="/Logo.png" alt="" aria-label="Saga Home" className='md:h-16 h-12 relative z-10 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg filter brightness-110 contrast-125' />
                </div>
            </Link>

            <div className="flex text-primary gap-6 md:mx-10 mx-4">
                <svg onClick={() => setIsSearchOpen(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FB7010" className="w-6 h-6 cursor-pointer hover:scale-110 hover:text-primary/80 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <Link to="/cart" className="relative group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FB7010" className="w-6 h-6 cursor-pointer hover:scale-110 hover:text-primary/80 transition-all group-hover:fill-primary/10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 border-2 border-black bg-primary text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
        <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <div style={{ backgroundColor: "black" }} className={`fixed top-0 left-0 h-screen h-[100dvh] w-[70vw] md:w-[30vw] bg-black text-white transform transition-transform duration-700 ease-in-out z-[100] flex flex-col shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
               <div className="flex justify-between items-center absolute top-5 left-0 w-full px-10 z-50">
                    <button 
                        className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 overflow-hidden hover:opacity-70 transition-opacity" 
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span 
                            className={`h-[3px] w-6 bg-primary rounded transition-all duration-500 ease-in-out transform ${
                                isOpen ? "rotate-45 translate-y-[9px]" : ""
                            }`}
                        ></span>
                        <span 
                            className={`h-[3px] w-6 bg-primary rounded transition-all duration-500 ease-in-out ${
                                isOpen ? "opacity-0 translate-x-10" : "opacity-100"
                            }`}
                        ></span>
                        <span 
                            className={`h-[3px] w-6 bg-primary rounded transition-all duration-500 ease-in-out transform ${
                                isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                            }`}
                        ></span>
                    </button>
                    {isAuthenticated && (
                        <button 
                            onClick={() => { logout(); setIsOpen(false); }} 
                            className="border-2 border-red-600 text-red-400 font-bold py-1.5 px-4 text-sm rounded hover:bg-red-600 hover:text-white transition-all duration-200"
                        >
                            Sign Out
                        </button>
                    )}
               </div>
               <div className="flex flex-col items-center mt-16 px-6 text-center pb-4 border-b border-primary/20">
                    {isAuthenticated ? (
                       <div className="flex flex-col items-center w-full">
                            <div className="h-14 w-14 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 border-2 border-primary/40 shadow-lg">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <p className="text-white font-semibold text-lg">Hello, {user?.name || 'User'}</p>
                            <p className="text-white/50 text-xs mb-4 break-all">{user?.email}</p>
                       </div>
                    ) : (
                       <>
                        <img src="/SAGA LOGO.PNG" alt="" aria-hidden="true" className="h-14 w-auto object-contain rounded-lg mb-4 drop-shadow-lg filter brightness-110 contrast-125" />
                        <p className="text-white/70 text-sm font-semibold mb-2 max-w-[200px]">
                            Discover Elegance
                        </p>
                       </>
                    )}
               </div>
               <ul className="flex flex-col text-white/80 overflow-y-auto no-scrollbar py-6">
                    <div className="w-full mb-6">
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] px-10 mb-2 font-bold">Explore</p>
                        <Link to="/" className="w-full" onClick={() => setIsOpen(false)}>
                            <li className="cursor-pointer py-3 w-full hover:text-white hover:bg-white/5 flex items-center justify-start pl-10 gap-4 group transition-all duration-200 border-l-4 border-transparent hover:border-white/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform text-white/70 group-hover:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <span className="text-sm font-medium">Home</span>
                            </li>
                        </Link>
                        <Link to="/products" className="w-full" onClick={() => setIsOpen(false)}>
                            <li className="cursor-pointer py-3 w-full hover:text-white hover:bg-white/5 flex items-center justify-start pl-10 gap-4 group transition-all duration-200 border-l-4 border-transparent hover:border-white/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform text-white/70 group-hover:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H21m-11.14 0l-1.591 1.591M21 21v-7.5M21 21H3.75m0 0V7.5m0 0v-7.5a.75.75 0 0 1 .75-.75h14.25a.75.75 0 0 1 .75.75v7.5m-15.75 0H21m-15.75 0h14.25" />
                                </svg>
                                <span className="text-sm font-medium">Shop</span>
                            </li>
                        </Link>
                        <div className="pl-[72px] flex flex-col gap-3 mt-1 pb-2">
                             <Link to="/necklaces" onClick={() => setIsOpen(false)} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider">Necklaces</Link>
                             <Link to="/bangles" onClick={() => setIsOpen(false)} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider">Bangles</Link>
                             <Link to="/earrings" onClick={() => setIsOpen(false)} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider">Earrings</Link>
                             <Link to="/pendants" onClick={() => setIsOpen(false)} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider">Pendants</Link>
                             <Link to="/rings" onClick={() => setIsOpen(false)} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider">Rings</Link>
                             <Link to="/bracelets" onClick={() => setIsOpen(false)} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider">Bracelets</Link>
                             <Link to="/sets" onClick={() => setIsOpen(false)} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider">Sets</Link>
                        </div>
                    </div>

                    {isAuthenticated && (
                        <div className="w-full border-t border-white/5 py-6">
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] px-10 mb-2 font-bold">Account</p>
                            
                            <Link to="/accounts" className="w-full" onClick={() => setIsOpen(false)}>
                                <li className="cursor-pointer py-3 w-full hover:text-white hover:bg-white/5 flex items-center justify-start pl-10 gap-4 group transition-all duration-200 border-l-4 border-transparent hover:border-white/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform text-white/70 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <span className="text-sm font-medium">Profile</span>
                                </li>
                            </Link>

                            <Link to="/my-orders" className="w-full" onClick={() => setIsOpen(false)}>
                                <li className="cursor-pointer py-3 w-full hover:text-white hover:bg-white/5 flex items-center justify-start pl-10 gap-4 group transition-all duration-200 border-l-4 border-transparent hover:border-white/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform text-white/70 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <span className="text-sm font-medium">Orders</span>
                                </li>
                            </Link>

                            <Link to="/delivery-address" className="w-full" onClick={() => setIsOpen(false)}>
                                <li className="cursor-pointer py-3 w-full hover:text-white hover:bg-white/5 flex items-center justify-start pl-10 gap-4 group transition-all duration-200 border-l-4 border-transparent hover:border-white/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform text-white/70 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <span className="text-sm font-medium">Addresses</span>
                                </li>
                            </Link>

                            <Link to="/settings" className="w-full" onClick={() => setIsOpen(false)}>
                                <li className="cursor-pointer py-3 w-full hover:text-white hover:bg-white/5 flex items-center justify-start pl-10 gap-4 group transition-all duration-200 border-l-4 border-transparent hover:border-white/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform text-white/70 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.212 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <span className="text-sm font-medium">Settings</span>
                                </li>
                            </Link>
                        </div>
                    )}

                    <div className="w-full border-t border-white/5 py-6">
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] px-10 mb-2 font-bold">Support</p>
                        <Link to="/help" className="w-full" onClick={() => setIsOpen(false)}>
                            <li className="cursor-pointer py-3 w-full hover:text-white hover:bg-white/5 flex items-center justify-start pl-10 gap-4 group transition-all duration-200 border-l-4 border-transparent hover:border-white/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform text-white/70 group-hover:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                </svg>
                                <span className="text-sm font-medium">Help & Support</span>
                            </li>
                        </Link>
                    </div>
               </ul>
                <div className="flex flex-col gap-3 mt-8 w-full px-12 pb-8">
                    {!isAuthenticated && (
                        <>
                        <Link to="/signin" onClick={() => setIsOpen(false)} className='w-full group'>
                            <button className='w-full text-white font-bold py-3 rounded-lg bg-primary hover:bg-primary/90 transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-primary/50 flex items-center justify-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14.5a1.5 1.5 0 011.5 1.5v2a1.5 1.5 0 01-1.5 1.5H7" />
                                </svg>
                                Sign In
                            </button>
                        </Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)} className='w-full group'>
                            <button className='w-full text-white border-2 border-white font-bold py-3 rounded-lg hover:bg-white/10 hover:text-white hover:border-white/50 transition-all duration-300 transform group-hover:scale-105 bg-transparent flex items-center justify-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Sign Up
                            </button>
                        </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar;