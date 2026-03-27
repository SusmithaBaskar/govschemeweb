# GovPro Project Documentation Overview

## 1. Project Overview
**GovPro** is a Government Scheme Eligibility System designed to help users identify government schemes they are eligible for based on their personal and demographic profiles. It includes a user-facing portal and an administrative dashboard for managing schemes and users.

## 2. Technology Stack

### Frontend (User Interface)
The frontend is built with modern web technologies focusing on performance and accessibility.
- **Framework:** [React v18.3.1](https://react.dev/)
- **Build Tool:** [Vite v6.3.5](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (for type safety)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (Headless UI components for accessibility)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/) (used in Admin Dashboard)
- **State Management:** [React Hooks](https://react.dev/reference/react)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Notifications:** [Sonner](https://sonner.stevenly.me/) (Toasts)

### Backend (API & Logic)
The backend manages data processing, authentication, and database interactions.
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express v4.22.1](https://expressjs.com/)
- **Authentication:** [JWT](https://jwt.io/) (JSON Web Tokens) & [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) (for password hashing)
- **Database Driver:** [MySQL2](https://www.npmjs.com/package/mysql2)
- **Environment Management:** [Dotenv](https://www.npmjs.com/package/dotenv)

### Database
- **System:** [MySQL](https://www.mysql.com/)
- **Database Name:** `govt_schemes`

---

## 3. Database Schema (Tables)

### `users`
Stores registered user information for authentication.
- `id`: Internal ID (Primary Key)
- `name`: Full name of the user
- `email`: User email (Unique)
- `password`: Hashed password

### `schemes_master`
Contains the core criteria for each government scheme.
- `id`: Unique Identifier
- `scheme_name`: Name of the scheme
- `min_age` / `max_age`: Age eligibility range
- `gender`: Eligible genders (Supports 'Male', 'Female', 'Others' or comma-separated)
- `is_student`: Requirement for student status
- `state` / `area`: Geographical eligibility
- `income_range`: Financial eligibility
- `edu_level`: Educational requirements
- `community` / `category`: Caste/Category requirements
- `employment_status`: Work status requirement
- `is_disabled`: Disability eligibility

### `user_details`
Stores profile data submitted by users for eligibility checks.
- `user_id`: Link to the `users` table
- `age`, `gender`, `marital_status`, `state`, `area`
- `income_range`, `education_level`, `community`
- `disability_type`, `is_student`, `occupation`, `belongs_bpl`

### `scheme_details`
Stores descriptive content for the individual scheme detail pages.
- `scheme_name`: Linked to `schemes_master`
- `description`: Detailed description of the scheme
- `benefits`: List of benefits
- `documents_required`: List of necessary documents

---

## 4. Architecture & Workflow

1. **Frontend-Backend Communication:** The frontend communicates with the backend via REST APIs defined in `src/services/api.ts`.
2. **Authentication:** Users sign up/login using `authRoutes.js`. Passwords are encrypted before storage.
3. **Eligibility Logic:** The `schemesController.js` contains a complex matching algorithm (`countMatches`) that compares user profiles against `schemes_master` criteria.
4. **Admin Features:** Administrators can view user lists and manage scheme data through the `AdminDashboard.tsx`.
