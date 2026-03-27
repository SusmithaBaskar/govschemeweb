// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// POST /api/signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('SIGNUP body:', req.body);

  if (!name || !email || !password || password.length < 6) {
    return res
      .status(400)
      .json({ message: 'All fields required, password min 6 chars' });
  }

  try {
    // already user irukkaa check
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [
      email,
    ]);
    console.log('Existing user:', existing);

    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // password hash
    const hashed = await bcrypt.hash(password, 10);

    // insert user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed],
    );
    console.log('INSERT result:', result);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error >>>', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('LOGIN body:', req.body);

  if (!email || !password || password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Email and password (min 6 chars) required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ippove JWT illa; simple user info thiruppi anupprom
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('Login error >>>', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/forgot-password (demo only)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('FORGOT PASSWORD body:', req.body);

  if (!email) {
    return res.status(400).json({ message: 'Email required' });
  }

  try {
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [
      email,
    ]);

    // real project la token + email send panna vendum; ippo generic msg
    if (rows.length === 0) {
      return res.json({ message: 'If this email exists, reset link sent' });
    }

    return res.json({ message: 'Reset link sent' });
  } catch (err) {
    console.error('Forgot password error >>>', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('LOGIN body:', req.body);

  if (!email || !password || password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Email and password (min 6 chars) required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ippove JWT illa; simple user info thiruppi anupprom
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('Login error >>>', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/forgot-password (demo only)
exports.searchScheme = async (req, res) => {
  try {
    const {
      gender,
      age,
      state,
      area,
      incomeRange,
      educationLevel,
      isStudent,
      community,
      minorityCategory,
      hasDisability,
      disabilityPercentage,
      employmentStatus,
      belongsBPL,
      maritalStatus
    } = req.body;

    // 🔥 Normalize UI values → DB-friendly values
    const payload = {
      gender: gender || '',
      age: Number(age) || 0,
      state: state || '',
      area: area || '',
      income_range: incomeRange || '',
      edu_level: educationLevel || '',
      is_student: isStudent === 'Yes' ? 1 : 0,
      community: community || '',
      is_minority: minorityCategory === 'Yes' ? 1 : 0,
      category: community || '',
      is_disabled: hasDisability === 'Yes' ? 1 : 0,
      disable_percentage: Number(disabilityPercentage) || 0,
      employment_status: employmentStatus || '',
      is_bpl_category: belongsBPL === 'Yes' ? 1 : 0,
      maritial_status: maritalStatus || ''
    };

    const sql = `
      SELECT *
      FROM schemes_master
      WHERE
        (gender IS NULL OR gender = ''
          OR LOWER(gender) LIKE CONCAT('%', LOWER(?), '%'))
      AND (? BETWEEN min_age AND max_age)
      AND (state IS NULL OR state = ''
          OR LOWER(state) LIKE CONCAT('%', LOWER(?), '%'))
      AND (area IS NULL OR area = ''
          OR LOWER(area) LIKE CONCAT('%', LOWER(?), '%'))
      AND (income_range IS NULL OR income_range = ''
          OR LOWER(income_range) LIKE CONCAT('%', LOWER(?), '%'))
      AND (education_level IS NULL OR education_level = ''
          OR LOWER(education_level) LIKE CONCAT('%', LOWER(?), '%'))
      AND (is_student = 0 OR is_student = ?)
      AND (community IS NULL OR community = ''
          OR LOWER(community) LIKE CONCAT('%', LOWER(?), '%'))
      AND (is_minority = 0 OR is_minority = ?)
      AND (category IS NULL OR category = ''
          OR LOWER(category) LIKE CONCAT('%', LOWER(?), '%'))
      AND (is_disabled = 0 OR is_disabled = ?)
      AND (disability_percentage = 0 OR disability_percentage <= ?)
      AND (employment_status IS NULL OR employment_status = ''
          OR LOWER(employment_status) LIKE CONCAT('%', LOWER(?), '%'))
      AND (is_bpl = 0 OR is_bpl = ?)
      AND (marital_status IS NULL OR marital_status = ''
          OR LOWER(marital_status) LIKE CONCAT('%', LOWER(?), '%'));
    `;

    const values = [
      payload.gender,
      payload.age,
      payload.state,
      payload.area,
      payload.income_range,
      payload.edu_level,
      payload.is_student,
      payload.community,
      payload.is_minority,
      payload.category,
      payload.is_disabled,
      payload.disable_percentage,
      payload.employment_status,
      payload.is_bpl_category,
      payload.maritial_status
    ];

    const [rows] = await pool.query(sql, values);

    res.json({
      success: true,
      matchedSchemes: rows.length,
      data: rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Eligibility search failed'
    });
  }
};

