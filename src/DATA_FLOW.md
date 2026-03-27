# EasyFind Scheme - Data Flow Architecture

## 📊 Overview

This document explains how data flows through the EasyFind Scheme application using localStorage.

---

## 🔄 Core Data Flow Pattern

```
┌─────────────────┐
│  React Component│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  API Service    │  (/services/api.ts)
│  Layer          │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  localStorage   │  (Browser Storage)
└─────────────────┘
```

---

## 1️⃣ User Authentication Flow

### Signup Process:
```
User fills signup form (LoginSignup.tsx)
         ↓
App.tsx → signup(email, password, name)
         ↓
Read existing users: localStorage.getItem('easyfind_users')
         ↓
Check if user exists
         ↓
Add new user to array
         ↓
Save: localStorage.setItem('easyfind_users', JSON.stringify(users))
         ↓
Create session: localStorage.setItem('easyfind_user_auth', JSON.stringify({email, name}))
         ↓
User logged in ✅
```

### Login Process:
```
User fills login form (LoginSignup.tsx)
         ↓
App.tsx → login(email, password)
         ↓
Read: localStorage.getItem('easyfind_users')
         ↓
Find matching user
         ↓
If found → localStorage.setItem('easyfind_user_auth', ...)
         ↓
User logged in ✅
```

### Session Persistence:
```
App loads → useEffect()
         ↓
Read: localStorage.getItem('easyfind_user_auth')
         ↓
If exists → Parse JSON → setIsAuthenticated(true)
         ↓
User stays logged in across page refreshes ✅
```

---

## 2️⃣ Scheme Management Flow (Admin)

### Adding a Scheme:
```
Admin fills form (AddScheme.tsx)
         ↓
Form submit → schemesAPI.add(formData)
         ↓
/services/api.ts → add()
         ↓
Read: localStorage.getItem('easyfind_schemes')
         ↓
Create new scheme object with unique ID
         ↓
Add to schemes array
         ↓
Save: localStorage.setItem('easyfind_schemes', JSON.stringify(schemes))
         ↓
Return {success: true, data: newScheme}
         ↓
Show success message ✅
```

### Editing a Scheme:
```
Admin clicks Edit (SchemesList.tsx)
         ↓
Save scheme data: localStorage.setItem('easyfind_editing_scheme', JSON.stringify(scheme))
         ↓
Navigate to EditScheme page
         ↓
EditScheme.tsx loads → useEffect()
         ↓
Read: localStorage.getItem('easyfind_editing_scheme')
         ↓
Populate form with existing data
         ↓
Admin makes changes → Submit
         ↓
schemesAPI.update(id, formData)
         ↓
Read schemes → Find by ID → Update → Save back
         ↓
Clear temp data: localStorage.removeItem('easyfind_editing_scheme')
         ↓
Scheme updated ✅
```

### Deleting a Scheme:
```
Admin clicks Delete (SchemesList.tsx)
         ↓
Confirm deletion
         ↓
schemesAPI.delete(schemeId)
         ↓
Read schemes → Filter out deleted scheme → Save
         ↓
Scheme deleted ✅
```

### Toggling Active Status:
```
Admin clicks toggle icon (SchemesList.tsx)
         ↓
schemesAPI.toggleActive(schemeId)
         ↓
Read schemes → Find by ID → Toggle isActive boolean → Save
         ↓
Status toggled ✅
```

---

## 3️⃣ User Scheme Discovery Flow

### Step 1: Fill Details Form
```
User navigates to UserDetailsForm.tsx
         ↓
Multi-step form (4 steps)
         ↓
Submit → App.tsx → saveUserDetails(details)
         ↓
setUserDetails(details) → Stored in React state
         ↓
Navigate to SchemeResults page
```

### Step 2: View Matching Schemes
```
SchemeResults.tsx loads
         ↓
Read user details from React Context
         ↓
Read: localStorage.getItem('easyfind_schemes')
         ↓
Filter schemes based on eligibility criteria:
  - Age range
  - Gender
  - State
  - Income
  - Education level
  - Community
  - Disability status
  - Employment
  - Marital status
  - etc.
         ↓
Display matching schemes ✅
```

### Step 3: Save Favorite Scheme
```
User clicks "Save Scheme" (SchemeDetail.tsx)
         ↓
Create key: easyfind_saved_schemes_{email}
         ↓
Read: localStorage.getItem(savedSchemesKey)
         ↓
Add scheme to saved list
         ↓
Save: localStorage.setItem(savedSchemesKey, JSON.stringify(savedSchemes))
         ↓
Scheme saved ✅
```

### Step 4: Apply for Scheme
```
User clicks "Apply Now"
         ↓
Navigate to ApplyForm.tsx
         ↓
Fill 6-section application form:
  - Personal Info
  - Address
  - Additional Info
  - Bank Details
  - Document Uploads
  - Declaration
         ↓
Submit → applicationsAPI.submit(data)
         ↓
Create application object
         ↓
Save: localStorage.setItem('easyfind_applications', ...)
         ↓
Also save to user-specific key: easyfind_applied_schemes_{email}
         ↓
Application submitted ✅
```

---

## 4️⃣ Notice Management Flow

### Adding a Notice:
```
Admin fills form (AddNotice.tsx)
         ↓
Submit → noticesAPI.add(formData)
         ↓
Read: localStorage.getItem('easyfind_notices')
         ↓
Create new notice with ID
         ↓
Add to notices array
         ↓
Save: localStorage.setItem('easyfind_notices', JSON.stringify(notices))
         ↓
Notice created ✅
```

