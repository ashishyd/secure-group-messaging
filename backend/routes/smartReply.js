// Endpoint to generate smart reply suggestions via Open AI API

const express = require('express');
const router = express.Router();
const { getSmartReplies } = require('../utils/smartReplyAI');

router.post('/', async (req, res, next) => {
    try {
        const { message } = req.body;
        // Call AI module to retrieve three smart reply suggestions
        const suggestions = await getSmartReplies(message);
        res.status(200).json({ suggestions });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
