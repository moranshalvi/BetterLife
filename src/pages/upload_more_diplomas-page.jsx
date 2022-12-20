import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import firebaseService from "../services/firebase.service";
import { userService } from "../services/user.service";
import { useNavigate } from "react-router-dom";

export const UploadMoreDiplomas = () => {
    const navigate = useNavigate();
  const storage = firebaseService.storage;
  const loggedInUser = userService.getLoggedinUser();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, `diploma/${loggedInUser.id}/`);
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `diploma/${loggedInUser.id}/${loggedInUser.id + v4()}`
    );
    if (/\.pdf$/.test(imageUpload.name) || /\.docx$/.test(imageUpload.name)) {
      alert("Error, only image files can be uploaded");
    } else {
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    }
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="upload-more-diplomas-page">
      <h1>Upload Diplomas</h1>
      <input
        className="diploma"
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button className="uploadFile" onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url) => {
        return <img src={url} />;
      })}

      <a className="gohome" onClick={() => navigate("/therapistHomePage")}>
        HOME
      </a>
    </div>
  );
};
