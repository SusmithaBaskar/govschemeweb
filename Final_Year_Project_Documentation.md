# Final Year Project Documentation: Government Scheme Eligibility System (GovPro)

## 1. Abstract
The "Government Scheme Eligibility System" (GovPro) is a centralized web application designed to bridge the gap between citizens and government welfare schemes. Often, citizens are unaware of the schemes they qualify for due to complex eligibility criteria and fragmented information sources. This project provides an automated, user-friendly platform where citizens can input their demographic details, and an intelligent matching algorithm instantly filters and recommends the specific government schemes they are eligible for. The system includes an administrative dashboard for managing users and scheme data.

---

## 2. Introduction

### 2.1 Problem Statement
Navigating the vast landscape of government welfare schemes is a daunting task for the average citizen. Information is scattered across multiple department websites, and understanding the complex, multi-layered eligibility criteria (based on age, caste, income, disability status, etc.) is highly confusing. As a result, many eligible beneficiaries fail to avail themselves of the support meant for them.

### 2.2 Proposed System
The proposed system is a unified web portal that acts as a single point of truth. Instead of users searching through schemes to find if they fit, the paradigm is reversed: users provide their profile, and the system finds the schemes that fit them. 

### 2.3 Objectives
- To develop an intuitive platform for citizens to discover welfare schemes without prior legal or administrative knowledge.
- To implement a precise demographic matching algorithm that evaluates multiple user parameters against database rules.
- To provide administrators with a secure dashboard to manage scheme criteria and monitor registered users.

---

## 3. System Architecture and Technologies

The application follows a modern 3-tier architecture: Presentation Layer (Frontend), Application logic layer (Backend API), and Data Access Layer (Database).

### 3.1 Technology Stack
*   **Frontend Client:** React.js (v18) with Vite, TypeScript for type safety, and Tailwind CSS & Radix UI for a responsive, accessible interface.
*   **Backend Server:** Node.js environment utilizing the Express.js framework to handle API routing and business logic.
*   **Database:** MySQL relational database for structured storage of users, heavily-detailed scheme criteria, and extended scheme descriptions.
*   **Authentication:** JSON Web Tokens (JWT) and Bcrypt.js for secure password hashing and session management.

### 3.2 System Flow Diagram (Conceptual)
1. **User Input:** User fills out a comprehensive demographic questionnaire (Age, Gender, Income, Community, Disability, etc.).
2. **Data Transmission:** React frontend serializes this data and sends a RESTful `POST` request to the Express backend.
3. **Data Retrieval:** The Node.js server queries the MySQL database to fetch the `schemes_master` rulebook.
4. **Algorithmic Evaluation:** The backend matching engine (`schemesController.js`) compares the user's data against the criteria of every single scheme.
5. **Response:** A prioritized, filtered list of eligible schemes is sent back to the frontend.
6. **Display:** The user views the targeted schemes and can click to view detailed benefits and requisite documents.

---

## 4. Detailed Module Descriptions and Work Flow

The system is compartmentalized into several key modules. Below is the step-by-step working mechanism of each.

### 4.1 Authentication & User Management Module
*   **Sign Up Flow:** When a new user registers, the frontend passes their Name, Email, and Password to the backend `/api/signup` endpoint. The backend checks the `users` table to ensure the email is unique. The password is cryptographically hashed using `bcrypt` (with a salt factor of 10) before being stored in the database.
*   **Login Flow:** During login, the system retrieves the user record by email, compares the provided plaintext password against the stored hash using `bcrypt.compare`, and if matched, grants access. 
*   **Admin User Management:** Administrators can access `AdminDashboard.tsx`, which fetches data from `/api/admin/users`, allowing them to view and manage registered citizens.

### 4.2 Demographic Data Collection Module
Through the `UserDetailsForm.tsx` component, the system collects critical parameters required to determine eligibility:
*   **Basic Details:** Age, Gender (Male, Female, Transgender).
*   **Geographical Data:** State, Area (Rural/Urban).
*   **Socio-Economic Data:** Income Range, Marital Status, Education Level, Employment Status.
*   **Special Categories:** Community, Minority Status, Disability Type & Percentage, BPL (Below Poverty Line) status.
This data is sanitized and normalized (e.g., converting "Yes"/"No" strings to boolean `1`/`0`) before being dispatched to the backend.

