import React from 'react';
import { Shield, UserPlus, Users, ArrowLeft, LogOut, FileText, Key } from 'lucide-react';

export function AdminPage() {
  const handleUsersClick = () => {
    // Navigate to users list (Now Users & Access)
    window.location.hash = 'usersList';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const handleSchemesClick = () => {
    // Navigate to schemes list
    window.location.hash = 'schemesList';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const handleAddSchemeClick = () => {
    // Navigate to add scheme
    window.location.hash = 'addScheme';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const handleBackToHome = () => {
    window.location.pathname = '/';
  };

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem('easyfind_admin_auth');
    // Redirect to home
    window.location.pathname = '/';
  };

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden bg-black">
      {/* Animated liquid glass background - dark theme */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-500/30 to-green-600/30 rounded-full blur-3xl animate-pulse -z-10" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 shadow-[0_4px_16px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.25)] hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Admin Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(16,185,129,0.5)] backdrop-blur-sm border border-green-400/30 hover:scale-110 transition-transform duration-300">
              <Shield className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-4xl text-white mb-4 drop-shadow-sm">Admin Dashboard</h1>
          <p className="text-gray-400 text-lg">Manage schemes and user data</p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* ✅ CHANGED: Users & Access Card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_16px_64px_0_rgba(16,185,129,0.3)] relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 p-6 rounded-2xl border border-blue-500/30 relative">
                  <Users className="w-10 h-10 text-blue-400" />
                  <Key className="w-5 h-5 text-cyan-400 absolute -bottom-1 -right-1" />
                </div>
              </div>
              
              <h2 className="text-2xl text-white text-center mb-4">Users & Access</h2>
              <p className="text-gray-400 text-center mb-6">
                Manage user accounts, permissions, and security settings
              </p>
              
              <button
                onClick={handleUsersClick}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(59,130,246,0.4)] hover:shadow-[0_6px_28px_0_rgba(59,130,246,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-blue-400/30"
              >
                Access Control
              </button>
            </div>
          </div>

          {/* Schemes List Card (No changes) */}
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_16px_64px_0_rgba(16,185,129,0.3)] relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-6 rounded-2xl border border-green-500/30">
                  <FileText className="w-10 h-10 text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl text-white text-center mb-4">Schemes List</h2>
              <p className="text-gray-400 text-center mb-6">
                View and manage all government schemes in the database
              </p>
              <button
                onClick={handleSchemesClick}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-green-400/30"
              >
                View Schemes
              </button>
            </div>
          </div>
          
          {/* Add Scheme Card (No changes) */}
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_16px_64_0_rgba(16,185,129,0.3)] relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 p-6 rounded-2xl border border-yellow-500/30">
                  <UserPlus className="w-10 h-10 text-yellow-400" />
                </div>
              </div>
              <h2 className="text-2xl text-white text-center mb-4">Add Scheme</h2>
              <p className="text-gray-400 text-center mb-6">
                Create and add new government schemes to the database
              </p>
              <button
                onClick={handleAddSchemeClick}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 rounded-2xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(234,179,8,0.4)] hover:shadow-[0_6px_28px_0_rgba(234,179,8,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-yellow-400/30"
              >
                Add New Scheme
              </button>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-12 bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]">
          <div className="text-center text-gray-400">
            <p className="mb-2">
              <span className="text-yellow-400">⚠️ Admin Access Only</span>
            </p>
            <p className="text-sm">
              This page is restricted to administrators. All actions are logged and monitored.
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 shadow-[0_4px_16px_0_rgba(239,68,68,0.15)] hover:shadow-[0_4px_20px_0_rgba(239,68,68,0.25)] hover:scale-105"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout from Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
}