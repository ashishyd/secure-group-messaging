const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/groups');
const mediaRoutes = require('./routes/media');
const smartReplyRoutes = require('./routes/smartReply');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/smartReply', smartReplyRoutes);

// Setup Socket.io connections for real-time messaging
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for join room event (group join)
    socket.on('joinRoom', (groupId) => {
        socket.join(groupId);
        console.log(`Socket ${socket.id} joined group ${groupId}`);
    });

    // Handle incoming message event
    socket.on('sendMessage', (data) => {
        // Data should include groupId, sender, and encrypted message
        // Broadcast the message to everyone in the group room
        io.to(data.groupId).emit('receiveMessage', data);
    });

    // Typing indicator event
    socket.on('typing', (data) => {
        io.to(data.groupId).emit('typing', data);
    });

    // Disconnection event
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Global error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
