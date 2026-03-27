import React, { useState } from 'react';
import { useAuth } from '../App';
import {
  ArrowLeft,
  Search,
  Filter,
  Globe,
  HelpCircle,
  User,
  ExternalLink,
  Building2,
  Tag,
  X,
} from 'lucide-react';
const headerImage = '/header.png';

<img
  src={headerImage}
  alt="Tamil Nadu Skyline"
  className="w-full h-full object-cover"
/>

//import headerImage from '../assets/header.png';

interface SchemesExplorerDashboardProps {
  onBack: () => void;
  onSchemeClick?: (scheme: any) => void;
}

// Mock schemes data
const generateSchemes = () => {
  const categories = [
    'Education Schemes',
    'Women Welfare Schemes',
    'Agriculture and Farmers Welfare Schemes',
    'Health and Medical Schemes',
    'Social Welfare Schemes',
    'Housing and Basic Amenities Schemes',
    'Employment and Skill Development Schemes',
    'Food Security and Nutrition Schemes',
    'Transport and Travel Concession Schemes',
    'Children and Youth Welfare Schemes',
    'Digital Services and Governance Schemes',
    'Others'
  ];
  const genders = ['All', 'Male', 'Female', 'Other'];
  const castes = ['All', 'SC', 'ST', 'OBC', 'General'];
  const residences = ['All', 'Rural', 'Urban'];
  const benefitTypes = ['Cash', 'In Kind', 'Scholarship', 'Pension', 'Subsidy'];
  const maritalStatuses = ['All', 'Single', 'Married', 'Widowed'];
  const employmentStatuses = ['All', 'Employed', 'Unemployed', 'Self-Employed'];
  const occupations = ['All', 'Student', 'Farmer', 'Worker', 'Professional'];
  const levels = ['State', 'Central'];

  const schemes = [];
  for (let i = 1; i <= 50; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    schemes.push({
      id: `${i}`,
      name: `${level === 'State' ? 'Tamil Nadu' : 'Central'} ${category} Scheme ${i}`,
      nameTA: `${level === 'State' ? 'தமிழ்நாடு' : 'மத்திய'} ${category} திட்டம் ${i}`,
      description: `Financial support and assistance for beneficiaries under ${category} category`,
      descriptionTA: `${category} பிரிவின் கீழ் பயனாளிகளுக்கான நிதி உதவி`,
      category,
      gender: genders[Math.floor(Math.random() * genders.length)],
      caste: castes[Math.floor(Math.random() * castes.length)],
      residence: residences[Math.floor(Math.random() * residences.length)],
      benefitType: benefitTypes[Math.floor(Math.random() * benefitTypes.length)],
      maritalStatus: maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
      employmentStatus: employmentStatuses[Math.floor(Math.random() * employmentStatuses.length)],
      occupation: occupations[Math.floor(Math.random() * occupations.length)],
      isStudent: i % 3 === 0 ? 'Yes' : 'All',
      belowPovertyLine: i % 4 === 0 ? 'Yes' : 'All',
      level,
      implementedBy: `Department of ${category}`,
    });
  }
  return schemes;
};

const ALL_SCHEMES = generateSchemes();

