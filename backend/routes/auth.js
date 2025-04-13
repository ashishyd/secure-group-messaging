// Endpoints for registration/login

const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const JWT_SECRET = config.JWT_SECRET; // Secret for JWT signing

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please provide name, email, and password.' });
        }

        // Check for existing user
        const existingUser = await db.query('SELECT * FROM Users WHERE email = @email', { email });
        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the Users table
        const result = await db.query(
            `INSERT INTO Users (name, email, password)
             VALUES (@name, @email, @password);
             SELECT SCOPE_IDENTITY() AS userId;`,
            { name, email, password: hashedPassword }
        );

        const userId = result.recordset[0].userId;
        res.status(201).json({ userId, name, email });
    } catch (error) {
        next(error);
    }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password.' });
        }

        // Retrieve user from the database
        const result = await db.query('SELECT * FROM Users WHERE email = @email', { email });
        if (result.recordset.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        const user = result.recordset[0];

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.userId, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            userId: user.userId,
            email: user.email,
            name: user.name
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
