import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../App';
import { ArrowLeft, FileText, Gift, CheckCircle, Clipboard, FileCheck, ExternalLink, Link as LinkIcon, X, Upload, AlertCircle, Bookmark } from 'lucide-react';

// Extended Scheme interface with all properties used in this component
interface ExtendedScheme {
  id: string;
  translationId: string;
  applyLink: string;
  category: string;
  benefitType: string;
  level: string;
  name?: string;
  nameTA?: string;
  description?: string;
  descriptionTA?: string;
  implementedBy?: string;
  gender?: string;
  caste?: string;
  residence?: string;
  occupation?: string;
  eligibility?: {
    occupations?: string[];
    minAge?: number;
    maxAge?: number;
    gender?: string[];
    incomeRanges?: string[];
  };
}

// Interface for scheme details from database/localStorage
interface SchemeDetails {
  detail_id: number;
  scheme_name: string;
  details: string;
  benefits: string;
  eligibility: string;
  application_process: string;
  doc_need: string;
  apply_url: string;
}

interface SchemeDetailProps {
  onApply?: () => void;
}

export function SchemeDetail({ onApply }: SchemeDetailProps = {}) {
  const { viewingScheme, goBackFromSchemeDetail, currentUser } = useAuth();

  // Type assertion to ensure we have the extended properties
  const scheme = viewingScheme as ExtendedScheme | null;

  // State for modals
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showFeaturePopup, setShowFeaturePopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  // State for scheme details from database
  const [schemeDetails, setSchemeDetails] = useState<SchemeDetails | null>(null);

  // Refs for scrolling to sections
  const detailsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const eligibilityRef = useRef<HTMLDivElement>(null);
  const applicationRef = useRef<HTMLDivElement>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);

  // Fetch scheme details from Backend when scheme changes
  useEffect(() => {
    if (!scheme) return;

    // Get scheme_name for matching
    const schemeName = scheme.name || scheme.nameTA || '';

    const fetchSchemeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/scheme-details?name=${encodeURIComponent(schemeName)}`); // Ensure name is encoded
        const data = await response.json();

        if (response.ok) {
          setSchemeDetails(data);
        } else {
          console.error('Failed to fetch scheme details:', data.message);
          setSchemeDetails(null);
        }
      } catch (error) {
        console.error('Error fetching scheme details:', error);
        setSchemeDetails(null);
      }
    };

    fetchSchemeDetails();
  }, [scheme]);

  if (!scheme) return null;

  // Handle Apply Now click - Navigate to apply form
  const handleApplyNow = () => {
    if (onApply) {
      onApply();
    } else {
      // Fallback to old modal behavior
      setShowApplicationForm(true);
    }
  };

  // Handle form submit - Show feature popup
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowApplicationForm(false);
    setShowFeaturePopup(true);
  };

  // Handle Save Scheme click
  const handleSaveScheme = () => {
    if (!currentUser || !scheme) return;

    // Get existing saved schemes
    const savedSchemesKey = `easyfind_saved_schemes_${currentUser.email}`;
    const existingSchemes = localStorage.getItem(savedSchemesKey);
    const schemes = existingSchemes ? JSON.parse(existingSchemes) : [];

    // Check if already saved
    const alreadySaved = schemes.some((s: any) => s.id === scheme.id);

    if (alreadySaved) {
      alert('You have already saved this scheme!');
      return;
    }

    // Add new scheme with saved date
    schemes.push({
      ...scheme,
      savedDate: new Date().toISOString(),
    });

    localStorage.setItem(savedSchemesKey, JSON.stringify(schemes));
    setShowSavePopup(true);
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    const container = document.getElementById('scheme-content-scroll');
    const element = ref.current;

    if (container && element) {
      const containerTop = container.offsetTop;
      const elementTop = element.offsetTop;
      const offset = elementTop - containerTop - 20; // 20px padding from top

      container.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { name: 'Details', icon: FileText, ref: detailsRef },
    { name: 'Benefits', icon: Gift, ref: benefitsRef },
    { name: 'Eligibility', icon: CheckCircle, ref: eligibilityRef },
    { name: 'Application Process', icon: Clipboard, ref: applicationRef },
    { name: 'Documents', icon: FileCheck, ref: documentsRef },
    { name: 'Source', icon: LinkIcon, ref: sourceRef },
  ];

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden bg-black">
      {/* Animated liquid glass background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>

      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-500/30 to-green-600/30 rounded-full blur-3xl animate-pulse -z-10" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => goBackFromSchemeDetail()}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 shadow-[0_4px_16px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.25)] hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Schemes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Dashboard */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] sticky top-8">
              <h2 className="text-white mb-4 text-lg">Dashboard</h2>
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;

                  return (
                    <button
                      key={section.name}
                      onClick={() => scrollToSection(section.ref)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-green-500/20 hover:border-green-500/40"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Apply Link Section */}
              <div className="mt-6 pt-6 border-t border-green-500/20">
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-green-400" />
                  Apply Link
                </h3>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl p-4 border border-green-400/40 shadow-[0_4px_16px_0_rgba(16,185,129,0.3)]">
                  <a
                    href={schemeDetails?.apply_url || scheme.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-300 hover:text-green-200 text-sm break-all transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0 animate-pulse" />
                    <span className="break-all font-medium">{schemeDetails?.apply_url || scheme.applyLink}</span>
                  </a>
                </div>
              </div>

              {/* Save Scheme Button */}
              <div className="mt-6 pt-6 border-t border-green-500/20">
                <button
                  onClick={handleSaveScheme}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 text-blue-300 hover:text-white hover:from-blue-500/30 hover:to-cyan-600/30 border border-blue-500/30 hover:border-blue-400/50 shadow-[0_4px_16px_0_rgba(59,130,246,0.2)] hover:shadow-[0_4px_20px_0_rgba(59,130,246,0.3)] hover:scale-105"
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="text-sm font-medium">Save Scheme</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area - Scrollable */}
          <div className="lg:col-span-3">
            {/* Fixed Title */}
            <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-t-3xl p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] sticky top-0 z-10">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl text-white">{scheme.name || scheme.nameTA || 'Scheme Name'}</h1>
                <div className="flex gap-2">
                  <span className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                    {scheme.level}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm">
                    {scheme.benefitType}
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mt-2">{scheme.category} • {scheme.implementedBy || 'Government Department'}</p>
            </div>

            {/* Scrollable Content */}
            <div
              id="scheme-content-scroll"
              className="bg-white/5 backdrop-blur-2xl border-x border-b border-green-500/20 rounded-b-3xl p-8 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] relative overflow-y-auto max-h-[600px] group"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>

              <div className="relative z-10 space-y-12">
                {/* Details Section */}
                <div ref={detailsRef} className="scroll-mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl text-white">Details</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl text-white mb-4">Scheme Overview</h3>
                      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {schemeDetails?.details || scheme.description || scheme.descriptionTA || `This scheme provides financial support and assistance for eligible beneficiaries under the ${scheme.category} category.`}
                      </div>
                      {!schemeDetails?.details && (
                        <p className="text-gray-300 leading-relaxed mt-4">
                          This is a {scheme.level} government initiative aimed at supporting citizens through {scheme.benefitType} benefits. The scheme is implemented by {scheme.implementedBy || 'the respective government department'}.
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg text-white mb-4">Key Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                          <p className="text-gray-400 text-sm mb-2">Scheme Type</p>
                          <p className="text-white font-medium">{scheme.benefitType}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                          <p className="text-gray-400 text-sm mb-2">Level</p>
                          <p className="text-white font-medium">{scheme.level} Government</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                          <p className="text-gray-400 text-sm mb-2">Category</p>
                          <p className="text-white font-medium">{scheme.category}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                          <p className="text-gray-400 text-sm mb-2">Department</p>
                          <p className="text-white font-medium">{scheme.implementedBy || 'Government Department'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits Section */}
                <div ref={benefitsRef} className="scroll-mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl text-white">Benefits</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl text-white mb-4">{scheme.benefitType} Benefits</h3>
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-xl">
                              <Gift className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-2">Primary Benefit</h4>
                              <p className="text-gray-300">This scheme provides {scheme.benefitType} benefits to eligible beneficiaries as per the scheme guidelines.</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-xl">
                              <Gift className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-2">Direct Assistance</h4>
                              <p className="text-gray-300">Financial assistance and support is provided directly to beneficiaries through government channels.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                      <h3 className="text-lg text-white mb-3">Additional Benefits</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Government-backed assistance program</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Transparent application and disbursement process</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Support provided as per eligibility criteria</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Eligibility Section */}
                <div ref={eligibilityRef} className="scroll-mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl text-white">Eligibility</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl text-white mb-4">Eligibility Criteria</h3>

                      <div className="space-y-4">
                        {scheme.gender && scheme.gender !== 'All' && (
                          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              Gender
                            </h4>
                            <p className="text-gray-300 ml-7">This scheme is applicable for {scheme.gender} beneficiaries</p>
                          </div>
                        )}

                        {scheme.caste && scheme.caste !== 'All' && (
                          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              Category
                            </h4>
                            <p className="text-gray-300 ml-7">Applicable for {scheme.caste} category beneficiaries</p>
                          </div>
                        )}

                        {scheme.residence && scheme.residence !== 'All' && (
                          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              Residence
                            </h4>
                            <p className="text-gray-300 ml-7">{scheme.residence} residents are eligible</p>
                          </div>
                        )}

                        {scheme.occupation && scheme.occupation !== 'All' && (
                          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              Occupation
                            </h4>
                            <p className="text-gray-300 ml-7">Designed for {scheme.occupation}s</p>
                          </div>
                        )}

                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            General Requirements
                          </h4>
                          <ul className="space-y-2 text-gray-300 ml-7">
                            <li>• Must meet the scheme-specific criteria</li>
                            <li>• Valid identity and address proof required</li>
                            <li>• Should satisfy income eligibility (if applicable)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Process Section */}
                <div ref={applicationRef} className="scroll-mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Clipboard className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl text-white">Application Process</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl text-white mb-4">How to Apply</h3>

                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-xl flex-shrink-0">
                              <span className="text-white font-bold text-lg">1</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-2">Registration</h4>
                              <p className="text-gray-300">Visit the National Scholarship Portal (scholarships.gov.in) and click on "New Registration". Fill in your basic details and create login credentials.</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-xl flex-shrink-0">
                              <span className="text-white font-bold text-lg">2</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-2">Login and Application</h4>
                              <p className="text-gray-300">Login using your credentials. Select "PM Scholarship Scheme" from the list of schemes. Fill in all required details carefully.</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-xl flex-shrink-0">
                              <span className="text-white font-bold text-lg">3</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-2">Upload Documents</h4>
                              <p className="text-gray-300">Upload all required documents in PDF/JPG format. Ensure file sizes are within limits. Documents should be clear and readable.</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-xl flex-shrink-0">
                              <span className="text-white font-bold text-lg">4</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-2">Submit Application</h4>
                              <p className="text-gray-300">Review all details carefully. Submit the application and note down the application ID for future reference.</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-xl flex-shrink-0">
                              <span className="text-white font-bold text-lg">5</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-2">Verification & Approval</h4>
                              <p className="text-gray-300">Your application will be verified by respective authorities. Track status using your application ID. Scholarship will be disbursed upon approval.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div ref={documentsRef} className="scroll-mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FileCheck className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl text-white">Documents</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl text-white mb-4">Required Documents</h3>

                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 mb-6">
                        <p className="text-gray-300 mb-4">Please keep the following documents ready before starting your application. All documents should be scanned in PDF or JPG format.</p>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                          <p className="text-yellow-400 text-sm">
                            <strong>Important:</strong> File size should not exceed 200 KB per document. Documents should be clear and legible.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          'Class 10th Mark Sheet',
                          'Class 12th Mark Sheet',
                          'Admission proof of current course',
                          'Ex-Servicemen Identity Card (ESM Card)',
                          'Bank Account Details (Passbook/Cancelled Cheque)',
                          'Aadhaar Card',
                          'Income Certificate (issued within last 6 months)',
                          'Passport size photograph',
                          'Domicile Certificate',
                          'Disability Certificate (if applicable)'
                        ].map((doc, index) => (
                          <div key={index} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-green-500/20 flex items-center gap-3 hover:bg-white/10 transition-all duration-300">
                            <FileCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Source Section */}
                <div ref={sourceRef} className="scroll-mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <LinkIcon className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl text-white">Source</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl text-white mb-4">Source & References</h3>

                      <div className="space-y-4">
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <h4 className="text-white font-medium mb-4">Official Websites</h4>
                          <div className="space-y-3">
                            <a
                              href="https://scholarships.gov.in"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>National Scholarship Portal</span>
                            </a>
                            <a
                              href="https://ksb.gov.in"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Kendriya Sainik Board</span>
                            </a>
                            <a
                              href="https://www.mod.gov.in"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Ministry of Defence</span>
                            </a>
                          </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <h4 className="text-white font-medium mb-4">Helpline Information</h4>
                          <div className="space-y-3 text-gray-300">
                            <div>
                              <p className="text-gray-400 text-sm">Email</p>
                              <p className="text-white">helpdesk@scholarships.gov.in</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Helpline Number</p>
                              <p className="text-white">0120-6619540</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Timings</p>
                              <p className="text-white">Monday to Friday, 10:00 AM to 6:00 PM</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
                          <h4 className="text-white font-medium mb-4">Related Schemes</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>Central Sector Scheme of Scholarship for College and University Students</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>Merit cum Means Scholarship for Professional and Technical Courses</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>Post Matric Scholarship for SC/ST Students</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Now Button */}
            <div className="mt-8 bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative z-10">
                <button
                  onClick={handleApplyNow}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-12 rounded-2xl font-medium text-lg shadow-[0_8px_16px_0_rgba(16,185,129,0.5)] hover:shadow-[0_8px_24px_0_rgba(16,185,129,0.6)] transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now
                </button>
                <p className="text-gray-400 mt-4 text-sm">
                  Click to mark this scheme as applied and visit the official application portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] w-full max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Application Form</h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <p className="text-gray-400 text-sm mb-2">Full Name</p>
                  <input
                    type="text"
                    className="text-white bg-transparent border-b border-gray-400 focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <p className="text-gray-400 text-sm mb-2">Email</p>
                  <input
                    type="email"
                    className="text-white bg-transparent border-b border-gray-400 focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <p className="text-gray-400 text-sm mb-2">Phone Number</p>
                  <input
                    type="tel"
                    className="text-white bg-transparent border-b border-gray-400 focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <p className="text-gray-400 text-sm mb-2">Upload Documents</p>
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-green-400" />
                    <input
                      type="file"
                      className="text-gray-400"
                      multiple
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-12 rounded-2xl font-medium text-lg shadow-[0_8px_16px_0_rgba(16,185,129,0.5)] hover:shadow-[0_8px_24px_0_rgba(16,185,129,0.6)] transition-all duration-300 transform hover:scale-105 mt-6"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Feature Popup */}
      {showFeaturePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] w-full max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Application Submitted</h2>
              <button
                onClick={() => setShowFeaturePopup(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-2">Application Status</p>
                <p className="text-white font-medium">Pending</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-2">Application ID</p>
                <p className="text-white font-medium">123456789</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-2">Next Steps</p>
                <p className="text-white font-medium">Track your application status on the official portal.</p>
              </div>
            </div>
            <button
              onClick={() => setShowFeaturePopup(false)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-12 rounded-2xl font-medium text-lg shadow-[0_8px_16px_0_rgba(16,185,129,0.5)] hover:shadow-[0_8px_24px_0_rgba(16,185,129,0.6)] transition-all duration-300 transform hover:scale-105 mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Save Scheme Popup */}
      {showSavePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] w-full max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Scheme Saved</h2>
              <button
                onClick={() => setShowSavePopup(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-2">Scheme Name</p>
                <p className="text-white font-medium">{scheme.name || scheme.nameTA || 'Scheme Name'}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-2">Saved Date</p>
                <p className="text-white font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20 shadow-[0_4px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <p className="text-gray-400 text-sm mb-2">Next Steps</p>
                <p className="text-white font-medium">View saved schemes in your profile.</p>
              </div>
            </div>
            <button
              onClick={() => setShowSavePopup(false)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-12 rounded-2xl font-medium text-lg shadow-[0_8px_16px_0_rgba(16,185,129,0.5)] hover:shadow-[0_8px_24px_0_rgba(16,185,129,0.6)] transition-all duration-300 transform hover:scale-105 mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}