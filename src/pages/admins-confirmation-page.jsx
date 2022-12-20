import { useEffect, useState } from "react";
import { UserTherapistList } from "../cmps/user-confirmation";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";

export const AdminsConfirmationPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsres = async () => {
      const data = await userService.getUsers();
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsres();
  }, []);

  if (!users?.length) return <div>No Users.</div>;
  return (
    <div className="UserPage">
      <h1 className="Therapist">All TherapistList Users</h1>
      <UserTherapistList users={users} />
      <a className="gohome" onClick={() => navigate("/adminHomePage")}>
        HOME
      </a>
    </div>
  );
};
