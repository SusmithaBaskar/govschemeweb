import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { UsersAccess } from './UsersAccess';
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Search,
  Bell,
  User,
  Plus,
  Filter,
  Edit,
  Eye,
  Trash2,
  Download,
  Upload,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Calendar,
  Globe,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  X,
  Check,
} from 'lucide-react';

type Module = 'dashboard' | 'schemes' | 'users' | 'content' | 'reports' | 'settings';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { theme, language } = useAuth();
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [showSchemeForm, setShowSchemeForm] = useState(false);
  const [activeContentTab, setActiveContentTab] = useState<'home' | 'faqs' | 'notices' | 'feedback'>('home');
  const [activeUsersTab, setActiveUsersTab] = useState<'users' | 'roles'>('users');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showProfileMenu && !target.closest('.profile-dropdown-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Top Bar */}
      <div className={`border-b backdrop-blur-xl sticky top-0 z-50 ${theme === 'dark'
        ? 'bg-black/80 border-green-500/20'
        : 'bg-white/80 border-green-500/30'
        }`}>
        <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className={`p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
                }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'dark'
              ? 'bg-gradient-to-br from-green-500 to-emerald-600'
              : 'bg-gradient-to-br from-green-600 to-emerald-700'
              }`}>
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Scheme Admin Portal
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Administration Dashboard
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className={`relative rounded-2xl border backdrop-blur-xl ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-green-500/30'
              }`}>
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              <input
                type="text"
                placeholder="Search..."
                className={`w-full pl-11 pr-4 py-2.5 rounded-2xl bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                  }`}
              />
            </div>
          </div>

          {/* Admin Profile & Notifications */}
          <div className="flex items-center gap-3">
            <button className={`relative p-2.5 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
              : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
              }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Admin Profile with Dropdown */}
            <div className="relative profile-dropdown-container">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${theme === 'dark'
                  ? 'bg-white/5 border-green-500/20 hover:bg-white/10'
                  : 'bg-white border-green-500/30 hover:bg-gray-50'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark'
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                  : 'bg-gradient-to-br from-green-600 to-emerald-700'
                  }`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Admin
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`} />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className={`absolute top-full right-0 mt-2 w-48 rounded-xl backdrop-blur-xl border shadow-lg overflow-hidden z-50 ${theme === 'dark'
                  ? 'bg-gray-900/95 border-green-500/20'
                  : 'bg-white/95 border-green-500/30'
                  } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
                  <div className={`px-4 py-3 border-b ${theme === 'dark' ? 'border-green-500/20' : 'border-green-500/30'
                    }`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Administrator
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      admin@easyfind.gov
                    </p>
                  </div>
                  <button
                    onClick={onBack}
                    className={`w-full px-4 py-3 flex items-center gap-3 transition-all ${theme === 'dark'
                      ? 'text-red-400 hover:bg-red-500/10'
                      : 'text-red-600 hover:bg-red-50'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex max-w-[1920px] mx-auto">
        {/* Left Sidebar */}
        <div className={`w-64 min-h-[calc(100vh-81px)] border-r backdrop-blur-xl ${theme === 'dark'
          ? 'bg-black/40 border-green-500/20'
          : 'bg-white/60 border-green-500/30'
          }`}>
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'schemes', icon: FileText, label: 'Schemes' },
              { id: 'users', icon: Users, label: 'Users & Access' },
              { id: 'content', icon: MessageSquare, label: 'Content & Notices' },
              { id: 'reports', icon: BarChart3, label: 'Reports & Analytics' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id as Module)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {activeModule === 'dashboard' && <DashboardModule theme={theme} language={language} />}
          {activeModule === 'schemes' && <SchemesModule theme={theme} language={language} showForm={showSchemeForm} setShowForm={setShowSchemeForm} />}
          {activeModule === 'users' && <UsersAccess theme={theme} />}
          {activeModule === 'content' && <ContentModule theme={theme} language={language} activeTab={activeContentTab} setActiveTab={setActiveContentTab} />}
          {activeModule === 'reports' && <ReportsModule theme={theme} language={language} />}
          {activeModule === 'settings' && <SettingsModule theme={theme} language={language} />}
        </div>
      </div>
    </div>
  );
}

// 1) Dashboard Module
function DashboardModule({ theme, language }: { theme: string; language: string }) {
  const kpiCards = [
    { label: 'Total Schemes', value: '240', icon: FileText, trend: '+12', up: true },
    { label: 'Active Schemes', value: '185', icon: CheckCircle, trend: '+8', up: true },
    { label: 'Registered Users', value: '15,847', icon: Users, trend: '+324', up: true },
    { label: "Today's Searches", value: '1,256', icon: Search, trend: '-43', up: false },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`rounded-3xl border backdrop-blur-xl p-6 transition-all duration-300 hover:scale-105 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20'
                : 'bg-white border-green-500/30'
                } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'dark'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-green-100 text-green-600'
                  }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{kpi.trend}</span>
                </div>
              </div>
              <h3 className={`text-3xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {kpi.value}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {kpi.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Daily Scheme Views Chart */}
        <div className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
          ? 'bg-white/5 border-green-500/20'
          : 'bg-white border-green-500/30'
          } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
          <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Daily Scheme Views
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[45, 65, 52, 78, 85, 72, 90].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className={`w-full rounded-t-xl transition-all duration-300 hover:opacity-80 ${theme === 'dark'
                  ? 'bg-gradient-to-t from-green-500 to-emerald-600'
                  : 'bg-gradient-to-t from-green-600 to-emerald-700'
                  }`} style={{ height: `${height}%` }}></div>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Users by Category Pie Chart */}
        <div className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
          ? 'bg-white/5 border-green-500/20'
          : 'bg-white border-green-500/30'
          } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
          <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Users by Category
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Students', value: '35%', color: 'bg-blue-500' },
              { label: 'Farmers', value: '25%', color: 'bg-green-500' },
              { label: 'Women', value: '20%', color: 'bg-purple-500' },
              { label: 'Senior Citizens', value: '12%', color: 'bg-orange-500' },
              { label: 'Others', value: '8%', color: 'bg-gray-500' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <div className="flex-1 flex items-center gap-2">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                  <div className={`flex-1 h-2 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: item.value }}></div>
                  </div>
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Updated Schemes Table */}
      <div className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
        ? 'bg-white/5 border-green-500/20'
        : 'bg-white border-green-500/30'
        } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
        <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Recently Updated Schemes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-green-500/20' : 'border-green-500/30'}`}>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Scheme Name
                </th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Department
                </th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  State
                </th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Last Updated
                </th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'PM Scholarship Scheme', dept: 'Education', state: 'Central', date: '2h ago', status: 'Active' },
                { name: 'Tamil Nadu Maternity Benefit', dept: 'Health', state: 'Tamil Nadu', date: '5h ago', status: 'Active' },
                { name: 'Farmer Support Scheme', dept: 'Agriculture', state: 'Central', date: '1d ago', status: 'Active' },
                { name: 'Housing Loan Scheme', dept: 'Housing', state: 'Tamil Nadu', date: '2d ago', status: 'Inactive' },
                { name: 'Senior Citizen Pension', dept: 'Social Welfare', state: 'Central', date: '3d ago', status: 'Active' },
              ].map((scheme, idx) => (
                <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-green-500/10' : 'border-green-500/20'}`}>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{scheme.name}</td>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{scheme.dept}</td>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{scheme.state}</td>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{scheme.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${scheme.status === 'Active'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                      {scheme.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 2) Schemes Module
function SchemesModule({ theme, language, showForm, setShowForm }: any) {
  const [stateFilter, setStateFilter] = useState('All States');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [schemes, setSchemes] = useState<any[]>([]);
  const [editingScheme, setEditingScheme] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    dept: '',
    cat: '',
    state: '',
    target: '',
    status: 'Active'
  });
  // Load schemes from localStorage on mount
  useEffect(() => {
    import('../services/api').then(({ schemesAPI }) => {
      schemesAPI.getAll().then(res => {
        if (res.success && res.data && res.data.length > 0) {
          setSchemes(res.data);
          // Optional: still cache to localStorage if desired, but we rely on API now.
          localStorage.setItem('easyfind_admin_schemes', JSON.stringify(res.data));
        } else {
          // Fallback to default if API and localstorage empty
          const fallback = [
            { id: 1, name: 'PM Scholarship Scheme', dept: 'Education', cat: 'Education', state: 'Central', target: 'Students', status: 'Active' },
            { id: 2, name: 'Tamil Nadu Maternity Benefit', dept: 'Health', cat: 'Health', state: 'Tamil Nadu', target: 'Women', status: 'Active' },
            { id: 3, name: 'Farmer Support Scheme', dept: 'Agriculture', cat: 'Agriculture', state: 'Central', target: 'Farmers', status: 'Active' },
            { id: 4, name: 'Housing Loan Scheme', dept: 'Housing', cat: 'Housing', state: 'Tamil Nadu', target: 'All', status: 'Inactive' },
          ];
          setSchemes(fallback);
        }
      }).catch(err => {
        console.error("Failed fetching schemes in AdminDashboard:", err);
      });
    });
  }, []);

  const handleEditClick = (scheme: any) => {
    // Save scheme data to localStorage for EditScheme component
    localStorage.setItem('easyfind_editing_scheme', JSON.stringify(scheme));
    // Navigate to edit page
    window.location.hash = 'editScheme';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update scheme in the list
    const updatedSchemes = schemes.map(s =>
      s.id === editingScheme.id
        ? { ...s, ...editForm }
        : s
    );

    // Save to localStorage
    localStorage.setItem('easyfind_admin_schemes', JSON.stringify(updatedSchemes));
    setSchemes(updatedSchemes);

    // Close modal
    setShowEditModal(false);
    setEditingScheme(null);
  };

  if (showForm) {
    return <SchemeForm theme={theme} language={language} onBack={() => setShowForm(false)} />;
  }

  // Filter schemes based on selected filters
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesState = stateFilter === 'All States' || scheme.state === stateFilter;
    const matchesCategory = categoryFilter === 'All Categories' || scheme.cat === categoryFilter;
    const matchesStatus = statusFilter === 'All Status' || scheme.status === statusFilter;
    return matchesState && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Actions */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Manage Schemes
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className={`px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
              : 'bg-white border-green-500/30 text-gray-900 [&>option]:bg-white'
              }`}>
            <option>All States</option>
            <option>Central</option>
            <option>Tamil Nadu</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
              : 'bg-white border-green-500/30 text-gray-900 [&>option]:bg-white'
              }`}>
            <option>All Categories</option>
            <option>Education</option>
            <option>Health</option>
            <option>Agriculture</option>
            <option>Housing</option>
            <option>Social Welfare</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
              : 'bg-white border-green-500/30 text-gray-900 [&>option]:bg-white'
              }`}>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button
            onClick={() => {
              window.location.hash = 'addScheme';
              window.dispatchEvent(new HashChangeEvent('hashchange'));
            }}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]"
          >
            <Plus className="w-4 h-4" />
            Add New Scheme
          </button>
        </div>
      </div>

      {/* Schemes Table */}
      <div className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
        ? 'bg-white/5 border-green-500/20'
        : 'bg-white border-green-500/30'
        } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-green-500/20' : 'border-green-500/30'}`}>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Scheme Name
                </th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Category
                </th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  State
                </th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Status
                </th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSchemes.length > 0 ? (
                filteredSchemes.map((scheme, idx) => (
                  <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-green-500/10' : 'border-green-500/20'} hover:${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{scheme.name}</td>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{scheme.cat}</td>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{scheme.state}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${scheme.status === 'Active'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                        {scheme.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-1.5 rounded-lg transition-all duration-300 hover:scale-110 ${theme === 'dark'
                            ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                            }`}
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditClick(scheme)}
                          className={`p-1.5 rounded-lg transition-all duration-300 hover:scale-110 ${theme === 'dark'
                            ? 'hover:bg-white/10 text-yellow-400 hover:text-yellow-300'
                            : 'hover:bg-gray-100 text-yellow-600 hover:text-yellow-700'
                            }`}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className={`py-8 px-4 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    No schemes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingScheme && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`rounded-3xl border backdrop-blur-xl p-8 max-w-2xl w-full my-8 shadow-[0_16px_64px_0_rgba(234,179,8,0.4)] relative max-h-[90vh] overflow-y-auto ${theme === 'dark'
            ? 'bg-gray-900 border-yellow-500/30'
            : 'bg-white border-yellow-500/40'
            }`}>
            <button
              onClick={() => setShowEditModal(false)}
              className={`absolute top-4 right-4 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className={`text-2xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Edit Scheme
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Scheme Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${theme === 'dark'
                    ? 'bg-white/5 border-yellow-500/20 text-white'
                    : 'bg-white border-yellow-500/30 text-gray-900'
                    }`}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Department
                  </label>
                  <input
                    type="text"
                    value={editForm.dept}
                    onChange={(e) => setEditForm({ ...editForm, dept: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${theme === 'dark'
                      ? 'bg-white/5 border-yellow-500/20 text-white'
                      : 'bg-white border-yellow-500/30 text-gray-900'
                      }`}
                    required
                  />
                </div>

                <div>
                  <label className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Category
                  </label>
                  <select
                    value={editForm.cat}
                    onChange={(e) => setEditForm({ ...editForm, cat: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${theme === 'dark'
                      ? 'bg-white/5 border-yellow-500/20 text-white [&>option]:bg-gray-900'
                      : 'bg-white border-yellow-500/30 text-gray-900 [&>option]:bg-white'
                      }`}
                    required
                  >
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Housing">Housing</option>
                    <option value="Social Welfare">Social Welfare</option>
                    <option value="Financial">Financial</option>
                    <option value="Employment">Employment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    State
                  </label>
                  <select
                    value={editForm.state}
                    onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${theme === 'dark'
                      ? 'bg-white/5 border-yellow-500/20 text-white [&>option]:bg-gray-900'
                      : 'bg-white border-yellow-500/30 text-gray-900 [&>option]:bg-white'
                      }`}
                    required
                  >
                    <option value="Central">Central</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                <div>
                  <label className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Target Group
                  </label>
                  <input
                    type="text"
                    value={editForm.target}
                    onChange={(e) => setEditForm({ ...editForm, target: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${theme === 'dark'
                      ? 'bg-white/5 border-yellow-500/20 text-white'
                      : 'bg-white border-yellow-500/30 text-gray-900'
                      }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${theme === 'dark'
                    ? 'bg-white/5 border-yellow-500/20 text-white [&>option]:bg-gray-900'
                    : 'bg-white border-yellow-500/30 text-gray-900 [&>option]:bg-white'
                    }`}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 px-4 py-3 rounded-2xl border transition-all ${theme === 'dark'
                    ? 'bg-white/5 border-gray-500/30 text-gray-400 hover:text-white hover:border-gray-400/50'
                    : 'bg-white border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400'
                    }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-2xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(234,179,8,0.4)]"
                >
                  <Check className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Scheme Form Component
function SchemeForm({ theme, language, onBack }: any) {
  const [selectedCastes, setSelectedCastes] = useState<string[]>([]);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [notesLength, setNotesLength] = useState(0);

  const handleCasteToggle = (caste: string) => {
    if (selectedCastes.includes(caste)) {
      setSelectedCastes(selectedCastes.filter(c => c !== caste));
    } else {
      setSelectedCastes([...selectedCastes, caste]);
    }
  };

  const casteOptions = [
    'General',
    'SC (Scheduled Caste)',
    'ST (Scheduled Tribe)',
    'OBC (Other Backward Class)',
    'BC (Backward Class)',
    'MBC (Most Backward Class)',
    'DNC (Denotified Community)',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className={`p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${theme === 'dark'
            ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
            : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
            }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Add New Scheme
        </h2>
      </div>

      <div className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
        ? 'bg-white/5 border-green-500/20'
        : 'bg-white border-green-500/30'
        } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="md:col-span-2">
            <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Basic Information
            </h3>
          </div>

          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Scheme Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                }`}
              placeholder="Enter scheme name"
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Department
            </label>
            <select className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
              : 'bg-gray-50 border-green-500/30 text-gray-900 [&>option]:bg-white'
              }`}>
              <option>Select Department</option>
              <option>Education</option>
              <option>Health</option>
              <option>Agriculture</option>
              <option>Social Welfare</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'வகை' : 'Category'}
            </label>
            <select className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
              : 'bg-gray-50 border-green-500/30 text-gray-900 [&>option]:bg-white'
              }`}>
              <option>Select Category</option>
              <option>Education</option>
              <option>Health</option>
              <option>Agriculture</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'மாநிலம்' : 'State'}
            </label>
            <select className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
              : 'bg-gray-50 border-green-500/30 text-gray-900 [&>option]:bg-white'
              }`}>
              <option>Central</option>
              <option>Tamil Nadu</option>
              <option>Karnataka</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'சுருக்க விளக்கம்' : 'Short Description'}
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                }`}
              placeholder="Brief description (100 chars)"
            />
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'விரிவான விளக்கம் (அதிகபட்சம் 300 எழுத்துகள்)' : 'Detailed Description (Max 300 characters)'}
            </label>
            <textarea
              rows={4}
              maxLength={300}
              onChange={(e) => setDescriptionLength(e.target.value.length)}
              className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                }`}
              placeholder="Detailed description of the scheme"
            />
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {descriptionLength}/300 characters
            </p>
          </div>

          {/* Eligibility Rules */}
          <div className="md:col-span-2 pt-4">
            <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {language === 'Tamil' ? 'தகுதி வித���கள்' : 'Eligibility Rules'}
            </h3>
          </div>

          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'குறைந்தபட்ச வயது' : 'Minimum Age'}
            </label>
            <input
              type="number"
              className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                }`}
              placeholder="18"
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'அதிகபட்ச வயது' : 'Maximum Age'}
            </label>
            <input
              type="number"
              className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                }`}
              placeholder="100"
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'பாலினம்' : 'Gender'}
            </label>
            <select className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
              : 'bg-gray-50 border-green-500/30 text-gray-900 [&>option]:bg-white'
              }`}>
              <option>All</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'சம���கம் (பல தேர்வு)' : 'Caste / Community (Select Multiple)'}
            </label>
            <div className={`p-4 rounded-xl border backdrop-blur-xl ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-gray-50 border-green-500/30'
              }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {casteOptions.map((caste) => (
                  <label
                    key={caste}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${selectedCastes.includes(caste)
                      ? theme === 'dark'
                        ? 'bg-green-500/20 border-green-500/50 shadow-[0_4px_16px_0_rgba(16,185,129,0.3)]'
                        : 'bg-green-50 border-green-500/50 shadow-[0_4px_16px_0_rgba(16,185,129,0.2)]'
                      : theme === 'dark'
                        ? 'bg-white/5 border-green-500/10 hover:border-green-500/30'
                        : 'bg-white border-green-500/20 hover:border-green-500/40'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCastes.includes(caste)}
                      onChange={() => handleCasteToggle(caste)}
                      className="w-4 h-4 rounded border-green-500/30 text-green-500 focus:ring-2 focus:ring-green-500/50 cursor-pointer"
                    />
                    <span className={`text-sm ${selectedCastes.includes(caste)
                      ? theme === 'dark' ? 'text-green-400' : 'text-green-700'
                      : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      {caste}
                    </span>
                  </label>
                ))}
              </div>
              {selectedCastes.length > 0 && (
                <div className={`mt-3 pt-3 border-t ${theme === 'dark' ? 'border-green-500/20' : 'border-green-500/30'}`}>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'Tamil' ? 'தேர்ந்தெடுக்கப்பட்டது' : 'Selected'}: {selectedCastes.length} {language === 'Tamil' ? 'சமூகங்கள்' : 'communities'}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCastes.map((caste) => (
                      <span
                        key={caste}
                        className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 ${theme === 'dark'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-green-100 text-green-700 border border-green-500/30'
                          }`}
                      >
                        {caste}
                        <button
                          type="button"
                          onClick={() => handleCasteToggle(caste)}
                          className="hover:scale-125 transition-transform"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'தொழில்' : 'Occupation'}
            </label>
            <select className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
              : 'bg-gray-50 border-green-500/30 text-gray-900 [&>option]:bg-white'
              }`}>
              <option>All</option>
              <option>Student</option>
              <option>Farmer</option>
              <option>Laborer</option>
              <option>Self-Employed</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'தகுதி குறிப்புகள் (அதிகபட்சம் 1000 எழுத்துகள்)' : 'Eligibility Notes (Max 1000 characters)'}
            </label>
            <textarea
              rows={6}
              maxLength={1000}
              onChange={(e) => setNotesLength(e.target.value.length)}
              className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                }`}
              placeholder="Additional eligibility criteria and notes..."
            />
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {notesLength}/1000 characters
            </p>
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'Tamil' ? 'அதிகாரப்பூர்வ URL' : 'Official URL'}
            </label>
            <input
              type="url"
              className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                }`}
              placeholder="https://example.com/scheme"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              onClick={onBack}
              className={`px-6 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
                }`}
            >
              {language === 'Tamil' ? 'ரத்துசெய்' : 'Cancel'}
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]"
            >
              {language === 'Tamil' ? 'சேமி' : 'Save Scheme'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3) Users & Access Module - Moved to /components/UsersAccess.tsx

// 4) Content & Notices Module
function ContentModule({ theme, language, activeTab, setActiveTab }: any) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Content & Notices
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 flex-wrap">
        {[
          { id: 'home', label: 'Home Page Content' },
          { id: 'faqs', label: 'FAQs' },
          { id: 'notices', label: 'Notices & Banners' },
          { id: 'feedback', label: 'Feedback' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${activeTab === tab.id
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400/30 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
              : theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`rounded-3xl border backdrop-blur-xl p-8 ${theme === 'dark'
        ? 'bg-white/5 border-green-500/20'
        : 'bg-white border-green-500/30'
        }`}>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          {activeTab === 'home' && 'Manage home page banners, hero content, and featured schemes'}
          {activeTab === 'faqs' && 'Manage frequently asked questions and answers'}
          {activeTab === 'notices' && 'Manage system-wide notices and announcements'}
          {activeTab === 'feedback' && 'View and manage user feedback submissions'}
        </p>
      </div>
    </div>
  );
}

// 6) Settings Module  
function SettingsModule({ theme, language }: any) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Settings
      </h2>

      {/* General Settings */}
      <div className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
        ? 'bg-white/5 border-green-500/20'
        : 'bg-white border-green-500/30'
        } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
        <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          General Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Portal Name</label>
            <input
              type="text"
              defaultValue="Scheme Admin Portal"
              className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white'
                : 'bg-gray-50 border-green-500/30 text-gray-900'
                }`}
            />
          </div>
          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Support Email</label>
            <input
              type="email"
              defaultValue="admin@easyfind.gov.in"
              className={`w-full px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white'
                : 'bg-gray-50 border-green-500/30 text-gray-900'
                }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 5) Reports & Analytics Module
function ReportsModule({ theme, language }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Reports & Analytics
        </h2>
        <div className="flex items-center gap-3">
          <input
            type="date"
            className={`px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white'
              : 'bg-white border-green-500/30 text-gray-900'
              }`}
          />
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>to</span>
          <input
            type="date"
            className={`px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none ${theme === 'dark'
              ? 'bg-white/5 border-green-500/20 text-white'
              : 'bg-white border-green-500/30 text-gray-900'
              }`}
          />
          <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Total Searches', value: '45,892', icon: Search },
          { label: 'Unique Users', value: '12,456', icon: Users },
          { label: 'Top Viewed Scheme', value: 'PM Scholarship', icon: FileText },
          { label: 'Most Used Category', value: 'Education', icon: BarChart3 },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
                ? 'bg-white/5 border-green-500/20'
                : 'bg-white border-green-500/30'
                } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${theme === 'dark'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-green-100 text-green-600'
                }`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className={`text-3xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {kpi.value}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {kpi.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
          ? 'bg-white/5 border-green-500/20'
          : 'bg-white border-green-500/30'
          } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
          <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Searches Over Time
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 78, 82, 75, 88, 92, 85, 90, 95, 88, 92, 98].map((height, idx) => (
              <div key={idx} className="flex-1">
                <div className={`w-full rounded-t-xl ${theme === 'dark'
                  ? 'bg-gradient-to-t from-green-500 to-emerald-600'
                  : 'bg-gradient-to-t from-green-600 to-emerald-700'
                  }`} style={{ height: `${height}%` }}></div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
          ? 'bg-white/5 border-green-500/20'
          : 'bg-white border-green-500/30'
          } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
          <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Top 5 Schemes by Views
          </h3>
          <div className="space-y-3">
            {[
              { name: 'PM Scholarship', views: 8542 },
              { name: 'Farmer Support', views: 7234 },
              { name: 'Maternity Benefit', views: 6891 },
              { name: 'Housing Loan', views: 5432 },
              { name: 'Free Laptop', views: 4876 },
            ].map((scheme, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{scheme.name}</span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{scheme.views.toLocaleString()}</span>
                </div>
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600" style={{ width: `${(scheme.views / 8542) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scheme Performance Table */}
      <div className={`rounded-3xl border backdrop-blur-xl p-6 ${theme === 'dark'
        ? 'bg-white/5 border-green-500/20'
        : 'bg-white border-green-500/30'
        } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}>
        <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Scheme Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-green-500/20' : 'border-green-500/30'}`}>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Scheme</th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Views</th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Matches</th>
                <th className={`text-left py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Apply Clicks</th>
              </tr>
            </thead>
            <tbody>
              {[
                { scheme: 'PM Scholarship Scheme', views: 8542, matches: 3421, clicks: 2134 },
                { scheme: 'Farmer Support Scheme', views: 7234, matches: 2876, clicks: 1987 },
                { scheme: 'Maternity Benefit', views: 6891, matches: 2543, clicks: 1765 },
                { scheme: 'Housing Loan Scheme', views: 5432, matches: 1987, clicks: 1234 },
              ].map((row, idx) => (
                <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-green-500/10' : 'border-green-500/20'}`}>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{row.scheme}</td>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.views.toLocaleString()}</td>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.matches.toLocaleString()}</td>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.clicks.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
