import { useMutation } from "react-query"
import { disLikePost, likePost } from "../../../services/actions";
import { Dispatch, SetStateAction } from "react";


interface UseLikeActionMutationProps {
    like: {
        isLike: boolean;
        count:number
    };
    setState: Dispatch<SetStateAction<any>>;
}

const useLikeActionMutation = ({ like, setState }: UseLikeActionMutationProps) => {

    return useMutation(async (id: string) => (like.isLike ? await disLikePost(id) : await likePost(id)), {
        onMutate: async (id: string) => {
            setState(() => ({ count: like.isLike ? like.count-1 : like.count+1, isLike: !like.isLike }));
        },
        onError: async function (error) {
            setState((prev: any) => ({ ...prev, isLike: like.isLike }));
        },
    });
};

export default useLikeActionMutation;
