import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import AllUsersGrid from './AllUsersGrid';
import { BasicUserInfo, Weather, WeatherFromOpenMeteo, User, UseUsersWithWeatherHookResult } from "../../types/types";

const USERS_PER_PAGE = 10;

const getWeatherApiUrl = ({
    latitude,
    longitude,
}: {
    latitude: string;
    longitude: string;
}) =>
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`

const useUsersWithWeather = (): UseUsersWithWeatherHookResult => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    const fetchRandomUsersInfo = async (): Promise<BasicUserInfo[]> => {
        const fetchedResult = await fetch(
            `https://randomuser.me/api/?results=${USERS_PER_PAGE}`
        );
        const parsedResult = await fetchedResult.json();

        const basicUsersInfo = (parsedResult?.results || []) as BasicUserInfo[];

        return basicUsersInfo;
    };

    const fetchWeatherByIds = async ({
        usersCoordinates,
    }: {
        usersCoordinates: {
            latitude: string;
            longitude: string;
            userId: string;
        }[];
    }): Promise<{ userId: string; weather: Weather }[]> => {
        const latitudesString = usersCoordinates
            .map((coordinates) => coordinates.latitude)
            .join(",");
        const longitudesString = usersCoordinates
            .map((coordinates) => coordinates.longitude)
            .join(",");


        const fetchedResult = await fetch(
            getWeatherApiUrl({
                latitude: latitudesString,
                longitude: longitudesString,
            })
        );
        const parsedResult = await fetchedResult.json() as WeatherFromOpenMeteo[];

        if (parsedResult.length !== usersCoordinates.length) return [];

        return parsedResult.map((weather, index) => ({
            userId: usersCoordinates[index].userId,
            weather: {
                weatherCode: weather.current.weather_code,
                currentTemperature: weather.current.temperature_2m,
                minTemperature: weather.daily.temperature_2m_min[0],
                maxTemperature: weather.daily.temperature_2m_max[0],
                windSpeed: weather.current.wind_speed_10m,
                hourly: weather.hourly.temperature_2m.map((temperature, index) => ({
                    temperature,
                    time: weather.hourly.time[index]
                }))
            },
        }))

    };
    const fetchUsers = async () => {
        setLoading(true);
        const basicUsersInfo = await fetchRandomUsersInfo();
        const usersCoordinates = basicUsersInfo.map((user) => ({
            userId: user.id.value,
            ...user.location.coordinates,
        }));

        const weatherByIds = await fetchWeatherByIds({ usersCoordinates });

        const users: User[] = basicUsersInfo.map(basicUsersInfo => ({
            basicInfo: basicUsersInfo,
            weather: weatherByIds.find(weather => basicUsersInfo.id.value == weather.userId)?.weather,
        }))

        setUsers((prev) => prev.concat(users))
        setLoading(false);
    };

    const handleLoadMore = () => {
        fetchUsers();
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        loading,
        users,
        onLoadMore: handleLoadMore
    };
};

export const UserList = () => {
    const { users, loading, onLoadMore } = useUsersWithWeather();


    if (loading) return <div>Loading</div>


    return (
        <div className="flex flex-col items-center">
            <AllUsersGrid users={users} />
            <Button variant="outline" className="w-fit" onClick={onLoadMore}>
                Show more
            </Button>
        </div>
    );
};


export default UserList
