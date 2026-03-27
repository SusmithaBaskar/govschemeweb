import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Language, translations } from '../utils/languages';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type ChatbotProps = {
  language: Language;
  schemes: any[];
};

export function Chatbot({ language, schemes }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: t.chatbotWelcome,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, t.chatbotWelcome, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close chatbot on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for scheme-specific questions
    if (lowerMessage.includes('student') || lowerMessage.includes('scholarship') || lowerMessage.includes('education')) {
      const studentScheme = schemes.find(s => s.name.includes('Scholarship'));
      if (studentScheme) {
        return `The PM Scholarship Scheme provides financial assistance for students pursuing higher education. You need: ${studentScheme.documents.slice(0, 3).join(', ')}. You can apply at: ${studentScheme.applyLink}`;
      }
    }

    if (lowerMessage.includes('farmer') || lowerMessage.includes('kisan') || lowerMessage.includes('agriculture')) {
      const farmerScheme = schemes.find(s => s.name.includes('Kisan'));
      if (farmerScheme) {
        return `PM Kisan Samman Nidhi provides ₹6,000 per year in three installments to farmers. Required documents: ${farmerScheme.documents.slice(0, 3).join(', ')}. Apply at: ${farmerScheme.applyLink}`;
      }
    }

    if (lowerMessage.includes('senior') || lowerMessage.includes('pension') || lowerMessage.includes('old')) {
      const pensionScheme = schemes.find(s => s.name.includes('Vaya Vandana'));
      if (pensionScheme) {
        return `Pradhan Mantri Vaya Vandana Yojana is a pension scheme for senior citizens above 60 years. Documents needed: ${pensionScheme.documents.slice(0, 3).join(', ')}. More info: ${pensionScheme.applyLink}`;
      }
    }

    if (lowerMessage.includes('loan') || lowerMessage.includes('business') || lowerMessage.includes('mudra')) {
      const mudraScheme = schemes.find(s => s.name.includes('Mudra'));
      if (mudraScheme) {
        return `PM Mudra Yojana provides loans up to ₹10 lakhs for small businesses with no collateral. Documents: ${mudraScheme.documents.slice(0, 3).join(', ')}. Apply: ${mudraScheme.applyLink}`;
      }
    }

    if (lowerMessage.includes('health') || lowerMessage.includes('insurance') || lowerMessage.includes('ayushman')) {
      const healthScheme = schemes.find(s => s.name.includes('Ayushman'));
      if (healthScheme) {
        return `Ayushman Bharat provides ₹5 lakhs health coverage per family per year. Documents: ${healthScheme.documents.slice(0, 3).join(', ')}. Check eligibility: ${healthScheme.applyLink}`;
      }
    }

    if (lowerMessage.includes('job') || lowerMessage.includes('employment') || lowerMessage.includes('career')) {
      const jobScheme = schemes.find(s => s.name.includes('Career Service'));
      if (jobScheme) {
        return `National Career Service Portal connects job seekers with employers. Documents: ${jobScheme.documents.slice(0, 3).join(', ')}. Register: ${jobScheme.applyLink}`;
      }
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('training') || lowerMessage.includes('pmkvy')) {
      const skillScheme = schemes.find(s => s.name.includes('Skill Development'));
      if (skillScheme) {
        return `PM Skill Development Scheme offers skill training for youth aged 15-45. Documents: ${skillScheme.documents.slice(0, 3).join(', ')}. Apply: ${skillScheme.applyLink}`;
      }
    }

    if (lowerMessage.includes('girl') || lowerMessage.includes('daughter') || lowerMessage.includes('beti')) {
      const betiScheme = schemes.find(s => s.name.includes('Beti Bachao'));
      if (betiScheme) {
        return `Beti Bachao Beti Padhao focuses on welfare and education of girls. Documents: ${betiScheme.documents.slice(0, 3).join(', ')}. More details: ${betiScheme.applyLink}`;
      }
    }

    // General questions
    if (lowerMessage.includes('document') || lowerMessage.includes('papers') || lowerMessage.includes('needed')) {
      return `Most schemes require: Aadhaar Card, Income Certificate, and Bank Account Details. Specific schemes may need additional documents like Educational Certificates, Land Ownership Documents, or Age Proof.`;
    }

    if (lowerMessage.includes('how many') || lowerMessage.includes('total')) {
      return `You are eligible for ${schemes.length} government schemes based on your profile. Each scheme has different benefits and application processes.`;
    }

    if (lowerMessage.includes('apply') || lowerMessage.includes('application')) {
      return `Each scheme has an "Apply for this scheme" button that takes you directly to the official application portal. Make sure you have all required documents ready before applying.`;
    }

    if (lowerMessage.includes('eligib')) {
      return `Your eligibility is determined by your age, gender, occupation, state, and income. The schemes shown are already filtered to match your profile!`;
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
      return `I can help you understand the schemes you're eligible for. Ask me about specific schemes (student, farmer, senior citizen, health, job, etc.) or general questions about documents and eligibility!`;
    }

    // Default response
    return `I can help you with information about government schemes. Try asking about specific schemes like "student schemes", "farmer benefits", "health insurance", or general questions about documents and eligibility!`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-[0_8px_32px_0_rgba(16,185,129,0.4)] hover:shadow-[0_12px_40px_0_rgba(16,185,129,0.5)] transition-all hover:scale-110 z-50 backdrop-blur-sm border border-white/30 animate-pulse hover:animate-none"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 drop-shadow-lg" />
        </button>
      )}

      {/* Backdrop overlay - click to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-6 w-96 h-[500px] bg-black/40 backdrop-blur-3xl border border-green-500/30 rounded-3xl shadow-[0_16px_64px_0_rgba(16,185,129,0.35)] flex flex-col z-50 overflow-hidden animate-in slide-in-from-right-4 fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating gradient orbs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-teal-500/30 to-green-600/30 rounded-full blur-3xl"></div>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 backdrop-blur-xl text-white p-4 rounded-t-3xl flex justify-between items-center border-b border-green-400/30 relative z-10 shadow-[0_4px_16px_0_rgba(16,185,129,0.3)]">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-xl border border-white/30">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-medium drop-shadow-sm">{t.chatWithUs}</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/30 bg-white/10 p-2 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:scale-110 hover:rotate-90 group"
              aria-label="Close chat"
              title="Close chat"
            >
              <X className="w-5 h-5 group-hover:drop-shadow-lg" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-sm shadow-[0_4px_16px_0_rgba(16,185,129,0.4)] backdrop-blur-sm border border-green-400/30'
                      : 'bg-white/10 backdrop-blur-xl border border-green-500/20 text-gray-200 rounded-bl-sm shadow-[0_4px_16px_0_rgba(16,185,129,0.2)]'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-green-500/30 p-4 bg-black/30 backdrop-blur-2xl rounded-b-3xl relative z-10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.askQuestion}
                className="flex-1 px-4 py-2.5 bg-white/5 backdrop-blur-xl border border-green-500/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 text-white placeholder-gray-400 shadow-[0_2px_8px_0_rgba(16,185,129,0.15)] transition-all duration-300"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2.5 rounded-2xl hover:shadow-[0_4px_16px_0_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 duration-300 backdrop-blur-sm border border-green-400/30 disabled:hover:scale-100"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}