import React from "react";

import './error-indicator.css';

const ErrorIndicator = () => {
    return (
        <div className='error-indicator d-flex flex-column align-items-center'>
            <h2>Oops</h2>
            <h1>Coronavirus is here</h1>
            <h3>We've already sent out antibodies to fight the enemy</h3>
        </div>
    );
};

export default ErrorIndicator;