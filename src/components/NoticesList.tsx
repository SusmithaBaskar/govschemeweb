import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, AlertCircle, Megaphone } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'announcement';
  isActive: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export function NoticesList() {
  const { theme } = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Load notices from localStorage
  useEffect(() => {
    const savedNotices = localStorage.getItem('easyfind_notices');
    if (savedNotices) {
      try {
        const parsed = JSON.parse(savedNotices);
        setNotices(parsed);
      } catch (e) {
        console.error('Failed to load notices:', e);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedNotices = notices.filter(notice => notice.id !== id);
    setNotices(updatedNotices);
    localStorage.setItem('easyfind_notices', JSON.stringify(updatedNotices));
    setShowDeleteConfirm(null);
  };

  const handleToggleActive = (id: string) => {
    const updatedNotices = notices.map(notice =>
      notice.id === id ? { ...notice, isActive: !notice.isActive } : notice
    );
    setNotices(updatedNotices);
    localStorage.setItem('easyfind_notices', JSON.stringify(updatedNotices));
  };

  const handleEdit = (id: string) => {
    // Store notice ID to edit and navigate
    localStorage.setItem('easyfind_editing_notice_id', id);
    window.location.hash = 'editNotice';
  };

  const handleAddNotice = () => {
    window.location.hash = 'addNotice';
  };

  const handleBack = () => {
    window.location.hash = 'admin';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info':
        return theme === 'dark' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200';
      case 'warning':
        return theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'success':
        return theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200';
      case 'announcement':
        return theme === 'dark' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return theme === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return theme === 'dark' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return theme === 'dark' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return theme === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return theme === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-200';
    }
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
          <div className="flex items-center justify-between">
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
                  Notices & Banners
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage homepage notices and announcements
                </p>
              </div>
            </div>
            <button
              onClick={handleAddNotice}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-green-400/30 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Notice
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {notices.length === 0 ? (
          <div className={`text-center py-16 rounded-3xl backdrop-blur-xl border ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-green-500/30'
          }`}>
            <Megaphone className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-xl font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No Notices Created
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              Click "Create Notice" to add your first notice
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`rounded-3xl backdrop-blur-xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-green-500/20 hover:bg-white/10'
                    : 'bg-white border-green-500/30 hover:shadow-lg'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className={`text-lg font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {notice.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-lg text-xs border ${getTypeColor(notice.type)}`}>
                          {notice.type}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs border ${getPriorityColor(notice.priority)}`}>
                          {notice.priority} priority
                        </span>
                        {notice.isActive ? (
                          <span className={`px-3 py-1 rounded-lg text-xs border ${
                            theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200'
                          }`}>
                            Active
                          </span>
                        ) : (
                          <span className={`px-3 py-1 rounded-lg text-xs border ${
                            theme === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className={`mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {notice.message}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Created: {new Date(notice.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(notice.id)}
                        className={`p-2 rounded-xl transition-all hover:scale-110 ${
                          notice.isActive
                            ? theme === 'dark' ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-green-100 text-green-700 hover:bg-green-200'
                            : theme === 'dark' ? 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        title={notice.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {notice.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(notice.id)}
                        className={`p-2 rounded-xl transition-all hover:scale-110 ${
                          theme === 'dark' ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(notice.id)}
                        className={`p-2 rounded-xl transition-all hover:scale-110 ${
                          theme === 'dark' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-3xl backdrop-blur-xl border max-w-md w-full p-6 ${
            theme === 'dark'
              ? 'bg-gray-900/95 border-green-500/20'
              : 'bg-white border-green-500/30'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${
                theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'
              }`}>
                <AlertCircle className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-700'
                }`} />
              </div>
              <h3 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Delete Notice
              </h3>
            </div>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Are you sure you want to delete this notice? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className={`flex-1 px-4 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                    : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(239,68,68,0.4)] font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
