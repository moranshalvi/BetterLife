import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaFileMedical, FaPhotoVideo } from 'react-icons/fa';
import { VscFiles } from 'react-icons/vsc';
import { userService } from '../services/user.service';

export const PatientHomePage = () => {
    const navigate = useNavigate();
    const loggedInUser = userService.getLoggedinUser()

    useEffect(() => {
        
    }, [loggedInUser])

    const onLogout=()=>{
        userService.logout()
        navigate('/')
    }

    if (!loggedInUser) return <h1>No LoggedInUser</h1>
    return (
        <div className='patient-home-page'>
            <h1>Hey {loggedInUser.firstName}!</h1>
            <button className="btn-help" onClick={() => navigate('/findHelp')}>click for Help</button>
            <button className="btn-FaUserCog" onClick={() => navigate(`/signup/${loggedInUser.userType}`)}><FaUserCog className="FaUserCog"></FaUserCog></button>
            <button className="btn-VscFiles" onClick={() => navigate('/medicalCard')}><VscFiles className="VscFiles"></VscFiles></button>
            <button className="btn-FaFileMedical" onClick={() => navigate('/medicalCard')}><FaFileMedical className="FaFileMedical"></FaFileMedical></button>
            <button className="btn-FaPhotoVideo" onClick={() => navigate('/breathe')}><FaPhotoVideo className="FaPhotoVideo"></FaPhotoVideo></button>
            <a className="logout" onClick={onLogout}>Logout</a>
        </div>
    )
}