import { User } from "../../types/types";
import UserCard from "./UserCard";

interface AllUsersGridProps {
    users: User[]
}

const AllUsersGrid: React.FC<AllUsersGridProps> = ({ users }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-8 xl:gap-10">
            {
                users.map((user) =>
                    <UserCard user={user} key={user.basicInfo.email} />
                )
            }
        </div>
    )
}

export default AllUsersGrid
