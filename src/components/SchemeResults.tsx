import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { Chatbot } from './Chatbot';
import { ArrowLeft, Award, Languages, Filter, Edit, ExternalLink } from 'lucide-react';
import { getLanguagesForState, Language, translations } from '../utils/languages';
import { getTranslatedScheme } from '../utils/schemeTranslations';

// Backend-la oru row-ku basic shape
type BackendScheme = {
  id: number;
  scheme_name: string;
  description?: string; // Expecting description from backend
  category: string;
  benefit_type?: string;
  level?: string;          // "State"/"Central"
  apply_link?: string;
  min_age?: number | null;
  max_age?: number | null;
  occupations?: string | null;
  gender?: string | null;
  income_ranges?: string | null;
};

type Scheme = {
  id: string;
  translationId: string; // Keep for now, but use backend name/desc if translation fails
  name: string;          // Added: direct name from backend
  description: string;   // Added: direct description from backend
  applyLink: string;
  category: string;
  benefitType: string;
  level: string;
  eligibility: {
    occupations?: string[];
    minAge?: number;
    maxAge?: number;
    gender?: string[];
    incomeRanges?: string[];
  };
};

export function SchemeResults({ onSchemeClick }: { onSchemeClick?: () => void }) {
  const { userDetails, logout, editProfile, setViewingScheme, isAuthenticated, theme } = useAuth();
  const availableLanguages = userDetails ? getLanguagesForState(userDetails.state) : ['English'];
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterBenefitType, setFilterBenefitType] = useState<string>('All');
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const t = translations[selectedLanguage];

  // Backend-lendhu eligible schemes fetch pannara effect
  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const res = await fetch('http://localhost:5000/api/schemes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // Aligned with backend/controllers/schemesController.js expectations
            gender: userDetails?.gender || null,
            age: userDetails?.age ? parseInt(userDetails.age, 10) : null,
            state: userDetails?.state || null,
            area: userDetails?.area || null,
            income_range: userDetails?.incomeRange || null,
            edu_level: userDetails?.educationLevel || null,
            occupation: userDetails?.occupation || null, // Added missing field
            is_student: userDetails?.isStudent === 'Yes' ? 1 : 0,
            community: userDetails?.community || null,
            is_minority: userDetails?.minorityCategory === 'Yes' ? 1 : 0,
            is_disabled: userDetails?.hasDisability === 'Yes' ? 1 : 0,
            disability_type: userDetails?.disabilityType || null, // Added missing field
            disable_percentage: userDetails?.disabilityPercentage
              ? parseInt(userDetails.disabilityPercentage, 10)
              : 0,
            employment_status: userDetails?.employmentStatus || null,
            is_bpl_category: userDetails?.belongsBPL === 'Yes' ? 1 : 0,
            marital_status: userDetails?.maritalStatus || null,
            category: userDetails?.community || null, // Derived category
          }),
        });

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data: BackendScheme[] = await res.json();
        console.log('Raw backend schemes:', data); // DEBUG LOG

        const normalized: Scheme[] = (data || [])
          .filter((s) => s && s.id != null)
          .map((s) => ({
            id: String(s.id),
            // Translation id – simple mapping: per scheme_name decide pannalaam
            translationId: s.scheme_name.toLowerCase().replace(/\s+/g, '-'),
            name: s.scheme_name, // Direct use
            description: s.description || 'No description available.', // Direct use
            applyLink: s.apply_link || '',
            category: s.category || 'Others',
            benefitType: s.benefit_type || 'Composite',
            level: s.level || 'State',
            eligibility: {
              minAge: s.min_age ?? undefined,
              maxAge: s.max_age ?? undefined,
              occupations: s.occupations
                ? s.occupations.split(',').map((o) => o.trim())
                : undefined,
              gender: s.gender
                ? s.gender.split(',').map((g) => g.trim())
                : undefined,
              incomeRanges: s.income_ranges
                ? s.income_ranges.split(',').map((i) => i.trim())
                : undefined,
            },
          }));

        setSchemes(normalized);
      } catch (err: any) {
        console.error('Error fetching schemes:', err);
        setApiError('Something went wrong while fetching schemes.');
        setSchemes([]);
      } finally {
        setLoading(false);
      }
    };

    // userDetails illatiya na fetch panna sense illa
    if (userDetails) {
      fetchSchemes();
    } else {
      setLoading(false);
      setSchemes([]);
    }
  }, [userDetails]);

  const getEligibleSchemes = () => {
    // Backend already eligibility apply panniduchu-nu assume: schemes = eligible ones
    if (!userDetails) return [];
    return schemes;
  };

  const eligibleSchemes = getEligibleSchemes();

  const filteredSchemes = eligibleSchemes.filter((scheme) => {
    if (filterCategory !== 'All' && scheme.category !== filterCategory) return false;
    if (filterBenefitType !== 'All' && scheme.benefitType !== filterBenefitType) return false;
    if (filterLevel !== 'All' && scheme.level !== filterLevel) return false;
    return true;
  });

  const handleSchemeClick = (scheme: Scheme) => {
    if (!isAuthenticated) {
      if (onSchemeClick) onSchemeClick();
      return;
    }
    setViewingScheme(scheme);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isAuthenticated) {
      if (onSchemeClick) onSchemeClick();
      return;
    }
    setSelectedLanguage(e.target.value as Language);
  };

  const handleFilterChange = (
    filterType: 'category' | 'benefitType' | 'level',
    value: string
  ) => {
    if (!isAuthenticated) {
      if (onSchemeClick) onSchemeClick();
      return;
    }

    if (filterType === 'category') setFilterCategory(value);
    else if (filterType === 'benefitType') setFilterBenefitType(value);
    else if (filterType === 'level') setFilterLevel(value);
  };

  const handleEditProfile = () => {
    if (!isAuthenticated) {
      if (onSchemeClick) onSchemeClick();
      return;
    }
    editProfile();
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8 flex items-center justify-center bg-black text-white">
        Loading schemes...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden bg-black">
      {/* Animated liquid glass background - dark theme */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>
      <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div
        className="fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-500/30 to-green-600/30 rounded-full blur-3xl animate-pulse -z-10"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="fixed top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse -z-10"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4 bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] hover:shadow-[0_8px_40px_0_rgba(16,185,129,0.35)] transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-[0_8px_16px_0_rgba(16,185,129,0.5)] backdrop-blur-sm border border-green-400/30 transform hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white drop-shadow-sm">{t.yourEligibleSchemes}</h1>
              <p className="text-gray-400">
                {t.found}{' '}
                {filteredSchemes.length}{' '}
                {filteredSchemes.length !== 1 ? t.schemes : t.scheme}{' '}
                {t.forYou}
              </p>
              {apiError && (
                <p className="text-red-400 text-sm mt-1">{apiError}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-green-500/20 px-4 py-2 rounded-2xl shadow-[0_4px_16px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105">
              <Languages className="w-4 h-4 text-green-400" />
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-transparent border-none focus:outline-none text-white cursor-pointer font-medium"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang} className="bg-gray-900 text-white">
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 shadow-[0_4px_16px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.25)] hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToHome || 'Back to Home'}
            </button>
          </div>
        </div>

        {/* Profile card */}
        {userDetails && (
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-6 mb-8 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] hover:shadow-[0_8px_40px_0_rgba(16,185,129,0.3)] transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="flex justify-between items-center mb-4 relative z-10">
              <h3 className="text-white drop-shadow-sm">{t.yourProfile}</h3>
              <button
                onClick={handleEditProfile}
                className="flex items-center gap-2 text-green-400 hover:text-green-300 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] hover:scale-105"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-1">{t.age}</p>
                <p className="text-white font-medium">
                  {userDetails.age} {t.years}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-1">{t.gender}</p>
                <p className="text-white font-medium">{userDetails.gender}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-1">{t.occupation}</p>
                <p className="text-white font-medium">{userDetails.occupation}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-1">{t.state}</p>
                <p className="text-white font-medium">{userDetails.state}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-1">{t.income}</p>
                <p className="text-white font-medium">{userDetails.incomeRange}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] sticky top-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="flex items-center gap-2 mb-6 relative z-10">
                <Filter className="w-5 h-5 text-green-400" />
                <h3 className="text-white drop-shadow-sm">Filter By</h3>
              </div>

              <div className="space-y-5 relative z-10">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Scheme Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                  >
                    <option value="All" className="bg-gray-900 text-white">
                      All Categories
                    </option>
                    <option
                      value="Education Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Education Schemes
                    </option>
                    <option
                      value="Women Welfare Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Women Welfare Schemes
                    </option>
                    <option
                      value="Agriculture and Farmers Welfare Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Agriculture and Farmers Welfare Schemes
                    </option>
                    <option
                      value="Health and Medical Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Health and Medical Schemes
                    </option>
                    <option
                      value="Social Welfare Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Social Welfare Schemes
                    </option>
                    <option
                      value="Housing and Basic Amenities Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Housing and Basic Amenities Schemes
                    </option>
                    <option
                      value="Employment and Skill Development Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Employment and Skill Development Schemes
                    </option>
                    <option
                      value="Food Security and Nutrition Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Food Security and Nutrition Schemes
                    </option>
                    <option
                      value="Transport and Travel Concession Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Transport and Travel Concession Schemes
                    </option>
                    <option
                      value="Children and Youth Welfare Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Children and Youth Welfare Schemes
                    </option>
                    <option
                      value="Digital Services and Governance Schemes"
                      className="bg-gray-900 text-white"
                    >
                      Digital Services and Governance Schemes
                    </option>
                    <option value="Others" className="bg-gray-900 text-white">
                      Others
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Benefit Type
                  </label>
                  <select
                    value={filterBenefitType}
                    onChange={(e) =>
                      handleFilterChange('benefitType', e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                  >
                    <option value="All" className="bg-gray-900 text-white">
                      All Types
                    </option>
                    <option value="Cash" className="bg-gray-900 text-white">
                      Cash
                    </option>
                    <option value="In Kind" className="bg-gray-900 text-white">
                      In Kind
                    </option>
                    <option value="Composite" className="bg-gray-900 text-white">
                      Composite
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Level
                  </label>
                  <select
                    value={filterLevel}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                  >
                    <option value="All" className="bg-gray-900 text-white">
                      All Levels
                    </option>
                    <option value="State" className="bg-gray-900 text-white">
                      State
                    </option>
                    <option value="Central" className="bg-gray-900 text-white">
                      Central
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Schemes list */}
          <div className="lg:col-span-3">
            {filteredSchemes.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-12 text-center shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <p className="text-gray-300 mb-4 relative z-10">
                  {t.noSchemes}
                </p>
                <p className="text-gray-400 relative z-10">
                  {t.checkBack}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSchemes.map((scheme) => {
                  // Try to get translation, otherwise fallback to backend data
                  const translatedScheme = getTranslatedScheme(
                    scheme.translationId,
                    selectedLanguage
                  );

                  // Use translated data if available and not English (or if English matches), otherwise backend data
                  // Logic: If user selected Tamil, we try `translatedScheme`. If that's null, we show `scheme.name` (English from DB).
                  // If user selected English, `translatedScheme` might work if we have English translations, 
                  // but `scheme.name` is safe too.

                  const displayName = (selectedLanguage !== 'English' && translatedScheme)
                    ? translatedScheme.name
                    : scheme.name;

                  const displayDesc = (selectedLanguage !== 'English' && translatedScheme)
                    ? translatedScheme.description
                    : scheme.description;

                  if (!displayName) return null; // Should not happen given backend data fallback

                  return (
                    <div
                      key={scheme.id}
                      onClick={() => handleSchemeClick(scheme)}
                      className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] hover:shadow-[0_12px_48px_0_rgba(16,185,129,0.4)] transition-all duration-300 relative overflow-hidden group cursor-pointer hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1">
                            <h2 className="text-white text-2xl font-semibold mb-2">
                              {displayName}
                            </h2>
                            <div className="flex gap-2 mb-4">
                              <span className="px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                                {scheme.level}
                              </span>
                              <span className="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm">
                                {scheme.benefitType}
                              </span>
                              <span className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm">
                                {scheme.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {displayDesc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot
        language={selectedLanguage}
        schemes={filteredSchemes
          .map((s) => {
            const trans = getTranslatedScheme(s.translationId, selectedLanguage);
            return trans ? { ...trans, applyLink: s.applyLink } : null;
          })
          .filter(Boolean)}
      />
    </div>
  );
}
