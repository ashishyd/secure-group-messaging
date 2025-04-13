const db = require('../utils/db');

async function logErrorToDB(err) {
    try {
        // Adjust the table/column names per your schema.
        await db.query(
            `INSERT INTO ErrorLogs (message, stack, createdAt)
       VALUES (@message, @stack, GETDATE())`,
            { message: err.message, stack: err.stack }
        );
    } catch (dbError) {
        console.error('Failed to log error to DB:', dbError);
    }
}

function errorHandler(err, req, res, next) {
    console.error('[Error]', err);

    // Log error to database (fire-and-forget)
    logErrorToDB(err);

    res.status(500).json({
        error: err.message || 'An unexpected error occurred. Please try again later.'
    });
}

module.exports = { errorHandler };
