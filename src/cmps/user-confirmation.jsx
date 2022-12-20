import { ShowUsers } from "./show-users-therapist"

export const UserTherapistList = ({users}) => {

    return (
        <div className="user-list">
            {users.map(user => <ShowUsers user={user} flag={true} key={user.id} />)}
        </div>
    )
}
