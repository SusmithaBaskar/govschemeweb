import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import {
  ArrowLeft,
  Search,
  Filter,
  Globe,
  HelpCircle,
  User,
  Home,
  ChevronRight,
  SlidersHorizontal,
  X,
  ExternalLink,
  MapPin,
  Building2,
  Tag,
  Calendar,
  FileText,
  CheckCircle,
} from 'lucide-react';
const headerImage = '/header.png';

<img
  src={headerImage}
  alt="Tamil Nadu Skyline"
  className="w-full h-full object-cover"
/>

//import headerImage from '../assets/header.png';

interface SchemesExplorerProps {
  onBack: () => void;
  category?: string;
  onSchemeClick?: (scheme: any) => void;
}

// Mock schemes data with all necessary fields
const ALL_SCHEMES_DATA = [
  {
    id: '1',
    name: 'Chief Minister Comprehensive Health Insurance Scheme',
    nameTA: 'முதலமைச்சர் விரிவான சுகாதார காப்பீட்டு திட்டம்',
    description: 'Comprehensive health insurance coverage up to ₹5 lakhs for eligible families',
    descriptionTA: 'தகுதியுள்ள குடும்பங்களுக்கு ₹5 லட்சம் வரை விரிவான சுகாதார காப்பீடு',
    category: 'Health & Wellness',
    targetBeneficiary: ['All'],
    department: 'Health',
    schemeType: 'Insurance',
    level: 'State',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Health Insurance',
    implementedBy: 'Department of Health and Family Welfare',
  },
  {
    id: '2',
    name: 'Tamil Nadu Free Laptop Scheme',
    nameTA: 'தமிழ்நாடு இலவச மடிக்கணினி திட்டம்',
    description: 'Free laptops for students scoring high marks in 12th standard',
    descriptionTA: '12-ஆம் வகுப்பில் அதிக மதிப்பெண் பெறும் மாணவர்களுக்கு இலவச மடிக்கணினி',
    category: 'Education & Learning',
    targetBeneficiary: ['Students'],
    department: 'School Education',
    schemeType: 'Grant',
    level: 'State',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Equipment',
    implementedBy: 'Department of School Education',
  },
  {
    id: '3',
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    nameTA: 'பிரதான மந்திரி கிசான் சம்மான் நிதி',
    description: 'Income support of ₹6,000 per year to all farmer families',
    descriptionTA: 'அனைத்து விவசாயக் குடும்பங்களுக்கும் ஆண்டுக்கு ₹6,000 வருமான ஆதரவு',
    category: 'Agriculture & Rural',
    targetBeneficiary: ['Farmers'],
    department: 'Agriculture',
    schemeType: 'Grant',
    level: 'Central',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Direct Income',
    implementedBy: 'Ministry of Agriculture & Farmers Welfare',
  },
  {
    id: '4',
    name: 'Tamil Nadu Old Age Pension Scheme',
    nameTA: 'தமிழ்நாடு முதியோர் ஓய்வூதியத் திட்டம்',
    description: 'Monthly pension for senior citizens above 60 years',
    descriptionTA: '60 வயதுக்கு மேற்பட்ட மூத்த குடிமக்களுக்கு மாதாந்திர ஓய்வூதியம்',
    category: 'Social Welfare',
    targetBeneficiary: ['Senior Citizens'],
    department: 'Social Welfare',
    schemeType: 'Pension',
    level: 'State',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Monthly Pension',
    implementedBy: 'Department of Social Welfare',
  },
  {
    id: '5',
    name: 'Amma Two Wheeler Scheme',
    nameTA: 'அம்மா இரு சக்கர வாகன திட்டம்',
    description: 'Subsidized two-wheeler loans for working women',
    descriptionTA: 'வேலை செய்யும் பெண்களுக்கு மானிய இரு சக்கர வாகன கடன்',
    category: 'Employment & Skill',
    targetBeneficiary: ['Women'],
    department: 'Labour',
    schemeType: 'Loan/Subsidy',
    level: 'State',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Vehicle Loan',
    implementedBy: 'Department of Labour and Employment',
  },
  {
    id: '6',
    name: 'Post Matric Scholarship for SC Students',
    nameTA: 'எஸ்சி மாணவர்களுக்கான மெட்ரிக் பிந்தைய உதவித்தொகை',
    description: 'Financial assistance for SC students pursuing higher education',
    descriptionTA: 'உயர் கல்வி பயிலும் எஸ்சி மாணவர்களுக்கு நிதி உதவி',
    category: 'Education & Learning',
    targetBeneficiary: ['Students'],
    department: 'Higher Education',
    schemeType: 'Scholarship',
    level: 'Central',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Educational Scholarship',
    implementedBy: 'Ministry of Social Justice and Empowerment',
  },
  {
    id: '7',
    name: 'Tamil Nadu Skill Development Mission',
    nameTA: 'தமிழ்நாடு திறன் மேம்பாட்டு திட்டம்',
    description: 'Free skill training programs for youth and job seekers',
    descriptionTA: 'இளைஞர்கள் மற்றும் வேலை ேடுபவர்களுக்கு இலவச திறன் பயிற்சி',
    category: 'Employment & Skill',
    targetBeneficiary: ['Youth'],
    department: 'Skill Development',
    schemeType: 'Skill Training',
    level: 'State',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Training',
    implementedBy: 'Tamil Nadu Skill Development Corporation',
  },
  {
    id: '8',
    name: 'Pradhan Mantri Awas Yojana',
    nameTA: 'பிரதான மந்திரி ஆவாஸ் யோஜனா',
    description: 'Affordable housing scheme for economically weaker sections',
    descriptionTA: 'பொருளாதார ரீதியாக பலவீனமான பிரிவினருக்கு மலிவு வீட்டுத் திட்டம்',
    category: 'Housing',
    targetBeneficiary: ['All'],
    department: 'Housing',
    schemeType: 'Loan/Subsidy',
    level: 'Central',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Housing Subsidy',
    implementedBy: 'Ministry of Housing and Urban Affairs',
  },
  {
    id: '9',
    name: 'Tamil Nadu Entrepreneur Development Scheme',
    nameTA: 'தமிழ்நாடு தொழில்முனைவோர் மேம்பாட்டு திட்டம்',
    description: 'Financial support and training for aspiring entrepreneurs',
    descriptionTA: 'வருங்கால தொழில்முனைவோருக்கு நிதி உதவி மற்றும் பயிற்சி',
    category: 'Business & Entrepreneurship',
    targetBeneficiary: ['Entrepreneurs'],
    department: 'MSME',
    schemeType: 'Grant',
    level: 'State',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Business Support',
    implementedBy: 'Department of Micro, Small and Medium Enterprises',
  },
  {
    id: '10',
    name: 'Disability Pension Scheme',
    nameTA: 'ஊனமுற்றோர் ஓய்வூதியத் திட்டம்',
    description: 'Monthly financial assistance for persons with disabilities',
    descriptionTA: 'ஊனமுற்றோருக்கு மாதாந்திர நிதி உதவி',
    category: 'Social Welfare',
    targetBeneficiary: ['Persons with Disabilities'],
    department: 'Social Welfare',
    schemeType: 'Pension',
    level: 'State',
    state: 'Tamil Nadu',
    status: 'Open for application',
    benefitType: 'Monthly Pension',
    implementedBy: 'Department of Differently Abled Welfare',
  },
];

