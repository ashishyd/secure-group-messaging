// API calls to backend endpoints

// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Function to call the smart reply endpoint
export async function getSmartReplies(message) {
    try {
        const response = await fetch(`${API_URL}/smartReply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        return await response.json();
    } catch (error) {
        console.error("Smart Reply error:", error);
        return { suggestions: [] };
    }
}

// Helper function to parse JSON response and handle errors
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API Error');
    }
    return await response.json();
}

// User login API call
export async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
}

// User registration API call
export async function register(name, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
}

// Fetch groups list
export async function getGroups() {
    const response = await fetch(`${API_URL}/groups`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
}

// Join a group
export async function joinGroup(userId, groupId) {
    const response = await fetch(`${API_URL}/groups/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, groupId }),
    });
    return handleResponse(response);
}

// Leave a group
export async function leaveGroup(userId, groupId) {
    const response = await fetch(`${API_URL}/groups/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, groupId }),
    });
    return handleResponse(response);
}

