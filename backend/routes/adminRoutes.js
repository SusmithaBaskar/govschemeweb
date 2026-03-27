const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Check if your DB config path is correct

// GET all users
router.get('/users', async (req, res) => {
  try {
    // 🔥 FIX: Error kudutha age, gender, state columns-ai thookiyaachu
    const [rows] = await pool.execute('SELECT id, name, email FROM users ORDER BY id DESC');
    
    console.log("Data fetched from DB successfully");
    
    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    // Backend console-la error-ai print pannum
    console.error("DATABASE ERROR:", err.message);
    
    res.status(500).json({ 
      success: false, 
      message: 'Database error',
      error: err.message 
    });
  }
});

module.exports = router;