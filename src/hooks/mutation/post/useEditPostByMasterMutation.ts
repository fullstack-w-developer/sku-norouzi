import { useMutation, useQueryClient } from "react-query";
import { editPost_by_master } from "../../../services/post";
import { AddPost } from "../../../types/Post";
import { errorToast, successToast } from "../../../helpers/utils/error";
import { AxiosError } from "axios";
import usePostStore from "../../../stores/post-store";
import { POST } from "../../../helpers/constants/query-keys";

type EditPost = AddPost | any
const useEditPostByMasterMutation = () => {
    const {setEditPost_master} = usePostStore()
    const queryClient = useQueryClient()
    return useMutation(async (data: EditPost) => await editPost_by_master(data), {
        onSuccess: () => {
            successToast("پست با موفقیت آپدیت شد")
            setEditPost_master({open:false,post:null})
            queryClient.refetchQueries({queryKey:POST.WAITING_MASTER})
        },
        onError: async function (error) {
            errorToast((error as AxiosError<any>)?.response?.data.message);
        },
    });
};

export default useEditPostByMasterMutation;
