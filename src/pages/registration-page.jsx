import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const navigate = useNavigate();

  return (
    <div className="registration-page">
      <button className="btn" onClick={() => navigate("/signup/Therapist")}>
        Therapist
      </button>
      <button className="btn" onClick={() => navigate("/signup/Patient")}>
        Patient
      </button>
      <a className="gohome" onClick={() => navigate("/")}>
        HOME
      </a>
    </div>
  );
};
