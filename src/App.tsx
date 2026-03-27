import React, { useState, createContext, useContext, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { UserDetailsForm } from './components/UserDetailsForm';
import { SchemeResults } from './components/SchemeResults';
import { SchemeDetail } from './components/SchemeDetail';
import { LoginSignup } from './components/LoginSignup';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { UsersList } from './components/UsersList';
import { SchemesList } from './components/SchemesList';
import { AddScheme } from './components/AddScheme';
import { EditScheme } from './components/EditScheme';
import { SchemesExplorer } from './components/SchemesExplorer';
import { SchemesExplorerDashboard } from './components/SchemesExplorerDashboard';
import { UserDashboard } from './components/UserDashboard';
import { UserProfile } from './components/UserProfile';
import { ApplyForm } from './components/ApplyForm';
import { NoticesList } from './components/NoticesList';
import { AddNotice } from './components/AddNotice';
import { EditNotice } from './components/EditNotice';

type UserDetails = {
  age: string;
  gender: string;
  maritalStatus?: string;
  isPregnant?: string;
  occupation: string;
  state: string;
  area?: string;
  incomeRange: string;
  educationLevel?: string;
  community?: string;
  minorityCategory?: string;
  hasDisability?: string;
  disabilityType?: string;
  disabilityPercentage?: string;
  isStudent?: string;
  employmentStatus?: string;
  belongsBPL?: string;
  inDistress?: string;
  ownsLand?: string;
  landAcres?: string;
};

type Scheme = {
  id: string;
  translationId: string;
  applyLink: string;
  category: string;
  benefitType: string;
  level: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  userDetails: UserDetails | null;
  viewingScheme: Scheme | null;
  currentUser: { name: string; email: string } | null;
  theme: 'light' | 'dark';
  language: string;
  token: string | null;              // ✅ NEW
  setToken: (token: string | null) => void; // ✅ NEW
  toggleTheme: () => void;
  setLanguage: (lang: string) => void;
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  editProfile: () => void;
  saveUserDetails: (details: UserDetails) => void;
  setViewingScheme: (scheme: Scheme | null) => void;
  goBackFromSchemeDetail: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

type Page =
  | 'home'
  | 'details'
  | 'results'
  | 'schemeDetail'
  | 'loginSignup'
  | 'adminLogin'
  | 'admin'
  | 'usersList'
  | 'schemesList'
  | 'addScheme'
  | 'editScheme'
  | 'schemesExplorer'
  | 'userDashboard'
  | 'userProfile'
  | 'applyForm'
  | 'noticesList'
  | 'addNotice'
  | 'editNotice';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [previousPage, setPreviousPage] = useState<Page>('home');
  const [navigationStack, setNavigationStack] = useState<Page[]>(['home']);
  const [loginSource, setLoginSource] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [viewingScheme, setViewingScheme] = useState<Scheme | null>(null);
  const [currentUser, setCurrentUser] =
    useState<{ name: string; email: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<string>('en');
  const [token, setToken] = useState<string | null>(null); // ✅ NEW

  // Load theme only from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('easyfind_theme') as
      | 'light'
      | 'dark'
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    // Intentionally DO NOT restore easyfind_user_auth
    // so that refresh clears login and Home shows "User Login"
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('easyfind_theme', newTheme);
  };

  const checkAdminAuth = () => {
    return localStorage.getItem('easyfind_admin_auth') === 'true';
  };

  // Handle /admin route + hash navigation
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      if (checkAdminAuth()) {
        setCurrentPage('admin');
      } else {
        setCurrentPage('adminLogin');
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'usersList') {
        setCurrentPage('usersList');
      } else if (hash === 'schemesList') {
        setCurrentPage('schemesList');
      } else if (hash === 'addScheme') {
        setCurrentPage('addScheme');
      } else if (hash === 'editScheme') {
        setCurrentPage('editScheme');
      } else if (hash === 'noticesList') {
        setCurrentPage('noticesList');
      } else if (hash === 'addNotice') {
        setCurrentPage('addNotice');
      } else if (hash === 'editNotice') {
        setCurrentPage('editNotice');
      } else if (hash === 'admin') {
        setCurrentPage('admin');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // backend-based login
  const login = (email: string, name: string) => {
    // Do NOT persist auth in localStorage → clears on refresh
    setIsAuthenticated(true);
    setCurrentUser({ name, email });

    // ⬇️ இங்க தான் normal-aa backend JWT set pannuvanga.
    // const jwt = response.data.token;
    // setToken(jwt);
    // localStorage.setItem('token', jwt);

    if (userDetails) {
      setCurrentPage('results');
    } else {
      setCurrentPage('userDashboard');
    }
  };

  // backend-based signup helper
  const signup = (email: string, name: string) => {
    // Do NOT persist auth in localStorage
    setIsAuthenticated(true);
    setCurrentUser({ name, email });

    // Backend signup success response la token vandha, inga set pannunga:
    // const jwt = response.data.token;
    // setToken(jwt);
    // localStorage.setItem('token', jwt);
  };

  const logout = () => {
    // remove only admin auth if you want, keep user auth in memory only
    localStorage.removeItem('easyfind_user_auth'); // optional, no effect now
    localStorage.removeItem('token'); // ✅ JWT clear
    setIsAuthenticated(false);
    setUserDetails(null);
    setCurrentUser(null);
    setToken(null); // ✅
    setCurrentPage('home');
  };

  const editProfile = () => {
    setCurrentPage('details');
  };

  const saveUserDetails = (details: UserDetails) => {
    setUserDetails(details);
    setCurrentPage('results');
  };

  const authValue: AuthContextType = {
    isAuthenticated,
    userDetails,
    viewingScheme,
    currentUser,
    theme,
    language,
    token,       // ✅
    setToken,    // ✅
    toggleTheme,
    setLanguage,
    login,
    signup,
    logout,
    editProfile,
    saveUserDetails,
    setViewingScheme: (scheme: Scheme | null) => {
      setViewingScheme(scheme);
      if (scheme) {
        setPreviousPage(currentPage);
        setCurrentPage('schemeDetail');
      } else {
        setCurrentPage('results');
      }
    },
    goBackFromSchemeDetail: () => {
      setViewingScheme(null);
      setCurrentPage(previousPage);
    },
  };

  return (
    <AuthContext.Provider value={authValue}>
      <div className="min-h-screen">
        {currentPage === 'home' && (
          <HomePage
            onGetStarted={() => setCurrentPage('details')}
            onLogin={() => {
              setLoginSource('home');
              setCurrentPage('loginSignup');
            }}
            onExploreSchemes={() => setCurrentPage('schemesExplorer')}
          />
        )}

        {currentPage === 'loginSignup' && (
          <LoginSignup
            onBack={() => setCurrentPage(loginSource)}
            onSuccess={() => {
              if (loginSource === 'home') {
                setCurrentPage('userDashboard');
              } else if (loginSource === 'results') {
                setCurrentPage('results');
              } else {
                setCurrentPage('userDashboard');
              }
            }}
          />
        )}

        {currentPage === 'details' && <UserDetailsForm />}

        {currentPage === 'results' && (
          <SchemeResults
            onSchemeClick={() => {
              setLoginSource('results');
              setCurrentPage('loginSignup');
            }}
          />
        )}

        {currentPage === 'schemeDetail' && (
          <SchemeDetail
            onApply={() => {
              setCurrentPage('applyForm');
            }}
          />
        )}

        {currentPage === 'adminLogin' && (
          <AdminLogin
            onBack={() => setCurrentPage('home')}
            onSuccess={() => setCurrentPage('admin')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard onBack={() => setCurrentPage('home')} />
        )}
        {currentPage === 'usersList' && <UsersList />}
        {currentPage === 'schemesList' && <SchemesList />}
        {currentPage === 'addScheme' && <AddScheme />}
        {currentPage === 'editScheme' && <EditScheme />}

        {currentPage === 'schemesExplorer' && (
          <SchemesExplorerDashboard
            onBack={() => setCurrentPage('home')}
            onSchemeClick={(scheme) => {
              setPreviousPage('schemesExplorer');
              setViewingScheme({
                ...scheme,
                id: scheme.id,
                translationId: scheme.id,
                applyLink: 'https://example.com/apply',
                category: scheme.category,
                benefitType: scheme.benefitType,
                level: scheme.level,
              } as any);
              setCurrentPage('schemeDetail');
            }}
          />
        )}

        {currentPage === 'userDashboard' && (
          <UserDashboard
            onViewScheme={(scheme) => {
              setPreviousPage('userDashboard');
              setViewingScheme({
                ...scheme,
                id: scheme.id,
                translationId: scheme.id,
                applyLink: 'https://example.com/apply',
                category: scheme.category,
                benefitType: scheme.benefitType,
                level: scheme.level,
              } as any);
              setCurrentPage('schemeDetail');
            }}
            onEditProfile={() => setCurrentPage('details')}
            onLogout={logout}
            onViewAllSchemes={() => setCurrentPage('schemesExplorer')}
            onViewProfile={() => setCurrentPage('userProfile')}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'userProfile' && (
          <UserProfile
            onBack={() => setCurrentPage('userDashboard')}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'applyForm' && viewingScheme && (
          <ApplyForm
            scheme={viewingScheme}
            onBack={() => {
              setCurrentPage('schemeDetail');
            }}
          />
        )}

        {currentPage === 'noticesList' && <NoticesList />}
        {currentPage === 'addNotice' && <AddNotice />}
        {currentPage === 'editNotice' && <EditNotice />}
      </div>
    </AuthContext.Provider>
  );
}
