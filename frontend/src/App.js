import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Link, Routes, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import GroupList from './components/GroupList';
import ErrorPage from './components/ErrorPage';
import './styles/global.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleAuth = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
      <Router>
        <div className="appContainer">
          <header className="appHeader">
            <h1>Secure Group Messaging App</h1>
            {currentUser && (
                <div className="userInfo">
                  <span>Welcome, {currentUser.name}</span>
                  <button className="btn" onClick={handleLogout}>Logout</button>
                </div>
            )}
            <nav>
              {!currentUser && (
                  <>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                  </>
              )}
            </nav>
          </header>
          <main>
            <Routes>
              <Route
                  path="/login"
                  element={currentUser ? <Navigate to="/groups" /> : <Login onLogin={handleAuth} />}
              />
              <Route
                  path="/register"
                  element={currentUser ? <Navigate to="/groups" /> : <Register onRegister={handleAuth} />}
              />
              <Route
                  path="/groups"
                  element={currentUser ? <GroupList currentUser={currentUser} /> : <Navigate to="/login" />}
              />
              <Route
                  path="*"
                  element={<ErrorPage message="404 - Page not found." />}
              />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;
