import React from 'react';
import { Card, CardContent } from '../ui/card'
import { User } from '@/types/types'

interface WeatherDialogCardProps {
    user: User;
    hour: number;
}

const WeatherDialogCard: React.FC<WeatherDialogCardProps> = ({ user, hour }) => {
    const formatTime = (timeString: string) => {
        const date = new Date(timeString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatTemperature = (temperature: number) => {
        return Math.round(temperature);
    };

    const hourlyWeather = user.weather?.hourly.find(data => {
        const dataHour = new Date(data.time).getHours();
        return dataHour === hour;
    });

    if (!hourlyWeather) {
        return null;
    }

    return (
        <div>
            <Card className="flex justify-center w-[78px] h-[78px]">
                <CardContent className="flex items-center justify-center p-6">
                    <div className='grid justify-center items-center'>
                        <span className="text-lg font-semibold">{formatTemperature(hourlyWeather.temperature)}°C</span>
                        <span className="text-md">{formatTime(hourlyWeather.time)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default WeatherDialogCard
