import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import WeatherDialogCard from "./WeatherDialogCard"
import { User } from "@/types/types"

interface WeatherCarouselProps {
    user: User;
}

const WeatherCarousel: React.FC<WeatherCarouselProps> = ({ user }) => {
    // Создание массива для часов от 0 до 23
    const hoursArray = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className="grid gap-5">
            Forecast for the next 24 hours
            <Carousel className="w-[320px] h-[78px] md:w-[502px] lg:w-[610px]">
                <CarouselContent className="-ml-4 w-[78px] h-[78px] gap-8 md:gap-7">
                    {hoursArray.map(hour => (
                        <CarouselItem key={hour}>
                            <WeatherDialogCard user={user} hour={hour} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default WeatherCarousel