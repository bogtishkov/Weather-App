import { Cloud, CloudDrizzle, CloudFog, CloudHail, CloudLightning, CloudRain, CloudRainWind, CloudSnow, CloudSun, CloudSunRain, LucideIcon, Snowflake, SunMedium, Umbrella, Zap } from 'lucide-react';


interface WeatherIconProps {
    weatherCode?: number;
}

const WEATHER_CODE_TO_ICON: Record<number, LucideIcon> = {
    // default
    [-1]: CloudSun,
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

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCode }) => {
    const WeatherIcon = WEATHER_CODE_TO_ICON[weatherCode || -1];
    return (
        <WeatherIcon className='w-16 h-16' />
    )
}

export default WeatherIcon
