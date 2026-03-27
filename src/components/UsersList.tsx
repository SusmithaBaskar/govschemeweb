import React, { useEffect, useState } from 'react';
import { ArrowLeft, User, Mail, Search, ShieldCheck, RefreshCw } from 'lucide-react';

export function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching users from backend...");
      const response = await fetch('http://localhost:5000/api/admin/users');
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Full Backend Response:", result);

      // Backend format { success: true, data: [...] } nu irundha
      if (result.success && Array.isArray(result.data)) {
        setUsers(result.data);
      } 
      // Oru velai direct array-va vantha
      else if (Array.isArray(result)) {
        setUsers(result);
      } 
      else {
        setError("Invalid data format received from server");
      }
    } catch (err: any) {
      console.error("User Fetch Error:", err);
      setError(err.message || "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBack = () => {
    window.location.hash = 'admin';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button 
              onClick={handleBack} 
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <ShieldCheck className="text-blue-500" /> Database Users
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchUsers}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 w-full md:w-64 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-center">
            {error}. Check if your Node.js server is running on port 5000.
          </div>
        )}

        {/* User Table/List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500 text-lg">No users found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredUsers.map((user) => (
              <div 
                key={user.id} 
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-500/20">
                    <User className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-white capitalize">{user.name}</h3>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-blue-500/60" /> {user.email}</span>
                      <span className="text-gray-500 italic">ID: #{user.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}