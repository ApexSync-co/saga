import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetCustomerPassword } from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await resetCustomerPassword(email.trim());
      setSuccessMessage("Password reset link sent to your email! Please check your inbox.");
      setEmail('');
    } catch (err) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center text-white justify-center min-h-[calc(100vh-80px)] mt-8 px-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl border border-zinc-800 bg-[#121212]/95 backdrop-blur-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white font-[Poppins]">Reset Password</h2>
          <p className="text-xs text-zinc-500 font-[Poppins]">Enter your email to receive a password reset link</p>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2.5 rounded-lg text-sm text-center font-medium font-[Poppins]">
                {error}
            </div>
        )}

        {successMessage && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-2.5 rounded-lg text-sm text-center font-medium font-[Poppins]">
                {successMessage}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white transition-all duration-300 bg-primary hover:bg-orange-600 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-[Poppins] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 font-[Poppins]">
            Remember your password?{' '}
            <Link to="/signin" className="font-medium text-primary hover:text-orange-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
