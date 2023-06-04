import { useMutation } from "react-query";
import { SignUpFormData } from "../../../types/Auth/Form";
import { addNewPost } from "../../../services/post";
import { AddPost } from "../../../types/Post";
import { errorToast } from "../../../helpers/utils/error";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

interface useAddPostMutationProps {
    setState: Dispatch<SetStateAction<any>>;

}
const useAddPostMutation = ({ setState }: useAddPostMutationProps) => {
    return useMutation(async (data: AddPost) => await addNewPost(data), {
        onSuccess: () => {
            setState(2)
        },
        onError: async function (error) {
            errorToast((error as AxiosError<any>)?.response?.data.message);
        },
    });
};

export default useAddPostMutation;
