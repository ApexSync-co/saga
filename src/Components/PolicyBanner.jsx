import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PolicyBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a preference choice
        const preference = localStorage.getItem('saga_ethical_consents');
        if (!preference) {
            // Show banner after a slight delay for smooth entry
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const preferences = {
            essential: true,
            analytics: true,
            personalization: true,
            marketing: true
        };
        localStorage.setItem('saga_ethical_consents', JSON.stringify(preferences));
        setIsVisible(false);
    };

    const handleDeclineAll = () => {
        const preferences = {
            essential: true,
            analytics: false,
            personalization: false,
            marketing: false
        };
        localStorage.setItem('saga_ethical_consents', JSON.stringify(preferences));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md bg-zinc-950/95 border border-zinc-800/90 rounded-2xl p-6 shadow-2xl backdrop-blur-lg z-50 transition-all duration-500 transform translate-y-0 animate-fadeIn font-Poppins">
            <div className="flex flex-col gap-4">
                {/* Header / Icon */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white">We Value Your Privacy</h4>
                        <p className="text-xs text-zinc-500">Privacy & Terms Preferences</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    Saga uses functional local storage and preferences to optimize navigation, secure cart states, and personalize your experience. Learn more in our{' '}
                    <Link to="/privacy-policy" className="text-primary hover:underline hover:text-orange-400">
                        Privacy Policy
                    </Link>.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <button 
                        onClick={handleAcceptAll}
                        className="flex-1 bg-primary text-black text-xs font-semibold py-2.5 px-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-center"
                    >
                        Accept All
                    </button>
                    <button 
                        onClick={handleDeclineAll}
                        className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 cursor-pointer text-center"
                    >
                        Essential Only
                    </button>
                </div>
                
                <div className="text-center">
                    <Link 
                        to="/ethical-consent" 
                        onClick={() => setIsVisible(false)}
                        className="inline-block text-[11px] text-zinc-500 hover:text-primary transition-colors cursor-pointer"
                    >
                        Manage Custom Settings
                    </Link>
                </div>
            </div>
        </div>
    );
}
