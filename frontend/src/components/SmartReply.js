// Displays smart reply suggestions

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getSmartReplies } from '../services/api';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatRoom = ({ groupId, userId }) => {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [smartReplies, setSmartReplies] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        // Join group chat room
        socket.emit('joinRoom', groupId);

        // Listen for incoming messages
        socket.on('receiveMessage', (data) => {
            // Optionally decrypt data.message using frontend method if required.
            setChatLog(prev => [...prev, data]);
            // Trigger smart reply generation for new messages
            getSmartReplies(data.message).then(resp => {
                setSmartReplies(resp.suggestions);
            });
        });

        // Listen for typing indicators
        socket.on('typing', (data) => {
            setIsTyping(data.status);
        });

        // Cleanup on unmount
        return () => {
            socket.off('receiveMessage');
            socket.off('typing');
        };
    }, [groupId]);

    const sendMessage = () => {
        // Optional: Encrypt message on client or send plain text (encrypt on backend preferred)
        const messageData = {
            groupId,
            senderId: userId,
            message // This could be encrypted before sending if desired.
        };
        socket.emit('sendMessage', messageData);
        setMessage('');
    };

    const handleTyping = () => {
        socket.emit('typing', { groupId, status: true });
    };

    return (
        <div>
            <div className="chat-log">
                {chatLog.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.senderId}:</strong> {msg.message}
                    </div>
                ))}
                {isTyping && <div className="typing-indicator">Someone is typing...</div>}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleTyping}
            />
            <button onClick={sendMessage}>Send</button>
            <div className="smart-replies">
                {smartReplies.map((reply, index) => (
                    <button key={index} onClick={() => setMessage(reply)}>
                        {reply}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatRoom;
