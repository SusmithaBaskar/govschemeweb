import React, { useState } from 'react';
import { useAuth } from '../App';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'announcement';
  isActive: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export function AddNotice() {
  const { theme } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'warning' | 'success' | 'announcement',
    priority: 'medium' as 'low' | 'medium' | 'high',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (name: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate
    if (!formData.title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }
    if (!formData.message.trim()) {
      setError('Message is required');
      setLoading(false);
      return;
    }

    try {
      // Get existing notices
      const savedNotices = localStorage.getItem('easyfind_notices');
      const notices: Notice[] = savedNotices ? JSON.parse(savedNotices) : [];

      // Create new notice
      const newNotice: Notice = {
        id: Date.now().toString(),
        title: formData.title,
        message: formData.message,
        type: formData.type,
        priority: formData.priority,
        isActive: formData.isActive,
        createdAt: new Date().toISOString(),
      };

      // Add to array
      notices.push(newNotice);

      // Save to localStorage
      localStorage.setItem('easyfind_notices', JSON.stringify(notices));

      // Show success message
      alert('Notice created successfully!');

      // Navigate back
      window.location.hash = 'noticesList';
    } catch (err: any) {
      setError(err.message || 'Failed to create notice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.location.hash = 'noticesList';
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b backdrop-blur-xl sticky top-0 z-50 ${
        theme === 'dark'
          ? 'bg-black/80 border-green-500/20'
          : 'bg-white/80 border-green-500/30'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className={`p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                  : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Create Notice
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Add a new notice or announcement for homepage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className={`rounded-3xl backdrop-blur-xl border p-8 ${
          theme === 'dark'
            ? 'bg-white/5 border-green-500/20'
            : 'bg-white border-green-500/30'
        }`}>
          {error && (
            <div className={`mb-6 p-4 rounded-2xl backdrop-blur-xl border flex items-center gap-3 ${
              theme === 'dark'
                ? 'bg-red-500/20 border-red-500/30 text-red-400'
                : 'bg-red-100 border-red-200 text-red-700'
            }`}>
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Notice Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                    : 'bg-white border-green-500/30 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="Enter notice title"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Notice Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                    : 'bg-white border-green-500/30 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="Enter notice message"
                rows={4}
                required
              />
            </div>

            {/* Type and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="type" className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Notice Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white'
                      : 'bg-white border-green-500/30 text-gray-900'
                  }`}
                >
                  <option value="info" className="bg-gray-900 text-white">Info</option>
                  <option value="warning" className="bg-gray-900 text-white">Warning</option>
                  <option value="success" className="bg-gray-900 text-white">Success</option>
                  <option value="announcement" className="bg-gray-900 text-white">Announcement</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority" className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white'
                      : 'bg-white border-green-500/30 text-gray-900'
                  }`}
                >
                  <option value="low" className="bg-gray-900 text-white">Low</option>
                  <option value="medium" className="bg-gray-900 text-white">Medium</option>
                  <option value="high" className="bg-gray-900 text-white">High</option>
                </select>
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
                className="w-5 h-5 rounded border-green-500/30 text-green-500 focus:ring-green-500/50"
              />
              <label htmlFor="isActive" className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Activate notice immediately
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Creating...' : 'Create Notice'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
