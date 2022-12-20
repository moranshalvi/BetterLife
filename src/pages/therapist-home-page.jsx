import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';
import { MdUploadFile, MdOutlineMedicalServices } from 'react-icons/md';
import { userService } from '../services/user.service';

export const TherapistHomePage = () => {
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
        <div className='therapis-home-page'>
            <h1>Hey {loggedInUser.firstName}!</h1>
            <div className="par-wrapper">
                <p>Thank you for your volunteering.</p>
            </div>
            <button className="btn-FaUserCog" onClick={() => navigate(`/signup/${loggedInUser.userType}`)}><FaUserCog className="FaUserCog"></FaUserCog></button>
            <button className="btn-MdOutlineMedicalServices"><MdOutlineMedicalServices className="MdOutlineMedicalServices"></MdOutlineMedicalServices></button>
            <button className="btn-MdUploadFile" onClick={() => navigate("/uploadMoreDiplomas")}><MdUploadFile className="MdUploadFile"></MdUploadFile></button>
            <button className="btn-BsBell"><BsBell className="BsBell"></BsBell></button>
            <a className="logout" onClick={onLogout}>Logout</a>
        </div>
    )
}