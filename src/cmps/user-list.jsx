import { UserPreview } from "./user-preview"

export const UserList = (props) => {
    const { users } = props

    return (
        <div className="user-list">
            {users.map(user => <UserPreview user={user} key={user.id} />)}
        </div>
    )
}
