import React, { useState } from 'react';
import { useAuth } from '../App';
import { FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { getTranslation } from '../utils/translations';

export function UserDetailsForm() {
  const { saveUserDetails, logout, userDetails, theme, language } = useAuth();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    age: userDetails?.age || '',
    gender: userDetails?.gender || '',
    maritalStatus: userDetails?.maritalStatus || '',
    isPregnant: userDetails?.isPregnant || '',
    state: 'Tamil Nadu',
    area: userDetails?.area || '',
    incomeRange: userDetails?.incomeRange || '',
    educationLevel: userDetails?.educationLevel || '',
    community: userDetails?.community || '',
    minorityCategory: userDetails?.minorityCategory || '',
    hasDisability: userDetails?.hasDisability || '',
    disabilityType: userDetails?.disabilityType || '',
    disabilityPercentage: userDetails?.disabilityPercentage || '',
    isStudent: userDetails?.isStudent || '',
    employmentStatus: userDetails?.employmentStatus || '',
    occupation: userDetails?.occupation || '',
    belongsBPL: userDetails?.belongsBPL || '',
    inDistress: userDetails?.inDistress || '',
    ownsLand: userDetails?.ownsLand || '',
    landAcres: userDetails?.landAcres || '',
  });

  // new: api call states
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  // common function to prepare payload and hit API
  const callSchemesApi = async () => {
    setIsLoading(true);
    setApiError(null);

    try {
      // map frontend fields -> backend keys
      // map frontend fields -> backend keys
      const payload = {
        gender: formData.gender,
        age: formData.age ? parseInt(formData.age, 10) : null,
        state: formData.state,
        area: formData.area,
        income_range: formData.incomeRange,
        edu_level: formData.educationLevel,

        // Yes → 1, No → 0
        is_student: formData.isStudent === 'Yes' ? 1 : 0,
        community: formData.community,
        is_minority: formData.minorityCategory === 'Yes' ? 1 : 0,

        // you didn’t mention category separately; if needed, you can derive from community
        category: formData.community || null,

        is_disabled: formData.hasDisability === 'Yes' ? 1 : 0,
        disable_percentage: formData.disabilityPercentage
          ? parseInt(formData.disabilityPercentage, 10)
          : 0,

        occupation: formData.occupation,
        employment_status: formData.employmentStatus || null,
        is_bpl_category: formData.belongsBPL === 'Yes' ? 1 : 0,
        marital_status: formData.maritalStatus || null,
      };


      const res = await fetch('http://localhost:5000/api/schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      // TODO: handle schemes result here
      // e.g. save in context or navigate to results page
      // saveSchemes(data);

      return data;
    } catch (err: any) {
      setApiError(err.message || 'Something went wrong');
      console.error('Error fetching schemes:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // keep storing user details locally (existing logic)
    // ---------------------------------------------------------
    // EXAMPLE: How User Details are saved (e.g., in Local Storage)
    // ---------------------------------------------------------
    // When you click "Male", data is saved like this:
    /*
      {
        "gender": "Male",           // If user selected Male
        "age": "25",                // User input
        "maritalStatus": "Single",  // Selected from dropdown
        "isPregnant": "No",         // If applicable
        "occupation": "Farmer",     // User input
        "state": "Tamil Nadu",      // Default
        "area": "Rural",            // User selection
        "incomeRange": "Below ₹1 Lakh",
        "educationLevel": "12th Pass",
        "community": "BC",
        "minorityCategory": "No",
        "hasDisability": "No",
        "isStudent": "No",
        "employmentStatus": "Unemployed",
        "belongsBPL": "Yes",
        "inDistress": "No",
        "ownsLand": "Yes",          // If Farmer
        "landAcres": "2.5"          // If owns land
      }
    */
    saveUserDetails({
      age: formData.age,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      isPregnant: formData.isPregnant,
      occupation: formData.occupation || 'Not Specified',
      state: formData.state,
      area: formData.area,
      incomeRange: formData.incomeRange,
      educationLevel: formData.educationLevel,
      community: formData.community,
      minorityCategory: formData.minorityCategory,
      hasDisability: formData.hasDisability,
      disabilityType: formData.disabilityType,
      disabilityPercentage: formData.disabilityPercentage,
      isStudent: formData.isStudent,
      employmentStatus: formData.employmentStatus,
      belongsBPL: formData.belongsBPL,
      inDistress: formData.inDistress,
      ownsLand: formData.ownsLand,
      landAcres: formData.landAcres,
    });

    // new: call API
    var data = await callSchemesApi();

    // ---------------------------------------------------------
    // EXAMPLE: How Schemes Result is saved in Local Storage
    // ---------------------------------------------------------
    /*
      [
        {
          "id": 101,
          "scheme_name": "PM Kisan Samman Nidhi",
          "category": "Agriculture",
          "gender": "Male, Female, Transgender",
          "matchCount": 6  // How many criteria matched
        },
        ...
      ]
    */
    localStorage.setItem('schemesResult', JSON.stringify(data));
  };

  const handleSkipToResults = async () => {
    // keep your default values when skipping
    saveUserDetails({
      age: formData.age,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      isPregnant: formData.isPregnant,
      occupation: formData.occupation || 'Not Specified',
      state: formData.state,
      area: formData.area,
      incomeRange: formData.incomeRange,
      educationLevel: formData.educationLevel,
      community: formData.community || 'Not Specified',
      minorityCategory: formData.minorityCategory || 'Not Specified',
      hasDisability: formData.hasDisability || 'No',
      disabilityType: formData.disabilityType || 'None',
      disabilityPercentage: formData.disabilityPercentage || '0',
      isStudent: formData.isStudent,
      employmentStatus: formData.employmentStatus,
      belongsBPL: formData.belongsBPL,
      inDistress: formData.inDistress,
      ownsLand: formData.ownsLand,
      landAcres: formData.landAcres,
    });

    // new: still hit API with whatever info is present
    var data = await callSchemesApi();
    localStorage.setItem('schemesResult', JSON.stringify(data));
  };

  const isFemaleAdult =
    formData.gender === 'Female' && parseInt(formData.age) >= 18;
  const isFemaleOver60 =
    formData.gender === 'Female' && parseInt(formData.age) >= 60;
  const showMaritalStatus = isFemaleAdult;
  const showPregnancy =
    showMaritalStatus &&
    formData.maritalStatus &&
    formData.maritalStatus !== 'Single' &&
    !isFemaleOver60;
  const showDisabilityDetails = formData.hasDisability === 'Yes';
  const showEmploymentStatus = formData.isStudent === 'No';
  const showOccupation =
    showEmploymentStatus && formData.employmentStatus === 'Employed';
  const showDistressQuestion = formData.belongsBPL === 'Yes';
  const isFarmer = formData.occupation === 'Farmer';
  const showLandAcres = isFarmer && formData.ownsLand === 'Yes';

  const isStep1Valid = () => {
    if (!formData.gender || !formData.age) return false;
    if (showMaritalStatus && !formData.maritalStatus) return false;
    if (showPregnancy && !formData.isPregnant) return false;
    return true;
  };

  const isStep2Valid = () => {
    return (
      formData.state &&
      formData.area &&
      formData.incomeRange &&
      formData.educationLevel &&
      formData.isStudent
    );
  };

  const isStep3Valid = () => {
    if (!formData.community || !formData.minorityCategory || !formData.hasDisability)
      return false;
    if (
      showDisabilityDetails &&
      (!formData.disabilityType || !formData.disabilityPercentage)
    )
      return false;
    return true;
  };

  const isStep4Valid = () => {
    if (showEmploymentStatus && !formData.employmentStatus) return false;
    if (showOccupation && !formData.occupation) return false;
    if (!formData.belongsBPL) return false;
    if (showDistressQuestion && !formData.inDistress) return false;
    return true;
  };

  return (
    <div
      className={`min-h-screen px-4 py-8 relative overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'
        } transition-colors duration-300`}
    >
      {/* Animated liquid glass background */}
      <div
        className={`fixed inset-0 -z-10 transition-colors duration-500 ${theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
          }`}
      ></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>

      {/* Floating orbs */}
      <div
        className={`fixed top-20 left-10 w-96 h-96 bg-gradient-to-br rounded-full blur-3xl animate-pulse -z-10 ${theme === 'dark'
          ? 'from-green-500/30 to-emerald-600/30'
          : 'from-green-400/40 to-emerald-500/40'
          }`}
      ></div>
      <div
        className={`fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-br rounded-full blur-3xl animate-pulse -z-10 ${theme === 'dark'
          ? 'from-teal-500/30 to-green-600/30'
          : 'from-teal-400/40 to-green-500/40'
          }`}
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-start mb-4">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 shadow-[0_4px_16px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_0_rgba(16,185,129,0.25)] hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl shadow-[0_16px_64px_0_rgba(16,185,129,0.3)] p-8 relative overflow-hidden group">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-[0_8px_24px_0_rgba(16,185,129,0.5)] backdrop-blur-sm border border-green-400/30 hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>

            <h1 className="text-center mb-2 text-white drop-shadow-sm">
              Your Details
            </h1>
            <p className="text-center text-gray-400 mb-2">
              {step === 1
                ? 'Help us find the best government schemes for you'
                : step === 2
                  ? 'Tell us about your location'
                  : step === 3
                    ? 'Community & Disability Information'
                    : 'Education & Employment Details'}
            </p>
            <p className="text-center text-green-400 text-sm mb-4">
              Step {step} of 4
            </p>

            {/* API status */}
            {isLoading && (
              <p className="text-center text-green-300 text-sm mb-4">
                Checking eligibility, please wait...
              </p>
            )}
            {apiError && (
              <p className="text-center text-red-400 text-sm mb-4">
                {apiError}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  {/* Gender as buttons */}
                  <div>
                    <label className="block text-white mb-3 drop-shadow-sm">
                      Gender
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Male', 'Female', 'Transgender'].map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => handleChange('gender', gender)}
                          className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${formData.gender === gender
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                            : 'bg-white/5 border-green-500/20 text-gray-400 hover:border-green-500/40 hover:text-white'
                            }`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-white mb-2 drop-shadow-sm"
                    >
                      Age
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                      placeholder="Enter your age"
                      min="1"
                      max="120"
                      required
                    />
                  </div>

                  {/* Marital Status - dropdown for female 18+ */}
                  {showMaritalStatus && (
                    <div>
                      <label
                        htmlFor="maritalStatus"
                        className="block text-white mb-2 drop-shadow-sm"
                      >
                        Marital Status
                      </label>
                      <select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={(e) =>
                          handleChange('maritalStatus', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                        required
                      >
                        <option
                          value=""
                          className="bg-gray-900 text-gray-400"
                        >
                          Select Marital Status
                        </option>
                        <option
                          value="Single"
                          className="bg-gray-900 text-white"
                        >
                          Single
                        </option>
                        <option
                          value="Married"
                          className="bg-gray-900 text-white"
                        >
                          Married
                        </option>
                        <option
                          value="Widowed"
                          className="bg-gray-900 text-white"
                        >
                          Widowed
                        </option>
                        <option
                          value="Divorced"
                          className="bg-gray-900 text-white"
                        >
                          Divorced
                        </option>
                      </select>
                    </div>
                  )}

                  {/* Pregnancy - for all except single */}
                  {showPregnancy && (
                    <div>
                      <label className="block text-white mb-3 drop-shadow-sm">
                        Are you pregnant or recently had a baby?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Yes', 'No'].map((answer) => (
                          <button
                            key={answer}
                            type="button"
                            onClick={() =>
                              handleChange('isPregnant', answer)
                            }
                            className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${formData.isPregnant === answer
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                              : 'bg-white/5 border-green-500/20 text-gray-400 hover:border-green-500/40 hover:text-white'
                              }`}
                          >
                            {answer}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStep1Valid()}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  {/* State - Only Tamil Nadu */}
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-white mb-2 drop-shadow-sm"
                    >
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                      required
                    >
                      <option
                        value="Tamil Nadu"
                        className="bg-gray-900 text-white"
                      >
                        Tamil Nadu
                      </option>
                    </select>
                  </div>

                  {/* Area - Rural/Urban */}
                  <div>
                    <label className="block text-white mb-3 drop-shadow-sm">
                      Area
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Rural', 'Urban'].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => handleChange('area', area)}
                          className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${formData.area === area
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                            : 'bg-white/5 border-green-500/20 text-gray-400 hover:border-green-500/40 hover:text-white'
                            }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Income Range */}
                  <div>
                    <label
                      htmlFor="incomeRange"
                      className="block text-white mb-2 drop-shadow-sm"
                    >
                      Annual Income Range
                    </label>
                    <select
                      id="incomeRange"
                      name="incomeRange"
                      value={formData.incomeRange}
                      onChange={(e) =>
                        handleChange('incomeRange', e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                      required
                    >
                      <option
                        value=""
                        className="bg-gray-900 text-gray-400"
                      >
                        Select Income Range
                      </option>
                      <option
                        value="No Income"
                        className="bg-gray-900 text-white"
                      >
                        No Income
                      </option>
                      <option
                        value="Below ₹1 Lakh"
                        className="bg-gray-900 text-white"
                      >
                        Below ₹1 Lakh
                      </option>
                      <option
                        value="₹1 - ₹3 Lakhs"
                        className="bg-gray-900 text-white"
                      >
                        ₹1 - ₹3 Lakhs
                      </option>
                      <option
                        value="₹3 - ₹5 Lakhs"
                        className="bg-gray-900 text-white"
                      >
                        ₹3 - ₹5 Lakhs
                      </option>
                      <option
                        value="₹5 - ₹10 Lakhs"
                        className="bg-gray-900 text-white"
                      >
                        ₹5 - ₹10 Lakhs
                      </option>
                      <option
                        value="Above ₹10 Lakhs"
                        className="bg-gray-900 text-white"
                      >
                        Above ₹10 Lakhs
                      </option>
                    </select>
                  </div>

                  {/* Education Level */}
                  <div>
                    <label
                      htmlFor="educationLevel"
                      className="block text-white mb-2 drop-shadow-sm"
                    >
                      Education Level
                    </label>
                    <select
                      id="educationLevel"
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={(e) =>
                        handleChange('educationLevel', e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                      required
                    >
                      <option
                        value=""
                        className="bg-gray-900 text-gray-400"
                      >
                        Select Education Level
                      </option>
                      <option
                        value="No Education"
                        className="bg-gray-900 text-white"
                      >
                        No Education
                      </option>
                      <option
                        value="Primary"
                        className="bg-gray-900 text-white"
                      >
                        Primary(below 10th)
                      </option>
                      <option
                        value="Secondary (10th)"
                        className="bg-gray-900 text-white"
                      >
                        Secondary (10th)
                      </option>
                      <option
                        value="Higher Secondary (12th)"
                        className="bg-gray-900 text-white"
                      >
                        Higher Secondary (12th)
                      </option>
                      <option
                        value="Diploma"
                        className="bg-gray-900 text-white"
                      >
                        Diploma
                      </option>
                      <option
                        value="Graduation"
                        className="bg-gray-900 text-white"
                      >
                        Graduation
                      </option>
                      <option
                        value="Post Graduation"
                        className="bg-gray-900 text-white"
                      >
                        Post Graduation
                      </option>
                      <option
                        value="PhD"
                        className="bg-gray-900 text-white"
                      >
                        PhD
                      </option>
                      <option
                        value="Professional Degree"
                        className="bg-gray-900 text-white"
                      >
                        Professional Degree
                      </option>
                    </select>
                  </div>

                  {/* Are you a student? */}
                  <div>
                    <label className="block text-white mb-3 drop-shadow-sm">
                      Are you a student?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Yes', 'No'].map((answer) => (
                        <button
                          key={answer}
                          type="button"
                          onClick={() => handleChange('isStudent', answer)}
                          className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${formData.isStudent === answer
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                            : 'bg-white/5 border-green-500/20 text-gray-400 hover:border-green-500/40 hover:text-white'
                            }`}
                        >
                          {answer}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStep2Valid()}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {step === 3 && (
                <>
                  {/* Community */}
                  <div>
                    <label
                      htmlFor="community"
                      className="block text-white mb-2 drop-shadow-sm"
                    >
                      Community
                    </label>
                    <select
                      id="community"
                      name="community"
                      value={formData.community}
                      onChange={(e) =>
                        handleChange('community', e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                      required
                    >
                      <option
                        value=""
                        className="bg-gray-900 text-gray-400"
                      >
                        Select Community
                      </option>
                      <option
                        value="General"
                        className="bg-gray-900 text-white"
                      >
                        General
                      </option>
                      <option
                        value="SC"
                        className="bg-gray-900 text-white"
                      >
                        Scheduled Caste (SC)
                      </option>
                      <option
                        value="ST"
                        className="bg-gray-900 text-white"
                      >
                        Scheduled Tribe (ST)
                      </option>
                      <option
                        value="OBC"
                        className="bg-gray-900 text-white"
                      >
                        Other Backward Class (OBC)
                      </option>
                      <option
                        value="BC"
                        className="bg-gray-900 text-white"
                      >
                        Backward Class (BC)
                      </option>
                      <option
                        value="MBC"
                        className="bg-gray-900 text-white"
                      >
                        Most Backward Class (MBC)
                      </option>
                      <option
                        value="DNC"
                        className="bg-gray-900 text-white"
                      >
                        Denotified Community (DNC)
                      </option>
                    </select>
                  </div>

                  {/* Minority Category */}
                  <div>
                    <label className="block text-white mb-3 drop-shadow-sm">
                      Are you from a Minority Category?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Yes', 'No'].map((answer) => (
                        <button
                          key={answer}
                          type="button"
                          onClick={() =>
                            handleChange('minorityCategory', answer)
                          }
                          className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${formData.minorityCategory === answer
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                            : 'bg-white/5 border-green-500/20 text-gray-400 hover:border-green-500/40 hover:text-white'
                            }`}
                        >
                          {answer}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Disability */}
                  <div>
                    <label className="block text-white mb-3 drop-shadow-sm">
                      Do you have a disability?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Yes', 'No'].map((answer) => (
                        <button
                          key={answer}
                          type="button"
                          onClick={() =>
                            handleChange('hasDisability', answer)
                          }
                          className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${formData.hasDisability === answer
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                            : 'bg-white/5 border-green-500/20 text-gray-400 hover:border-green-500/40 hover:text-white'
                            }`}
                        >
                          {answer}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Disability Type */}
                  {showDisabilityDetails && (
                    <div>
                      <label
                        htmlFor="disabilityType"
                        className="block text-white mb-2 drop-shadow-sm"
                      >
                        Type of Disability
                      </label>
                      <select
                        id="disabilityType"
                        name="disabilityType"
                        value={formData.disabilityType}
                        onChange={(e) =>
                          handleChange('disabilityType', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                        required
                      >
                        <option
                          value=""
                          className="bg-gray-900 text-gray-400"
                        >
                          Select Disability Type
                        </option>
                        <option
                          value="Physical"
                          className="bg-gray-900 text-white"
                        >
                          Physical
                        </option>
                        <option
                          value="Visual"
                          className="bg-gray-900 text-white"
                        >
                          Visual
                        </option>
                        <option
                          value="Hearing"
                          className="bg-gray-900 text-white"
                        >
                          Hearing
                        </option>
                        <option
                          value="Speech"
                          className="bg-gray-900 text-white"
                        >
                          Speech
                        </option>
                        <option
                          value="Mental"
                          className="bg-gray-900 text-white"
                        >
                          Mental
                        </option>
                        <option
                          value="Multiple"
                          className="bg-gray-900 text-white"
                        >
                          Multiple
                        </option>
                      </select>
                    </div>
                  )}

                  {/* Disability Percentage */}
                  {showDisabilityDetails && (
                    <div>
                      <label
                        htmlFor="disabilityPercentage"
                        className="block text-white mb-2 drop-shadow-sm"
                      >
                        Percentage of Disability
                      </label>
                      <input
                        id="disabilityPercentage"
                        name="disabilityPercentage"
                        type="number"
                        value={formData.disabilityPercentage}
                        onChange={(e) =>
                          handleChange('disabilityPercentage', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                        placeholder="Enter percentage"
                        min="0"
                        max="100"
                        required
                      />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 bg-white/5 border border-green-500/20 text-gray-400 py-3 rounded-2xl hover:border-green-500/40 hover:text-white transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.2)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.3)] transform hover:scale-105 font-medium backdrop-blur-sm flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStep3Valid()}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Next
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Skip to Results */}
                  <button
                    type="button"
                    onClick={handleSkipToResults}
                    className="w-full bg-white/5 border border-yellow-500/30 text-yellow-400 py-3 rounded-2xl hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300 shadow-[0_4px_20px_0_rgba(234,179,8,0.2)] hover:shadow-[0_6px_28px_0_rgba(234,179,8,0.3)] transform hover:scale-105 font-medium backdrop-blur-sm flex items-center justify-center gap-2"
                  >
                    Skip to Results
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {step === 4 && (
                <>
                  {/* Employment Status - only if not student */}
                  {showEmploymentStatus && (
                    <div>
                      <label
                        htmlFor="employmentStatus"
                        className="block text-white mb-2 drop-shadow-sm"
                      >
                        Employment Status
                      </label>
                      <select
                        id="employmentStatus"
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={(e) =>
                          handleChange('employmentStatus', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                        required
                      >
                        <option
                          value=""
                          className="bg-gray-900 text-gray-400"
                        >
                          Select Employment Status
                        </option>
                        <option
                          value="Employed"
                          className="bg-gray-900 text-white"
                        >
                          Employed
                        </option>
                        <option
                          value="Unemployed"
                          className="bg-gray-900 text-white"
                        >
                          Unemployed
                        </option>
                        <option
                          value="Self-Employed/Entrepreneur"
                          className="bg-gray-900 text-white"
                        >
                          Self-Employed/Entrepreneur
                        </option>
                      </select>
                    </div>
                  )}

                  {/* Occupation - only if employed */}
                  {showOccupation && (
                    <div>
                      <label
                        htmlFor="occupation"
                        className="block text-white mb-2 drop-shadow-sm"
                      >
                        Occupation
                      </label>
                      <select
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={(e) =>
                          handleChange('occupation', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white"
                        required
                      >
                        <option
                          value=""
                          className="bg-gray-900 text-gray-400"
                        >
                          Select Occupation
                        </option>
                        <option
                          value="Government Employee"
                          className="bg-gray-900 text-white"
                        >
                          Government Employee
                        </option>
                        <option
                          value="Private Sector Employee"
                          className="bg-gray-900 text-white"
                        >
                          Private Sector Employee
                        </option>
                        <option
                          value="Teacher/Professor"
                          className="bg-gray-900 text-white"
                        >
                          Teacher/Professor
                        </option>
                        <option
                          value="Healthcare Worker"
                          className="bg-gray-900 text-white"
                        >
                          Healthcare Worker
                        </option>
                        <option
                          value="Engineer"
                          className="bg-gray-900 text-white"
                        >
                          Engineer
                        </option>
                        <option
                          value="IT Professional"
                          className="bg-gray-900 text-white"
                        >
                          IT Professional
                        </option>
                        <option
                          value="Farmer"
                          className="bg-gray-900 text-white"
                        >
                          Farmer
                        </option>
                        <option
                          value="Others"
                          className="bg-gray-900 text-white"
                        >
                          Others
                        </option>
                      </select>
                    </div>
                  )}

                  {/* Poor Families Question */}
                  <div>
                    <label className="block text-white mb-3 drop-shadow-sm">
                      Are you from low income household(BPL category)?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Yes', 'No'].map((answer) => (
                        <button
                          key={answer}
                          type="button"
                          onClick={() => handleChange('belongsBPL', answer)}
                          className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${formData.belongsBPL === answer
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                            : 'bg-white/5 border-green-500/20 text-gray-400 hover:border-green-500/40 hover:text-white'
                            }`}
                        >
                          {answer}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Distress Question - only if BPL Yes */}
                  {showDistressQuestion && (
                    <div>
                      <label className="block text-white mb-3 drop-shadow-sm">
                        Are you in any of the following condition - Destitute /
                        Penury / Extreme Hardship / Distress?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Yes', 'No'].map((answer) => (
                          <button
                            key={answer}
                            type="button"
                            onClick={() =>
                              handleChange('inDistress', answer)
                            }
                            className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${formData.inDistress === answer
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                              : 'bg-white/5 border-green-500/20 text-gray-400 hover:border-green-500/40 hover:text-white'
                              }`}
                          >
                            {answer}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Land Ownership - only if Farmer */}
                  {isFarmer && (
                    <div>
                      <label className="block text-white mb-3 drop-shadow-sm">
                        Do you own land?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Yes', 'No'].map((answer) => (
                          <button
                            key={answer}
                            type="button"
                            onClick={() => handleChange('ownsLand', answer)}
                            className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${formData.ownsLand === answer
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.4)]'
                              : 'bg-white/5 border-green-500/20 text-gray-400 hover:border-green-500/40 hover:text-white'
                              }`}
                          >
                            {answer}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Land Acres - only if Farmer and owns land */}
                  {showLandAcres && formData.ownsLand === 'Yes' && (
                    <div>
                      <label
                        htmlFor="landAcres"
                        className="block text-white mb-2 drop-shadow-sm"
                      >
                        Land Acres
                      </label>
                      <input
                        id="landAcres"
                        name="landAcres"
                        type="number"
                        value={formData.landAcres}
                        onChange={(e) =>
                          handleChange('landAcres', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] transition-all duration-300 text-white placeholder-gray-500"
                        placeholder="Enter land acres"
                        min="0"
                        required
                      />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 bg-white/5 border border-green-500/20 text-gray-400 py-3 rounded-2xl hover:border-green-500/40 hover:text-white transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.2)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.3)] transform hover:scale-105 font-medium backdrop-blur-sm flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!isStep4Valid() || isLoading}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? 'Checking...' : 'Check Eligibility'}
                    </button>
                  </div>

                  {/* Skip to Results Button */}
                  <button
                    type="button"
                    onClick={handleSkipToResults}
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-yellow-500/30 text-yellow-400 py-3 rounded-2xl hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300 shadow-[0_4px_20px_0_rgba(234,179,8,0.2)] hover:shadow-[0_6px_28px_0_rgba(234,179,8,0.3)] transform hover:scale-105 font-medium backdrop-blur-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Skip to Results
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
