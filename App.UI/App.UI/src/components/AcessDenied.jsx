import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'devextreme-react/button';

const AccessDenied = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Access Denied</h1>
            <p>You do not have permission to view this page.</p>
            <Button text="Go to Home" onClick={handleGoHome} />
        </div>
    );
};

export default React.memo(AccessDenied);
