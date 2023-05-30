import { useMutation } from "react-query";
import { signUp } from "../../../services/auth";
import { successToast, errorToast } from "../../../helpers/utils/error";
import { useCookies } from "react-cookie";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

type SignUpMutation = SignUpFormData;

const useSignUpMutation = () => {
    const [, setCookies] = useCookies(["token", "jwt"]);
    const { push } = useRouter();
    return useMutation(async (data: SignUpMutation) => await signUp(data), {
        onSuccess: async function ({ message, data, status }) {},
        onError: async function (error) {
            errorToast((error as AxiosError<any>)?.response?.data.message);
        },
    });
};

export default useSignUpMutation;
