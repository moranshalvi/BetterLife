import { useState } from "react"
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert';
import { userService } from "../services/user.service";

export const AddAdmin = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        userType: 'Admin',
        firstName: '',
        lastName: '',
        password: '',
        phoneNumber: '',
        city: '',
        streetAddress: '',
        email: ''
    })

    const handleChange = (ev) => {
        const val = ev.target.value
        const filed = ev.target.name
        if(filed === 'firstName' || filed === 'lastName' || filed === 'city'){
            if(/^[A-Za-zא-ת]*$/.test(val)){
                setUser({...user, [filed]:val})
            }
            else{
                swal("Oops!", "only letters!", "error");
            }
        }
        if(filed === 'password'){
            if(val.length <= 8){
                setUser({...user, [filed]:val})
            }
            else{
                swal("Oops!", "The password cannot be longer than eight characters", "error");
            }
        }
        if(filed === 'phoneNumber'){
            if(/^[0-9]*$/.test(val) && val.length <= 10){
                setUser({...user, [filed]:val})
            }
            else{
                swal("Oops!", "only letters!", "error");
            }
        }
        if(filed === 'email' || filed === 'streetAddress'){
            setUser({...user, [filed]:val})
        }
    }

    const onSaveUser = (ev) => {
        ev.preventDefault()
        if(/\S+@\S+\.\S+/.test(user.email)){
            userService.signup(user)
            navigate('/adminHomePage')
        }
        else{
            swal("Oops!", "email is not correct", "error");
        }
    }
    
    return (
        <div className="signup">
            <h1>Admin Registration</h1>
            <form  onSubmit={onSaveUser}>
                <input className="inp-firstName" name="firstName" onInput={handleChange} value={user.firstName} type="text" placeholder="First name" required></input>
                <input className="inp inp-lastName" name="lastName" onInput={handleChange} value={user.lastName} type="text" placeholder="Last name" required></input>
                <input className="inp password" name="password" onInput={handleChange} value={user.password} type="password" placeholder="Password" required></input>
                <input className="inp phoneNumber" name="phoneNumber" onInput={handleChange} value={user.phoneNumber} type="text" placeholder="Phone Number" required></input>
                <input className="inp city" name="city" onInput={handleChange} value={user.city} type="text" placeholder="City" required></input>
                <input className="inp streetAddress" name="streetAddress" onInput={handleChange} value={user.streetAddress} type="text" placeholder="Street Address" required></input>
                <input className="inp email" name="email" onInput={handleChange} value={user.email} type="text" placeholder="Email" required></input>
                <button className="btn">Add Admin</button>
                <a className="gohome" onClick={() => navigate('/adminHomePage')}>HOME</a>
            </form>
        </div>
    )
}

