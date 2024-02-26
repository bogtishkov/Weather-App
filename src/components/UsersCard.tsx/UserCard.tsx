import React from 'react';
import { User } from '../../api/api';
import { Mail, MapPin, PersonStanding } from 'lucide-react';
import UserWeather from './UserWeather';

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 max-w-auto mx-auto mb-4">
            <div className="flex items-center mb-6">
                <img
                    src={user.picture.medium}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-16 h-16 rounded-full mr-4" />
                <div>
                    <div className="text-lg font-semibold">
                        {user.name.first} {user.name.last}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${user.email}`}>
                            {user.email}
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-6">
                <div className='flex items-center gap-2 mb-4'>
                    <MapPin className="w-10 h-10" />
                    <strong
                        className="text-sm">
                        Location:
                    </strong> {user.location.street.number} {user.location.street.name},
                    {user.location.city}, {user.location.state}, {user.location.country},
                    {user.location.postcode}
                </div>
                <div className='flex items-center gap-2'>
                    <PersonStanding className="w-7 h-7" />
                    <strong className="text-sm">Gender:</strong> {user.gender}
                </div>
            </div>
            <div>
                <UserWeather user={user} />
            </div>
        </div>
    );
};

export default UserCard;

