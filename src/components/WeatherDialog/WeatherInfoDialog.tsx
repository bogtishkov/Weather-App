import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "@/types/types"
import { ReactNode } from "react";
import WeatherIcon from "../Users/WeatherIcon";
import { ThermometerSun, ThermometerSnowflake } from "lucide-react";
import WeatherCarousel from "./WeatherCarousel";
import Map from "./Map";

interface WeatherDialogProps {
    user: User;
    children: ReactNode;
}

const WeatherInfoDialog: React.FC<WeatherDialogProps> = ({ user, children: dialogTrigger }) => {

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    {dialogTrigger}
                </DialogTrigger>
                <DialogContent className="w-[420px] h-[882px] md:min-w-[600px] lg:min-w-[758px]">
                    <DialogHeader>
                        <DialogTitle>
                            Weather for {`${user.basicInfo.name.first} ${user.basicInfo.name.last}`}
                        </DialogTitle>
                        <DialogDescription>
                            <div className="grid justify-center py-10 gap-4">
                                <div className="flex justify-center text-lg text-slate-800">
                                    {`
                                    ${user.basicInfo.location.city}, 
                                    ${user.basicInfo.location.country}
                                        `}
                                </div>
                                <div className="flex justify-center text-slate-950 text-3xl">
                                    {`
                                    ${user.weather?.currentTemperature}
                                        `} °C
                                </div>
                                <div className="flex justify-center text-slate-950">
                                    <WeatherIcon weatherCode={user.weather?.weatherCode} />
                                </div>
                                <div className="flex justify-center gap-5">
                                    <div className="flex text-slate-950">
                                        <ThermometerSun />
                                        {`
                                        ${user.weather?.maxTemperature}
                                        `} °C
                                    </div>
                                    <div className="flex">
                                        <ThermometerSnowflake />
                                        {`
                                        ${user.weather?.minTemperature}
                                        `} °C
                                    </div>
                                </div>
                                <div className="flex justify-center text-slate-950">
                                    Wind speed: {user.weather?.windSpeed} km/h
                                </div>
                                <WeatherCarousel user={user} />
                                <Map user={user} />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default WeatherInfoDialog
