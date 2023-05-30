import { useMutation } from "react-query";
import { signIn } from "../../../services/auth";
import { successToast, errorToast } from "../../../helpers/utils/error";
import { SignInFormData } from "../../../types/Auth/Form";
import { useCookies } from "react-cookie";
import { AxiosError } from "axios";
import axios from "../../../services/utils/axios";
import { useRouter } from "next/router";
import useAuthStore from "../../../stores/auth-store";

type SignInMutation = SignInFormData;

const useSignInMutation = () => {
    const [, setCookies] = useCookies(["token", "jwt"]);
    const setUser = useAuthStore((s) => s.setUser);
    const { push } = useRouter();
    return useMutation(async (data: SignInFormData) => await signIn(data), {
        onSuccess: async function ({ message, status, data }) {
            if (status) {
                const user = data.user;
                setCookies("jwt", data.refresh_token, { path: "/" });
                setCookies("token", data.access_token, { path: "/", maxAge: data.expires_in - 100 });

                axios.defaults.headers.common["Authorization"] = `${data.access_token}`;

                setUser({ user });
                successToast(message);

                if (data.user.role === "USER" || data.user.role === "MASTER") {
                    push("/");
                } else {
                    push("/admin");
                }
            }
        },
        onError: async function (error) {
            errorToast((error as AxiosError<any>)?.response?.data.message);
        },
    });
};

export default useSignInMutation;
