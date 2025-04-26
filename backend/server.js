const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'znt4szv8ja',
  database: 'simple_auth'
});

// Create users table
(async () => {
  const conn = await pool.getConnection();
  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `);
  conn.release();
})();

// Login endpoint
// In server.js, modify the login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [users] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  
  if (users.length === 0) {
    return res.status(400).json({ success: false, message: "User doesn't exist" });
  }
  
  res.json({ 
    success: true,
    user: {  // Include the user data in response
      email: users[0].email,
      name: users[0].name
    }
  });
  console.log(users[0].name);
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  
  try {
    await pool.query('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, password]);
    res.json({ success: true });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete account endpoint
app.post('/delete', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const [result] = await pool.query('DELETE FROM users WHERE email = ?', [email]);
    if (result.affectedRows === 0) {
      return res.status(400).json({ success: false, message: "No user found with this email" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Change password endpoint
app.post('/change-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const [result] = await pool.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
