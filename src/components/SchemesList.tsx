import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Search, Edit2, Trash2, X, Check, Eye, Link as LinkIcon, Tag, MapPin, Banknote } from 'lucide-react';

type Scheme = {
  id: number;
  scheme_name: string;
  translation_id: string;
  category: string;
  level: string;
  benefit_type: string;
  apply_link: string;
  description: string;
  benefits: string;
  eligibility: string;
  documents: string;
  application_process: string;
  is_active: number;
  created_at: string;
  updated_at: string;
};

// Mock schemes data
const MOCK_SCHEMES: Scheme[] = [
  {
    id: 1,
    scheme_name: 'Prime Minister Scholarship Scheme',
    translation_id: 'pm_scholarship',
    category: 'Education',
    level: 'Central',
    benefit_type: 'Cash',
    apply_link: 'https://scholarships.gov.in',
    description: 'Financial assistance for meritorious students pursuing higher education',
    benefits: '• Monthly scholarship of ₹2,500-₹3,000\n• Annual scholarship amount\n• No repayment required',
    eligibility: '• Indian citizen\n• Passed 12th with 60% or above\n• Family income less than ₹6 lakhs per annum',
    documents: '• Aadhaar Card\n• 12th Mark Sheet\n• Income Certificate\n• Bank Account Details',
    application_process: '1. Visit official portal\n2. Register with details\n3. Upload documents\n4. Submit application',
    is_active: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    scheme_name: 'Pradhan Mantri Matru Vandana Yojana',
    translation_id: 'pm_maternity',
    category: 'Health',
    level: 'Central',
    benefit_type: 'Cash',
    apply_link: 'https://pmmvy.wcd.gov.in',
    description: 'Maternity benefit scheme providing financial assistance to pregnant women',
    benefits: '• ₹5,000 in installments\n• Direct cash transfer\n• Nutritional support',
    eligibility: '• Pregnant women\n• First live birth\n• Age 19 years or above',
    documents: '• Aadhaar Card\n• Pregnancy Certificate\n• Bank Account Details\n• MCP Card',
    application_process: '1. Visit Anganwadi Center\n2. Register with details\n3. Submit documents\n4. Receive installments',
    is_active: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    scheme_name: 'PM-KISAN',
    translation_id: 'pm_kisan',
    category: 'Agriculture',
    level: 'Central',
    benefit_type: 'Cash',
    apply_link: 'https://pmkisan.gov.in',
    description: 'Income support to all farmer families',
    benefits: '• ₹6,000 per year\n• Three equal installments\n• Direct bank transfer',
    eligibility: '• Small and marginal farmers\n• Landholding in name\n• Valid bank account',
    documents: '• Aadhaar Card\n• Land ownership documents\n• Bank Account Details',
    application_process: '1. Visit PM-KISAN portal\n2. Click on Farmers Corner\n3. Fill application\n4. Submit documents',
    is_active: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function SchemesList() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // View modal state
  const [viewingScheme, setViewingScheme] = useState<Scheme | null>(null);
  
  // Edit modal state
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [editForm, setEditForm] = useState({
    schemeName: '',
    category: '',
    level: '',
    benefitType: '',
    applyLink: '',
    description: '',
    benefits: '',
    eligibility: '',
    documents: '',
    applicationProcess: ''
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  
  // Delete confirmation state
  const [deletingSchemeId, setDeletingSchemeId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      
      // Get schemes from localStorage
      const storedSchemes = localStorage.getItem('easyfind_schemes');
      
      if (storedSchemes) {
        setSchemes(JSON.parse(storedSchemes));
      } else {
        // Initialize with mock data if no schemes exist
        localStorage.setItem('easyfind_schemes', JSON.stringify(MOCK_SCHEMES));
        setSchemes(MOCK_SCHEMES);
      }
    } catch (err: any) {
      setError('Failed to load schemes');
      console.error('Error loading schemes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (scheme: Scheme) => {
    setViewingScheme(scheme);
  };

  const handleEdit = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setEditForm({
      schemeName: scheme.scheme_name,
      category: scheme.category,
      level: scheme.level,
      benefitType: scheme.benefit_type,
      applyLink: scheme.apply_link,
      description: scheme.description,
      benefits: scheme.benefits,
      eligibility: scheme.eligibility,
      documents: scheme.documents,
      applicationProcess: scheme.application_process
    });
    setEditError('');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScheme) return;

    setEditLoading(true);
    setEditError('');

    try {
      // Update scheme in localStorage
      const updatedSchemes = schemes.map(s => 
        s.id === editingScheme.id 
          ? { 
              ...s, 
              scheme_name: editForm.schemeName,
              category: editForm.category,
              level: editForm.level,
              benefit_type: editForm.benefitType,
              apply_link: editForm.applyLink,
              description: editForm.description,
              benefits: editForm.benefits,
              eligibility: editForm.eligibility,
              documents: editForm.documents,
              application_process: editForm.applicationProcess,
              updated_at: new Date().toISOString()
            }
          : s
      );
      
      localStorage.setItem('easyfind_schemes', JSON.stringify(updatedSchemes));
      setSchemes(updatedSchemes);
      setEditingScheme(null);
    } catch (err: any) {
      setEditError(err.message || 'Failed to update scheme');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (schemeId: number) => {
    setDeleteLoading(true);

    try {
      // Remove from localStorage
      const updatedSchemes = schemes.filter(s => s.id !== schemeId);
      localStorage.setItem('easyfind_schemes', JSON.stringify(updatedSchemes));
      setSchemes(updatedSchemes);
      setDeletingSchemeId(null);
    } catch (err: any) {
      alert('Failed to delete scheme: ' + err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBackToAdmin = () => {
    window.location.hash = 'admin';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const filteredSchemes = schemes.filter(scheme =>
    scheme.scheme_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Education': 'from-blue-500 to-cyan-600',
      'Health': 'from-red-500 to-pink-600',
      'Agriculture': 'from-green-500 to-emerald-600',
      'Women': 'from-purple-500 to-pink-600',
      'Social Welfare': 'from-orange-500 to-yellow-600',
      'Financial': 'from-yellow-500 to-orange-600',
      'Housing': 'from-teal-500 to-cyan-600',
      'Employment': 'from-indigo-500 to-purple-600',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden bg-black">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-500/30 to-green-600/30 rounded-full blur-3xl animate-pulse -z-10" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToAdmin}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 shadow-[0_4px_16px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.25)] hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-[0_8px_24px_0_rgba(16,185,129,0.5)] backdrop-blur-sm border border-green-400/30">
              <FileText className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-3xl text-white mb-2 drop-shadow-sm">Government Schemes</h1>
          <p className="text-gray-400">Total: {schemes.length} schemes ({schemes.filter(s => s.is_active).length} active)</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, category, or level..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Schemes Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading schemes...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-xl text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="bg-white/5 border border-green-500/20 rounded-2xl p-12 backdrop-blur-xl text-center">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No schemes found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] hover:shadow-[0_12px_48px_0_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(scheme.category)} text-white text-xs font-medium shadow-lg`}>
                      <Tag className="w-3 h-3" />
                      {scheme.category}
                    </span>
                    {scheme.is_active === 1 && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Scheme Name */}
                  <h3 className="text-xl text-white mb-3 line-clamp-2 min-h-[3.5rem]">{scheme.scheme_name}</h3>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{scheme.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Banknote className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{scheme.benefit_type}</span>
                    </div>
                  </div>

                  {/* Description Preview */}
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                    {scheme.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(scheme)}
                      className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-2 px-2 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-[0_2px_12px_0_rgba(59,130,246,0.3)] hover:shadow-[0_4px_16px_0_rgba(59,130,246,0.5)] transform hover:scale-105 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(scheme)}
                      className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-2 px-2 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-[0_2px_12px_0_rgba(234,179,8,0.3)] hover:shadow-[0_4px_16px_0_rgba(234,179,8,0.5)] transform hover:scale-105 text-sm font-medium"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingSchemeId(scheme.id)}
                      className="flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-3 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-[0_2px_12px_0_rgba(239,68,68,0.3)] hover:shadow-[0_4px_16px_0_rgba(239,68,68,0.5)] transform hover:scale-105 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewingScheme && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-green-500/30 rounded-3xl p-8 max-w-3xl w-full my-8 shadow-[0_16px_64px_0_rgba(16,185,129,0.4)] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewingScheme(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(viewingScheme.category)} text-white text-sm font-medium shadow-lg`}>
                <Tag className="w-4 h-4" />
                {viewingScheme.category}
              </span>
            </div>

            <h2 className="text-3xl text-white mb-6">{viewingScheme.scheme_name}</h2>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-green-500/20">
                  <p className="text-gray-400 text-sm mb-1">Level</p>
                  <p className="text-white font-medium">{viewingScheme.level}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-green-500/20">
                  <p className="text-gray-400 text-sm mb-1">Benefit Type</p>
                  <p className="text-white font-medium">{viewingScheme.benefit_type}</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/5 p-4 rounded-2xl border border-green-500/20">
                <h3 className="text-white font-medium mb-2">Description</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{viewingScheme.description}</p>
              </div>

              {/* Benefits */}
              <div className="bg-white/5 p-4 rounded-2xl border border-green-500/20">
                <h3 className="text-white font-medium mb-2">Benefits</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{viewingScheme.benefits}</p>
              </div>

              {/* Eligibility */}
              <div className="bg-white/5 p-4 rounded-2xl border border-green-500/20">
                <h3 className="text-white font-medium mb-2">Eligibility</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{viewingScheme.eligibility}</p>
              </div>

              {/* Documents */}
              <div className="bg-white/5 p-4 rounded-2xl border border-green-500/20">
                <h3 className="text-white font-medium mb-2">Required Documents</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{viewingScheme.documents}</p>
              </div>

              {/* Application Process */}
              {viewingScheme.application_process && (
                <div className="bg-white/5 p-4 rounded-2xl border border-green-500/20">
                  <h3 className="text-white font-medium mb-2">Application Process</h3>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{viewingScheme.application_process}</p>
                </div>
              )}

              {/* Apply Link */}
              {viewingScheme.apply_link && (
                <a
                  href={viewingScheme.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium"
                >
                  <LinkIcon className="w-5 h-5" />
                  Visit Official Website
                </a>
              )}

              {/* Metadata */}
              <div className="text-center text-gray-500 text-xs pt-4 border-t border-gray-700">
                Added on {formatDate(viewingScheme.created_at)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingScheme && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-yellow-500/30 rounded-3xl p-8 max-w-3xl w-full my-8 shadow-[0_16px_64px_0_rgba(234,179,8,0.4)] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingScheme(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl text-white mb-6">Edit Scheme</h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Scheme Name</label>
                <input
                  type="text"
                  value={editForm.schemeName}
                  onChange={(e) => setEditForm({ ...editForm, schemeName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white"
                    required
                  >
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Women">Women</option>
                    <option value="Social Welfare">Social Welfare</option>
                    <option value="Financial">Financial</option>
                    <option value="Housing">Housing</option>
                    <option value="Employment">Employment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Level</label>
                  <select
                    value={editForm.level}
                    onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white"
                    required
                  >
                    <option value="Central">Central</option>
                    <option value="State">State</option>
                    <option value="District">District</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Benefit Type</label>
                <select
                  value={editForm.benefitType}
                  onChange={(e) => setEditForm({ ...editForm, benefitType: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white"
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Kind">Kind</option>
                  <option value="Subsidy">Subsidy</option>
                  <option value="Service">Service</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">Apply Link</label>
                <input
                  type="url"
                  value={editForm.applyLink}
                  onChange={(e) => setEditForm({ ...editForm, applyLink: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-white mb-2">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white resize-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Benefits</label>
                <textarea
                  value={editForm.benefits}
                  onChange={(e) => setEditForm({ ...editForm, benefits: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white resize-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Eligibility</label>
                <textarea
                  value={editForm.eligibility}
                  onChange={(e) => setEditForm({ ...editForm, eligibility: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white resize-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Required Documents</label>
                <textarea
                  value={editForm.documents}
                  onChange={(e) => setEditForm({ ...editForm, documents: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white resize-none"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Application Process</label>
                <textarea
                  value={editForm.applicationProcess}
                  onChange={(e) => setEditForm({ ...editForm, applicationProcess: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-white resize-none"
                  rows={2}
                />
              </div>

              {editError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3 text-red-400 text-sm">
                  {editError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingScheme(null)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-gray-500/30 text-gray-400 hover:text-white hover:border-gray-400/50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-2xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(234,179,8,0.4)] disabled:opacity-50"
                >
                  {editLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingSchemeId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-red-500/30 rounded-3xl p-8 max-w-md w-full shadow-[0_16px_64px_0_rgba(239,68,68,0.4)]">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl text-white mb-2">Delete Scheme?</h2>
              <p className="text-gray-400">
                This action cannot be undone. The scheme will be permanently deleted.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeletingSchemeId(null)}
                disabled={deleteLoading}
                className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-gray-500/30 text-gray-400 hover:text-white hover:border-gray-400/50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingSchemeId)}
                disabled={deleteLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(239,68,68,0.4)] disabled:opacity-50"
              >
                {deleteLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}