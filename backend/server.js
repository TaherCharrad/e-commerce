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
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [users] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  
  if (users.length === 0) {
    return res.status(400).json({ success: false, message: "User doesn't exist" });
  }
  
  res.json({ success: true });
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

app.listen(5000, () => console.log('Server running on port 5000'));