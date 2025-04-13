// Database connection & queries

const sql = require('mssql');
const config = require('../config');

const dbConfig = {
    connectionString: config.DB_CONNECTION_STRING
};

let pool;

/**
 * Connects to the Azure SQL Database.
 */
async function connectPool() {
    if (pool) {
        return pool;
    }
    pool = await sql.connect(dbConfig);
    return pool;
}

/**
 * Executes a parameterized query against the database.
 * @param {string} queryText - The SQL query to execute.
 * @param {object} params - An object of key-value pairs for query parameters.
 */
async function query(queryText, params) {
    try {
        const pool = await connectPool();
        const request = pool.request();
        // Loop through each parameter key-value pair and add it to the request
        for (const key in params) {
            request.input(key, params[key]);
        }
        const result = await request.query(queryText);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = { query };
