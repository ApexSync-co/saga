import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmCustomerPasswordReset } from '../services/authService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid or missing reset code. Please request a new password reset link.");
    }
  }, [oobCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oobCode) return;

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await confirmCustomerPasswordReset(oobCode, formData.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!oobCode) {
    return (
      <div className="flex items-center text-white justify-center min-h-[calc(100vh-80px)] mt-8 px-4">
        <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl border border-zinc-800 bg-[#121212]/95 backdrop-blur-md text-center">
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2.5 rounded-lg text-sm font-medium font-[Poppins]">
            {error || "Invalid reset link."}
          </div>
          <button
            onClick={() => navigate('/forgot-password')}
            className="w-full mt-4 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white transition-all duration-300 bg-primary hover:bg-orange-600 active:scale-[0.98] font-[Poppins]"
          >
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center text-white justify-center min-h-[calc(100vh-80px)] mt-8 px-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl border border-zinc-800 bg-[#121212]/95 backdrop-blur-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white font-[Poppins]">Create New Password</h2>
          <p className="text-xs text-zinc-500 font-[Poppins]">Enter your new password below</p>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2.5 rounded-lg text-sm text-center font-medium font-[Poppins]">
                {error}
            </div>
        )}

        {success ? (
          <div className="text-center space-y-6">
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-4 rounded-lg text-sm font-medium font-[Poppins]">
              Password successfully reset! Redirecting to sign in...
            </div>
            <button
              onClick={() => navigate('/signin')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white transition-all duration-300 bg-primary hover:bg-orange-600 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-[Poppins]"
            >
              Sign In Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-zinc-300 font-[Poppins]">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 bg-[#1c1c1e] border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm font-[Poppins] pr-12 transition-all"
                  placeholder="Enter new password"
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

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-zinc-300 font-[Poppins]">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 bg-[#1c1c1e] border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm font-[Poppins] pr-12 transition-all"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white transition-all duration-300 bg-primary hover:bg-orange-600 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-[Poppins] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