### Editing a Notice:
```
Admin clicks Edit (NoticesList.tsx)
         ↓
Save notice ID: localStorage.setItem('easyfind_editing_notice_id', id)
         ↓
Navigate to EditNotice.tsx
         ↓
Load notice → Edit → Submit
         ↓
noticesAPI.update(id, data)
         ↓
Notice updated ✅
```

### Displaying Notices on Homepage:
```
HomePage.tsx loads
         ↓
Read: localStorage.getItem('easyfind_notices')
         ↓
Filter active notices
         ↓
Display as banners/cards ✅
```

---

## 5️⃣ Admin Dashboard Statistics

```
AdminDashboard.tsx loads
         ↓
Read localStorage keys:
  - easyfind_users → Count total users
  - easyfind_schemes → Count total schemes
  - easyfind_notices → Count active notices
  - easyfind_applications → Count applications
         ↓
Calculate statistics
         ↓
Display dashboard cards ✅
```

---

## 6️⃣ User Dashboard

```
UserDashboard.tsx loads
         ↓
Get current user from React Context
         ↓
Read saved schemes:
  localStorage.getItem('easyfind_saved_schemes_{email}')
         ↓
Read applied schemes:
  localStorage.getItem('easyfind_applied_schemes_{email}')
         ↓
Read all schemes to get full details
         ↓
Display user's saved and applied schemes ✅
```

---

## 7️⃣ Theme Management

```
User clicks theme toggle
         ↓
App.tsx → toggleTheme()
         ↓
setTheme(newTheme)
         ↓
Save: localStorage.setItem('easyfind_theme', newTheme)
         ↓
On app load → useEffect()
         ↓
Read: localStorage.getItem('easyfind_theme')
         ↓
Apply saved theme preference ✅
```

---

## 8️⃣ Language Switching

```
User selects language
         ↓
App.tsx → setLanguage(lang)
         ↓
React Context updates
         ↓
All components re-render with new language
         ↓
Read translations from:
  - /utils/translations.ts
  - /utils/schemeTranslations.ts
         ↓
Display translated content ✅
```

---

## 📦 localStorage Keys Reference

| Key Pattern | Purpose | Data Type |
|------------|---------|-----------|
| `easyfind_users` | All user accounts | Array of user objects |
| `easyfind_user_auth` | Current logged-in user | Object {email, name} |
| `easyfind_admin_auth` | Admin login flag | String "true" |
| `easyfind_schemes` | All schemes | Array of scheme objects |
| `easyfind_admin_schemes` | Legacy admin schemes | Array |
| `easyfind_editing_scheme` | Temp edit data | Single scheme object |
| `easyfind_notices` | All notices | Array of notice objects |
| `easyfind_editing_notice_id` | Temp edit ID | String |
| `easyfind_saved_schemes_{email}` | User's saved schemes | Array of scheme IDs |
| `easyfind_applied_schemes_{email}` | User's applications | Array of application objects |
| `easyfind_applications` | All applications | Array of application objects |
| `easyfind_theme` | Theme preference | String "dark" or "light" |
| `loggedInUsers` | Legacy logged users | Array |

---

## 🔍 Data Flow Examples

### Example 1: Complete User Journey
```
1. User visits homepage
2. Clicks "Get Started"
3. Fills 4-step eligibility form
4. System matches schemes from localStorage
5. User views results
6. User creates account (saved to localStorage)
7. User saves favorite schemes (saved to localStorage)
8. User applies for scheme (saved to localStorage)
9. User can view their applications in dashboard
```

### Example 2: Admin Journey
```
1. Admin navigates to /admin
2. Enters credentials (verified against localStorage)
3. Views dashboard statistics (from localStorage)
4. Adds new scheme (saved to localStorage)
5. Edits existing scheme (updated in localStorage)
6. Toggles scheme status (updated in localStorage)
7. Creates notice (saved to localStorage)
```

### Example 3: Multi-Device Limitation
```
User on Device A:
  - Creates account → Saved in Device A's localStorage
  
User on Device B:
  - Cannot access account ❌
  - localStorage is device/browser specific
  
Solution for production:
  - Use real backend API
  - Store data in server database
  - Sync across devices
```

---

## ⚡ Performance Characteristics

### Read Operations:
- **Speed:** Instant (synchronous)
- **Location:** Browser memory
- **No network latency:** ✅

### Write Operations:
- **Speed:** Instant (synchronous)
- **Persistence:** Until browser cache cleared
- **Size limit:** ~5-10MB per domain

### Limitations:
- ❌ Data not synced across devices
- ❌ Data lost if cache cleared
- ❌ No server-side backup
- ❌ Limited storage space
- ❌ No concurrent user access

---

## 🔐 Security Model

### Current Implementation:
```
Browser localStorage (Plain Text)
         ↓
Anyone with browser access can:
  - View all data (DevTools → Application → localStorage)
  - Modify any data
  - Delete data
  - Become admin (set easyfind_admin_auth = "true")
```

### For Production:
```
Backend API with Authentication
         ↓
JWT tokens or Session cookies
         ↓
Encrypted HTTPS connection
         ↓
Server-side validation
         ↓
Database with proper access control
         ↓
Password hashing (bcrypt/argon2)
```

---

## 🎯 Key Takeaways

1. **All data lives in browser localStorage**
2. **No network requests** - Everything is instant
3. **API service layer abstracts localStorage** - Easy to swap with real API
4. **React Context manages app state** - localStorage for persistence
5. **Device-specific data** - No cross-device sync
6. **Perfect for demos** - Not for production with real users

---

**Document Version:** 1.0  
**Last Updated:** January 17, 2026  
**Application:** EasyFind Scheme
