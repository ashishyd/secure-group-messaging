# Secure Group Messaging App MVP

## Overview
This Secure Group Messaging App is an MVP featuring:
- **Real-Time Messaging:** Group chats with read receipts and typing indicators using Socket.io.
- **User Authentication:** Email/password authentication with user data stored in Azure SQL.
- **Media Sharing:** Image uploads to Azure Blob Storage.
- **Security:** AES-128 encryption for messages.
- **Smart Reply:** AI-generated quick response suggestions.
- **Group Management:** Create, join, leave, and delete groups with enforced moderation.

## Tech Stack
- **Frontend:** React JS
- **Backend:** Node.js, Express, Socket.io
- **Database:** Azure SQL (free tier)
- **Cloud Storage:** Azure Blob Storage (free tier)
- **Hosting:** Azure App Service (free tier)

## Installation & Setup

### Prerequisites
- Node.js (v12 or later)
- Azure SQL and Azure Blob Storage credentials
- Environment variables set for:
    - `ENCRYPTION_KEY`
    - `REACT_APP_BACKEND_URL` / `REACT_APP_API_URL`
- Any required API key for the LLM API (if using a third-party service)

### Backend Setup
1. Navigate to the `/backend` directory.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add the necessary environment variables:
4. Start the server using `node server.js` (or `nodemon server.js` for auto-reload).

### Frontend Setup
1. Navigate to the `/frontend` directory.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the frontend and set:
4. Run the app using `npm start`.

## Testing the Application
- **Authentication:** Use the provided login/register pages.
- **Real-Time Chat:** Join a group from GroupsList and test messaging features.
- **Media Sharing:** On a chat page, use the upload functionality (if implemented) to test image uploads.
- **Smart Reply:** Type a message and check the smart reply suggestions.
- **Group Management:** Create groups, join/leave groups and check UI tabs.

## API Documentation

### Authentication
- **POST /api/auth/register**
- **Request:** `{ email: string, password: string, name: string }`
- **Response:** `{ userId, email, name }`
- **POST /api/auth/login**
- **Request:** `{ email: string, password: string }`
- **Response:** `{ token, userId, email }`

### Group Management
- **POST /api/groups**
- **Request:** `{ name: string, creatorId: string }`
- **Response:** `{ groupId, name, creatorId }`
- **GET /api/groups**
- **Response:** `[{ groupId, name, creatorId }, ...]`
- **POST /api/groups/join**
- **Request:** `{ userId, groupId }`
- **Response:** `{ message: 'Joined group successfully.' }`
- **POST /api/groups/leave**
- **Request:** `{ userId, groupId }`
- **Response:** `{ message: 'Left group successfully.' }`
- **DELETE /api/groups/:groupId**
- **Request:** `{ userId }`
- **Response:** `{ message: 'Group deleted successfully.' }`

### Media Sharing
- **POST /api/media/upload**
- **Request:** FormData with image file.
- **Response:** `{ fileUrl }`

### Smart Reply
- **POST /api/smartReply**
- **Request:** `{ message: string }`
- **Response:** `{ suggestions: [string, string, string] }`

## Known Issues / Incomplete Features
- **Media Sharing UI:** The image preview and upload progress features could be enhanced.
- **Error Handling:** Some edge cases (e.g., network failures) need further refining.

## Debug Logs & Error Handling
- All API endpoints log errors to the console.
- The frontend prints error messages to the browser console.
- Further monitoring integration (e.g., Application Insights on Azure) can be implemented for production.

## Conclusion
This MVP provides a working baseline for a secure group messaging application with real-time communication, group management, media sharing, and basic smart AI features. Future enhancements include richer UI interactions, improved error management, and full integration with an LLM API for smarter user interactions.