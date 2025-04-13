import React from 'react';
import '../styles/global.css';

const ErrorPage = ({ message = "Oops! Something went wrong." }) => {
    return (
        <div className="errorPageContainer">
            <h1>Error</h1>
            <p>{message}</p>
        </div>
    );
};

export default ErrorPage;
