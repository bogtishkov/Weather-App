import React, { useEffect, useState } from 'react';
import { fetchUsers, User } from '../../api/api';
import UserList from './UserList';
import { ClipLoader } from 'react-spinners';

const UsersCard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) {
        return <ClipLoader color="#4A90E2" loading={true} size={50} />;
    }

    if (error) {
        return <div className="p-4">Error: {error}</div>;
    }

    return (
        <UserList users={users} />
    );
};

export default UsersCard;
