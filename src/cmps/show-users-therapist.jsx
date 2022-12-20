import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useState } from "react";
import firebaseService from "../services/firebase.service";
import { userService } from "../services/user.service";

export const ShowUsers = (props) => {
  const storage = firebaseService.storage;
  const { user } = props;
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, `diploma/${user.id}/`);

  if (user.userType !== "Therapist" || user.confirmation !== "no") return;

  const status = (id, status) => {
    userService.therapistStatus(id, status);
  };

  const diplomas = () => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  };

  return (
    <div className="checksome">
      <a className="first_last">
        Name: {user.firstName} {user.lastName}
      </a>
      <a className="email">Email: {user.email}</a>
      <a className="phon">Phone Number: {user.phoneNumber}</a>
      <a className="city">City: {user.city}</a>
      <a className="userType">User Type: {user.userType}</a>
      {imageUrls.map((url) => {
        return <img src={url} />;
      })}
      <button className="showDiploma" onClick={() => diplomas()}>
        show diploma
      </button>
      <button
        className="ok"
        onClick={() => status(user.id, "yes")}
      >
        ok
      </button>
      <button
        className="delete_confirmation"
        onClick={() => status(user.id, "block")}
      >
        block
      </button>
    </div>
  );
};
