import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { userService } from "../services/user.service";

export const Signup = () => {
  const navigate = useNavigate();
  const param = useParams();
  var userType = param.userType;
  const loggedInUser = userService.getLoggedinUser();
  const [user, setUser] = useState({});
  const [diplomaUpload, setDiplomaUpload] = useState(null);

  useEffect(() => {
    IsConnected();
  }, []);

  const IsConnected = () => {
    if (!loggedInUser) {
      setUser({
        id: "",
        userType: userType,
        firstName: "",
        lastName: "",
        password: "",
        phoneNumber: "",
        city: "",
        streetAddress: "",
        email: "",
        confirmation: userType === "Therapist" ? "no" : null,
      });
    } else {
      setUser(loggedInUser);
    }
  };

  const handleChange = (ev) => {
    const val = ev.target.value;
    const filed = ev.target.name;

    if (filed === "firstName" || filed === "lastName" || filed === "city") {
      if (/^[A-Za-zא-ת]*$/.test(val)) {
        setUser({ ...user, [filed]: val });
      } else {
        swal("Oops!", "only letters!", "error");
      }
    }
    if (filed === "password") {
      if (val.length <= 8) {
        setUser({ ...user, [filed]: val });
      } else {
        swal(
          "Oops!",
          "The password cannot be longer than eight characters",
          "error"
        );
      }
    }
    if (filed === "phoneNumber") {
      if (/^[0-9]*$/.test(val) && val.length <= 10) {
        setUser({ ...user, [filed]: val });
      } else {
        swal("Oops!", "only numbers!", "error");
      }
    }
    if (filed === "email" || filed === "streetAddress") {
      setUser({ ...user, [filed]: val });
    }
  };

  const onSaveUser = async (ev) => {
    ev.preventDefault();
    if (/\S+@\S+\.\S+/.test(user.email)) {
      if (!loggedInUser) {
        if(userType === "Therapist"){
          if (
            /\.pdf$/.test(diplomaUpload.name) ||
            /\.docx$/.test(diplomaUpload.name)
          ) {
            alert("Error, only image files can be uploaded");
          } else {
            await userService.signup(user);
            await userService.uploadDiploma(diplomaUpload, user);
            navigate("/login");
          }
        }
        else{
            await userService.signup(user);
            navigate("/login");
        }
      } else {
        await userService.update(user);
        if (loggedInUser.userType === "Therapist") {
          navigate("/therapistHomePage");
        } else if (loggedInUser.userType === "Patient") {
          navigate("/patientHomePage");
        } else {
          navigate("/adminHomePage");
        }
      }
    } else {
      swal("Oops!", "email is not correct", "error");
    }
  };

  return (
    <div className="signup">
      {loggedInUser ? (
        <h1> hello {loggedInUser.firstName}</h1>
      ) : (
        <h1>{param.userType} Registration</h1>
      )}
      <form onSubmit={onSaveUser}>
        <input
          className={
            userType === "Therapist" ? (!loggedInUser? "firstNameTherapist" : "firstName") : "firstName"
          }
          name="firstName"
          onInput={handleChange}
          value={user.firstName}
          type="text"
          placeholder="First name"
          required
        ></input>
        <input
          className={
            userType === "Therapist" ? (!loggedInUser? "lastNameTherapist" : "lastName") : "lastName"
          }
          name="lastName"
          onInput={handleChange}
          value={user.lastName}
          type="text"
          placeholder="Last name"
          required
        ></input>
        {userType === "Therapist" && !loggedInUser && (
          <input
            className="inp custom-file-input diploma"
            name="diploma"
            onChange={(event) => {
              setDiplomaUpload(event.target.files[0]);
            }}
            type="file"
            placeholder="Diploma"
            required
          ></input>
        )}
        {!loggedInUser && (
          <input
            className="inp password"
            name="password"
            onInput={handleChange}
            value={user.password}
            type="password"
            placeholder="Password"
            required
          ></input>
        )}
        <input
          className={loggedInUser ? "inp phoneNumberUpdate" : "inp phoneNumber"}
          name="phoneNumber"
          onInput={handleChange}
          value={user.phoneNumber}
          type="text"
          placeholder="Phone Number"
          required
        ></input>
        <input
          className={loggedInUser ? "inp cityUpdate" : "inp city"}
          name="city"
          onInput={handleChange}
          value={user.city}
          type="text"
          placeholder="City"
          required
        ></input>
        <input
          className={
            loggedInUser ? "inp streetAddressUpdate" : "inp streetAddress"
          }
          name="streetAddress"
          onInput={handleChange}
          value={user.streetAddress}
          type="text"
          placeholder="Street Address"
          required
        ></input>
        {!loggedInUser && (
          <input
            className="inp email"
            name="email"
            onInput={handleChange}
            value={user.email}
            type="text"
            placeholder="Email"
            required
          ></input>
        )}
        <button className={loggedInUser ? "btnUpdate" : "btn"}>
          {loggedInUser ? "Update" : "Sign Up"}
        </button>
        <a
          className="gohome"
          onClick={() =>
            loggedInUser
              ? loggedInUser.userType === "Therapist"
                ? navigate("/therapistHomePage")
                : loggedInUser.userType === "Patient"
                ? navigate("/patientHomePage")
                : navigate("/adminHomePage")
              : navigate("/")
          }
        >
          HOME
        </a>
      </form>
    </div>
  );
};
