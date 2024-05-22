import axios from "axios";
import Cookie from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_URL_API;

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    params: {},
});

instance.defaults.headers.common = {
    Authorization: `Bearer ${Cookie.get("token_kanow") === undefined ? "kanow" : Cookie.get("token_kanow")}`,
};

// Function to get client IP using ipify
const getClientIp = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        console.log('response', response);

        return response.data.ip;
    } catch (error) {
        console.error('Failed to fetch IP', error);
        return null;
    }
};

// Add a request interceptor
instance.interceptors.request.use(
    async function (config) {
        // Attach the token from the cookie to the request headers
        const myCookie = Cookie.get("token_kanow");
        if (myCookie) {
            config.headers.Authorization = `Bearer ${myCookie ? myCookie : "kanow"}`;
        }

        // Fetch client IP and attach to headers
        const clientIp = await getClientIp();
        if (clientIp) {
            config.headers['X-Client-IP'] = clientIp;

            console.log('clientIp', clientIp);


            // Send IP to Next.js API route
            // await axios.post('/api/log-ip', null, {
            //     headers: {
            //         'X-Client-IP': clientIp,
            //     },
            // });
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const status = error.response?.status || 500;
        // we can handle global errors here
        switch (status) {
            // authentication (token related issues)
            case 401: {
                return error.response.data;
            }

            // forbidden (permission related issues)
            case 403: {
                return Promise.reject(error);
            }

            // bad request
            case 400: {
                return Promise.reject(error);
            }

            // not found
            case 404: {
                return Promise.reject(error);
            }

            // conflict
            case 409: {
                return Promise.reject(error);
            }

            // unprocessable
            case 422: {
                return Promise.reject(error);
            }

            // generic api error (server related) unexpected
            default: {
                const errorMessage = error?.response?.data?.message;
                return errorMessage ? errorMessage : Promise.reject(error);
            }
        }

        // const errorMessage = error?.response?.data?.message;
        // return errorMessage ? errorMessage : Promise.reject(error);
    }
);

export default instance;
