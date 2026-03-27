import React, { useState } from 'react';
import { useAuth } from '../App';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Users, 
  DollarSign,
  Heart,
  Baby,
  Accessibility,
  MapPinned,
  Building2,
  Lock,
  ArrowLeft,
} from 'lucide-react';

type UserProfileProps = {
  onBack: () => void;
  onBackToHome?: () => void; // NEW
};

export function UserProfile({ onBack, onBackToHome }: UserProfileProps) {
  const { theme, language, userDetails, currentUser } = useAuth();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    // Simulate password change
    setPasswordSuccess('Password changed successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    setTimeout(() => {
      setShowPasswordChange(false);
      setPasswordSuccess('');
    }, 2000);
  };

  const InfoRow = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value?: string;
  }) => {
    if (!value || value === 'Not Specified' || value === 'None' || value === '0') return null;

    return (
      <div
        className={`flex items-start gap-4 p-4 rounded-2xl backdrop-blur-xl border ${
          theme === 'dark'
            ? 'bg-white/5 border-green-500/20'
            : 'bg-gray-50 border-green-500/30'
        }`}
      >
        <div
          className={`p-2 rounded-xl ${
            theme === 'dark'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-green-500/20 text-green-600'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {label}
          </p>
          <p
            className={`${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    );
  };

  // Password change view
  if (showPasswordChange) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
        <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>

        <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full blur-3xl animate-pulse -z-10"></div>
        <div
          className="fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-500/30 to-green-600/30 rounded-full blur-3xl animate-pulse -z-10"
          style={{ animationDelay: '1s' }}
        ></div>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowPasswordChange(false)}
              className={`p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                  : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1
              className={`text-2xl ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {language === 'Tamil' ? 'கடவுச்சொல்லை மாற்று' : 'Change Password'}
            </h1>
          </div>

          <div
            className={`rounded-3xl border backdrop-blur-xl p-8 ${
              theme === 'dark'
                ? 'bg-white/5 border-green-500/20'
                : 'bg-white border-green-500/30'
            } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
          >
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <label
                  className={`block text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {language === 'Tamil'
                    ? 'தற்போதைய கடவுச்சொல்'
                    : 'Current Password'}
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                      : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {language === 'Tamil' ? 'புதிய கடவுச்சொல்' : 'New Password'}
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                      : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label
                  className={`block text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {language === 'Tamil'
                    ? 'கடவுச்சொல்லை உறுதிப்படுத்து'
                    : 'Confirm New Password'}
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-600'
                      : 'bg-gray-50 border-green-500/30 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>

              {passwordError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-green-400 text-sm">
                  {passwordSuccess}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordChange(false)}
                  className={`flex-1 px-6 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                      : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {language === 'Tamil' ? 'ரத்துசெய்' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]"
                >
                  {language === 'Tamil'
                    ? 'கடவுச்சொல்லை மாற்று'
                    : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main profile view
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>

      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div
        className="fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-500/30 to-green-600/30 rounded-full blur-3xl animate-pulse -z-10"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className={`p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1
            className={`text-2xl ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {language === 'Tamil' ? 'எனது சுயவிவரம்' : 'My Profile'}
          </h1>
        </div>

        {/* Profile Card */}
        <div
          className={`rounded-3xl border backdrop-blur-xl p-8 mb-6 ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-green-500/30'
          } shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]`}
        >
          {/* User Avatar & Basic Info */}
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-green-500/20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl shadow-lg">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {currentUser?.name || 'User'}
              </h2>
              <p
                className={`text-sm flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Mail className="w-4 h-4" />
                {currentUser?.email || 'user@example.com'}
              </p>
            </div>
            <button
              onClick={() => setShowPasswordChange(true)}
              className={`px-4 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                  : 'bg-white border-green-500/30 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Lock className="w-4 h-4" />
              {language === 'Tamil'
                ? 'கடவுச்சொல்லை மாற்று'
                : 'Change Password'}
            </button>
          </div>

          {/* Personal Details */}
          <div className="space-y-4">
            <h3
              className={`text-lg mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {language === 'Tamil'
                ? 'தனிப்பட்ட விவரங்கள்'
                : 'Personal Details'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow
                icon={Calendar}
                label={language === 'Tamil' ? 'வயது' : 'Age'}
                value={userDetails?.age}
              />
              <InfoRow
                icon={User}
                label={language === 'Tamil' ? 'பாலினம்' : 'Gender'}
                value={userDetails?.gender}
              />
              <InfoRow
                icon={Heart}
                label={language === 'Tamil' ? 'திருமண நிலை' : 'Marital Status'}
                value={userDetails?.maritalStatus}
              />
              <InfoRow
                icon={Baby}
                label={language === 'Tamil' ? 'கர்ப்பம்' : 'Pregnancy'}
                value={userDetails?.isPregnant}
              />
            </div>
          </div>

          {/* Location & Employment */}
          <div className="space-y-4 mt-8">
            <h3
              className={`text-lg mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {language === 'Tamil'
                ? 'இடம் & வேலைவாய்ப்பு'
                : 'Location & Employment'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow
                icon={MapPin}
                label={language === 'Tamil' ? 'மாநிலம்' : 'State'}
                value={userDetails?.state}
              />
              <InfoRow
                icon={MapPinned}
                label={language === 'Tamil' ? 'பகுதி' : 'Area'}
                value={userDetails?.area}
              />
              <InfoRow
                icon={Briefcase}
                label={language === 'Tamil' ? 'தொழில்' : 'Occupation'}
                value={userDetails?.occupation}
              />
              <InfoRow
                icon={Building2}
                label={
                  language === 'Tamil'
                    ? 'வேலை நிலை'
                    : 'Employment Status'
                }
                value={userDetails?.employmentStatus}
              />
            </div>
          </div>

          {/* Education & Income */}
          <div className="space-y-4 mt-8">
            <h3
              className={`text-lg mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {language === 'Tamil'
                ? 'கல்வி & வருமானம்'
                : 'Education & Income'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow
                icon={GraduationCap}
                label={
                  language === 'Tamil'
                    ? 'கல்வித் தகுதி'
                    : 'Education Level'
                }
                value={userDetails?.educationLevel}
              />
              <InfoRow
                icon={DollarSign}
                label={
                  language === 'Tamil'
                    ? 'வருமான வரம்பு'
                    : 'Income Range'
                }
                value={userDetails?.incomeRange}
              />
              <InfoRow
                icon={Users}
                label={
                  language === 'Tamil'
                    ? 'மாணவரா'
                    : 'Student Status'
                }
                value={userDetails?.isStudent}
              />
            </div>
          </div>

          {/* Community & Social */}
          <div className="space-y-4 mt-8">
            <h3
              className={`text-lg mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {language === 'Tamil'
                ? 'சமூகம் & பிற விவரங்கள்'
                : 'Community & Other Details'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow
                icon={Users}
                label={language === 'Tamil' ? 'சமூகம்' : 'Community'}
                value={userDetails?.community}
              />
              <InfoRow
                icon={Users}
                label={
                  language === 'Tamil'
                    ? 'சிறுபான்மை வகை'
                    : 'Minority Category'
                }
                value={userDetails?.minorityCategory}
              />
              <InfoRow
                icon={Accessibility}
                label={language === 'Tamil' ? 'குறைபாடு' : 'Disability'}
                value={userDetails?.hasDisability}
              />
              <InfoRow
                icon={Accessibility}
                label={
                  language === 'Tamil'
                    ? 'குறைபாடு வகை'
                    : 'Disability Type'
                }
                value={userDetails?.disabilityType}
              />
              <InfoRow
                icon={MapPin}
                label={language === 'Tamil' ? 'BPL வகை' : 'BPL Category'}
                value={userDetails?.belongsBPL}
              />
              <InfoRow
                icon={Heart}
                label={
                  language === 'Tamil'
                    ? 'துயர நிலை'
                    : 'In Distress'
                }
                value={userDetails?.inDistress}
              />
            </div>
          </div>
        </div>

        {/* NEW: Back to Home button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center gap-2 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'Tamil' ? 'முகப்பிற்கு திரும்பு' : 'Back to Home'}
          </button>
        </div>
      </div>
    </div>
  );
}
