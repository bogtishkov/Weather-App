export type BasicUserInfo = {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: number;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        timezone: {
            offset: string;
            description: string;
        };
    };
    email: string;
    id: {
        name: string;
        value: string;
    };
    picture: {
        large: string;
        medium: string;
    };
};

export type Weather = {
    currentTemperature: number;
    weatherCode: number;
    minTemperature: number;
    maxTemperature: number;
};

export type WeatherFromOpenMeteo = {
    current: {
        temperature_2m: number;
        weather_code: number;
    };
    daily: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
};

export type User = {
    basicInfo: BasicUserInfo;
    weather?: Weather;
};

export type UseUsersWithWeatherHookResult = {
    users: User[];
    loading: boolean;
    onLoadMore: () => void;
};