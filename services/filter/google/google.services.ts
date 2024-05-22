import axios, { AxiosRequestConfig } from "axios";

const useGoogleApi = () => {
    const apiGetAddress = (latitude: Number, longitude: Number, key: any) => {
        return axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`
        );
    };

    const apiGetCurrentPosition = (param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param, // Nối các tham số trong param object
            },
        };

        return axios.get(
            `${process.env.NEXT_PUBLIC_URL_API_MAP4D}/sdk/v2/geocode`, config
        );
    };

    const apiViewboxSearch = (param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param, // Nối các tham số trong param object
            },
        };
        return axios.get(
            `${process.env.NEXT_PUBLIC_URL_API_MAP4D}/sdk/place/viewbox-search`, config
        )
    }
    const apiTextSearch = (param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param, // Nối các tham số trong param object
            },
        };
        return axios.get(
            `${process.env.NEXT_PUBLIC_URL_API_MAP4D}/sdk/place/text-search`, config
        )
    }

    const apiRouteMatrixAddress = (param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param, // Nối các tham số trong param object
            },
        };
        return axios.get(
            `${process.env.NEXT_PUBLIC_URL_API_MAP4D}/sdk/route`, config
        )
    }

    return {
        apiGetAddress,
        apiViewboxSearch,
        apiGetCurrentPosition,
        apiRouteMatrixAddress,
        apiTextSearch,
    };
};

export default useGoogleApi;
