import React from 'react';
import { User } from '@/types/types';
import WeatherIcon from './WeatherIcon';
import { ThermometerSun, ThermometerSnowflake } from 'lucide-react';

interface UserWeatherProps {
    user: User;
}

const UserWeather: React.FC<UserWeatherProps> = ({ user }) => {
    return (
        <div className='grid gap-5 p-6'>
            <div className='flex'>
                <div>{(new Date()).toLocaleString()}</div>
            </div>
            <div className='grid grid-cols-2'>
                <div className='flex items-center gap-4'>
                    <WeatherIcon weatherCode={user.weather?.weatherCode} />
                    <div>{user.weather?.currentTemperature}°C</div>
                </div>
                <div className='grid gap-4'>
                    <div className='flex gap-2'>
                        <ThermometerSun />
                        {user.weather?.maxTemperature}°C
                    </div>
                    <div className='flex gap-2 text-slate-400'>
                        <ThermometerSnowflake />
                        {user.weather?.minTemperature}°C
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserWeather;
