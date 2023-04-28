import axios from "axios";
import Cookies from "js-cookie";

const fetchClient = () => {
    const defaultOptions = {
        baseURL: process.env.BASEURL,
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(function (config: any) {
        const token = Cookies.get("token");
        config.headers.Authorization = token ? `${token}` : "";
        return config;
    });

    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default fetchClient();
