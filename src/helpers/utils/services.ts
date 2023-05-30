import { AxiosRequestConfig } from "axios";
import { inDevEnvironment } from "../../helpers/constants/env-variables";
import { IS_SERVER } from "../../helpers/constants/constants";
import { generateQueries } from "../../helpers/utils/queries";
import formatUnicorn from "format-unicorn/safe";
import { GetRouteProps } from "../../types/services";
import axios from "../../services/utils/axios";
import { getUser } from "../../services/auth";

export const logRequestedUrl = ({ baseURL, method, url }: AxiosRequestConfig) => {
    if (baseURL && inDevEnvironment) {
        const fullUrl = baseURL + url;
        const str = method?.toUpperCase() + " " + fullUrl;
        if (IS_SERVER) {
            console.log("\x1b[36m%s\x1b[0m", str);
        } else {
            console.log(`%c${str}`, "color: #16ffff");
        }
    }
};

export const generateFormData = (obj: object) => {
    const data = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        data.append(key, value);
    });
    return { data, headers: { "Content-Type": "multipart/form-data" } };
};

export const generateFormDataList = (obj: object[]) => {
    const data = new FormData();
    obj.map((item) =>
        Object.entries(item).forEach(([key, value]) => {
            data.append(key, value);
        })
    );
    return { data, headers: { "Content-Type": "multipart/form-data" } };
};

export const getRoute = ({ route, query, ...rest }: GetRouteProps) => {
    let url = route;

    if (Object.keys({ ...rest }).length) {
        url = formatUnicorn(route, { ...rest });
    }

    if (query) {
        const queries = generateQueries(query);
        url = url + queries;
    }

    return url;
};

type SetCookieProps = Partial<{
    [key: string]: string;
}>;

export const setCookie = async (cookies: SetCookieProps) => {
    const token = cookies["token"];
    const refresh_token = cookies["jwt"];
    if (!(token && refresh_token)) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    } else if (!token && refresh_token) {
        try {
            // const { data, status } = await refreshToken({ refresh_token });
            // if (status) {
            //     const token = data.token.original.access_token;
            //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // }
        } catch (error) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
    } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

export const itsUserProfile = async (id: string) => {
    try {
        const { user } = await getUser();
        if (user.id.toString() === id) {
            return {
                redirect: {
                    destination: "/dashboard/profile",
                    permanent: false,
                },
            };
        }
    } catch (error) {
        return {
            redirect: {
                destination: "/dashboard/profile",
                permanent: false,
            },
        };
    }
};
