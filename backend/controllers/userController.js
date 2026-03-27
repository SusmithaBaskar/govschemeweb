const db = require('../config/db');

// Ella users details-aiyum fetch panna
exports.getAllUsers = async (req, res) => {
  try {
    // FIX: Unga table-la illatha columns-ai thookiyaachu.
    // Verum id, name, email mattum select panrom.
    const [rows] = await db.execute('SELECT id, name, email FROM users ORDER BY id DESC');
    
    // Frontend-ku clean-ah data anuprom
    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error("Error fetching users: ", err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Database query failed', 
      error: err.message 
    });
  }
};