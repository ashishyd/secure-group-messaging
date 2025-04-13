import React, { useState } from 'react';
import { register } from '../services/api';
import '../styles/global.css';

const Register = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userData = await register(name, email, password);
            onRegister(userData);
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="authContainer">
            <h2>Register</h2>
            {error && <p className="errorMessage">{error}</p>}
            <form onSubmit={handleSubmit} className="authForm">
                <div className="formGroup">
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="formInput"
                    />
                </div>
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
                <button type="submit" className="btn">Register</button>
            </form>
        </div>
    );
};

export default Register;
