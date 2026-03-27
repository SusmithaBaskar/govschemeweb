import React, { useState } from 'react';
import { useAuth } from '../App';
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Lock,
  Unlock,
  Info,
} from 'lucide-react';

interface ApplyFormProps {
  scheme: any;
  onBack: () => void;
}

export function ApplyForm({ scheme, onBack }: ApplyFormProps) {
  const { userDetails, theme, language } = useAuth() as any;

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: userDetails?.name || '',
    email: userDetails?.email || '',
    phone: '',
    dateOfBirth: '',
    gender: userDetails?.gender || '',
    fatherName: '',
    motherName: '',
    
    // Address Information
    address: '',
    city: '',
    district: '',
    state: userDetails?.state || 'Tamil Nadu',
    pincode: '',
    
    // Additional Information
    occupation: userDetails?.occupation || '',
    annualIncome: userDetails?.incomeRange || '',
    community: userDetails?.community || '',
    educationLevel: userDetails?.educationLevel || '',
    
    // Bank Details
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
    
    // Documents
    photoUpload: null as File | null,
    aadharUpload: null as File | null,
    incomeUpload: null as File | null,
    communityUpload: null as File | null,
    educationUpload: null as File | null,
    bankPassbookUpload: null as File | null,
    
    // Declaration
    declaration: false,
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Check if form is complete
  const isFormComplete = () => {
    const requiredFields = [
      formData.fullName,
      formData.email,
      formData.phone,
      formData.dateOfBirth,
      formData.gender,
      formData.address,
      formData.city,
      formData.pincode,
      formData.bankName,
      formData.accountNumber,
      formData.ifscCode,
      formData.photoUpload,
      formData.aadharUpload,
      formData.declaration,
    ];
    
    return requiredFields.every(field => field !== '' && field !== null && field !== false);
  };
  
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete()) {
      setShowSuccessModal(true);
    }
  };
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        theme === 'dark'
          ? 'bg-black/80 border-green-500/20'
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
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
            <div>
              <h1 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'à®¤à®¿à®Ÿà¯à®Ÿà®¤à¯à®¤à®¿à®±à¯à®•à¯ à®µà®¿à®£à¯à®£à®ªà¯à®ªà®¿à®•à¯à®•à®µà¯à®®à¯' : 'Apply for Scheme'}
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'Tamil' ? 'à®…à®©à¯ˆà®¤à¯à®¤à¯ à®µà®¿à®µà®°à®™à¯à®•à®³à¯ˆà®¯à¯à®®à¯ à®•à®µà®©à®®à®¾à®• à®¨à®¿à®°à®ªà¯à®ªà®µà¯à®®à¯' : 'Fill all details carefully'}
              </p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Scheme Info Card */}
        <div className={`rounded-2xl border backdrop-blur-xl p-6 mb-8 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30'
            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <FileText className={`w-6 h-6 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {scheme.name || 'Prime Minister Scholarship Scheme'}
              </h2>
              <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {scheme.description || 'Scholarship for meritorious students'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs ${
                  theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  {scheme.category || 'Education'}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs ${
                  theme === 'dark'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-purple-100 text-purple-700 border border-purple-200'
                }`}>
                  {scheme.level || 'Central'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Personal Information */}
          <div className={`rounded-2xl border backdrop-blur-xl p-6 ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                1
              </div>
              <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'à®¤à®©à®¿à®ªà¯à®ªà®Ÿà¯à®Ÿ à®¤à®•à®µà®²à¯' : 'Personal Information'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®®à¯à®´à¯ à®ªà¯†à®¯à®°à¯' : 'Full Name'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              {/* Email */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®®à®¿à®©à¯à®©à®žà¯à®šà®²à¯' : 'Email'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter email"
                  required
                />
              </div>
              
              {/* Phone */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®¤à¯Šà®²à¯ˆà®ªà¯‡à®šà®¿ à®Žà®£à¯' : 'Phone Number'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              
              {/* Date of Birth */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®ªà®¿à®±à®¨à¯à®¤ à®¤à¯‡à®¤à®¿' : 'Date of Birth'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white'
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                  required
                />
              </div>
              
              {/* Gender */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®ªà®¾à®²à®¿à®©à®®à¯' : 'Gender'} <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white [&>option]:bg-gray-900'
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                </select>
              </div>
              
              {/* Father's Name */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®¤à®¨à¯à®¤à¯ˆà®¯à®¿à®©à¯ à®ªà¯†à®¯à®°à¯' : "Father's Name"}
                </label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter father's name"
                />
              </div>
              
              {/* Mother's Name */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®¤à®¾à®¯à®¿à®©à¯ à®ªà¯†à®¯à®°à¯' : "Mother's Name"}
                </label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter mother's name"
                />
              </div>
            </div>
          </div>
          
          {/* Section 2: Address Information */}
          <div className={`rounded-2xl border backdrop-blur-xl p-6 ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                2
              </div>
              <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'à®®à¯à®•à®µà®°à®¿ à®¤à®•à®µà®²à¯' : 'Address Information'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Address */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®®à¯à®•à®µà®°à®¿' : 'Address'} <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter complete address"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'Tamil' ? 'à®¨à®•à®°à®®à¯' : 'City'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Enter city"
                    required
                  />
                </div>
                
                {/* District */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'Tamil' ? 'à®®à®¾à®µà®Ÿà¯à®Ÿà®®à¯' : 'District'}
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Enter district"
                  />
                </div>
                
                {/* State */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'Tamil' ? 'à®®à®¾à®¨à®¿à®²à®®à¯' : 'State'}
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    readOnly
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl ${
                      theme === 'dark'
                        ? 'bg-white/5 border-green-500/20 text-gray-400'
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }`}
                  />
                </div>
                
                {/* Pincode */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'Tamil' ? 'à®…à®žà¯à®šà®²à¯ à®•à¯à®±à®¿à®¯à¯€à®Ÿà¯' : 'Pincode'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Enter pincode"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 3: Additional Information */}
          <div className={`rounded-2xl border backdrop-blur-xl p-6 ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                3
              </div>
              <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'à®•à¯‚à®Ÿà¯à®¤à®²à¯ à®¤à®•à®µà®²à¯' : 'Additional Information'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Occupation */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®¤à¯Šà®´à®¿à®²à¯' : 'Occupation'}
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter occupation"
                />
              </div>
              
              {/* Annual Income */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®†à®£à¯à®Ÿà¯ à®µà®°à¯à®®à®¾à®©à®®à¯' : 'Annual Income'}
                </label>
                <input
                  type="text"
                  value={formData.annualIncome}
                  onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter annual income"
                />
              </div>
              
              {/* Community */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®šà®®à¯‚à®•à®®à¯' : 'Community'}
                </label>
                <input
                  type="text"
                  value={formData.community}
                  onChange={(e) => handleInputChange('community', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter community"
                />
              </div>
              
              {/* Education Level */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®•à®²à¯à®µà®¿ à®¨à®¿à®²à¯ˆ' : 'Education Level'}
                </label>
                <input
                  type="text"
                  value={formData.educationLevel}
                  onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter education level"
                />
              </div>
            </div>
          </div>
          
          {/* Section 4: Bank Details */}
          <div className={`rounded-2xl border backdrop-blur-xl p-6 ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                4
              </div>
              <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'à®µà®™à¯à®•à®¿ à®µà®¿à®µà®°à®™à¯à®•à®³à¯' : 'Bank Details'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bank Name */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®µà®™à¯à®•à®¿ à®ªà¯†à®¯à®°à¯' : 'Bank Name'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter bank name"
                  required
                />
              </div>
              
              {/* Account Number */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®•à®£à®•à¯à®•à¯ à®Žà®£à¯' : 'Account Number'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter account number"
                  required
                />
              </div>
              
              {/* IFSC Code */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'IFSC à®•à¯à®±à®¿à®¯à¯€à®Ÿà¯' : 'IFSC Code'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter IFSC code"
                  required
                />
              </div>
              
              {/* Branch Name */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®•à®¿à®³à¯ˆ à®ªà¯†à®¯à®°à¯' : 'Branch Name'}
                </label>
                <input
                  type="text"
                  value={formData.branchName}
                  onChange={(e) => handleInputChange('branchName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-green-500/20 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter branch name"
                />
              </div>
            </div>
          </div>
          
          {/* Section 5: Document Uploads */}
          <div className={`rounded-2xl border backdrop-blur-xl p-6 ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                5
              </div>
              <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'à®†à®µà®£à®™à¯à®•à®³à¯ à®ªà®¤à®¿à®µà¯‡à®±à¯à®±à®®à¯' : 'Document Uploads'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Photo Upload */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®ªà¯à®•à¯ˆà®ªà¯à®ªà®Ÿà®®à¯' : 'Passport Size Photo'} <span className="text-red-400">*</span>
                </label>
                <div className={`relative border-2 border-dashed rounded-xl p-4 ${
                  formData.photoUpload
                    ? theme === 'dark'
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-green-400 bg-green-50'
                    : theme === 'dark'
                      ? 'border-green-500/20 bg-white/5'
                      : 'border-gray-200 bg-gray-50'
                }`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload('photoUpload', e)}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    {formData.photoUpload ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          {formData.photoUpload.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Click to upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Aadhar Card */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®†à®¤à®¾à®°à¯ à®…à®Ÿà¯à®Ÿà¯ˆ' : 'Aadhar Card'} <span className="text-red-400">*</span>
                </label>
                <div className={`relative border-2 border-dashed rounded-xl p-4 ${
                  formData.aadharUpload
                    ? theme === 'dark'
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-green-400 bg-green-50'
                    : theme === 'dark'
                      ? 'border-green-500/20 bg-white/5'
                      : 'border-gray-200 bg-gray-50'
                }`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload('aadharUpload', e)}
                    accept="application/pdf,image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    {formData.aadharUpload ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          {formData.aadharUpload.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Click to upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Income Certificate */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®µà®°à¯à®®à®¾à®© à®šà®¾à®©à¯à®±à®¿à®¤à®´à¯' : 'Income Certificate'}
                </label>
                <div className={`relative border-2 border-dashed rounded-xl p-4 ${
                  formData.incomeUpload
                    ? theme === 'dark'
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-green-400 bg-green-50'
                    : theme === 'dark'
                      ? 'border-green-500/20 bg-white/5'
                      : 'border-gray-200 bg-gray-50'
                }`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload('incomeUpload', e)}
                    accept="application/pdf,image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    {formData.incomeUpload ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          {formData.incomeUpload.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Click to upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Community Certificate */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®šà®®à¯‚à®• à®šà®¾à®©à¯à®±à®¿à®¤à®´à¯' : 'Community Certificate'}
                </label>
                <div className={`relative border-2 border-dashed rounded-xl p-4 ${
                  formData.communityUpload
                    ? theme === 'dark'
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-green-400 bg-green-50'
                    : theme === 'dark'
                      ? 'border-green-500/20 bg-white/5'
                      : 'border-gray-200 bg-gray-50'
                }`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload('communityUpload', e)}
                    accept="application/pdf,image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    {formData.communityUpload ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          {formData.communityUpload.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Click to upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Education Certificate */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®•à®²à¯à®µà®¿ à®šà®¾à®©à¯à®±à®¿à®¤à®´à¯' : 'Education Certificate'}
                </label>
                <div className={`relative border-2 border-dashed rounded-xl p-4 ${
                  formData.educationUpload
                    ? theme === 'dark'
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-green-400 bg-green-50'
                    : theme === 'dark'
                      ? 'border-green-500/20 bg-white/5'
                      : 'border-gray-200 bg-gray-50'
                }`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload('educationUpload', e)}
                    accept="application/pdf,image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    {formData.educationUpload ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          {formData.educationUpload.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Click to upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Bank Passbook */}
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'Tamil' ? 'à®µà®™à¯à®•à®¿ à®ªà®¾à®¸à¯à®ªà¯à®•à¯' : 'Bank Passbook / Cancelled Cheque'}
                </label>
                <div className={`relative border-2 border-dashed rounded-xl p-4 ${
                  formData.bankPassbookUpload
                    ? theme === 'dark'
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-green-400 bg-green-50'
                    : theme === 'dark'
                      ? 'border-green-500/20 bg-white/5'
                      : 'border-gray-200 bg-gray-50'
                }`}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload('bankPassbookUpload', e)}
                    accept="application/pdf,image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    {formData.bankPassbookUpload ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          {formData.bankPassbookUpload.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Click to upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 6: Declaration */}
          <div className={`rounded-2xl border backdrop-blur-xl p-6 ${
            theme === 'dark'
              ? 'bg-white/5 border-green-500/20'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                6
              </div>
              <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'à®…à®±à®¿à®µà®¿à®ªà¯à®ªà¯' : 'Declaration'}
              </h3>
            </div>
            
            <div className={`p-4 rounded-xl mb-4 ${
              theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex gap-3">
                <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                  {language === 'Tamil' 
                    ? 'à®¨à®¾à®©à¯ à®‡à®™à¯à®•à¯ à®µà®´à®™à¯à®•à®¿à®¯ à®…à®©à¯ˆà®¤à¯à®¤à¯ à®¤à®•à®µà®²à¯à®•à®³à¯à®®à¯ à®Žà®©à¯ à®…à®±à®¿à®µà®¿à®©à¯à®ªà®Ÿà®¿ à®‰à®£à¯à®®à¯ˆ à®®à®±à¯à®±à¯à®®à¯ à®šà®°à®¿à®¯à®¾à®©à®µà¯ˆ à®Žà®©à¯à®ªà®¤à¯ˆ à®‰à®±à¯à®¤à®¿à®ªà¯à®ªà®Ÿà¯à®¤à¯à®¤à¯à®•à®¿à®±à¯‡à®©à¯. à®¤à®µà®±à®¾à®© à®¤à®•à®µà®²à¯ à®µà®´à®™à¯à®•à®¿à®©à®¾à®²à¯ à®šà®Ÿà¯à®Ÿ à®¨à®Ÿà®µà®Ÿà®¿à®•à¯à®•à¯ˆà®•à¯à®•à¯ à®‰à®Ÿà¯à®ªà®Ÿà¯à®¤à¯à®¤à®ªà¯à®ªà®Ÿà¯à®µà¯‡à®©à¯ à®Žà®©à¯à®ªà®¤à¯ˆ à®à®±à¯à®±à¯à®•à¯à®•à¯Šà®³à¯à®•à®¿à®±à¯‡à®©à¯.'
                    : 'I hereby declare that all the information provided by me is true and correct to the best of my knowledge. I understand that providing false information may lead to legal action.'}
                </p>
              </div>
            </div>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.declaration}
                onChange={(e) => handleInputChange('declaration', e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-green-500/30 text-green-500 focus:ring-green-500/50"
                required
              />
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'Tamil'
                  ? 'à®®à¯‡à®²à¯‡ à®‰à®³à¯à®³ à®…à®±à®¿à®µà®¿à®ªà¯à®ªà¯ˆ à®ªà®Ÿà®¿à®¤à¯à®¤à¯ à®à®±à¯à®±à¯à®•à¯à®•à¯Šà®³à¯à®•à®¿à®±à¯‡à®©à¯'
                  : 'I have read and accept the above declaration'} <span className="text-red-400">*</span>
              </span>
            </label>
          </div>
          
          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              {isFormComplete() ? (
                <>
                  <Unlock className="w-5 h-5 text-green-400" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    {language === 'Tamil' ? 'à®ªà®Ÿà®¿à®µà®®à¯ à®¨à®¿à®°à®®à¯à®ªà®¿à®¯à®¤à¯' : 'Form Complete'}
                  </span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-yellow-400" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {language === 'Tamil' ? 'à®…à®©à¯ˆà®¤à¯à®¤à¯ à®¤à¯‡à®µà¯ˆà®¯à®¾à®© à®ªà¯à®²à®™à¯à®•à®³à¯ˆà®¯à¯à®®à¯ à®¨à®¿à®°à®ªà¯à®ªà®µà¯à®®à¯' : 'Please fill all required fields'}
                  </span>
                </>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!isFormComplete()}
              className={`px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                isFormComplete()
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                  : 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isFormComplete() ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
              {language === 'Tamil' ? 'à®µà®¿à®£à¯à®£à®ªà¯à®ªà®¤à¯à®¤à¯ˆ à®šà®®à®°à¯à®ªà¯à®ªà®¿à®•à¯à®•à®µà¯à®®à¯' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`max-w-md w-full rounded-2xl border backdrop-blur-xl p-6 ${
            theme === 'dark'
              ? 'bg-gray-900/90 border-green-500/20'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Info className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              
              <h3 className={`text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'Tamil' ? 'à®…à®®à¯à®š à®µà®¿à®°à¯à®ªà¯à®ªà®®à¯' : 'Feature Option'}
              </h3>
              
              <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'Tamil'
                  ? 'à®‡à®¤à¯ à®’à®°à¯ à®Ÿà¯†à®®à¯‹ à®…à®®à¯à®šà®®à¯. à®‰à®£à¯à®®à¯ˆà®¯à®¾à®© à®µà®¿à®£à¯à®£à®ªà¯à®ª à®šà¯†à®¯à®²à¯à®ªà®¾à®Ÿà¯ à®¤à®±à¯à®ªà¯‹à®¤à¯ à®•à®¿à®Ÿà¯ˆà®•à¯à®•à®µà®¿à®²à¯à®²à¯ˆ. à®‰à®£à¯à®®à¯ˆà®¯à®¾à®© à®¤à®¿à®Ÿà¯à®Ÿà®™à¯à®•à®³à¯à®•à¯à®•à¯ à®µà®¿à®£à¯à®£à®ªà¯à®ªà®¿à®•à¯à®•, à®…à®¤à®¿à®•à®¾à®°à®ªà¯à®ªà¯‚à®°à¯à®µ à®…à®°à®šà¯ à®‡à®£à¯ˆà®¯à®¤à®³à®™à¯à®•à®³à¯ˆà®ªà¯ à®ªà®¾à®°à¯à®µà¯ˆà®¯à®¿à®Ÿà®µà¯à®®à¯.'
                  : 'This is a demo feature. Actual application submission is not available at the moment. To apply for real schemes, please visit the official government websites.'}
              </p>
              
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onBack();
                }}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]"
              >
                {language === 'Tamil' ? 'à®ªà¯à®°à®¿à®¨à¯à®¤à®¤à¯' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}