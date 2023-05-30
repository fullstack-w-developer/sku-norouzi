import axios from "../../services/utils/axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useAuthStore from "../../stores/auth-store";
import { getUser } from "../../services/auth";

const useVerifyAuth = () => {
    const setAuthLoading = useAuthStore((s) => s.setAuthLoading);
    const setUser = useAuthStore((s) => s.setUser);
    const removeUser = useAuthStore((s) => s.removeUser);
    const [cookies, setCookies, removeCookies] = useCookies(["token", "jwt"]);

    useEffect(() => {
        if (cookies.token && cookies.jwt) {
            const verifyUser = async () => {
                setAuthLoading(true);
                axios.defaults.headers.common["Authorization"] = `${cookies.token}`;
                try {
                    const { status, user } = await getUser();
                    if (status) {
                        setUser({ user });
                    }
                } catch (error) {
                    delete axios.defaults.headers.common["Authorization"];
                    removeCookies("token", { path: "/" });
                    removeCookies("jwt", { path: "/" });
                } finally {
                    setAuthLoading(false);
                }
            };
            verifyUser();
        } else if (!cookies.token && cookies.jwt) {
            const refreshUser = async () => {
                delete axios.defaults.headers.common["Authorization"];
                removeCookies("token", { path: "/" });
                // const { data, status } = await refreshToken({ refresh_token: cookies.jwt });
                // if (status) {
                //     const token = data.token.original;
                //     const user = data.user;
                //     setUser({ user });
                //     axios.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;
                //     setCookies("token", token.access_token, { path: "/", maxAge: token.expires_in - 100 });
                //     setCookies("jwt", token.refresh_token, { path: "/" });
                // }
            };
            refreshUser();
        } else {
            delete axios.defaults.headers.common["Authorization"];
            removeCookies("token", { path: "/" });
            removeCookies("jwt", { path: "/" });
            removeUser();
        }
    }, [cookies.token, cookies.jwt]);
};

export default useVerifyAuth;
