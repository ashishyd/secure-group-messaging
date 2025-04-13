// Endpoint for image upload to Azure Blob Storage

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const config = require('../config');

// Multer storage configuration to keep file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Azure Blob Storage container name (from config or default)
const containerName = config.AZURE_BLOB_CONTAINER || 'media';

// Create a BlobServiceClient using the connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(config.AZURE_BLOB_CONNECTION_STRING);

// POST /api/media/upload (expects FormData with "image" file field)
router.post('/upload', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Get a container client and create the container if it does not exist
        const containerClient = blobServiceClient.getContainerClient(containerName);
        await containerClient.createIfNotExists({ access: 'blob' });

        // Create a unique blob name using timestamp and original filename
        const blobName = `${Date.now()}-${req.file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload the file buffer to Azure Blob Storage
        await blockBlobClient.upload(req.file.buffer, req.file.buffer.length);

        // Respond with the URL of the uploaded file
        res.status(200).json({ fileUrl: blockBlobClient.url });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
