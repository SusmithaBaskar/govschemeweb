import React, { useState } from 'react';
import { useAuth } from '../App';
import {
  UserCircle,
  ArrowLeft,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
} from 'lucide-react';
type LoginSignupProps={
  onBack: () => void;
  onSuccess: () => void;
};
export function LoginSignup({ onBack, onSuccess }: LoginSignupProps) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        // LOGIN → backend
        const res = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Invalid email or password');
        } else {
          // Backend already verified credentials
          // Back from backend: { id, name, email }
          login(data.email, data.name);
          onSuccess();
        }
      } else {
        // SIGNUP → backend
        if (!formData.name || !formData.email || formData.password.length < 6) {
          setError('Please fill all fields (password min 6 characters)');
        } else {
          const res = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            setError(data.message || 'Signup failed');
          } else {
            // After backend signup, directly mark user as logged in
            login(formData.email, formData.name);
            onSuccess();
          }
        }
      }
    } catch {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResetMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to send reset link');
      } else {
        setResetMessage('Password reset link sent to your email!');
      }
    } catch {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetMessage('');
      }, 2000);
    }
  };

  // -------- Forgot Password screen --------
  if (showForgotPassword) {
    return (
      <div className="min-h-screen px-4 py-8 relative overflow-hidden bg-black">
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
        <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>

        <div className="max-w-md mx-auto">
          <div className="flex justify-start mb-4">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl">
                <UserCircle className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-center mb-2 text-white">Reset Password</h1>
            <p className="text-center text-gray-400 mb-8">
              Enter your email to receive a password reset link
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-white mb-2"
                >
                  Email Address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-green-500/20 text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {resetMessage && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl px-4 py-3 text-green-400 text-sm">
                  {resetMessage}
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // -------- Main Login / Signup screen --------
  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden bg-black">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>

      <div className="max-w-md mx-auto">
        <div className="flex justify-start mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-2xl bg-white/5 border border-green-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl">
                <UserCircle className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-center mb-2 text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-center text-gray-400 mb-8">
              {isLogin
                ? 'Login to view scheme details'
                : 'Sign up to access government schemes'}
            </p>

            <div className="flex gap-3 mb-8">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                className={`flex-1 px-6 py-3 rounded-2xl border ${
                  isLogin
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-white/5 text-gray-400'
                }`}
              >
                <LogIn className="w-4 h-4 inline mr-2" />
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                className={`flex-1 px-6 py-3 rounded-2xl border ${
                  !isLogin
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-white/5 text-gray-400'
                }`}
              >
                <UserPlus className="w-4 h-4 inline mr-2" />
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-green-500/20 text-white"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-white mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-green-500/20 text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-white mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-green-500/20 text-white"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-4 py-3 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {isLogin && (
                  <div className="text-right mt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-green-400"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl disabled:opacity-50"
              >
                {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
