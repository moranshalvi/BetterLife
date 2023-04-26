import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { userService } from "../services/user.service";

export const MedicalCard = () => {
  const navigate = useNavigate();
  const loggedInUser = userService.getLoggedinUser();
  //TODO: medicalCard
  const [medicalCard, setMedicalCard] = useState({});
  const [showTextBox, setShowTextBox] = useState(false);
  const [showBtnYes, setShowBtnYes] = useState(false);
  const [showBtnNo, setShowBtnNo] = useState(true);

    useEffect(() => {
      isConnected();
    }, []);
    
    const isConnected = async () => {
        const medicalCardWithId = await userService.getById(loggedInUser.id, "medical cards")
        if (medicalCardWithId){
          setMedicalCard(medicalCardWithId)
          if(medicalCardWithId.regularMedications.length > 0){
            setShowTextBox(true);
            setShowBtnNo(false)
            setShowBtnYes(true)
          }
          else{
            setShowTextBox(false);
            setShowBtnNo(true)
            setShowBtnYes(false)
          }
        }
        else{
            setMedicalCard({
                id: null,
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                phoneNumber: loggedInUser.phoneNumber,
                city: loggedInUser.city,
                streetAddress: loggedInUser.streetAddress,
                regularMedications: "",
                emergencyContactPerson: "",
            })    
        }
    };

  const handleClickYes = (ev) => {
    ev.preventDefault();
    setShowTextBox(true);
    setShowBtnNo(false)
    setShowBtnYes(true)
  };

  const handleClickNo = (ev) => {
    ev.preventDefault();
    setShowTextBox(false);
    setShowBtnNo(true)
    setShowBtnYes(false)
    medicalCard.regularMedications = ""
  };



  const handleChange = (ev) => {
    ev.preventDefault();
    const val = ev.target.value;
    const filed = ev.target.name;

    if (filed === "firstName" || filed === "lastName" || filed === "city") {
      if (/^[A-Za-zא-ת]*$/.test(val)) {
        setMedicalCard({ ...medicalCard, [filed]: val });
      } else {
        swal("Oops!", "only letters!", "error");
      }
    }
    
    if (filed === "streetAddress" || filed === "phoneNumber" || "regularMedications" || "emergencyContactPerson") {
      setMedicalCard({ ...medicalCard, [filed]: val });
    }
  };

  const onSaveUser = async (ev) => {
    ev.preventDefault();
    if(medicalCard.id){
        await userService.updateMedicalCard(medicalCard);
    }
    else{
      medicalCard.id = loggedInUser.id
        await userService.UploadMedicalCard(medicalCard);
    }
  };

  return (
    <div className="medicalCard">
        <h1> hello {loggedInUser.firstName}</h1>
      <form>
        <input
          className={"inp firstName"}
          name="firstName"
          onInput={handleChange}
          value={medicalCard.firstName}
          type="text"
          placeholder="First name"
          required
        ></input>
        <input
          className={"inp lastName"}
          name="lastName"
          onInput={handleChange}
          value={medicalCard.lastName}
          type="text"
          placeholder="Last name"
          required
        ></input>
        <input
          className={"inp phoneNumberUpdate"}
          name="phoneNumber"
          onInput={handleChange}
          value={medicalCard.phoneNumber}
          type="text"
          placeholder="Phone Number"
          required
        ></input>
        <input
          className={"inp cityUpdate"}
          name="city"
          onInput={handleChange}
          value={medicalCard.city}
          type="text"
          placeholder="City"
          required
        ></input>
        <input
          className={"inp streetAddressUpdate"}
          name="streetAddress"
          onInput={handleChange}
          value={medicalCard.streetAddress}
          type="text"
          placeholder="Street Address"
          required
        ></input>
        <input
          className={"emergencyContactPerson"}
          name="emergencyContactPerson"
          onInput={handleChange}
          type="text"
          value={medicalCard.emergencyContactPerson}
          placeholder="phone number of an emergency contact"
          required
        ></input>

        <a className={"regularMedications"}>Do you take regular medications?</a>
        <button className={"btnRegularMedicationsYes"} onClick={handleClickYes}>Yes</button>
        {showTextBox && <textarea className={"regularMedicationsText"} name="regularMedications" onInput={handleChange} value={medicalCard.regularMedications} >Please write down the medications you are taking</textarea>}
        <button className={"btnRegularMedicationsNo"} onClick={handleClickNo}>No</button>
        {showBtnNo && <button className={"btnUpdate btnUpdateNo"} onClick={onSaveUser}>Update</button>}
        {showBtnYes && <button className={"btnUpdate btnUpdateYes"} onClick={onSaveUser}>Update</button>}

        <a className="gohome" onClick={() => navigate("/patientHomePage")}> HOME </a>
      </form>
    </div>
  );
};
