import { User } from "@/types/types";
import { CloudSun, Heart, Mail, MapPin, PersonStanding } from "lucide-react";
import UserWeather from "./UserWeather";
import { Button } from "../ui/button";
import WeatherInfoDialog from "../WeatherDialog/WeatherInfoDialog";
import { useState } from "react";


interface UserCardProps {
    user: User;
    onSaveActionClick: () => void;
    initialSaved?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSaveActionClick, initialSaved }) => {
    const [saved, setSaved] = useState(initialSaved);
    const handleSaveClick = () => {
        onSaveActionClick();
        setSaved(prev => !prev);
        localStorage.setItem(user.basicInfo.email, JSON.stringify(user));
    }
    return (
        <div className="bg-gray-100 rounded-lg shadow-md mb-4 p-6 w-full">
            <div className="flex items-center mb-6">
                <img
                    src={user.basicInfo.picture.medium}
                    alt={`${user.basicInfo.name.first} ${user.basicInfo.name.last}`}
                    className="w-16 h-16 rounded-full mr-4" />
                <div>
                    <div className="text-lg font-semibold">
                        {user.basicInfo.name.first} {user.basicInfo.name.last}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${user.basicInfo.email}`}>
                            {user.basicInfo.email}
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-6">
                <div className='flex items-center gap-2 mb-4 text-sm'>
                    <MapPin className="w-7 h-7" />
                    {user.basicInfo.location.street.number} {user.basicInfo.location.street.name},
                    {user.basicInfo.location.city}, {user.basicInfo.location.state}, {user.basicInfo.location.country},
                    {user.basicInfo.location.postcode}
                </div>
                <div className='flex items-center gap-2 text-sm'>
                    <PersonStanding className="w-7 h-7" />
                    {user.basicInfo.gender}
                </div>
            </div>
            <UserWeather user={user} />
            <div className="flex justify-end gap-2">
                {
                    initialSaved ? (<Button
                        variant='outline'
                        onClick={handleSaveClick}>
                        <Heart className='fill-black w-4 h-4 mr-2' />
                        Remove
                    </Button>) :
                        <>
                            {saved ?
                                (<Button
                                    variant='outline'
                                    onClick={handleSaveClick}>
                                    <Heart className='fill-black w-4 h-4 mr-2' />
                                    Saved
                                </Button>)
                                :
                                (<Button
                                    variant='outline'
                                    onClick={handleSaveClick}>
                                    <Heart className='w-4 h-4 mr-2' />
                                    Save
                                </Button>)}
                        </>
                }

                <WeatherInfoDialog user={user}>
                    <Button>
                        <CloudSun className='w-4 h-4 mr-2' />
                        Weather details
                    </Button>
                </WeatherInfoDialog>
            </div>
        </div >

    )
}

export default UserCard
