import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Shield,
  FileSearch,
  ArrowRight,
  Users,
  Heart,
  Wallet,
  GraduationCap,
  LogIn,
  Globe,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '../App';
import { getTranslation } from '../utils/translations';

interface HomePageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onExploreSchemes?: () => void;
}

export function HomePage({
  onGetStarted,
  onLogin,
  onExploreSchemes,
}: HomePageProps) {
  const { theme, toggleTheme, language, setLanguage, currentUser } = useAuth();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
    };

    if (showLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageDropdown]);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  ];

  const features = [
    {
      icon: FileSearch,
      title: 'Personalized Scheme Discovery',
      description:
        'Find government schemes tailored to your specific needs and eligibility',
    },
    {
      icon: Shield,
      title: 'Verified Information',
      description:
        'Access authentic and up-to-date government scheme details',
    },
    {
      icon: Sparkles,
      title: 'Instant Results',
      description:
        'Get matched with eligible schemes in seconds with our smart algorithm',
    },
    {
      icon: Heart,
      title: 'Easy to Use',
      description: 'Simple interface designed for users of all backgrounds',
    },
  ];

  const schemeCategories = [
    {
      icon: Heart,
      title: 'Health & Welfare',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: GraduationCap,
      title: 'Education',
      color: 'from-teal-400 to-green-500',
    },
    {
      icon: Wallet,
      title: 'Financial Support',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Users,
      title: 'Social Benefits',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      } transition-colors duration-300`}
    >
      {/* Animated liquid glass background */}
      <div
        className={`fixed inset-0 -z-10 transition-colors duration-500 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
        }`}
      ></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>

      {/* Floating orbs - green glow */}
      <div
        className={`fixed top-20 left-10 w-96 h-96 bg-gradient-to-br rounded-full blur-3xl animate-pulse -z-10 ${
          theme === 'dark'
            ? 'from-green-500/30 to-emerald-600/30'
            : 'from-green-400/40 to-emerald-500/40'
        }`}
      ></div>
      <div
        className={`fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br rounded-full blur-3xl animate-pulse -z-10 ${
          theme === 'dark'
            ? 'from-teal-500/30 to-green-600/30'
            : 'from-teal-400/40 to-green-500/40'
        }`}
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br rounded-full blur-3xl animate-pulse -z-10 ${
          theme === 'dark'
            ? 'from-emerald-500/20 to-green-500/20'
            : 'from-emerald-400/30 to-green-400/30'
        }`}
        style={{ animationDelay: '2s' }}
      ></div>

      {/* Theme Toggle Button - Fixed top left */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-110 group ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-400/30 text-green-400 hover:text-green-300 shadow-[0_4px_16px_0_rgba(16,185,129,0.3)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.5)]'
            : 'bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/40 text-green-600 hover:text-green-700 shadow-[0_4px_16px_0_rgba(16,185,129,0.2)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
        }`}
      >
        {theme === 'dark' ? (
          <Sun className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
        ) : (
          <Moon className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-500" />
        )}
      </button>

      {/* Language Toggle Button - Fixed top left next to theme */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          className={`fixed top-6 left-20 z-50 flex items-center justify-center w-12 h-12 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-110 group ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-400/30 text-green-400 hover:text-green-300 shadow-[0_4px_16px_0_rgba(16,185,129,0.3)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.5)]'
              : 'bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/40 text-green-600 hover:text-green-700 shadow-[0_4px_16px_0_rgba(16,185,129,0.2)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
          }`}
        >
          <Globe className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
        </button>

        {/* Language Dropdown */}
        {showLanguageDropdown && (
          <div
            className={`fixed top-20 left-20 w-48 rounded-2xl backdrop-blur-2xl border z-50 animate-in fade-in slide-in-from-top-2 duration-300 ${
              theme === 'dark'
                ? 'bg-gray-900/95 border-green-500/30'
                : 'bg-white/95 border-green-500/40'
            } shadow-[0_8px_32px_0_rgba(16,185,129,0.3)]`}
          >
            <div className="p-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 mb-2 last:mb-0 ${
                    language === lang.code
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_4px_16px_0_rgba(16,185,129,0.4)]'
                      : theme === 'dark'
                        ? 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-green-500/10 hover:border-green-500/30'
                        : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700 hover:text-gray-900 border border-green-500/20 hover:border-green-500/40'
                  }`}
                >
                  <span className="text-left flex-1">{lang.native}</span>
                  {language === lang.code && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Top-right: User Login / User Name */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={onLogin}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-xl border border-green-400/30 text-green-400 hover:text-green-300 shadow-[0_4px_16px_0_rgba(16,185,129,0.3)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-105 group"
        >
          <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          <span className="font-medium">
            {currentUser?.name
              ? currentUser.name
              : language === 'Tamil'
                ? 'உள்நுழை'
                : 'User Login'}
          </span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-8">
          {/* Logo/Title with glass effect */}
          <div className="inline-flex items-center gap-3 mb-6 px-8 py-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-green-500/30 shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] hover:shadow-[0_8px_40px_0_rgba(16,185,129,0.35)] transition-all duration-500 hover:scale-105">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-green-500/50 animate-pulse">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              EasyFind Scheme
            </h1>
          </div>

          {/* Main heading with shimmer effect */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/30 to-transparent blur-2xl"></div>
            <h2
              className={`relative text-4xl md:text-5xl lg:text-6xl mb-4 px-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Discover Schemes
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Made For You
              </span>
            </h2>
          </div>

          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 px-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Find government schemes and benefits you're eligible for. Simple,
            fast, and in your language.
          </p>

          {/* CTA Button with liquid glass effect */}
          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white backdrop-blur-xl border border-green-400/50 shadow-[0_8px_32px_0_rgba(16,185,129,0.4)] hover:shadow-[0_8px_40px_0_rgba(16,185,129,0.6)] transition-all duration-500 hover:scale-110 hover:-translate-y-1"
          >
            <span className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="relative">Find Schemes For You</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <p className="text-sm text-gray-500 mt-4">
            No login required • Free to use
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                theme === 'dark'
                  ? 'bg-white/5 border-green-500/20 shadow-[0_4px_16px_0_rgba(16,185,129,0.15)] hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.3)]'
                  : 'bg-white/40 border-green-500/30 shadow-[0_4px_16px_0_rgba(16,185,129,0.2)] hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.4)]'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-green-500/40 to-emerald-600/40 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-7 h-7 text-green-400" />
              </div>
              <h3
                className={`mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Scheme Categories */}
        <div className="mb-16">
          <h3
            className={`text-center text-2xl mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Explore Schemes By Category
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schemeCategories.map((category, index) => (
              <div
                key={index}
                onClick={onExploreSchemes}
                className={`group relative p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-white/5 border-green-500/20 shadow-[0_4px_16px_0_rgba(16,185,129,0.15)] hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.35)]'
                    : 'bg-white/40 border-green-500/30 shadow-[0_4px_16px_0_rgba(16,185,129,0.2)] hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.4)]'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                ></div>
                <div className="relative">
                  <div
                    className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${category.color} bg-opacity-30 backdrop-blur-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}
                  >
                    <category.icon className="w-8 h-8 text-green-400" />
                  </div>
                  <h4
                    className={
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }
                  >
                    {category.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div
          className={`p-8 md:p-12 rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]'
              : 'bg-white/40 border-green-500/30 shadow-[0_8px_32px_0_rgba(16,185,129,0.3)]'
          }`}
        >
          <h3
            className={`text-center text-2xl mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 backdrop-blur-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-green-500/50">
                1
              </div>
              <h4
                className={`mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Share Your Details
              </h4>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Tell us about your age, occupation, state, and income
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-green-600 backdrop-blur-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-500/50">
                2
              </div>
              <h4
                className={`mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Get Matched
              </h4>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                We'll find all schemes you're eligible for
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 backdrop-blur-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/50">
                3
              </div>
              <h4
                className={`mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Apply Easily
              </h4>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Get direct application links and required documents
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={onGetStarted}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white backdrop-blur-xl border border-green-400/50 shadow-[0_8px_32px_0_rgba(16,185,129,0.4)] hover:shadow-[0_8px_40px_0_rgba(16,185,129,0.6)] transition-all duration-500 hover:scale-105"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Helping citizens access government benefits across India</p>
        </div>
      </div>
    </div>
  );
}
