import { useMutation } from "react-query";
import { addComment } from "../../../services/actions";
import { Dispatch, SetStateAction } from "react";
import { Comment } from "../../../types/common";
import { errorToast, successToast } from "../../../helpers/utils/error";

interface UseAddCommentActionMuationProps {
    setState: Dispatch<SetStateAction<Comment[]>>;
}

type CommentMutation = { postId: string, comment: string }
const useAddCommentActionMuation = ({ setState }: UseAddCommentActionMuationProps) => {
    return useMutation(async (data: CommentMutation) => await addComment(data), {
        onSuccess({data,status}) {
           if(status){
            setState(data.comments)
            successToast("پیام شما با موفقیت ثبت شد")
           }
        },
        onError: async function (error) {
            errorToast("مشکلی در ثبت پیام شما  پیش آمده است")

        },
    });
};

export default useAddCommentActionMuation;
