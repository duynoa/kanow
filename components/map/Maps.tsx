import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';

type Props = {
    latitude: number;
    longitude: number;
    data: any
}

const Map = ({ latitude, longitude, data }: Props) => {
    const center = {
        lat: latitude,
        lng: longitude,
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBtYQtozFnAVu1CwrJfmJKIxw1_sMUgzqo">
            <GoogleMap
                mapContainerClassName={'custom-container-map'}
                center={center}
                zoom={15}
            >
                {
                    data?.google_map_link ?
                        <div className='relative w-full h-full'>
                            <iframe
                                src={`${data?.google_map_link}`}
                                className='custom-container-map-iframe absolute -translate-y-[4%] top-0 left-0 border-none'
                                width="100%"
                                height="100%"
                                loading="lazy"
                            />
                        </div>
                        :
                        <Marker position={center} />
                }
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;