### 4.3 The Core Eligibility Matching Algorithm (The Engine)
This is the heart of the project, located in the `countMatches()` function within `schemesController.js`. It executes a scoring and filtering algorithm:

1.  **Mandatory Rules Check (Age):** The system first checks the user's integer age against the scheme's `min_age` and `max_age`. If the user falls outside this range, the algorithm immediately disqualifies the scheme (returns `-1`).
2.  **Complex String Parsing (Gender):** Schemes sometimes apply to multiple genders (e.g., "Male, Female"). The algorithm dynamically splits the database string and checks if the user's gender is included in that specifically allowed array. Disqualifies if not matched.
3.  **Dynamic Parameter Scoring:** The algorithm iterates through a predefined list of 14 dynamic fields (like `income_range`, `community`, `employment_status`, `is_disabled`). 
    *   If a scheme explicitly requires a specific value (e.g., `community` must be "SC/ST") and the user matches it, the scheme gains a match point.
    *   If a scheme defines a field as "Any", "All", or leaves it blank (`0`), it implies universal eligibility for that specific parameter, granting a point automatically.
4.  **Threshold Filtering:** After evaluating all fields, the scheme is assigned a total `matchCount` score. Only schemes that meet or exceed a predefined `MIN_MATCH_FIELDS` threshold (currently set to 5 points) are considered "Eligible".
5.  **Sorting:** The final array of eligible schemes is sorted in descending order based on their `matchCount`, ensuring the most highly customized and relevant schemes appear at the top of the user's results.

### 4.4 Result Presentation and Deep Dive Module
*   **Scheme Cards:** The frontend receives the sorted JSON array of eligible schemes and renders them as interactive cards (`SchemeResults.tsx`).
*   **Detailed View Strategy:** To keep the primary `schemes_master` database table lightweight for the heavy matching algorithm, deep descriptions are stored separately in the `scheme_details` table. 
*   **Data Fetching:** When a user clicks "View Details" on a scheme card, the frontend calls the `/api/scheme-details` endpoint via `schemesAPI`, passing the scheme's name. The backend retrieves and serves the extensive textual data, including an in-depth "Description", "Key Benefits", and "Documents Required".

---

## 5. Database Design (Schema Definition)

The system utilizes a relational model to ensure data integrity and avoid redundancy.

**1. `users` Table**
Handles access control.
*   `id` (INT, Primary Key, Auto-increment)
*   `name` (VARCHAR)
*   `email` (VARCHAR, Unique index)
*   `password` (VARCHAR, Hashed)

**2. `schemes_master` Table**
The algorithmic rulebook containing strictly formatted criteria used by the matching engine.
*   `id` (INT, Primary Key)
*   `scheme_name` (VARCHAR)
*   `min_age` (INT), `max_age` (INT)
*   `gender` (VARCHAR) - Supports comma-separated strings.
*   `state`, `area`, `income_range`, `edu_level`, `community`, `employment_status` (VARCHARs)
*   `is_student`, `is_minority`, `is_disabled`, `is_bpl_category` (TINYINT / Booleans)

**3. `user_details` Table**
Stores the demographic profile submitted by the user. Links back to the `users` table.
*   `user_id` (INT, Foreign Key)
*   Contains mirrors of the criteria columns (`age`, `gender`, `income_range`, etc.) mapping directly to a specific citizen.

**4. `scheme_details` Table**
Stores the heavy text payload for the UI, linked logically by the scheme's name.
*   `scheme_name` (VARCHAR, Reference Key)
*   `description` (TEXT)
*   `benefits` (TEXT)
*   `documents_required` (TEXT)

---

## 6. Conclusion and Future Scope

### 6.1 Conclusion
The GovPro system successfully automates the complex task of scheme discovery. By implementing a highly structured database format alongside a dynamic, point-based matching algorithm, the project removes the burden of research from the citizen. It proves that technology can be leveraged to ensure government welfare reaches the appropriate demographics effectively.

### 6.2 Future Enhancements
*   **AI/NLP Integration:** Implementing a chatbot to guide illiterate or technically challenged users through the demographic form using voice processing.
*   **Direct Application Linkage:** Partnering with government APIs to allow users to not just discover, but directly apply for the schemes from within the GovPro portal by auto-filling state forms.
*   **Multilingual Support:** Expanding the React frontend to support regional languages seamlessly via internationalization libraries, dynamically translating the heavy payloads fetched from `scheme_details`.
