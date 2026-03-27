/**
 * API Service Layer 
 * Authentication: Connected to MySQL Backend (Port 5000)
 * Others: Pure Frontend with localStorage
 */

const BASE_URL = 'http://localhost:5000/api';

// ============================================
// Authentication API - CONNECTED TO BACKEND
// ============================================

export const authAPI = {
  /**
   * Get all registered users from Backend
   */
  getAllUsers: async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/users`);
      if (!response.ok) throw new Error('Failed to fetch from server');
      return await response.json();
    } catch (error) {
      console.error("Fetch users error:", error);
      return { success: false, error: 'Failed to fetch users from database' };
    }
  },

  /**
   * Update user information in Backend
   */
  updateUser: async (userId: number, name: string, email: string) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Failed to update user' };
    }
  },

  /**
   * Delete user from Backend
   */
  deleteUser: async (userId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Failed to delete user' };
    }
  },

  /**
   * Add new user / Signup
   */
  signup: async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  },

  addUser: async (name: string, email: string, password: string) => {
    return authAPI.signup(name, email, password);
  }
};

// ============================================
// Schemes API - LOCAL STORAGE (NO CHANGES)
// ============================================

export const schemesAPI = {
  getAll: async () => {
    try {
      // Fetch from backend
      const response = await fetch(`${BASE_URL}/schemes/all`);
      if (response.ok) {
        const data = await response.json();
        // Since AdminDashboard expects `id`, `name`, `dept`, `cat`, `state`, `target`, `status`
        // We'll map the backend columns to what the UI expects here or in the component.
        // Easiest is to do it here so the rest of the app doesn't break if it expects `name`, `cat` etc.
        const mappedSchemes = data.map((s: any) => ({
          ...s,
          id: s.id,
          name: s.scheme_name,
          dept: s.department || 'N/A', // fallback if department doesn't exist
          cat: s.category || 'Others',
          state: s.level || 'Central',
          target: s.target_group || s.occupations || 'All',
          status: s.status || 'Active'
        }));
        return { success: true, data: mappedSchemes };
      }
      throw new Error('Backend fetch failed');
    } catch (error) {
      console.warn("Failed to fetch schemes from backend, falling back to localStorage", error);
      const storedSchemes = localStorage.getItem('easyfind_schemes');
      const schemes = storedSchemes ? JSON.parse(storedSchemes) : [];
      return { success: true, data: schemes };
    }
  },

  getById: async (id: string) => {
    try {
      const storedSchemes = localStorage.getItem('easyfind_schemes');
      const schemes = storedSchemes ? JSON.parse(storedSchemes) : [];
      const scheme = schemes.find((s: any) => s.id === id);
      return scheme ? { success: true, data: scheme } : { success: false, error: 'Not found' };
    } catch (error) {
      return { success: false, error: 'Error fetching scheme' };
    }
  },

  add: async (schemeData: any) => {
    try {
      const storedSchemes = localStorage.getItem('easyfind_schemes');
      const schemes = storedSchemes ? JSON.parse(storedSchemes) : [];
      const newScheme = { id: `scheme_${Date.now()}`, ...schemeData, created_at: new Date().toISOString() };
      schemes.push(newScheme);
      localStorage.setItem('easyfind_schemes', JSON.stringify(schemes));
      return { success: true, data: newScheme };
    } catch (error) {
      return { success: false, error: 'Failed to add' };
    }
  },

  update: async (id: string, schemeData: any) => {
    try {
      const storedSchemes = localStorage.getItem('easyfind_schemes');
      let schemes = storedSchemes ? JSON.parse(storedSchemes) : [];
      const index = schemes.findIndex((s: any) => s.id === id);
      if (index === -1) return { success: false, error: 'Not found' };
      schemes[index] = { ...schemes[index], ...schemeData, id, updated_at: new Date().toISOString() };
      localStorage.setItem('easyfind_schemes', JSON.stringify(schemes));
      return { success: true, data: schemes[index] };
    } catch (error) {
      return { success: false, error: 'Update failed' };
    }
  },

  delete: async (id: string) => {
    try {
      const storedSchemes = localStorage.getItem('easyfind_schemes');
      let schemes = storedSchemes ? JSON.parse(storedSchemes) : [];
      localStorage.setItem('easyfind_schemes', JSON.stringify(schemes.filter((s: any) => s.id !== id)));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Delete failed' };
    }
  },

  toggleActive: async (id: string) => {
    try {
      const storedSchemes = localStorage.getItem('easyfind_schemes');
      let schemes = storedSchemes ? JSON.parse(storedSchemes) : [];
      const index = schemes.findIndex((s: any) => s.id === id);
      if (index !== -1) {
        schemes[index].isActive = !schemes[index].isActive;
        localStorage.setItem('easyfind_schemes', JSON.stringify(schemes));
        return { success: true, data: schemes[index] };
      }
      return { success: false, error: 'Not found' };
    } catch (error) {
      return { success: false };
    }
  }
};

// ============================================
// Notices API - LOCAL STORAGE (NO CHANGES)
// ============================================

export const noticesAPI = {
  getAll: async () => {
    try {
      const storedNotices = localStorage.getItem('easyfind_notices');
      const notices = storedNotices ? JSON.parse(storedNotices) : [];
      return { success: true, data: notices };
    } catch (error) {
      return { success: false, error: 'Failed to fetch notices' };
    }
  },

  add: async (noticeData: any) => {
    try {
      const storedNotices = localStorage.getItem('easyfind_notices');
      const notices = storedNotices ? JSON.parse(storedNotices) : [];
      const newNotice = { id: `notice_${Date.now()}`, ...noticeData, created_at: new Date().toISOString() };
      notices.push(newNotice);
      localStorage.setItem('easyfind_notices', JSON.stringify(notices));
      return { success: true, data: newNotice };
    } catch (error) {
      return { success: false };
    }
  },

  delete: async (id: string) => {
    try {
      const storedNotices = localStorage.getItem('easyfind_notices');
      let notices = storedNotices ? JSON.parse(storedNotices) : [];
      localStorage.setItem('easyfind_notices', JSON.stringify(notices.filter((n: any) => n.id !== id)));
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
};

// ============================================
// Applications API - LOCAL STORAGE (NO CHANGES)
// ============================================

export const applicationsAPI = {
  getAll: async () => {
    try {
      const storedApps = localStorage.getItem('easyfind_applications');
      const apps = storedApps ? JSON.parse(storedApps) : [];
      return { success: true, data: apps };
    } catch (error) {
      return { success: false };
    }
  },

  submit: async (applicationData: any) => {
    try {
      const storedApps = localStorage.getItem('easyfind_applications');
      const apps = storedApps ? JSON.parse(storedApps) : [];
      const newApp = { id: `app_${Date.now()}`, ...applicationData, status: 'pending', submitted_at: new Date().toISOString() };
      apps.push(newApp);
      localStorage.setItem('easyfind_applications', JSON.stringify(apps));
      return { success: true, data: newApp };
    } catch (error) {
      return { success: false };
    }
  }
};