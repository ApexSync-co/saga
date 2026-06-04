import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiMail, 
    FiPhone, 
    FiMessageCircle, 
    FiChevronRight,
    FiSearch
} from 'react-icons/fi';

const Help = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            id: 1,
            question: "How can I track my order?",
            answer: "You can track your order by visiting the \"My Orders\" section in your account. Click on the specific order to see real-time updates."
        },
        {
            id: 2,
            question: "Can I cancel my order?",
            answer: "Orders can only be cancelled within 1 hour of placement, provided they haven't been processed for shipping. Please contact support immediately."
        },
        {
            id: 3,
            question: "Do you ship internationally?",
            answer: "Currently, we deliver only within Kerala state. We do not ship to other states or international locations at this moment."
        },
        {
            id: 4,
            question: "What is the return policy?",
            answer: "We do not have a return policy. All sales are final, and we do not accept returns or replacements."
        },
        {
            id: 5,
            question: "Payment methods accepted?",
            answer: "We accept all major UPI, Cards, and Net Banking. Cash on Delivery (COD) is not supported."
        }
    ];

    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const FAQItem = ({ faq }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="border-b border-white/5 last:border-0">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full py-6 flex justify-between items-center text-left transition-all hover:text-primary group"
                >
                    <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors">
                        {faq.question}
                    </span>
                    <motion.span 
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        className="text-white/20 group-hover:text-primary transition-colors"
                    >
                        <FiChevronRight size={18} />
                    </motion.span>
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <p className="pb-6 text-sm text-white/50 leading-relaxed max-w-2xl">
                                {faq.answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="pt-[20vw] md:pt-[12vw] min-h-screen w-full bg-linear-to-b from-[#030303]/40 via-[#030303]/40 to-transparent text-white selection:bg-primary/30">
            <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
                
                {/* Minimal Header */}
                <header className="mb-20">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4"
                    >
                        Support
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-medium tracking-tight mb-8"
                    >
                        How can we help?
                    </motion.h1>
                    
                    {/* Minimal Search Bar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative max-w-xl group"
                    >
                        <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Find answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-b border-white/10 py-4 pl-8 focus:outline-none focus:border-primary transition-all font-light text-lg"
                        />
                    </motion.div>
                </header>

                <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
                    
                    {/* FAQ Section */}
                    <div className="lg:col-span-7">
                        <h2 className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4">Common Questions</h2>
                        <div className="mt-8">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map(faq => (
                                    <FAQItem key={faq.id} faq={faq} />
                                ))
                            ) : (
                                <p className="text-white/30 py-10 font-light italic">No results found.</p>
                            )}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-5 space-y-12">
                        <section>
                            <h2 className="text-white/30 text-xs font-bold uppercase tracking-widest mb-10">Get in touch</h2>
                            
                            <div className="space-y-8">
                                <a href="mailto:sagakamya@gmail.com" className="group block">
                                    <p className="text-xs text-white/40 mb-2 font-medium">Email Support</p>
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4 group-hover:border-primary transition-colors">
                                        <span className="text-lg font-light text-white/90 group-hover:text-white">sagakamya@gmail.com</span>
                                        <FiMail className="text-white/20 group-hover:text-primary transition-colors" />
                                    </div>
                                </a>

                                <a href="tel:+919847294800" className="group block">
                                    <p className="text-xs text-white/40 mb-2 font-medium">Customer Care</p>
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4 group-hover:border-primary transition-colors">
                                        <span className="text-lg font-light text-white/90 group-hover:text-white">+91 98472 94800</span>
                                        <FiPhone className="text-white/20 group-hover:text-primary transition-colors" />
                                    </div>
                                </a>

                                <a href="https://wa.me/919847294800" target="_blank" rel="noopener noreferrer" className="group block">
                                    <p className="text-xs text-white/40 mb-2 font-medium">WhatsApp</p>
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4 group-hover:border-primary transition-colors">
                                        <span className="text-lg font-light text-white/90 group-hover:text-white">Chat with us</span>
                                        <FiMessageCircle className="text-white/20 group-hover:text-primary transition-colors" />
                                    </div>
                                </a>
                            </div>
                        </section>

                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-sm">
                            <p className="text-sm text-white/40 leading-relaxed font-light">
                                Our team is available Monday through Saturday, from 9:00 AM to 6:00 PM IST. We aim to respond to all inquiries within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>

                <footer className="mt-40 pt-8 border-t border-white/5">
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
                        &copy; {new Date().getFullYear()} Saga Kerala India
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Help;
