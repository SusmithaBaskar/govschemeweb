import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function AdminLogin({ onBack, onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin password - You can change this
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple password check
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Save admin session
        localStorage.setItem('easyfind_admin_auth', 'true');
        onSuccess();
      } else {
        setError('Invalid admin password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden bg-black">
      {/* Animated liquid glass background - dark theme */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>
      
      {/* Floating orbs - yellow/orange for admin */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/30 to-orange-600/30 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-500/30 to-yellow-600/30 rounded-full blur-3xl animate-pulse -z-10" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 shadow-[0_4px_16px_0_rgba(234,179,8,0.15)] hover:shadow-[0_4px_20px_0_rgba(234,179,8,0.25)] hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Admin Login Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-yellow-500/20 rounded-3xl p-8 shadow-[0_16px_64px_0_rgba(234,179,8,0.3)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-4 rounded-2xl shadow-[0_8px_24px_0_rgba(234,179,8,0.5)] backdrop-blur-sm border border-yellow-400/30">
                  <ShieldCheck className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
              <h1 className="text-3xl text-white mb-2 drop-shadow-sm">Admin Access</h1>
              <p className="text-gray-400">Enter password to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Input */}
              <div>
                <label htmlFor="adminPassword" className="block text-white mb-2 drop-shadow-sm">
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="adminPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400/50 shadow-[0_2px_12px_0_rgba(234,179,8,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="Enter admin password"
                    required
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 backdrop-blur-xl">
                  <p className="text-red-400 text-center">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-2xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(234,179,8,0.4)] hover:shadow-[0_6px_28px_0_rgba(234,179,8,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-yellow-400/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Access Admin Panel</span>
                  </>
                )}
              </button>

              {/* Info */}
              <div className="mt-6 p-4 bg-white/5 backdrop-blur-xl border border-yellow-500/20 rounded-2xl">
                <p className="text-gray-400 text-sm text-center">
                  <span className="text-yellow-400">ℹ️ Demo Password:</span> admin123
                </p>
                <p className="text-gray-500 text-xs text-center mt-2">
                  (Change password in AdminLogin.tsx)
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            🔒 Secure admin access • Protected area
          </p>
        </div>
      </div>
    </div>
  );
}
