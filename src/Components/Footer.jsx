import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="w-full text-white py-16 font-Poppins">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 text-center lg:text-left">
                
                {/* Brand Section */}
                <div className="flex flex-col items-center lg:items-start space-y-4">
                    <img src="/Logo.png" alt="" aria-hidden="true" className="h-12 w-auto object-contain rounded-sm" />
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Curating timeless elegance for the modern individual. Where simplicity meets sophistication.
                    </p>
                </div>

                {/* Navigation Section */}
                <div className="flex flex-col items-center lg:items-center space-y-4">
                    <h3 className="text-lg font-semibold tracking-wide mr-2 text-primary">Explore</h3>
                    <nav className="grid grid-cols-2 gap-2 text-gray-400">
                        <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
                        <Link to="/products" className="hover:text-white transition-colors duration-300">Shop</Link>
                        <Link to="/necklaces" className="hover:text-white transition-colors duration-300">Necklaces</Link>
                        <Link to="/bangles" className="hover:text-white transition-colors duration-300">Bangles</Link>
                        <Link to="/earrings" className="hover:text-white transition-colors duration-300">Earrings</Link>
                        <Link to="/pendants" className="hover:text-white transition-colors duration-300">Pendants</Link>
                        <Link to="/rings" className="hover:text-white transition-colors duration-300">Rings</Link>
                        <Link to="/bracelets" className="hover:text-white transition-colors duration-300">Bracelets</Link>
                        <Link to="/sets" className="hover:text-white transition-colors duration-300">Sets</Link>
                    </nav>
                </div>

                {/* Contact/Social Section */}
                <div className="flex flex-col items-center lg:items-end space-y-4 w-full">
                    <h3 className="text-lg font-semibold tracking-wide text-primary">Contact</h3>
                    <div className="flex flex-col space-y-2 text-gray-400 text-sm lg:text-right w-full break-words">
                        <a href="mailto:sagakamya@gmail.com" className="hover:text-white transition-colors cursor-default">sagakamya@gmail.com</a>
                        <a href="tel:+919847294800" className='hover:text-white cursor-default'>+91 98472 94800</a>
                        <p className="text-xs text-gray-500 mt-1 mb-2">Mon - Sat, 9 AM - 6 PM (IST)</p>
                        <div className="pt-2 flex gap-4 justify-center lg:justify-end">
                            {/* Social Icons */}
                            <a href="https://wa.me/919847294800" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:bg-white/90 hover:text-black transition-all cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-gray-400 group-hover:text-primary transition-colors">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.452L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.479 2.006 14.032.977 11.432.977c-5.442 0-9.87 4.372-9.874 9.802-.001 1.774.475 3.509 1.378 5.081l-.997 3.642 3.718-.973zm11.584-6.491c-.307-.154-1.817-.897-2.097-.999-.28-.102-.484-.154-.688.154-.204.308-.79.999-.968 1.205-.178.205-.357.23-.664.077-1.119-.56-1.848-.925-2.585-2.186-.194-.333.194-.309.554-1.026.062-.124.03-.232-.015-.323-.046-.091-.484-1.168-.664-1.602-.175-.421-.347-.363-.484-.363-.125-.002-.27-.002-.413-.002-.144 0-.379.054-.577.271-.198.216-.755.738-.755 1.8 0 1.062.773 2.087.88 2.233.109.146 1.522 2.323 3.688 3.256 1.259.54 1.902.586 2.585.485.422-.062 1.31-.535 1.498-1.047.189-.512.189-.95.133-1.04-.056-.09-.204-.153-.511-.307z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/shopsaga_?igsh=MW5sbGt6ejJwbm9yZA==" aria-label="Instagram" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:bg-white/90 hover:text-black transition-all cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-primary transition-colors">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:bg-white/90 hover:text-black transition-all cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-primary transition-colors">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1440px] mx-auto px-6 lg:px-12">
                <p>&copy; {new Date().getFullYear()} Saga. All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link to="/terms-of-use" className="hover:text-primary transition-colors duration-300">Terms of Use</Link>
                    <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-300">Privacy Policy</Link>
                    <Link to="/ethical-consent" className="hover:text-primary transition-colors duration-300">Ethics & Privacy</Link>
                    <Link to="/help" className="hover:text-primary transition-colors duration-300">Help & Support</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
