import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { userService } from "../services/user.service";

export const MedicalCard = () => {
  const navigate = useNavigate();
  const loggedInUser = userService.getLoggedinUser();
  const [user, setUser] = useState({});
  const [showTextBox, setShowTextBox] = useState(false);
  const [showBtnYes, setShowBtnYes] = useState(false);
  const [showBtnNo, setShowBtnNo] = useState(true);
  const [medicalCards, setMedicalCards] = useState([]);
  
  useEffect(() => {
      const getUsres = async () => {
          const data = await userService.getMedicalCard();
          setMedicalCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsres();
    }, []);
    
    useEffect(() => {
      IsConnected();
    }, []);
    
    const IsConnected = () => {
    if (medicalCards.find((user) => user.id === loggedInUser.id)){
        console.log(user)
    }
    else{
        setUser({
            id: loggedInUser.id,
            firstName: loggedInUser.firstName,
            lastName: loggedInUser.lastName,
            phoneNumber: loggedInUser.phoneNumber,
            city: loggedInUser.city,
            streetAddress: loggedInUser.streetAddress,
            regularMedications: "no",
            emergencyContactPerson: "",
        })    
    }
  };

  const handleClickYes = () => {
    setShowTextBox(true);
    setShowBtnNo(false)
    setShowBtnYes(true)
  };

  const handleClickNo = () => {
    setShowTextBox(false);
    setShowBtnNo(true)
    setShowBtnYes(false)
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
    
    if (filed === "streetAddress" || filed === "phoneNumber" || "regularMedications" || "emergencyContactPerson") {
      setUser({ ...user, [filed]: val });
    }
  };

  const onSaveUser = async (ev) => {
    ev.preventDefault();
    await userService.UploadMedicalCard(user);
  };

  return (
    <div className="medicalCard">
        <h1> hello {loggedInUser.firstName}</h1>
      <form onSubmit={onSaveUser}>
        <input
          className={"inp firstName"}
          name="firstName"
          onInput={handleChange}
          value={user.firstName}
          type="text"
          placeholder="First name"
          required
        ></input>
        <input
          className={"inp lastName"}
          name="lastName"
          onInput={handleChange}
          value={user.lastName}
          type="text"
          placeholder="Last name"
          required
        ></input>
        <input
          className={"inp phoneNumberUpdate"}
          name="phoneNumber"
          onInput={handleChange}
          value={user.phoneNumber}
          type="text"
          placeholder="Phone Number"
          required
        ></input>
        <input
          className={"inp cityUpdate"}
          name="city"
          onInput={handleChange}
          value={user.city}
          type="text"
          placeholder="City"
          required
        ></input>
        <input
          className={"inp streetAddressUpdate"}
          name="streetAddress"
          onInput={handleChange}
          value={user.streetAddress}
          type="text"
          placeholder="Street Address"
          required
        ></input>
        <input
          className={"emergencyContactPerson"}
          name="emergencyContactPerson"
          onInput={handleChange}
          type="text"
          placeholder="phone number of an emergency contact"
          required
        ></input>

        <a className={"regularMedications"}>Do you take regular medications?</a>
        <button className={"btnRegularMedicationsYes"} onClick={handleClickYes}>Yes</button>
        {showTextBox && <textarea className={"regularMedicationsText"} name="regularMedications" onInput={handleChange} >Please write down the medications you are taking</textarea>}
        <button className={"btnRegularMedicationsNo"} onClick={handleClickNo}>No</button>
        {showBtnNo && <button className={"btnUpdate btnUpdateNo"}>Update</button>}
        {showBtnYes && <button className={"btnUpdate btnUpdateYes"}>Update</button>}

        <a className="gohome" onClick={() => navigate("/patientHomePage")}> HOME </a>
      </form>
    </div>
  );
};
