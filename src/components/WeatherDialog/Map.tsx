import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { User } from "@/types/types";

interface MapProps {
    user: User;
}

const Map: React.FC<MapProps> = ({ user }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const center = {
        lat: Number(user.basicInfo.location.coordinates.latitude),
        lng: Number(user.basicInfo.location.coordinates.longitude)
    }

    if (!isLoaded) return null;
    return (
        <GoogleMap mapContainerClassName="w-full h-[300px] bg-red-500" center={center} zoom={5}>
                <MarkerF
                    position={center}
                    icon={user.basicInfo.picture.medium}
                />
        </GoogleMap>
    );
};


export default Map;