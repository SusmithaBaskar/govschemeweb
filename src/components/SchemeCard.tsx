import React from 'react';
import { CheckCircle, FileText, ExternalLink } from 'lucide-react';
import { Language, translations } from '../utils/languages';

type Scheme = {
  name: string;
  description: string;
  whyEligible: string;
  documents: string[];
  applyLink: string;
};

type SchemeCardProps = {
  scheme: Scheme;
  language: Language;
};

export function SchemeCard({ scheme, language }: SchemeCardProps) {
  const t = translations[language];

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] hover:shadow-[0_12px_48px_0_rgba(16,185,129,0.35)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 relative overflow-hidden group">
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Floating gradient orb inside card */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 backdrop-blur-xl border border-green-400/30 p-2.5 rounded-2xl flex-shrink-0 shadow-[0_4px_16px_0_rgba(16,185,129,0.35)] hover:shadow-[0_6px_20px_0_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-110 hover:rotate-3">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white mb-2 drop-shadow-sm">{scheme.name}</h3>
            <div className="inline-block bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-xl border border-green-400/40 text-green-300 px-4 py-1.5 rounded-full text-sm shadow-[0_2px_8px_0_rgba(16,185,129,0.25)] font-medium">
              {t.youAreEligible}
            </div>
          </div>
        </div>

        <div className="mb-4 bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.2)] transition-all duration-300">
          <h4 className="text-white mb-2 drop-shadow-sm">{t.whyEligible}</h4>
          <p className="text-gray-300 leading-relaxed">{scheme.whyEligible}</p>
        </div>

        <div className="mb-4 bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.2)] transition-all duration-300">
          <h4 className="text-white mb-2 drop-shadow-sm">{t.aboutScheme}</h4>
          <p className="text-gray-300 leading-relaxed">{scheme.description}</p>
        </div>

        <div className="mb-6 bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20 shadow-[0_2px_12px_0_rgba(16,185,129,0.15)] hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.2)] transition-all duration-300">
          <h4 className="text-white mb-3 flex items-center gap-2 drop-shadow-sm">
            <div className="bg-gradient-to-br from-green-500/60 to-emerald-600/60 backdrop-blur-sm p-1.5 rounded-lg">
              <FileText className="w-4 h-4 text-white" />
            </div>
            {t.documentsNeeded}
          </h4>
          <ul className="space-y-2.5">
            {scheme.documents.map((doc, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-200">
                <span className="text-green-400 text-lg font-bold mt-0.5 drop-shadow-sm">•</span>
                <span className="leading-relaxed">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-green-500/20 pt-5">
          <h4 className="text-white mb-3 drop-shadow-sm">{t.howToApply}</h4>
          <a
            href={scheme.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_4px_20px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_28px_0_rgba(16,185,129,0.6)] transform hover:scale-105 font-medium backdrop-blur-sm border border-green-400/30"
          >
            {t.applyForScheme}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}