export function SchemesExplorerDashboard({ onBack, onSchemeClick }: SchemesExplorerDashboardProps) {
  const { theme, language } = useAuth();
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');
  const [selectedCaste, setSelectedCaste] = useState('All');
  const [selectedResidence, setSelectedResidence] = useState('All');
  const [selectedBenefitType, setSelectedBenefitType] = useState('All');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState('All');
  const [selectedDisabilityPercentage, setSelectedDisabilityPercentage] = useState('All');
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState('All');
  const [selectedOccupation, setSelectedOccupation] = useState('All');
  const [selectedDifferentlyAbled, setSelectedDifferentlyAbled] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState('All');
  const [selectedBelowPovertyLine, setSelectedBelowPovertyLine] = useState('All');
  
  const [schemeLevel, setSchemeLevel] = useState<'All' | 'State' | 'Central'>('All');
  const [schemeNameSearch, setSchemeNameSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const schemesPerPage = 10;

  // Filter schemes
  const filteredSchemes = ALL_SCHEMES.filter((scheme) => {
    if (schemeNameSearch && !scheme.name.toLowerCase().includes(schemeNameSearch.toLowerCase())) return false;
    if (schemeLevel !== 'All' && scheme.level !== schemeLevel) return false;
    if (selectedCategory !== 'All' && scheme.category !== selectedCategory) return false;
    if (selectedGender !== 'All' && scheme.gender !== 'All' && scheme.gender !== selectedGender) return false;
    if (selectedCaste !== 'All' && scheme.caste !== 'All' && scheme.caste !== selectedCaste) return false;
    if (selectedResidence !== 'All' && scheme.residence !== 'All' && scheme.residence !== selectedResidence) return false;
    if (selectedBenefitType !== 'All' && scheme.benefitType !== selectedBenefitType) return false;
    if (selectedMaritalStatus !== 'All' && scheme.maritalStatus !== 'All' && scheme.maritalStatus !== selectedMaritalStatus) return false;
    if (selectedEmploymentStatus !== 'All' && scheme.employmentStatus !== 'All' && scheme.employmentStatus !== selectedEmploymentStatus) return false;
    if (selectedOccupation !== 'All' && scheme.occupation !== 'All' && scheme.occupation !== selectedOccupation) return false;
    if (selectedStudent !== 'All' && scheme.isStudent !== 'All' && scheme.isStudent !== selectedStudent) return false;
    if (selectedBelowPovertyLine !== 'All' && scheme.belowPovertyLine !== 'All' && scheme.belowPovertyLine !== selectedBelowPovertyLine) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredSchemes.length / schemesPerPage);
  const paginatedSchemes = filteredSchemes.slice(
    (currentPage - 1) * schemesPerPage,
    currentPage * schemesPerPage
  );

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedAge('All');
    setSelectedCaste('All');
    setSelectedResidence('All');
    setSelectedBenefitType('All');
    setSelectedMaritalStatus('All');
    setSelectedDisabilityPercentage('All');
    setSelectedEmploymentStatus('All');
    setSelectedOccupation('All');
    setSelectedDifferentlyAbled('All');
    setSelectedStudent('All');
    setSelectedBelowPovertyLine('All');
    setSchemeNameSearch('');
    setCurrentPage(1);
  };

  const FilterSelect = ({ label, value, onChange, options }: any) => (
    <div>
      <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
          theme === 'dark'
            ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
            : 'bg-gray-50 border-gray-200 text-gray-900 [&>option]:bg-white'
        }`}
      >
        {options.map((opt: string) => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header Image */}
      <div className="relative h-[30vh] overflow-hidden">
        <img src={headerImage} alt="Tamil Nadu Skyline" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      </div>

      {/* Header Bar */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        theme === 'dark' ? 'bg-black/80 border-green-500/20' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-green-400' : 'bg-gray-100 hover:bg-gray-200 text-green-600'
              }`}>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'எளிதாகக் கண்டுபிடி' : 'EasyFind Scheme'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}>
                <Globe className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}>
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}>
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left - Schemes List */}
          <main className="flex-1">
            <div className={`rounded-2xl border backdrop-blur-xl p-6 ${
              theme === 'dark' ? 'bg-white/5 border-green-500/20' : 'bg-white border-gray-200'
            }`}>
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    value={schemeNameSearch}
                    onChange={(e) => setSchemeNameSearch(e.target.value)}
                    placeholder={language === 'Tamil' ? 'திட்டப் பெயரால் தேடுங்கள்...' : 'Search schemes by name...'}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-3 mb-6">
                {(['All', 'State', 'Central'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => { setSchemeLevel(level); setCurrentPage(1); }}
                    className={`px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                      schemeLevel === level
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                        : theme === 'dark'
                          ? 'bg-white/5 border border-green-500/20 text-gray-300 hover:bg-white/10'
                          : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level === 'All' 
                      ? (language === 'Tamil' ? 'அனைத்து' : 'All Schemes')
                      : level === 'State'
                        ? (language === 'Tamil' ? 'மாநில' : 'State')
                        : (language === 'Tamil' ? 'மத்திய' : 'Central')}
                  </button>
                ))}
                <div className={`ml-auto text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {filteredSchemes.length} {language === 'Tamil' ? 'திட்டங்கள்' : 'schemes'}
                </div>
              </div>

              {/* Schemes */}
              <div className="space-y-4">
                {paginatedSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className={`rounded-2xl border backdrop-blur-xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                      theme === 'dark' ? 'bg-white/5 border-green-500/20 hover:bg-white/10' : 'bg-gray-50 border-gray-200 hover:shadow-lg'
                    }`}
                    onClick={() => onSchemeClick && onSchemeClick(scheme)}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className={`text-xl flex-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {language === 'Tamil' ? scheme.nameTA : scheme.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
                        scheme.level === 'Central'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {scheme.level}
                      </span>
                    </div>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'Tamil' ? scheme.descriptionTA : scheme.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-lg text-xs ${
                        theme === 'dark' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200'
                      }`}>
                        <Tag className="w-3 h-3 inline mr-1" />{scheme.category}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs ${
                        theme === 'dark' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        {scheme.benefitType}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 mb-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Building2 className="w-4 h-4" />
                      <span>{scheme.implementedBy}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]">
                        {language === 'Tamil' ? 'விவரம்' : 'View details'}
                      </button>
                      <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        theme === 'dark' ? 'bg-white/5 border-green-500/20 text-gray-300 hover:bg-white/10' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}>
                        <ExternalLink className="w-4 h-4" />
                        {language === 'Tamil' ? 'தளம்' : 'Official'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-xl border transition-all ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    } ${theme === 'dark' ? 'bg-white/5 border-green-500/20 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                  >
                    {language === 'Tamil' ? 'முந்தைய' : 'Previous'}
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl border transition-all hover:scale-105 ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                            : theme === 'dark' ? 'bg-white/5 border-green-500/20 text-white' : 'bg-white border-gray-200 text-gray-900'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-xl border transition-all ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    } ${theme === 'dark' ? 'bg-white/5 border-green-500/20 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                  >
                    {language === 'Tamil' ? 'அடுத்து' : 'Next'}
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* Right - Filters */}
          <aside className="w-80 flex-shrink-0">
            <div className={`rounded-2xl border backdrop-blur-xl p-6 ${
              theme === 'dark' ? 'bg-white/5 border-green-500/20' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'Tamil' ? 'வடிகட்டி' : 'Filters'}
                  </h3>
                </div>
                <button
                  onClick={clearFilters}
                  className={`p-2 rounded-xl transition-all hover:scale-110 ${
                    theme === 'dark' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <FilterSelect label={language === 'Tamil' ? 'திட்ட வகை' : 'Category'} value={selectedCategory} onChange={(e:any) => setSelectedCategory(e.target.value)}
                  options={['All', 'Education Schemes', 'Women Welfare Schemes', 'Agriculture and Farmers Welfare Schemes', 'Health and Medical Schemes', 'Social Welfare Schemes', 'Housing and Basic Amenities Schemes', 'Employment and Skill Development Schemes', 'Food Security and Nutrition Schemes', 'Transport and Travel Concession Schemes', 'Children and Youth Welfare Schemes', 'Digital Services and Governance Schemes', 'Others']} />
                
                <FilterSelect label={language === 'Tamil' ? 'பாலினம்' : 'Gender'} value={selectedGender} onChange={(e:any) => setSelectedGender(e.target.value)}
                  options={['All', 'Male', 'Female', 'Other']} />
                
                <FilterSelect label={language === 'Tamil' ? 'வயது' : 'Age'} value={selectedAge} onChange={(e:any) => setSelectedAge(e.target.value)}
                  options={['All', 'Below 18', '18-30', '30-45', '45-60', 'Above 60']} />
                
                <FilterSelect label={language === 'Tamil' ? 'சாதி' : 'Caste'} value={selectedCaste} onChange={(e:any) => setSelectedCaste(e.target.value)}
                  options={['All', 'SC', 'ST', 'OBC', 'General']} />
                
                <FilterSelect label={language === 'Tamil' ? 'குடியிருப்பு' : 'Residence'} value={selectedResidence} onChange={(e:any) => setSelectedResidence(e.target.value)}
                  options={['All', 'Rural', 'Urban']} />
                
                <FilterSelect label={language === 'Tamil' ? 'பலன் வகை' : 'Benefit Type'} value={selectedBenefitType} onChange={(e:any) => setSelectedBenefitType(e.target.value)}
                  options={['All', 'Cash', 'In Kind', 'Scholarship', 'Pension', 'Subsidy']} />
                
                <FilterSelect label={language === 'Tamil' ? 'திருமண நிலை' : 'Marital Status'} value={selectedMaritalStatus} onChange={(e:any) => setSelectedMaritalStatus(e.target.value)}
                  options={['All', 'Single', 'Married', 'Widowed']} />
                
                <FilterSelect label={language === 'Tamil' ? 'ஊனம் %' : 'Disability %'} value={selectedDisabilityPercentage} onChange={(e:any) => setSelectedDisabilityPercentage(e.target.value)}
                  options={['All', 'Below 40%', '40-60%', 'Above 60%']} />
                
                <FilterSelect label={language === 'Tamil' ? 'வேலைவாய்ப்பு' : 'Employment'} value={selectedEmploymentStatus} onChange={(e:any) => setSelectedEmploymentStatus(e.target.value)}
                  options={['All', 'Employed', 'Unemployed', 'Self-Employed']} />
                
                <FilterSelect label={language === 'Tamil' ? 'தொழில்' : 'Occupation'} value={selectedOccupation} onChange={(e:any) => setSelectedOccupation(e.target.value)}
                  options={['All', 'Student', 'Farmer', 'Worker', 'Professional']} />
                
                <FilterSelect label={language === 'Tamil' ? 'மாற்றுத்திறனாளி' : 'Differently Abled'} value={selectedDifferentlyAbled} onChange={(e:any) => setSelectedDifferentlyAbled(e.target.value)}
                  options={['All', 'Yes', 'No']} />
                
                <FilterSelect label={language === 'Tamil' ? 'மாணவர்' : 'Student'} value={selectedStudent} onChange={(e:any) => setSelectedStudent(e.target.value)}
                  options={['All', 'Yes', 'No']} />
                
                <FilterSelect label={language === 'Tamil' ? 'வறுமைக் கோடு' : 'Below Poverty Line'} value={selectedBelowPovertyLine} onChange={(e:any) => setSelectedBelowPovertyLine(e.target.value)}
                  options={['All', 'Yes', 'No']} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}