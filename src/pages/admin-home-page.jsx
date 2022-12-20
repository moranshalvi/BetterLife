import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserTimes, FaUserCheck, FaUserPlus, FaUserCog} from 'react-icons/fa';
import { userService } from '../services/user.service';

export const AdminHomePage = () => {
    const navigate = useNavigate();
    const loggedInUser = userService.getLoggedinUser()

    const [users, setUsers] = useState(null)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async() => {
        const newUsers = await userService.getUsers()
        setUsers(newUsers)
    }

    useEffect(() => {
        
    }, [loggedInUser])

    const onLogout=()=>{
        userService.logout()
        navigate('/')
    }

    if (!loggedInUser) return <h1>No LoggedInUser</h1>
    return (
        <div className='admin-home-page'>
            <h1>Hey {loggedInUser.firstName}!</h1>
            <button className="btn-FaUserCheck" onClick={() => navigate('/adminsConfirmationPage')}><FaUserCheck className="FaUserCheck"></FaUserCheck></button>
            <button className="btn-FaUserPlus" onClick={() => navigate('/addAdmin')}><FaUserPlus className="FaUserPlus"></FaUserPlus></button>
            <button className="btn-FaUserCog" onClick={() => navigate(`/signup/${loggedInUser.userType}`)}><FaUserCog className="FaUserCog"></FaUserCog></button>
            <button className="btn-FaUserTimes" onClick={() => navigate('/removeUsers')}><FaUserTimes className="FaUserTimes"></FaUserTimes></button>
            <a className="logout" onClick={onLogout}>Logout</a>
        </div>
    )
}