import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebaseService from "../services/firebase.service";
import swal from "sweetalert";
import { userService } from "../services/user.service";

export const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const handleChange = (ev) => {
    const val = ev.target.value;
    const filed = ev.target.name;
    setUser({ ...user, [filed]: val });
  };

  const login = async (ev) => {
    ev.preventDefault();
    const newUser = await userService.login(user);
    if (newUser) {
      if (newUser.userType === "Patient") {
        navigate("/patientHomePage");
      } 
      else if (newUser.userType === "Therapist") {
        if (newUser.confirmation === "yes") {
          navigate("/therapistHomePage");
        } 
        else if(newUser.confirmation === "block"){
          swal(
            "Hello,",
            "We are very sorry, you are not allowed to give treatment :("
          );
        }
        else {
          swal(
            "Hello,",
            "You are still on the waiting list, wait patiently for your approval :)"
          );
        }
      } else if (newUser.userType === "Admin") {
        navigate("/adminHomePage");
      }
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome Back!</h1>
      <form onSubmit={login}>
        <input
          onInput={handleChange}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          onInput={handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="btn">LOGIN</button>
      </form>
      <a className="creatAccount" onClick={() => navigate("/registration")}>
        Creat Account
      </a>
      <a className="gohome" onClick={() => navigate("/")}>
        HOME
      </a>
    </div>
  );
};
