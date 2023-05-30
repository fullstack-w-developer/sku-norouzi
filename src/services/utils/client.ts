import axios from "./axios";
import { ClientOverload, ConfigUrlRequired } from "../../types/services";
import { AxiosResponse } from "axios";

const client: ClientOverload = async <D, F>(
    { url, ...config }: ConfigUrlRequired,
    formatter?: (data: D, response: AxiosResponse<D, any>) => F
) => {
    const response = await axios.request<D>({
        url: encodeURI(url),
        ...config,
    });

    return typeof formatter === "undefined" ? response.data : formatter(response.data, response);
};

export default client;
