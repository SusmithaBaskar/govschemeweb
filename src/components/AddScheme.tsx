import React, { useState } from 'react';
import { ArrowLeft, Plus, Save, CheckCircle, FileText, Users, Filter } from 'lucide-react';
import { schemesAPI } from '../services/api';

interface SchemeFormData {
  schemeName: string;
  description: string;
  benefits: string;
  eligibility: string;
  applicationProcess: string;
  documents: string;
  sourceLink: string;
  applyLink: string;
  minAge: string;
  maxAge: string;

  // multi-select checkbox fields as string[]
  gender: string[];
  caste: string[];
  residence: string[];
  maritalStatus: string[];
  employmentStatus: string[];
  occupation: string[];

  // single-value fields
  isStudent: string;
  belowPovertyLine: string;
  disabilityPercentage: string;
  differentlyAbled: string;
  incomeRange: string;
  category: string;
  level: string;
  implementedBy: string;
  benefitType: string;
}
type MultiSelectField = 'community';

export function AddScheme() {
  const [formData, setFormData] = useState({
    // Scheme Display Details
    schemeName: '',
    description: '',
    benefits: '',
    eligibility: '',
    applicationProcess: '',
    documents: '',
    sourceLink: '',
    applyLink: '',
    
    // Eligibility Criteria
    minAge: '',
    maxAge: '',
    gender: '',
    state: '',
    area: '',
    annualIncome: '', // Changed from minIncome/maxIncome to single dropdown
    educationLevel: '',
    isStudent: '',
    community: [] as string[], // Changed to array for checkboxes
    minority: '',
    disability: '',
    disabilityType: '',
    disabilityPercentage: '',
    employmentStatus: '',
    bplCategory: '',
    maritalStatus: '',
    pregnancyStatus: '',
    
    // Filter Options
    level: '',
    category: '',
    benefitType: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleCheckboxChange = (name: MultiSelectField, value: string) => {
  const currentValues = formData[name] as unknown as string[];

  const updatedValues = currentValues.includes(value)
    ? currentValues.filter((item) => item !== value)
    : [...currentValues, value];

  setFormData({
    ...formData,
    [name]: updatedValues,
  });

  setError('');
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await schemesAPI.add(formData);
      
      if (response.success) {
        setSuccess(true);
        // Show alert message
        alert('New Scheme Added');
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            schemeName: '',
            description: '',
            benefits: '',
            eligibility: '',
            applicationProcess: '',
            documents: '',
            sourceLink: '',
            applyLink: '',
            minAge: '',
            maxAge: '',
            gender: '',
            state: '',
            area: '',
            annualIncome: '',
            educationLevel: '',
            isStudent: '',
            community: [] as string[],
            minority: '',
            disability: '',
            disabilityType: '',
            disabilityPercentage: '',
            employmentStatus: '',
            bplCategory: '',
            maritalStatus: '',
            pregnancyStatus: '',
            level: '',
            category: '',
            benefitType: '',
          });
          setSuccess(false);
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add scheme. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.location.hash = 'admin';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden bg-black">
      {/* Animated liquid glass background - dark theme */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-500/30 to-green-600/30 rounded-full blur-3xl animate-pulse -z-10" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 shadow-[0_4px_16px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.25)] hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-[0_8px_24px_0_rgba(16,185,129,0.5)] backdrop-blur-sm border border-green-400/30">
              <Plus className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-3xl text-white mb-2 drop-shadow-sm">Add New Scheme</h1>
          <p className="text-gray-400">Fill in the details to add a new government scheme</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: SCHEME DISPLAY DETAILS */}
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_16px_64px_0_rgba(16,185,129,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-500/20">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-3 rounded-xl border border-green-400/30">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h2 className="text-xl text-white">Scheme Display Details</h2>
                  <p className="text-sm text-gray-400">Basic information about the scheme</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Scheme Name */}
                <div>
                  <label htmlFor="schemeName" className="block text-white mb-2 drop-shadow-sm">
                    Scheme Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="schemeName"
                    name="schemeName"
                    type="text"
                    value={formData.schemeName}
                    onChange={(e) => handleChange('schemeName', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="Enter scheme name"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-white mb-2 drop-shadow-sm">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500 resize-none"
                    placeholder="Enter scheme description..."
                    required
                  />
                </div>

                {/* Benefits */}
                <div>
                  <label htmlFor="benefits" className="block text-white mb-2 drop-shadow-sm">
                    Benefits <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={(e) => handleChange('benefits', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500 resize-none"
                    placeholder="List the benefits (one per line)..."
                    required
                  />
                </div>

                {/* Eligibility */}
                <div>
                  <label htmlFor="eligibility" className="block text-white mb-2 drop-shadow-sm">
                    Eligibility Criteria <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="eligibility"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={(e) => handleChange('eligibility', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500 resize-none"
                    placeholder="List eligibility criteria (one per line)..."
                    required
                  />
                </div>

                {/* Application Process */}
                <div>
                  <label htmlFor="applicationProcess" className="block text-white mb-2 drop-shadow-sm">
                    Application Process <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="applicationProcess"
                    name="applicationProcess"
                    value={formData.applicationProcess}
                    onChange={(e) => handleChange('applicationProcess', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500 resize-none"
                    placeholder="Describe the application process..."
                    required
                  />
                </div>

                {/* Documents */}
                <div>
                  <label htmlFor="documents" className="block text-white mb-2 drop-shadow-sm">
                    Required Documents <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="documents"
                    name="documents"
                    value={formData.documents}
                    onChange={(e) => handleChange('documents', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500 resize-none"
                    placeholder="List required documents (one per line)..."
                    required
                  />
                </div>

                {/* Source Link */}
                <div>
                  <label htmlFor="sourceLink" className="block text-white mb-2 drop-shadow-sm">
                    Source Link <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="sourceLink"
                    name="sourceLink"
                    type="url"
                    value={formData.sourceLink}
                    onChange={(e) => handleChange('sourceLink', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="https://example.gov.in/source"
                    required
                  />
                </div>

                {/* Apply Link */}
                <div>
                  <label htmlFor="applyLink" className="block text-white mb-2 drop-shadow-sm">
                    Apply Link <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="applyLink"
                    name="applyLink"
                    type="url"
                    value={formData.applyLink}
                    onChange={(e) => handleChange('applyLink', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="https://example.gov.in/apply"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: ELIGIBILITY CRITERIA */}
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_16px_64px_0_rgba(16,185,129,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-500/20">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 p-3 rounded-xl border border-blue-400/30">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl text-white">Eligibility Criteria</h2>
                  <p className="text-sm text-gray-400">Define who can apply for this scheme</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Age Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="minAge" className="block text-white mb-2 drop-shadow-sm">
                      Minimum Age
                    </label>
                    <input
                      id="minAge"
                      name="minAge"
                      type="number"
                      value={formData.minAge}
                      onChange={(e) => handleChange('minAge', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                      placeholder="e.g., 18"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxAge" className="block text-white mb-2 drop-shadow-sm">
                      Maximum Age
                    </label>
                    <input
                      id="maxAge"
                      name="maxAge"
                      type="number"
                      value={formData.maxAge}
                      onChange={(e) => handleChange('maxAge', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                      placeholder="e.g., 60"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-white mb-2 drop-shadow-sm">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                  >
                    <option value="" className="bg-gray-900">All Genders</option>
                    <option value="Male" className="bg-gray-900">Male</option>
                    <option value="Female" className="bg-gray-900">Female</option>
                    <option value="Transgender" className="bg-gray-900">Transgender</option>
                  </select>
                </div>

                {/* State and Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="state" className="block text-white mb-2 drop-shadow-sm">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    >
                      <option value="" className="bg-gray-900">All States</option>
                      {states.map(state => (
                        <option key={state} value={state} className="bg-gray-900">{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="area" className="block text-white mb-2 drop-shadow-sm">
                      Area
                    </label>
                    <select
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={(e) => handleChange('area', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    >
                      <option value="" className="bg-gray-900">All Areas</option>
                      <option value="Urban" className="bg-gray-900">Urban</option>
                      <option value="Rural" className="bg-gray-900">Rural</option>
                    </select>
                  </div>
                </div>

                {/* Annual Income Range */}
                <div>
                  <label htmlFor="annualIncome" className="block text-white mb-2 drop-shadow-sm">
                    Annual Income (₹)
                  </label>
                  <select
                    id="annualIncome"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={(e) => handleChange('annualIncome', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                  >
                    <option value="" className="bg-gray-900">All Income Levels</option>
                    <option value="No Income" className="bg-gray-900">No Income</option>
                    <option value="Below ₹1 Lakh" className="bg-gray-900">Below ₹1 Lakh</option>
                    <option value="₹1 - ₹3 Lakhs" className="bg-gray-900">₹1 - ₹3 Lakhs</option>
                    <option value="₹3 - ₹5 Lakhs" className="bg-gray-900">₹3 - ₹5 Lakhs</option>
                    <option value="₹5 - ₹10 Lakhs" className="bg-gray-900">₹5 - ₹10 Lakhs</option>
                    <option value="Above ₹10 Lakhs" className="bg-gray-900">Above ₹10 Lakhs</option>
                  </select>
                </div>

                {/* Education Level and Student Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="educationLevel" className="block text-white mb-2 drop-shadow-sm">
                      Education Level
                    </label>
                    <select
                      id="educationLevel"
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={(e) => handleChange('educationLevel', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    >
                      <option value="" className="bg-gray-900">All Levels</option>
                      <option value="No Education" className="bg-gray-900">No Education</option>
                      <option value="Primary" className="bg-gray-900">Primary (below 10th)</option>
                      <option value="Secondary (10th)" className="bg-gray-900">Secondary (10th)</option>
                      <option value="Higher Secondary (12th)" className="bg-gray-900">Higher Secondary (12th)</option>
                      <option value="Diploma" className="bg-gray-900">Diploma</option>
                      <option value="Graduation" className="bg-gray-900">Graduation</option>
                      <option value="Post Graduation" className="bg-gray-900">Post Graduation</option>
                      <option value="PhD" className="bg-gray-900">PhD</option>
                      <option value="Professional Degree" className="bg-gray-900">Professional Degree</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="isStudent" className="block text-white mb-2 drop-shadow-sm">
                      Are you a student?
                    </label>
                    <select
                      id="isStudent"
                      name="isStudent"
                      value={formData.isStudent}
                      onChange={(e) => handleChange('isStudent', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    >
                      <option value="" className="bg-gray-900">All</option>
                      <option value="Yes" className="bg-gray-900">Yes</option>
                      <option value="No" className="bg-gray-900">No</option>
                    </select>
                  </div>
                </div>

                {/* Community and Minority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="community" className="block text-white mb-2 drop-shadow-sm">
                      Community
                    </label>
                    <div className="space-y-2">
                      {['General', 'SC', 'ST', 'OBC', 'BC', 'MBC', 'DNC'].map((communityOption) => (
                        <label key={communityOption} className="flex items-center">
                          <input
                            type="checkbox"
                            name="community"
                            value={communityOption}
                            checked={formData.community.includes(communityOption)}
                            onChange={(e) => handleCheckboxChange('community', e.target.value)}
                            className="w-5 h-5 rounded border-green-500/30 text-green-500 focus:ring-green-500/50 bg-white/5"
                          />
                          <span className="ml-3 text-gray-300">
                            {communityOption === 'SC' ? 'Scheduled Caste (SC)' :
                             communityOption === 'ST' ? 'Scheduled Tribe (ST)' :
                             communityOption === 'OBC' ? 'Other Backward Class (OBC)' :
                             communityOption === 'BC' ? 'Backward Class (BC)' :
                             communityOption === 'MBC' ? 'Most Backward Class (MBC)' :
                             communityOption === 'DNC' ? 'Denotified Community (DNC)' :
                             communityOption}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="minority" className="block text-white mb-2 drop-shadow-sm">
                      Minority
                    </label>
                    <select
                      id="minority"
                      name="minority"
                      value={formData.minority}
                      onChange={(e) => handleChange('minority', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    >
                      <option value="" className="bg-gray-900">All</option>
                      <option value="Yes" className="bg-gray-900">Yes</option>
                      <option value="No" className="bg-gray-900">No</option>
                    </select>
                  </div>
                </div>

                {/* Disability */}
                <div>
                  <label htmlFor="disability" className="block text-white mb-2 drop-shadow-sm">
                    Disability
                  </label>
                  <select
                    id="disability"
                    name="disability"
                    value={formData.disability}
                    onChange={(e) => handleChange('disability', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                  >
                    <option value="" className="bg-gray-900">All</option>
                    <option value="Yes" className="bg-gray-900">Yes</option>
                    <option value="No" className="bg-gray-900">No</option>
                  </select>
                </div>

                {/* Disability Type and Percentage - Conditional */}
                {formData.disability === 'Yes' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="disabilityType" className="block text-white mb-2 drop-shadow-sm">
                        Disability Type
                      </label>
                      <select
                        id="disabilityType"
                        name="disabilityType"
                        value={formData.disabilityType}
                        onChange={(e) => handleChange('disabilityType', e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                      >
                        <option value="" className="bg-gray-900">Select Type</option>
                        <option value="Physical" className="bg-gray-900">Physical</option>
                        <option value="Visual" className="bg-gray-900">Visual</option>
                        <option value="Hearing" className="bg-gray-900">Hearing</option>
                        <option value="Speech" className="bg-gray-900">Speech</option>
                        <option value="Intellectual" className="bg-gray-900">Intellectual</option>
                        <option value="Mental Illness" className="bg-gray-900">Mental Illness</option>
                        <option value="Multiple Disabilities" className="bg-gray-900">Multiple Disabilities</option>
                        <option value="Other" className="bg-gray-900">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="disabilityPercentage" className="block text-white mb-2 drop-shadow-sm">
                        Disability Percentage (%)
                      </label>
                      <input
                        id="disabilityPercentage"
                        name="disabilityPercentage"
                        type="number"
                        value={formData.disabilityPercentage}
                        onChange={(e) => handleChange('disabilityPercentage', e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                        placeholder="e.g., 40"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                )}

                {/* Employment Status and BPL Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="employmentStatus" className="block text-white mb-2 drop-shadow-sm">
                      Employment Status
                    </label>
                    <select
                      id="employmentStatus"
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={(e) => handleChange('employmentStatus', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    >
                      <option value="" className="bg-gray-900">All</option>
                      <option value="Employed" className="bg-gray-900">Employed</option>
                      <option value="Unemployed" className="bg-gray-900">Unemployed</option>
                      <option value="Self-Employed" className="bg-gray-900">Self-Employed</option>
                      <option value="Retired" className="bg-gray-900">Retired</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bplCategory" className="block text-white mb-2 drop-shadow-sm">
                      BPL Category
                    </label>
                    <select
                      id="bplCategory"
                      name="bplCategory"
                      value={formData.bplCategory}
                      onChange={(e) => handleChange('bplCategory', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    >
                      <option value="" className="bg-gray-900">All</option>
                      <option value="Yes" className="bg-gray-900">Yes</option>
                      <option value="No" className="bg-gray-900">No</option>
                    </select>
                  </div>
                </div>

                {/* Marital Status and Pregnancy Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="maritalStatus" className="block text-white mb-2 drop-shadow-sm">
                      Marital Status
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={(e) => handleChange('maritalStatus', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    >
                      <option value="" className="bg-gray-900">All</option>
                      <option value="Single" className="bg-gray-900">Single</option>
                      <option value="Married" className="bg-gray-900">Married</option>
                      <option value="Widowed" className="bg-gray-900">Widowed</option>
                      <option value="Divorced" className="bg-gray-900">Divorced</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pregnancyStatus" className="block text-white mb-2 drop-shadow-sm">
                      Pregnancy Status
                    </label>
                    <select
                      id="pregnancyStatus"
                      name="pregnancyStatus"
                      value={formData.pregnancyStatus}
                      onChange={(e) => handleChange('pregnancyStatus', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    >
                      <option value="" className="bg-gray-900">All</option>
                      <option value="Yes" className="bg-gray-900">Yes</option>
                      <option value="No" className="bg-gray-900">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: FILTER OPTIONS */}
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_16px_64px_0_rgba(16,185,129,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-500/20">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-3 rounded-xl border border-purple-400/30">
                  <Filter className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl text-white">Filter Options</h2>
                  <p className="text-sm text-gray-400">Classification and filtering criteria</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Level */}
                <div>
                  <label htmlFor="level" className="block text-white mb-2 drop-shadow-sm">
                    Level <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={(e) => handleChange('level', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    required
                  >
                    <option value="" className="bg-gray-900">Select Level</option>
                    <option value="Central" className="bg-gray-900">Central</option>
                    <option value="State" className="bg-gray-900">State</option>
                    <option value="District" className="bg-gray-900">District</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-white mb-2 drop-shadow-sm">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    required
                  >
                    <option value="" className="bg-gray-900">Select Category</option>
                    <option value="Education Schemes" className="bg-gray-900">Education Schemes</option>
                    <option value="Women Welfare Schemes" className="bg-gray-900">Women Welfare Schemes</option>
                    <option value="Agriculture and Farmers Welfare Schemes" className="bg-gray-900">Agriculture and Farmers Welfare Schemes</option>
                    <option value="Health and Medical Schemes" className="bg-gray-900">Health and Medical Schemes</option>
                    <option value="Social Welfare Schemes" className="bg-gray-900">Social Welfare Schemes</option>
                    <option value="Housing and Basic Amenities Schemes" className="bg-gray-900">Housing and Basic Amenities Schemes</option>
                    <option value="Employment and Skill Development Schemes" className="bg-gray-900">Employment and Skill Development Schemes</option>
                    <option value="Food Security and Nutrition Schemes" className="bg-gray-900">Food Security and Nutrition Schemes</option>
                    <option value="Transport and Travel Concession Schemes" className="bg-gray-900">Transport and Travel Concession Schemes</option>
                    <option value="Children and Youth Welfare Schemes" className="bg-gray-900">Children and Youth Welfare Schemes</option>
                    <option value="Digital Services and Governance Schemes" className="bg-gray-900">Digital Services and Governance Schemes</option>
                    <option value="Others" className="bg-gray-900">Others</option>
                  </select>
                </div>

                {/* Benefit Type */}
                <div>
                  <label htmlFor="benefitType" className="block text-white mb-2 drop-shadow-sm">
                    Benefit Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="benefitType"
                    name="benefitType"
                    value={formData.benefitType}
                    onChange={(e) => handleChange('benefitType', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                    required
                  >
                    <option value="" className="bg-gray-900">Select Benefit Type</option>
                    <option value="Cash" className="bg-gray-900">Cash</option>
                    <option value="Kind" className="bg-gray-900">Kind</option>
                    <option value="Composite" className="bg-gray-900">Composite</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-6 shadow-[0_16px_64px_0_rgba(16,185,129,0.3)]">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-green-400/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Scheme'}
            </button>

            {/* Success Message */}
            {success && (
              <div className="flex items-center justify-center gap-2 text-green-400 mt-4">
                <CheckCircle className="w-5 h-5" />
                Scheme added successfully!
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-400 mt-4">
                <CheckCircle className="w-5 h-5" />
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}