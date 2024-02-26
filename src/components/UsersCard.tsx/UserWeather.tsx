import React, { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import { User } from '../../api/api';

interface UserWeatherProps {
    user: User;
}

const UserWeather: React.FC<UserWeatherProps> = ({ user }) => {
    const [currentTemperatureCelsius, setCurrentTemperatureCelsius] = useState<number | null>(null);
    const [maxTemperatureCelsius, setMaxTemperatureCelsius] = useState<number | null>(null);
    const [minTemperatureCelsius, setMinTemperatureCelsius] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);


    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const { latitude, longitude } = user.location.coordinates;
                const params = {
                    latitude,
                    longitude,
                    hourly: "temperature_2m"
                };
                const url = "https://api.open-meteo.com/v1/forecast";
                const responses = await fetchWeatherApi(url, params);
                const response = responses[0];

                const hourly = response.hourly()!;
                const temperatureValues = hourly.variables(0)!.valuesArray()!;

                const currentTemp = temperatureValues[temperatureValues.length - 1];
                const maxTemp = Math.max(...temperatureValues);
                const minTemp = Math.min(...temperatureValues);

                setCurrentTemperatureCelsius(Math.round((currentTemp - 32) * 5 / 9));
                setMaxTemperatureCelsius(Math.round((maxTemp - 32) * 5 / 9));
                setMinTemperatureCelsius(Math.round((minTemp - 32) * 5 / 9));
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError('Error fetching weather data. Please try again later.');
            }
        };

        fetchWeatherData();
    }, [user]);

    if (error) {
        return <p>{error}</p>;
    }

    if (currentTemperatureCelsius === null || maxTemperatureCelsius === null || minTemperatureCelsius === null) {
        return <p>Loading weather data...</p>;
    }

    return (
        <div>
            <div>
                <h1 className="text-lg">Weather</h1>
                <p className="text-sm">{formattedDate}</p>
            </div>
            <div>
                <p>Current Temperature: {currentTemperatureCelsius}°C</p>
                <p>Max Temperature (last 24 hours): {maxTemperatureCelsius}°C</p>
                <p>Min Temperature (last 24 hours): {minTemperatureCelsius}°C</p>
            </div>
        </div>
    );
};

export default UserWeather;



