import { useEffect, useState } from "react";
import { UserList } from "../cmps/user-list";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";

export const RemoveUsers = () => {
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
      <h1 className="UserPage-h1">All Users</h1>
      <UserList users={users} />
      <a className="gohome" onClick={() => navigate("/adminHomePage")}>
        HOME
      </a>
    </div>
  );
};
