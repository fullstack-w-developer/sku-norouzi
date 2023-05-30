import { useMutation } from "react-query";
import { UnBookmark, addBookmark } from "../../../services/actions";
import { Dispatch, SetStateAction } from "react";

interface UseBookmarkActionMuationProps {
    isBookmark: boolean;
    setState: Dispatch<SetStateAction<any>>;
}

const useBookmarkActionMuation = ({ isBookmark, setState }: UseBookmarkActionMuationProps) => {

    return useMutation(async (id: string) => (isBookmark ? await UnBookmark(id) : await addBookmark(id)), {
        onMutate: async (id: string) => {
            setState(!isBookmark)
        },
        onError: async function (error) {
            setState(isBookmark);

        },
    });
};

export default useBookmarkActionMuation;
