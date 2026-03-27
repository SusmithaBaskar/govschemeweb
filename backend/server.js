// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Admin routes import
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Update 1: CORS settings - 'credentials: true' kudukanum if you use cookies/sessions
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

// DEBUG – log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ Update 2: Route definition check
// Unga Frontend-la authAPI.getAllUsers() path '/api/admin/users' nu irundha idhu correct
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api', schemeRoutes);

// Save user details route...
app.post('/api/user-details', async (req, res) => {
  // ... unga existing code ...
  try {
    const data = req.body;
    const sql = `INSERT INTO user_details (user_id, age, gender, marital_status, is_pregnant, state, area, income_range, education_level, community, minority_category, has_disability, disability_type, disability_percentage, is_student, employment_status, occupation, belongs_bpl, in_distress, owns_land, land_acres) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [data.userId || 'guest', data.age || null, data.gender || null, data.maritalStatus || null, data.isPregnant || null, data.state || null, data.area || null, data.incomeRange || null, data.educationLevel || null, data.community || null, data.minorityCategory || null, data.hasDisability || null, data.disabilityType || null, data.disabilityPercentage || null, data.isStudent || null, data.employmentStatus || null, data.occupation || null, data.belongsBPL || null, data.inDistress || null, data.ownsLand || null, data.landAcres || null];
    const [result] = await pool.execute(sql, values);
    res.status(201).json({ success: true, message: 'User details saved successfully', userDetailsId: result.insertId });
  } catch (err) {
    console.error('User details save error:', err);
    res.status(500).json({ success: false, message: 'Failed to save user details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});