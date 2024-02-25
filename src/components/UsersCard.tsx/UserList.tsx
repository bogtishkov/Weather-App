import React from 'react';
import { User } from '../../api/api';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 px-10">
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default UserList;
