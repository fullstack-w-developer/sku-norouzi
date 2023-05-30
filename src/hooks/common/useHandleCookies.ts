import axios from "../../services/utils/axios";
import useAuthStore from "../../stores/auth-store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const useHandleCookies = () => {
    const removeUser = useAuthStore((s) => s.removeUser);
    const [cookies, _, removeCookies] = useCookies(["token", "jwt"]);
    const { push } = useRouter();

    useEffect(() => {
        if (!cookies.token) {
            delete axios.defaults.headers.common["Authorization"];
            removeCookies("token", { path: "/" });
            removeCookies("jwt", { path: "/" });
            removeUser();
            push("/auth/signin");
        }
    }, [cookies.token]);
};

export default useHandleCookies;
