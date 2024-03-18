import { User } from "../../types/types";
import UserCard from "./UserCard";

interface AllUsersGridProps {
    users: User[];
}

const AllUsersGrid: React.FC<AllUsersGridProps> = ({ users }) => {
    const handleSaveActionClick = () => {
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-8 xl:gap-10">
            {users.map((user) =>
                user.basicInfo && user.basicInfo.email ? (
                    <UserCard
                        user={user}
                        key={user.basicInfo.email}
                        onSaveActionClick={handleSaveActionClick}
                        initialSaved={false} />
                ) : null
            )}
        </div>
    );
};

export default AllUsersGrid;
