import React, { useState } from 'react';
import { useAuth } from '../App';
import {
  Home,
  FileText,
  User,
  HelpCircle,
  ChevronDown,
  LogOut,
  Calendar,
  CheckCircle,
  Edit,
  RefreshCw,
  Search,
  Shield,
  Filter,
  MapPin,
  Briefcase,
  Heart,
  GraduationCap,
  Users,
  DollarSign,
  Baby,
  Accessibility,
  MapPinned,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

// Scheme type for appliedSchemes
interface Scheme {
  id: string;
  name: string;
  nameTA: string;
  description: string;
  descriptionTA: string;
  level: 'Central' | 'State' | string;
  category: string;
  benefitType: string;
}

// UserDetails type – match App.tsx / UserDetailsForm keys
interface UserDetails {
  age?: string;
  gender?: string;
  maritalStatus?: string;
  isPregnant?: string;
  state?: string;
  area?: string;
  incomeRange?: string;
  educationLevel?: string;
  community?: string;
  minorityCategory?: string;
  hasDisability?: string;
  disabilityType?: string;
  disabilityPercentage?: string;
  isStudent?: string;
  employmentStatus?: string;
  occupation?: string;
  belongsBPL?: string;
  inDistress?: string;
  ownsLand?: string;
  landAcres?: string;
}

interface UserDashboardProps {
  onViewScheme: (scheme: Scheme) => void;
  onEditProfile: () => void;
  onLogout: () => void;
  onViewAllSchemes: () => void;
  onViewProfile?: () => void;
  onBackToHome?: () => void;
}

export function UserDashboard({
  onViewScheme,
  onEditProfile,
  onLogout,
  onViewAllSchemes,
  onViewProfile,
  onBackToHome,
}: UserDashboardProps) {
  const { theme, language, currentUser, userDetails } = useAuth() as {
    theme: 'dark' | 'light';
    language: 'Tamil' | 'English' | string;
    currentUser: { name?: string; email?: string } | null;
    userDetails: UserDetails | null;
  };

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] =
    useState<'home' | 'mySchemes' | 'profile' | 'support'>('home');

  // Get applied schemes from localStorage
  const getAppliedSchemes = (): Scheme[] => {
    if (!currentUser) return [];
    const appliedSchemesKey = `easyfind_applied_schemes_${currentUser.email}`;
    const stored = localStorage.getItem(appliedSchemesKey);
    return stored ? JSON.parse(stored) : [];
  };

  const appliedSchemes = getAppliedSchemes();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Top Navigation Bar */}
      <nav
        className={`border-b backdrop-blur-xl sticky top-0 z-50 ${
          theme === 'dark'
            ? 'bg-black/80 border-green-500/20'
            : 'bg-white/80 border-green-500/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                  : 'bg-gradient-to-br from-green-600 to-emerald-700'
              }`}
            >
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1
                className={`text-xl ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'Tamil'
                  ? 'எளிதாகக் கண்டுபிடி'
                  : 'EasyFind Scheme'}
              </h1>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {language === 'Tamil'
                  ? 'எனது திட்டங்கள்'
                  : 'My Schemes Portal'}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { id: 'home', icon: Home, label: language === 'Tamil' ? 'முகப்பு' : 'Home' },
              {
                id: 'mySchemes',
                icon: FileText,
                label: language === 'Tamil' ? 'எனது திட்டங்கள்' : 'My Schemes',
              },
              {
                id: 'profile',
                icon: User,
                label: language === 'Tamil' ? 'சுயவிவரம்' : 'Profile',
              },
              {
                id: 'support',
                icon: HelpCircle,
                label: language === 'Tamil' ? 'ஆதரவு' : 'Support',
              },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20 hover:bg-white/10'
                  : 'bg-white border-green-500/30 hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                    : 'bg-gradient-to-br from-green-600 to-emerald-700'
                }`}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <span
                className={`text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {currentUser?.name || 'User'}
              </span>
              <ChevronDown
                className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              />
            </button>

            {showUserMenu && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-2xl border backdrop-blur-xl shadow-xl overflow-hidden z-50 ${
                  theme === 'dark'
                    ? 'bg-gray-900/95 border-green-500/20'
                    : 'bg-white/95 border-green-500/30'
                }`}
              >
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onViewProfile) onViewProfile();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                    theme === 'dark'
                      ? 'hover:bg-white/5 text-gray-300 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">
                    {language === 'Tamil'
                      ? 'சுயவிவரத்தைப் பார்க்க'
                      : 'View Profile'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onBackToHome) onBackToHome();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all border-t ${
                    theme === 'dark'
                      ? 'hover:bg-white/5 text-gray-300 hover:text-white border-green-500/20'
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-green-500/30'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">
                    {language === 'Tamil'
                      ? 'முகப்பிற்கு திரும்பு'
                      : 'Back to Home'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onEditProfile();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all border-t ${
                    theme === 'dark'
                      ? 'hover:bg-white/5 text-gray-300 hover:text-white border-green-500/20'
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-green-500/30'
                  }`}
                >
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">
                    {language === 'Tamil'
                      ? 'சுயவிவரத்தைத் திருத்து'
                      : 'Edit Profile'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all border-t ${
                    theme === 'dark'
                      ? 'hover:bg-white/5 text-red-400 hover:text-red-300 border-green-500/20'
                      : 'hover:bg-gray-100 text-red-600 hover:text-red-700 border-green-500/30'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">
                    {language === 'Tamil' ? 'வெளியேறு' : 'Logout'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2
            className={`text-3xl mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {language === 'Tamil'
              ? `வணக்கம், ${currentUser?.name || 'User'}!`
              : `Welcome back, ${currentUser?.name || 'User'}!`}
          </h2>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {activeTab === 'home' &&
              (language === 'Tamil'
                ? 'உங்கள் திட்டங்கள் கண்ணோட்டம்'
                : 'Your schemes overview')}
            {activeTab === 'mySchemes' &&
              (language === 'Tamil'
                ? 'உங்களுக்கான பரிந்துரைக்கப்பட்ட திட்டங்கள்'
                : 'Recommended schemes for you')}
            {activeTab === 'profile' &&
              (language === 'Tamil'
                ? 'உங்கள் சுயவிவர விவரங்கள்'
                : 'Your profile details')}
            {activeTab === 'support' &&
              (language === 'Tamil'
                ? 'உதவி மற்றும் ஆதரவு'
                : 'Help and support')}
          </p>
        </div>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile card */}
            <div
              className={`rounded-3xl border backdrop-blur-xl p-6 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20'
                  : 'bg-white border-green-500/30'
              } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
            >
              <h3
                className={`text-lg mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'Tamil'
                  ? 'எனது சுயவிவரம்'
                  : 'My Profile'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span
                    className={`text-sm ${
                      theme === 'dark'
                        ? 'text-gray-300'
                        : 'text-gray-700'
                    }`}
                  >
                    {language === 'Tamil'
                      ? 'சுயவிவரம் முழுமையானது'
                      : 'Profile complete'}
                  </span>
                </div>
                <button
                  onClick={onEditProfile}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]"
                >
                  <Edit className="w-4 h-4" />
                  {language === 'Tamil'
                    ? 'சுயவிவரத்தைத் திருத்து'
                    : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Applied schemes card */}
            <div
              className={`rounded-3xl border backdrop-blur-xl p-6 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20'
                  : 'bg-white border-green-500/30'
              } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
            >
              <h3
                className={`text-lg mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'Tamil'
                  ? 'எனது திட்டங்கள்'
                  : 'My Applied Schemes'}
              </h3>
              <p
                className={`text-3xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {appliedSchemes.length}
              </p>
              <p
                className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {language === 'Tamil'
                  ? 'விண்ணப்பித்த திட்டங்கள்'
                  : 'applied schemes'}
              </p>
              <button
                onClick={() => setActiveTab('mySchemes')}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                    : 'bg-gray-50 border-green-500/30 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                {language === 'Tamil'
                  ? 'அனைத்தையும் பார்க்க'
                  : 'View All'}
              </button>
            </div>

            {/* Quick actions */}
            <div
              className={`rounded-3xl border backdrop-blur-xl p-6 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20'
                  : 'bg-white border-green-500/30'
              } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
            >
              <h3
                className={`text-lg mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'Tamil'
                  ? 'விரைவு செயல்கள்'
                  : 'Quick Actions'}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={onViewAllSchemes}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                      : 'bg-gray-50 border-green-500/30 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm">
                    {language === 'Tamil'
                      ? 'திட்டங்களை ஆராயுங்கள்'
                      : 'Explore Schemes'}
                  </span>
                </button>
                <button
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                      : 'bg-gray-50 border-green-500/30 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm">
                    {language === 'Tamil'
                      ? 'பதுப்பிக்கவும்'
                      : 'Refresh'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* My Schemes Tab */}
        {activeTab === 'mySchemes' && (
          <div
            className={`rounded-3xl border backdrop-blur-xl p-6 ${
              theme === 'dark'
                ? 'bg-white/5 border-green-500/20'
                : 'bg-white border-green-500/30'
            } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-2xl ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'Tamil'
                  ? 'பரிந்துரைக்கப்பட்ட திட்டங்கள்'
                  : 'Recommended Schemes'}
              </h3>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-green-500/20 text-gray-300 hover:bg-white/10'
                    : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                {language === 'Tamil' ? 'வடிகட்டி' : 'Filter'}
              </button>
            </div>

            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4">
              {appliedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className={`rounded-2xl border backdrop-blur-xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 hover:shadow-lg'
                  }`}
                  onClick={() => onViewScheme(scheme)}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4
                      className={`text-xl flex-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {language === 'Tamil'
                        ? scheme.nameTA
                        : scheme.name}
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
                        scheme.level === 'Central'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}
                    >
                      {scheme.level}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {language === 'Tamil'
                      ? scheme.descriptionTA
                      : scheme.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs ${
                        theme === 'dark'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-purple-100 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {scheme.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs ${
                        theme === 'dark'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}
                    >
                      {scheme.benefitType}
                    </span>
                  </div>
                  <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]">
                    {language === 'Tamil'
                      ? 'விவரங்களைப் பார்க்க'
                      : 'View Details'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div
              className={`rounded-3xl border backdrop-blur-xl p-6 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20'
                  : 'bg-white border-green-500/30'
              } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
            >
              <h3
                className={`text-xl mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'Tamil'
                  ? 'தனிப்பட்ட விபரங்கள்'
                  : 'Personal Information'}
              </h3>
              <div className="space-y-4">
                {userDetails?.gender && (
                  <div className="flex items-center gap-4">
                    <User
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil' ? 'பாலினம்' : 'Gender'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.gender}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.age && (
                  <div className="flex items-center gap-4">
                    <Calendar
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil' ? 'வயது' : 'Age'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.age} years
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.maritalStatus && (
                  <div className="flex items-center gap-4">
                    <Heart
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil'
                          ? 'திருமண நிலை'
                          : 'Marital Status'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.maritalStatus}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.isPregnant && (
                  <div className="flex items-center gap-4">
                    <Baby
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil' ? 'கர்ப்பம்' : 'Pregnancy'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.isPregnant}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.occupation && (
                  <div className="flex items-center gap-4">
                    <Briefcase
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil'
                          ? 'தொழில்'
                          : 'Occupation'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.occupation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location & Financial */}
            <div
              className={`rounded-3xl border backdrop-blur-xl p-6 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20'
                  : 'bg-white border-green-500/30'
              } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
            >
              <h3
                className={`text-xl mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'Tamil'
                  ? 'இடம் மற்றும் நிதி'
                  : 'Location & Financial'}
              </h3>
              <div className="space-y-4">
                {userDetails?.state && (
                  <div className="flex items-center gap-4">
                    <MapPin
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil' ? 'மாநிலம்' : 'State'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.state}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.area && (
                  <div className="flex items-center gap-4">
                    <MapPinned
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil' ? 'பகுதி' : 'Area'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.area}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.incomeRange && (
                  <div className="flex items-center gap-4">
                    <DollarSign
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil'
                          ? 'வருமான வரம்பு'
                          : 'Income Range'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.incomeRange}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.employmentStatus && (
                  <div className="flex items-center gap-4">
                    <Briefcase
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil'
                          ? 'வேலைவாய்ப்பு'
                          : 'Employment Status'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.employmentStatus}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.belongsBPL &&
                  userDetails.belongsBPL !== 'No' && (
                    <div className="flex items-center gap-4">
                      <AlertCircle
                        className={`w-5 h-5 ${
                          theme === 'dark'
                            ? 'text-green-400'
                            : 'text-green-600'
                        }`}
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            theme === 'dark'
                              ? 'text-gray-400'
                              : 'text-gray-600'
                          }`}
                        >
                          {language === 'Tamil'
                            ? 'BPL வகை'
                            : 'BPL Category'}
                        </p>
                        <p
                          className={`${
                            theme === 'dark'
                              ? 'text-white'
                              : 'text-gray-900'
                          }`}
                        >
                          {userDetails.belongsBPL}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Education & Community */}
            <div
              className={`rounded-3xl border backdrop-blur-xl p-6 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20'
                  : 'bg-white border-green-500/30'
              } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
            >
              <h3
                className={`text-xl mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'Tamil'
                  ? 'கல்வி & சமூகம்'
                  : 'Education & Community'}
              </h3>
              <div className="space-y-4">
                {userDetails?.educationLevel && (
                  <div className="flex items-center gap-4">
                    <GraduationCap
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil'
                          ? 'கல்வித்தகுதி'
                          : 'Education Level'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.educationLevel}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.isStudent && (
                  <div className="flex items-center gap-4">
                    <Users
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil'
                          ? 'மாணவரா'
                          : 'Student Status'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.isStudent}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.community && (
                  <div className="flex items-center gap-4">
                    <Users
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil' ? 'சமூகம்' : 'Community'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.community}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.minorityCategory &&
                  userDetails.minorityCategory !== 'None' && (
                    <div className="flex items-center gap-4">
                      <Users
                        className={`w-5 h-5 ${
                          theme === 'dark'
                            ? 'text-green-400'
                            : 'text-green-600'
                        }`}
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            theme === 'dark'
                              ? 'text-gray-400'
                              : 'text-gray-600'
                          }`}
                        >
                          {language === 'Tamil'
                            ? 'சிறுபான்மை வகை'
                            : 'Minority Category'}
                        </p>
                        <p
                          className={`${
                            theme === 'dark'
                              ? 'text-white'
                              : 'text-gray-900'
                          }`}
                        >
                          {userDetails.minorityCategory}
                        </p>
                      </div>
                    </div>
                  )}
                {userDetails?.ownsLand &&
                  userDetails.ownsLand !== 'No' && (
                    <div className="flex items-center gap-4">
                      <MapPinned
                        className={`w-5 h-5 ${
                          theme === 'dark'
                            ? 'text-green-400'
                            : 'text-green-600'
                        }`}
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            theme === 'dark'
                              ? 'text-gray-400'
                              : 'text-gray-600'
                          }`}
                        >
                          {language === 'Tamil'
                            ? 'நில உடைமை'
                            : 'Land Ownership'}
                        </p>
                        <p
                          className={`${
                            theme === 'dark'
                              ? 'text-white'
                              : 'text-gray-900'
                          }`}
                        >
                          {userDetails.ownsLand}
                        </p>
                      </div>
                    </div>
                  )}
                {userDetails?.landAcres && (
                  <div className="flex items-center gap-4">
                    <MapPinned
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil'
                          ? 'நில பரப்பளவு'
                          : 'Land Area'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.landAcres}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Disability & Other */}
            <div
              className={`rounded-3xl border backdrop-blur-xl p-6 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20'
                  : 'bg-white border-green-500/30'
              } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
            >
              <h3
                className={`text-xl mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'Tamil'
                  ? 'குறைபாடு & பிற விவரங்கள்'
                  : 'Disability & Other Details'}
              </h3>
              <div className="space-y-4">
                {userDetails?.hasDisability &&
                  userDetails.hasDisability !== 'No' && (
                    <div className="flex items-center gap-4">
                      <Accessibility
                        className={`w-5 h-5 ${
                          theme === 'dark'
                            ? 'text-green-400'
                            : 'text-green-600'
                        }`}
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            theme === 'dark'
                              ? 'text-gray-400'
                              : 'text-gray-600'
                          }`}
                        >
                          {language === 'Tamil'
                            ? 'குறைபாடு'
                            : 'Disability Status'}
                        </p>
                        <p
                          className={`${
                            theme === 'dark'
                              ? 'text-white'
                              : 'text-gray-900'
                          }`}
                        >
                          {userDetails.hasDisability}
                        </p>
                      </div>
                    </div>
                  )}
                {userDetails?.disabilityType && (
                  <div className="flex items-center gap-4">
                    <Accessibility
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil'
                          ? 'குறைபாடு வகை'
                          : 'Disability Type'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.disabilityType}
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.disabilityPercentage && (
                  <div className="flex items-center gap-4">
                    <Accessibility
                      className={`w-5 h-5 ${
                        theme === 'dark'
                          ? 'text-green-400'
                          : 'text-green-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {language === 'Tamil'
                          ? 'குறைபாடு சதவீதம்'
                          : 'Disability Percentage'}
                      </p>
                      <p
                        className={`${
                          theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {userDetails.disabilityPercentage}%
                      </p>
                    </div>
                  </div>
                )}
                {userDetails?.inDistress &&
                  userDetails.inDistress !== 'No' && (
                    <div className="flex items-center gap-4">
                      <AlertCircle
                        className={`w-5 h-5 ${
                          theme === 'dark'
                            ? 'text-green-400'
                            : 'text-green-600'
                        }`}
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            theme === 'dark'
                              ? 'text-gray-400'
                              : 'text-gray-600'
                          }`}
                        >
                          {language === 'Tamil'
                            ? 'துயர நிலை'
                            : 'In Distress'}
                        </p>
                        <p
                          className={`${
                            theme === 'dark'
                              ? 'text-white'
                              : 'text-gray-900'
                          }`}
                        >
                          {userDetails.inDistress}
                        </p>
                      </div>
                    </div>
                  )}
                {!userDetails?.hasDisability &&
                  !userDetails?.inDistress && (
                    <p
                      className={`text-sm ${
                        theme === 'dark'
                          ? 'text-gray-400'
                          : 'text-gray-600'
                      } text-center py-4`}
                    >
                      {language === 'Tamil'
                        ? 'கூடுதல் விவரங்கள் இல்லை'
                        : 'No additional details'}
                    </p>
                  )}
              </div>
            </div>

            {/* Edit button */}
            <div className="lg:col-span-2">
              <button
                onClick={onEditProfile}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]"
              >
                <Edit className="w-5 h-5" />
                {language === 'Tamil'
                  ? 'சுயவிவரத்தைத் திருத்து'
                  : 'Edit Profile'}
              </button>
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div
            className={`rounded-3xl border backdrop-blur-xl p-6 ${
              theme === 'dark'
                ? 'bg-white/5 border-green-500/20'
                : 'bg-white border-green-500/30'
            } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
          >
            <h3
              className={`text-2xl mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {language === 'Tamil'
                ? 'உதவி மற்றும் ஆதரவு'
                : 'Help and Support'}
            </h3>
            <div className="space-y-4">
              <div
                className={`p-6 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-white/5 border-green-500/20'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <h4
                  className={`text-lg mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {language === 'Tamil' ? 'தொடர்பு' : 'Contact Us'}
                </h4>
                <p
                  className={`text-sm ${
                    theme === 'dark'
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}
                >
                  {language === 'Tamil'
                    ? 'எங்கள் ஆதரவு குழுவை தொடர்பு கொள்ள: support@easyfind.gov.in'
                    : 'Contact our support team at: support@easyfind.gov.in'}
                </p>
              </div>
              <div
                className={`p-6 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-white/5 border-green-500/20'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <h4
                  className={`text-lg mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {language === 'Tamil'
                    ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்'
                    : 'FAQ'}
                </h4>
                <p
                  className={`text-sm ${
                    theme === 'dark'
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}
                >
                  {language === 'Tamil'
                    ? 'பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியவும்'
                    : 'Find answers to common questions'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
