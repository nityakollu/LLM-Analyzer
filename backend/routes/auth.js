const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_strong_secret';
const JWT_EXP = '8h';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ message: 'username + password required' });

  const users = await fs.readJson(USERS_FILE).catch(()=>[]);
  const user = users.find(u => u.username === username);
  if(!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXP });
  res.json({ token, role: user.role, username: user.username });
});

module.exports = router;
