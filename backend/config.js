// Contains DB, Azure Blob, and encryption keys

require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '1234567890123456', // Must be 16 bytes for AES-128
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,           // Azure SQL connection string
    AZURE_BLOB_CONNECTION_STRING: process.env.AZURE_BLOB_CONNECTION_STRING, // Azure Blob Storage connection string
    AZURE_BLOB_CONTAINER: process.env.AZURE_BLOB_CONTAINER || 'media',   // Default container name
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',           // JWT secret key
    OPENAI_API_KEY: process.env.OPENAI_API_KEY                          // API key for LLM (if needed)
};
