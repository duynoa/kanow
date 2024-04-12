import axios from "axios";

const useGoogleApi = () => {
    const apiGetAddress = (latitude: Number, longitude: Number, key: any) => {
        return axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`
        );
    };

    return {
        apiGetAddress,
    };
};

export default useGoogleApi;
