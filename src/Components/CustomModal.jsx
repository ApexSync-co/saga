import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = 'Confirm Action', 
    message = 'Are you sure you want to proceed?', 
    type = 'confirm', // 'confirm' or 'alert'
    confirmText = 'OK', 
    cancelText = 'Cancel',
    isDanger = false
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={type === 'confirm' ? onClose : undefined}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                        className="relative w-full max-w-md bg-[#0d0d0d] border border-white/10 p-6 md:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10"
                    >
                        {/* Gold Accent Bar */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FB7010] to-transparent" />

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-light tracking-wider text-white font-Poppins mb-4 uppercase">
                            {title}
                        </h3>

                        {/* Message */}
                        <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed mb-8">
                            {message}
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-4 justify-end">
                            {type === 'confirm' && (
                                <button 
                                    onClick={onClose}
                                    className="px-5 py-2.5 text-[10px] uppercase font-bold tracking-widest text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300 rounded-sm cursor-pointer"
                                >
                                    {cancelText}
                                </button>
                            )}
                            <button 
                                onClick={onConfirm}
                                className={`px-6 py-2.5 text-[10px] uppercase font-bold tracking-widest transition-all duration-300 rounded-sm cursor-pointer ${
                                    isDanger 
                                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]' 
                                    : 'bg-white text-black hover:bg-[#FB7010] hover:text-white hover:shadow-[0_0_15px_rgba(251,112,16,0.3)]'
                                }`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CustomModal;
