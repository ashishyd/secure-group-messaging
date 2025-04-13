// Socket.io client setup

import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    autoConnect: false, // Connect manually after login if required
});

// Export the socket instance to be used across the app
export default socket;
