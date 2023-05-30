import { useMutation } from "react-query";
import { signUp } from "../../../services/auth";
import { errorToast, successToast } from "../../../helpers/utils/error";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { SignUpFormData } from "../../../types/Auth/Form";

type SignUpMutation = SignUpFormData;

const useSignUpMutation = () => {
    const { push } = useRouter();
    return useMutation(async (data: SignUpMutation) => await signUp(data), {
        onSuccess: async function ({ status, message }) {
            if (status) {
                push("/?new=true");
                successToast(message);
            }
        },
        onError: async function (error) {
            errorToast((error as AxiosError<any>)?.response?.data.message);
        },
    });
};

export default useSignUpMutation;
