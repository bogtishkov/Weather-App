import React, { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import { Cloud, CloudDrizzle, CloudFog, CloudHail, CloudLightning, CloudRain, CloudRainWind, CloudSnow, CloudSun, CloudSunRain, LucideIcon, Snowflake, SunMedium, ThermometerSnowflake, ThermometerSun, Umbrella, Zap } from 'lucide-react';
import { User } from '@/types/types';

interface UserWeatherProps {
    user: User;
}

const WEATHER_CODE_TO_ICON: Record<number, LucideIcon> = {
    // Sun
    [0]: SunMedium,
    // Mainly clear, partly cloudy, and overcast
    [1]: Cloud,
    [2]: Cloud,
    [3]: Cloud,
    // Fog and depositing rime fog
    [45]: CloudFog,
    [48]: CloudFog,
    // 	Drizzle: Light, moderate, and dense intensity
    [51]: CloudSunRain,
    [53]: CloudSunRain,
    [55]: CloudSunRain,
    // Freezing Drizzle: Light and dense intensity
    [56]: CloudRain,
    [57]: CloudRain,
    // Rain: Slight, moderate and heavy intensity
    [61]: CloudDrizzle,
    [63]: CloudDrizzle,
    [65]: CloudDrizzle,
    // 	Freezing Rain: Light and heavy intensity
    [66]: CloudHail,
    [67]: CloudHail,
    // 	Snow fall: Slight, moderate, and heavy intensity
    [71]: CloudSnow,
    [73]: CloudSnow,
    [75]: CloudSnow,
    // 	Snow grains
    [77]: Umbrella,
    // 	Rain showers: Slight, moderate, and violent
    [80]: CloudRainWind,
    [81]: CloudRainWind,
    [82]: CloudRainWind,
    // 	Snow showers slight and heavy
    [85]: Snowflake,
    [86]: Snowflake,
    // 	Snow showers slight and heavy
    [95]: CloudLightning,
    // Thunderstorm with slight and heavy hail
    [96]: Zap,
    [99]: Zap,
}

const UserWeather: React.FC<UserWeatherProps> = ({ user }) => {
    const [currentTemp, setCurrentTemp] = useState<number>(0)
    const [weatherCode, setWeatherCode] = useState<number>(-1)
    const [minTemp, setMinTemp] = useState<number>(0)
    const [maxTemp, setMaxTemp] = useState<number>(0)

    // https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=1
    useEffect(() => {
        fetchWeatherData()
    }, [user.basicInfo.id]);

    const fetchWeatherData = async () => {
        const { latitude: userLatitude, longitude: userLongitude } = user.basicInfo.location.coordinates;

        const params = {
            latitude: userLatitude,
            longitude: userLongitude,
            "current": ["temperature_2m", "weather_code"],
            "daily": ["temperature_2m_max", "temperature_2m_min"],
            "forecast_days": 1
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        const response = responses[0];

        const current = response.current()!;
        const daily = response.daily()!;
        const weatherData = {
            current: {

                temperature2m: current.variables(0)!.value(),
                weatherCode: current.variables(1)!.value(),
            },
            daily: {

                temperature2mMax: daily.variables(0)!.valuesArray()!,
                temperature2mMin: daily.variables(1)!.valuesArray()!,
            },

        };

        const currentTemp = Math.round(weatherData.current.temperature2m);
        const weatherCode = Math.round(weatherData.current.weatherCode);

        const minTemp = Math.round(weatherData.daily.temperature2mMin[0]);
        const maxTemp = Math.round(weatherData.daily.temperature2mMax[0]);

        setCurrentTemp(currentTemp)
        setWeatherCode(weatherCode)
        setMinTemp(minTemp)
        setMaxTemp(maxTemp)
    }

    const WeatherIcon = WEATHER_CODE_TO_ICON[weatherCode] || CloudSun;
    return (
        <div className='grid gap-5 p-6'>
            <div className='flex'>
                <div>{(new Date()).toLocaleString()}</div>
            </div>
            <div className='grid grid-cols-2'>
                <div className='flex items-center gap-4'>
                    <WeatherIcon className='w-16 h-16' />
                    <div>{currentTemp}°C</div>
                </div>
                <div className='grid gap-4'>
                    <div className='flex gap-2'>
                        <ThermometerSun />
                        {maxTemp}°C

                    </div>
                    <div className='flex gap-2 text-slate-400'>
                        <ThermometerSnowflake />
                        {minTemp}°C
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserWeather;
