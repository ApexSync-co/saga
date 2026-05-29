import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-amber-600/5 blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl bg-black/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 md:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Animated broken gemstone illustration */}
        <div className="flex justify-center mb-8">
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <svg 
              width="100" 
              height="100" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_0_12px_rgba(251,112,16,0.4)]"
            >
              {/* Outer Glow Ring */}
              <circle cx="50" cy="50" r="46" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="4 6" className="animate-spin" style={{ animationDuration: '30s' }} />
              
              {/* Gemstone pieces (broken apart slightly) */}
              {/* Top left facet */}
              <motion.path 
                d="M50 15 L28 35 L40 50 L50 32 Z" 
                fill="url(#gemGradient)" 
                opacity="0.85"
                animate={{ x: [-1, -2, -1], y: [-1, -2, -1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Top right facet */}
              <motion.path 
                d="M50 15 L72 35 L60 50 L50 32 Z" 
                fill="url(#gemGradient)" 
                opacity="0.95"
                animate={{ x: [1, 2, 1], y: [-1, -2, -1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Left facet */}
              <motion.path 
                d="M28 35 L20 60 L40 50 Z" 
                fill="url(#gemGradientDark)" 
                opacity="0.75"
                animate={{ x: [-2, -3, -2], y: [1, 0, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Right facet */}
              <motion.path 
                d="M72 35 L80 60 L60 50 Z" 
                fill="url(#gemGradientDark)" 
                opacity="0.8"
                animate={{ x: [2, 3, 2], y: [1, 0, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Bottom facet (slightly detached downward) */}
              <motion.path 
                d="M40 50 L50 85 L60 50 Z" 
                fill="url(#gemGradientHighlight)" 
                opacity="0.9"
                animate={{ y: [2, 4, 2] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              />

              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#FB7010" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
                <linearGradient id="gemGradient" x1="50" y1="15" x2="50" y2="85">
                  <stop offset="0%" stopColor="#FB7010" />
                  <stop offset="100%" stopColor="#A0521A" />
                </linearGradient>
                <linearGradient id="gemGradientDark" x1="20" y1="35" x2="80" y2="60">
                  <stop offset="0%" stopColor="#78350F" />
                  <stop offset="100%" stopColor="#A0521A" />
                </linearGradient>
                <linearGradient id="gemGradientHighlight" x1="50" y1="50" x2="50" y2="85">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#FB7010" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* 404 text with metallic/gold glow */}
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-primary select-none drop-shadow-[0_4px_10px_rgba(251,112,16,0.3)]">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-white mt-4 mb-2 tracking-wide font-Poppins">
          Lost in the Shadows
        </h2>

        <p className="text-white/60 text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed">
          The jewelry piece or page you are looking for has faded into the shadows or was never created. Let us guide you back to our collections.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/" className="w-full sm:w-auto">
            <button className="w-full sm:px-8 py-3.5 bg-primary hover:bg-primary/90 text-black font-bold rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(251,112,16,0.3)] hover:shadow-[0_0_25px_rgba(251,112,16,0.5)] transform hover:scale-[1.02] active:scale-95 cursor-pointer text-sm tracking-wider uppercase">
              Go to Home
            </button>
          </Link>
          <Link to="/products" className="w-full sm:w-auto">
            <button className="w-full sm:px-8 py-3.5 bg-transparent border border-white/20 hover:border-primary/50 text-white hover:text-primary font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer text-sm tracking-wider uppercase">
              Browse Collections
            </button>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/60">
            <Link to="/necklaces" className="hover:text-primary transition-colors">Necklaces</Link>
            <Link to="/rings" className="hover:text-primary transition-colors">Rings</Link>
            <Link to="/earrings" className="hover:text-primary transition-colors">Earrings</Link>
            <Link to="/bracelets" className="hover:text-primary transition-colors">Bracelets</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
