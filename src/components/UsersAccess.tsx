import React, { useState, useEffect } from 'react';
import { 
  User, Search, Edit, Trash2, RefreshCw, 
  Mail, ShieldCheck, AlertCircle, Download 
} from 'lucide-react';

interface UsersAccessProps {
  theme: string;
}

export function UsersAccess({ theme }: UsersAccessProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // ✅ Backend Fetch Logic (Athe logic, no change)
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/admin/users');
      
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setUsers(result.data);
      } else if (Array.isArray(result)) {
        setUsers(result);
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError("Database connection error. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Export Function (Intha logic thaan unga data-vai CSV-ah mathum)
  const handleExport = () => {
    if (users.length === 0) return alert("No data to export");

    // CSV Header and Mapping
    const headers = ["ID", "Name", "Email"];
    const csvContent = [
      headers.join(','),
      ...users.map(user => `${user.id},"${user.name}","${user.email}"`)
    ].join('\n');

    // Download Link creation
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `users_list_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h2 className={`text-2xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <ShieldCheck className="text-green-500" /> Managed Users
          </h2>
          <p className="text-xs text-gray-500 mt-1">Showing Name, Email and ID from MySQL</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* ✅ Export Button added here */}
          <button 
            onClick={handleExport}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              theme === 'dark' 
                ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100'
            }`}
          >
            <Download className="w-4 h-4" /> Export
          </button>

          <button 
            onClick={fetchUsers}
            className="p-2 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500/20 transition-all border border-green-500/10"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all ${
            theme === 'dark' 
              ? 'bg-slate-900 border-white/10 text-white focus:border-green-500' 
              : 'bg-white border-gray-200 text-gray-900 focus:border-green-600'
          }`}
        />
      </div>

      {/* Table */}
      <div className={`rounded-2xl border overflow-hidden ${
        theme === 'dark' ? 'bg-slate-900/40 border-white/10' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-100'}`}>
                <th className="py-4 px-6 text-[10px] uppercase font-bold text-gray-500 tracking-wider">ID</th>
                <th className="py-4 px-6 text-[10px] uppercase font-bold text-gray-500 tracking-wider">User Details</th>
                <th className="py-4 px-6 text-[10px] uppercase font-bold text-gray-500 tracking-wider">Email Address</th>
                <th className="py-4 px-6 text-center text-[10px] uppercase font-bold text-gray-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="inline-block w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-500">No users found.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-6 font-mono text-green-500 text-sm">#{user.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                          <User className="w-4 h-4 text-green-500" />
                        </div>
                        <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Mail className="w-3.5 h-3.5" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
                        <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}