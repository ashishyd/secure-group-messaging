import React, { useState } from 'react';
import { login } from '../services/api';
import '../styles/global.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userData = await login(email, password);
            onLogin(userData);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="authContainer">
            <h2>Login</h2>
            {error && <p className="errorMessage">{error}</p>}
            <form onSubmit={handleSubmit} className="authForm">
                <div className="formGroup">
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="formInput"
                    />
                </div>
                <div className="formGroup">
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="formInput"
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
};

export default Login;
