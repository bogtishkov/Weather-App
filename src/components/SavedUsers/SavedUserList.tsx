import AllUsersGrid from "../Users/AllUsersGrid";

const SavedUserList = () => {
    const savedUsers = Object.values(localStorage)
        .map(item => JSON.parse(item));

    return (
        <div>
            <AllUsersGrid users={savedUsers} />
        </div>
    );
};

export default SavedUserList;
