const db = require('../config/db');

/**
 * countMatches: Database-la irukura comma separated gender (male,female,others) 
 * values-ai handle panna modified function.
 */
function countMatches(scheme, user) {
  let count = 0;

  // --- 1. AGE VALIDATION (Mandatory) ---
  const age = parseInt(user.age, 10);
  if (isNaN(age) || age < scheme.min_age || age > scheme.max_age) {
    return -1;
  }
  count += 2;

  // --- 2. GENDER VALIDATION (Comma Separated Values Support) ---
  const sGenderRaw = scheme.gender ? String(scheme.gender).toLowerCase().trim() : 'any';
  const uGender = user.gender ? String(user.gender).toLowerCase().trim() : '';

  const isUniversal = (sGenderRaw === 'any' || sGenderRaw === 'both' || sGenderRaw === '0' || sGenderRaw === 'all' || sGenderRaw === '');

  if (!isUniversal) {
    const genderList = sGenderRaw.split(',').map(g => g.trim());
    if (!genderList.includes(uGender)) {
      return -1;
    }
  }
  count++;

  // --- 3. STUDENT STATUS VALIDATION ---
  const sStudent = scheme.is_student ? String(scheme.is_student).toLowerCase().trim() : '0';
  const uStudent = user.is_student ? String(user.is_student).toLowerCase().trim() : 'no';

  if ((sStudent === 'yes' || sStudent === '1') && (uStudent === 'no' || uStudent === '0')) {
    return -1;
  }
  count++;

  // --- 4. DYNAMIC FIELDS CHECK ---
  /* 
     Fixed typos in field names to match Frontend Payload (UserDetailsForm & SchemeResults).
     - employement_status -> employment_status
     - maritial_status -> marital_status
  */
  const fieldsToCheck = [
    'occupation', 'state', 'area', 'income_range', 'edu_level',
    'community', 'is_minority', 'is_disabled', 'disability_type',
    'employment_status', 'is_bpl_category', 'poverty_line',
    'marital_status', 'category'
  ];

  fieldsToCheck.forEach(field => {
    // DB Column handling: checks correct spelling first. 
    // If undefined in scheme (e.g. DB has typo 'employement_status'), try typo versions.
    let sValRaw = scheme[field];

    // Fallback for known common typos in legacy DB schemas
    if (sValRaw === undefined && field === 'employment_status') {
      sValRaw = scheme['employement_status'];
    }
    if (sValRaw === undefined && field === 'marital_status') {
      sValRaw = scheme['maritial_status'];
    }

    const sVal = sValRaw ? String(sValRaw).toLowerCase().trim() : '0';

    // User input is now standardized to correct English keys
    const uVal = user[field] ? String(user[field]).toLowerCase().trim() : '';

    if (sVal === '0' || sVal === 'any' || sVal === 'all' || sVal === '') {
      count++;
    }
    else if (sVal === uVal) {
      count++;
    }
  });

  return count;
}

// --- EXISTING SEARCH FUNCTION ---
exports.searchSchemes = async (req, res) => {
  try {
    const user = req.body;
    const [rows] = await db.execute('SELECT * FROM schemes_master');

    const MIN_MATCH_FIELDS = 5;

    const result = rows
      .map((scheme) => {
        const matchCount = countMatches(scheme, user);
        return { ...scheme, matchCount };
      })
      .filter((scheme) => scheme.matchCount >= MIN_MATCH_FIELDS)
      .sort((a, b) => b.matchCount - a.matchCount);

    res.json(result);
  } catch (err) {
    console.error("Search Error: ", err);
    res.status(500).json({ message: 'Error searching schemes' });
  }
};

// --- EXISTING GET ALL FUNCTION ---
exports.getAllSchemes = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM schemes_master');
    res.json(rows);
  } catch (err) {
    console.error("Fetch Error: ", err);
    res.status(500).json({ message: 'Error fetching schemes' });
  }
};

// ✅ NEW: GET SCHEME DETAILS FROM scheme_details TABLE
exports.getSchemeDetailsByName = async (req, res) => {
  const schemeName = req.query.name;

  if (!schemeName) {
    return res.status(400).json({ success: false, message: 'Scheme name is required' });
  }

  try {
    // Note: Database-la 'scheme_details' table kandippa irukanum
    const [rows] = await db.execute('SELECT * FROM scheme_details WHERE scheme_name = ?', [schemeName]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Details not found for this scheme' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Detail Fetch Error: ", err);
    res.status(500).json({ success: false, message: 'Error fetching scheme details' });
  }
};