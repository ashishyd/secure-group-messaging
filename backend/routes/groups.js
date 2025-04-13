// Endpoints for group creation, listing, join/leave, delete

const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// Create Group Endpoint
router.post('/', async (req, res, next) => {
    try {
        const { name, creatorId } = req.body;
        // Insert group into DB (simplified)
        const result = await db.query(
            'INSERT INTO Groups (name, creatorId) VALUES (@name, @creatorId); SELECT SCOPE_IDENTITY() as groupId;',
            { name, creatorId }
        );
        const groupId = result.recordset[0].groupId;
        res.status(201).json({ groupId, name, creatorId });
    } catch (error) {
        next(error);
    }
});

// List Groups Endpoint
router.get('/', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM Groups');
        res.status(200).json(result.recordset);
    } catch (error) {
        next(error);
    }
});

// Join Group Endpoint (assuming userId and groupId are passed)
router.post('/join', async (req, res, next) => {
    try {
        const { userId, groupId } = req.body;
        await db.query(
            'INSERT INTO GroupMembership (userId, groupId) VALUES (@userId, @groupId)',
            { userId, groupId }
        );
        res.status(200).json({ message: 'Joined group successfully.' });
    } catch (error) {
        next(error);
    }
});

// Leave Group Endpoint
router.post('/leave', async (req, res, next) => {
    try {
        const { userId, groupId } = req.body;
        // Check if user is the owner; if so, enforce ownership transfer.
        const ownershipResult = await db.query(
            'SELECT creatorId FROM Groups WHERE groupId = @groupId',
            { groupId }
        );
        if (ownershipResult.recordset[0].creatorId === userId) {
            return res.status(400).json({ error: 'Owner must assign a new owner before leaving.' });
        }
        await db.query(
            'DELETE FROM GroupMembership WHERE userId = @userId AND groupId = @groupId',
            { userId, groupId }
        );
        res.status(200).json({ message: 'Left group successfully.' });
    } catch (error) {
        next(error);
    }
});

// Delete Group Endpoint (only owner can delete)
router.delete('/:groupId', async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const { userId } = req.body; // assume owner userID is passed
        const groupResult = await db.query(
            'SELECT creatorId FROM Groups WHERE groupId = @groupId',
            { groupId }
        );
        if (groupResult.recordset.length === 0) {
            return res.status(404).json({ error: 'Group not found.' });
        }
        if (groupResult.recordset[0].creatorId !== userId) {
            return res.status(403).json({ error: 'Only group owner can delete the group.' });
        }
        await db.query('DELETE FROM Groups WHERE groupId = @groupId', { groupId });
        res.status(200).json({ message: 'Group deleted successfully.' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
