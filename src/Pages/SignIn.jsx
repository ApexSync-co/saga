import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginCustomer, loginWithGoogle } from '../services/authService';
import { useAuth } from '../Context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const userData = await loginCustomer(formData.email, formData.password, rememberMe);
        
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        login(userData);
        
        // Navigate to home
        navigate('/');
    } catch (err) {
        setError(err.message || "Failed to sign in");
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginWithGoogle();
      login(userData);
      navigate('/');
    } catch (err) {
      setError(err.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex items-center text-white justify-center min-h-[calc(100vh-80px)] mt-8  px-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl border border-zinc-800 bg-[#121212]/95 backdrop-blur-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white font-[Poppins]">Welcome Back</h2>
          <p className="text-xs text-zinc-500 font-[Poppins]">Please sign in to your account</p>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2.5 rounded-lg text-sm text-center font-medium font-[Poppins]">
                {error}
            </div>
        )}


        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-zinc-300 font-[Poppins]">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 bg-[#1c1c1e] border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm font-[Poppins] transition-all"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-semibold text-zinc-300 font-[Poppins]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 bg-[#1c1c1e] border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm font-[Poppins] pr-12 transition-all"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center space-x-2 text-zinc-400 cursor-pointer font-[Poppins] select-none">
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-800 bg-[#1c1c1e] text-primary focus:ring-primary focus:ring-offset-0 focus:ring-1 focus:outline-none cursor-pointer accent-primary"
              />
              <span>Remember login</span>
            </label>
            <Link
              to="/forgot-password"
              className="font-medium text-primary hover:text-orange-600 font-[Poppins] cursor-pointer"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white transition-all duration-300 bg-primary hover:bg-orange-600 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-[Poppins] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#121212] text-gray-400 font-[Poppins]">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-transparent hover:bg-white/10 transition-colors duration-200 font-[Poppins] disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.97-1.09 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16-3.15 0-5.81-2.13-6.76-4.99H1.4v3.13C3.37 21.2 7.39 24 12 24z"/>
            <path fill="#FBBC05" d="M5.24 14.26c-.24-.72-.37-1.48-.37-2.26s.13-1.54.37-2.26V6.61H1.4C.51 8.24 0 10.06 0 12s.51 3.76 1.4 5.39l3.84-3.13z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.39 0 3.37 2.8 1.4 6.61l3.84 3.13c.95-2.86 3.61-4.99 6.76-4.99z"/>
          </svg>
          Sign in with Google
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 font-[Poppins]">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-orange-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
