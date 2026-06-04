import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="w-full text-white font-Poppins">
            {/* Main Content */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    
                    {/* Brand Section */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <img src="/Logo.png" alt="Saga" className="h-12 w-auto object-contain hover:opacity-80 transition-opacity duration-300" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Curating timeless elegance for the modern individual. Where simplicity meets sophistication.
                        </p>
                        <div className="pt-4 border-t border-primary/20">
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Socialize With Us</p>
                            <div className="mt-4 flex gap-3">
                                <a href="https://wa.me/919847294800" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-lg border border-primary/40 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-gray-400 group-hover:text-primary transition-colors">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.452L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.479 2.006 14.032.977 11.432.977c-5.442 0-9.87 4.372-9.874 9.802-.001 1.774.475 3.509 1.378 5.081l-.997 3.642 3.718-.973zm11.584-6.491c-.307-.154-1.817-.897-2.097-.999-.28-.102-.484-.154-.688.154-.204.308-.79.999-.968 1.205-.178.205-.357.23-.664.077-1.119-.56-1.848-.925-2.585-2.186-.194-.333.194-.309.554-1.026.062-.124.03-.232-.015-.323-.046-.091-.484-1.168-.664-1.602-.175-.421-.347-.363-.484-.363-.125-.002-.27-.002-.413-.002-.144 0-.379.054-.577.271-.198.216-.755.738-.755 1.8 0 1.062.773 2.087.88 2.233.109.146 1.522 2.323 3.688 3.256 1.259.54 1.902.586 2.585.485.422-.062 1.31-.535 1.498-1.047.189-.512.189-.95.133-1.04-.056-.09-.204-.153-.511-.307z"/>
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/shopsaga_?igsh=MW5sbGt6ejJwbm9yZA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-lg border border-primary/40 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-primary transition-colors">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-lg border border-primary/40 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-primary transition-colors">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Collections */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest font-semibold text-primary/80">Collections</h3>
                            <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                        </div>
                        <nav className="flex flex-col space-y-3">
                            <Link to="/" className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300">Home</Link>
                            <Link to="/products" className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300">Shop All</Link>
                        </nav>
                    </div>

                    {/* Jewelry */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest font-semibold text-primary/80">Jewelry</h3>
                            <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                        </div>
                        <nav className="flex flex-col space-y-3">
                            <Link to="/necklaces" className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300">Necklaces</Link>
                            <Link to="/anklets" className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300">Anklets</Link>
                            <Link to="/earrings" className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300">Earrings</Link>
                            <Link to="/pendants" className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300">Pendants</Link>
                            <Link to="/rings" className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300">Rings</Link>
                            <Link to="/bracelets" className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300">Bracelets</Link>
                            <Link to="/sets" className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300">Sets</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest font-semibold text-primary/80">Get In Touch</h3>
                            <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email</p>
                                <a href="mailto:sagakamya@gmail.com" className="text-gray-400 text-sm hover:text-primary transition-colors duration-300">sagakamya@gmail.com</a>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Phone</p>
                                <a href="tel:+919847294800" className="text-gray-400 text-sm hover:text-primary transition-colors duration-300">+91 98472 94800</a>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Hours</p>
                                <p className="text-gray-400 text-sm">Mon - Sat, 9 AM - 6 PM IST</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Saga. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center lg:justify-end gap-6">
                        <Link to="/terms-of-use" className="text-xs text-gray-500 hover:text-primary transition-colors duration-300">Terms of Use</Link>
                        <Link to="/privacy-policy" className="text-xs text-gray-500 hover:text-primary transition-colors duration-300">Privacy Policy</Link>
                        <Link to="/ethical-consent" className="text-xs text-gray-500 hover:text-primary transition-colors duration-300">Ethics & Privacy</Link>
                        <Link to="/help" className="text-xs text-gray-500 hover:text-primary transition-colors duration-300">Help & Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
