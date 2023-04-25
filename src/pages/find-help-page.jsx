import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FindHelpPage = () => {
    const navigate = useNavigate();
    const [currLocation, setCurrLocation] = useState({});
    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async() => {
        const location = await axios.get('https://ipapi.co/json');
        setCurrLocation(location.data);
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         navigate('/breathe');
    //     }, 5000);
    // }, []);
     

    return (
        <div id='my'  className="find-help-page">
            <h1>Finding a therapist for you</h1>
            <h2>City: {currLocation.city}</h2>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <a className="gohome" onClick={() => navigate('/')}>HOME</a>
        </div>
    )
}            