// Generate more schemes to reach total count
const generateMoreSchemes = () => {
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
  const targets = ['Students', 'Farmers', 'Women', 'Senior Citizens', 'Youth', 'Entrepreneurs', 'Workers', 'Children'];
  const departments = ['Education', 'Agriculture', 'Health', 'Housing', 'Social Welfare', 'Labour', 'MSME', 'Rural Development'];
  const types = ['Scholarship', 'Loan/Subsidy', 'Pension', 'Insurance', 'Skill Training', 'Grant', 'Fellowship'];
  const levels = ['State', 'Central'];
  const statuses = ['Open for application', 'Closed / Inactive', 'Upcoming'];

  const moreSchemes = [];
  for (let i = 11; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const target = targets[Math.floor(Math.random() * targets.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    moreSchemes.push({
      id: `${i}`,
      name: `Tamil Nadu ${category} Scheme ${i}`,
      nameTA: `தமிழ்நாடு ${category} திட்டம் ${i}`,
      description: `Financial support and assistance for ${target} under ${category} category`,
      descriptionTA: `${category} பிரிவின் கீழ் ${target} க்கான நிதி உதவி`,
      category,
      targetBeneficiary: [target],
      department,
      schemeType: type,
      level,
      state: 'Tamil Nadu',
      status,
      benefitType: type,
      implementedBy: `Department of ${department}`,
    });
  }
  return moreSchemes;
};

const FULL_SCHEMES_DATA = [...ALL_SCHEMES_DATA, ...generateMoreSchemes()];

export function SchemesExplorer({ onBack, category, onSchemeClick }: SchemesExplorerProps) {
  const { theme, language } = useAuth();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSchemeTypes, setSelectedSchemeTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['Open for application']);
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 100]);
  const [incomeRange, setIncomeRange] = useState<string>('All');
  const [selectedCaste, setSelectedCaste] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [showCentralOnly, setShowCentralOnly] = useState(false);
  const [showStateOnly, setShowStateOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [schemeLevel, setSchemeLevel] = useState<'All' | 'State' | 'Central'>('All');
  const [schemeNameSearch, setSchemeNameSearch] = useState('');
  
  // New filter states for dashboard
  const [selectedResidence, setSelectedResidence] = useState<string[]>([]);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<string[]>([]);
  const [selectedDisabilityPercentage, setSelectedDisabilityPercentage] = useState<string[]>([]);
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState<string[]>([]);
  const [selectedOccupation, setSelectedOccupation] = useState<string[]>([]);
  const [selectedDifferentlyAbled, setSelectedDifferentlyAbled] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string[]>([]);
  const [selectedBelowPovertyLine, setSelectedBelowPovertyLine] = useState<string[]>([]);
  
  const schemesPerPage = 10;

  // Filter schemes
  const filteredSchemes = FULL_SCHEMES_DATA.filter((scheme) => {
    // Search filter
    if (searchQuery && !scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !scheme.department.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(scheme.category)) {
      return false;
    }
    
    // Target beneficiary filter
    if (selectedTargets.length > 0) {
      const hasMatch = scheme.targetBeneficiary.some(t => 
        selectedTargets.includes(t) || t === 'All'
      );
      if (!hasMatch) return false;
    }
    
    // Department filter
    if (selectedDepartments.length > 0 && !selectedDepartments.includes(scheme.department)) {
      return false;
    }
    
    // Scheme type filter
    if (selectedSchemeTypes.length > 0 && !selectedSchemeTypes.includes(scheme.schemeType)) {
      return false;
    }
    
    // Status filter
    if (selectedStatus.length > 0 && !selectedStatus.includes(scheme.status)) {
      return false;
    }
    
    // Level filter
    if (showCentralOnly && scheme.level !== 'Central') return false;
    if (showStateOnly && scheme.level !== 'State') return false;
    
    return true;
  });

  // Sort schemes
  const sortedSchemes = [...filteredSchemes].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'latest':
        return b.id.localeCompare(a.id);
      case 'closing':
        return a.status === 'Closed / Inactive' ? -1 : 1;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedSchemes.length / schemesPerPage);
  const paginatedSchemes = sortedSchemes.slice(
    (currentPage - 1) * schemesPerPage,
    currentPage * schemesPerPage
  );

  const toggleFilter = (value: string, array: string[], setter: (arr: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedTargets([]);
    setSelectedDepartments([]);
    setSelectedSchemeTypes([]);
    setSelectedStatus(['Open for application']);
    setAgeRange([0, 100]);
    setIncomeRange('All');
    setSelectedCaste([]);
    setSelectedGender([]);
    setShowCentralOnly(false);
    setShowStateOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header Image - 30vh */}
      <div className="relative h-[30vh] overflow-hidden">
        <img
          src={headerImage}
          alt="Tamil Nadu Colorful Skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      </div>

      {/* Top Header Bar */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        theme === 'dark'
          ? 'bg-black/80 border-green-500/20'
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-white/5 hover:bg-white/10 text-green-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-green-600'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'எளிதாகக் கண்டுபிடி' : 'EasyFind Scheme'}
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'Tamil' 
                    ? 'திட்டங்களைத் தேடுங்கள்...' 
                    : 'Search schemes by name, department, keyword…'}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <button className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 text-gray-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}>
                <Globe className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 text-gray-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}>
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 text-gray-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
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
          {/* Left Sidebar - Filters */}
          <aside className={`w-80 flex-shrink-0 rounded-2xl border backdrop-blur-xl p-6 h-fit sticky top-24 ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'Tamil' ? 'வடிகட்டிகள்' : 'Filters'}
                </h3>
              </div>
              <button
                onClick={clearAllFilters}
                className={`text-sm ${theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
              >
                {language === 'Tamil' ? 'அனைத்தையும் அழி' : 'Clear All'}
              </button>
            </div>

            {/* Fixed State Pill */}
            <div className="mb-6">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                theme === 'dark'
                  ? 'bg-green-500/20 border border-green-500/30'
                  : 'bg-green-100 border border-green-300'
              }`}>
                <MapPin className={`w-4 h-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                  {language === 'Tamil' ? 'மாநிலம்: தமிழ்நாடு (நிலையானது)' : 'State: Tamil Nadu (fixed)'}
                </span>
              </div>
            </div>

            <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              {/* Category Filter */}
              <div>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'வகை / துறை' : 'Category / Sector'}
                </h4>
                <div className="space-y-2">
                  {[
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
                    'Others',
                  ].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                        className="w-4 h-4 rounded border-green-500/30 text-green-500 focus:ring-green-500/50"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Target Beneficiary */}
              <div>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'இலக்கு பயனாளி' : 'Target Beneficiary'}
                </h4>
                <div className="space-y-2">
                  {[
                    'Students',
                    'Farmers',
                    'Women',
                    'Senior Citizens',
                    'Persons with Disabilities',
                    'Youth',
                    'Entrepreneurs',
                    'Workers',
                    'Children',
                  ].map((target) => (
                    <label key={target} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTargets.includes(target)}
                        onChange={() => toggleFilter(target, selectedTargets, setSelectedTargets)}
                        className="w-4 h-4 rounded border-green-500/30 text-green-500 focus:ring-green-500/50"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {target}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Department */}
              <div>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'துறை' : 'Department'}
                </h4>
                <div className="space-y-2">
                  {[
                    'Education',
                    'Higher Education',
                    'Agriculture',
                    'Rural Development',
                    'Social Welfare',
                    'Labour',
                    'MSME',
                    'Health',
                    'Housing',
                    'Skill Development',
                  ].map((dept) => (
                    <label key={dept} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept)}
                        onChange={() => toggleFilter(dept, selectedDepartments, setSelectedDepartments)}
                        className="w-4 h-4 rounded border-green-500/30 text-green-500 focus:ring-green-500/50"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {dept}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Scheme Type */}
              <div>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'திட்ட வகை' : 'Scheme Type / Benefit Type'}
                </h4>
                <div className="space-y-2">
                  {[
                    'Scholarship',
                    'Loan/Subsidy',
                    'Pension',
                    'Insurance',
                    'Skill Training',
                    'Grant',
                    'Fellowship',
                  ].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSchemeTypes.includes(type)}
                        onChange={() => toggleFilter(type, selectedSchemeTypes, setSelectedSchemeTypes)}
                        className="w-4 h-4 rounded border-green-500/30 text-green-500 focus:ring-green-500/50"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'நிலை' : 'Status / Application Window'}
                </h4>
                <div className="space-y-2">
                  {['Open for application', 'Closed / Inactive', 'Upcoming'].map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStatus.includes(status)}
                        onChange={() => toggleFilter(status, selectedStatus, setSelectedStatus)}
                        className="w-4 h-4 rounded border-green-500/30 text-green-500 focus:ring-green-500/50"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'கூடுதல் விருப்பங்கள்' : 'Additional Options'}
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCentralOnly}
                      onChange={(e) => {
                        setShowCentralOnly(e.target.checked);
                        if (e.target.checked) setShowStateOnly(false);
                      }}
                      className="w-4 h-4 rounded border-green-500/30 text-green-500 focus:ring-green-500/50"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'Tamil' 
                        ? 'மத்திய திட்டங்கள் மட்டும்' 
                        : 'Show only Central schemes'}
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showStateOnly}
                      onChange={(e) => {
                        setShowStateOnly(e.target.checked);
                        if (e.target.checked) setShowCentralOnly(false);
                      }}
                      className="w-4 h-4 rounded border-green-500/30 text-green-500 focus:ring-green-500/50"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'Tamil' 
                        ? 'மாநில திட்டங்கள் மட்டும்' 
                        : 'Show only Tamil Nadu State schemes'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Side - Schemes List */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="mb-6">
              <h2 className={`text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'தமிழ்நாட்டிற்கான திட்டங்கள்' : 'Schemes for Tamil Nadu'}
              </h2>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'Tamil' 
                    ? `தேர்ந்தெடுக்கப்பட்ட வடிகட்டிகளின் அடிப்படையில் தமிழ்நாட்டிற்கான ${filteredSchemes.length} திட்டங்களைக் காட்டுகிறது.`
                    : `Showing ${filteredSchemes.length} schemes for Tamil Nadu based on selected filters.`}
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-4 py-2 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
                      : 'bg-white border-gray-200 text-gray-900 [&>option]:bg-white'
                  }`}
                >
                  <option value="relevance">{language === 'Tamil' ? 'பொருத்தம்' : 'Relevance'}</option>
                  <option value="latest">{language === 'Tamil' ? 'சமீபத்தியது' : 'Latest updated'}</option>
                  <option value="alphabetical">{language === 'Tamil' ? 'அகர வரிசை' : 'Alphabetical (A–Z)'}</option>
                  <option value="closing">{language === 'Tamil' ? 'விரைவில் மூடப்படும்' : 'Closing soon'}</option>
                </select>
              </div>
            </div>

            {/* Schemes Cards */}
            <div className="space-y-4">
              {paginatedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className={`rounded-2xl border backdrop-blur-xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 hover:bg-white/10'
                      : 'bg-white border-gray-200 hover:shadow-lg'
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
                    <span className={`px-3 py-1 rounded-lg text-xs flex items-center gap-1 ${
                      theme === 'dark'
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-purple-100 text-purple-700 border border-purple-200'
                    }`}>
                      <Tag className="w-3 h-3" />
                      {scheme.category}
                    </span>
                    {scheme.targetBeneficiary.map((target, idx) => (
                      <span key={idx} className={`px-3 py-1 rounded-lg text-xs ${
                        theme === 'dark'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        {target}
                      </span>
                    ))}
                    <span className={`px-3 py-1 rounded-lg text-xs ${
                      theme === 'dark'
                        ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                        : 'bg-teal-100 text-teal-700 border border-teal-200'
                    }`}>
                      {scheme.schemeType}
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-2 mb-4 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Building2 className="w-4 h-4" />
                    <span>{language === 'Tamil' ? 'செயல்படுத்துபவர்:' : 'Implemented by:'}</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {scheme.implementedBy}
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-2 mb-4 text-sm ${
                    scheme.status === 'Open for application'
                      ? 'text-green-400'
                      : scheme.status === 'Closed / Inactive'
                      ? 'text-red-400'
                      : 'text-yellow-400'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>{scheme.status}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]">
                      {language === 'Tamil' ? 'விவரங்களைப் பார்க்க' : 'View details'}
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-green-500/20 text-gray-300 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}>
                      <ExternalLink className="w-4 h-4" />
                      {language === 'Tamil' ? 'அதிகாரப்பூர்வ தளம்' : 'Go to official site'}
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
                  className={`px-4 py-2 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    currentPage === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : theme === 'dark'
                        ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {language === 'Tamil' ? 'முந்தைய' : 'Previous'}
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400/30 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                          : theme === 'dark'
                            ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed'
                      : theme === 'dark'
                        ? 'bg-white/5 border-green-500/20 text-white hover:bg-white/10'
                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {language === 'Tamil' ? 'அடுத்து' : 'Next'}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}