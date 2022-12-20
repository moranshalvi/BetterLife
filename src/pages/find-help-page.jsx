import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const FindHelpPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/breathe');
        }, 5000);
    }, []);

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div id='my'  className="find-help-page">
            <h1>Finding a therapist for you</h1>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <a className="gohome" onClick={goToHome}>HOME</a>
        </div>
    )
}          