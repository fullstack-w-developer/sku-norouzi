import { SHEARE } from "../../../helpers/constants/query-keys";
import { useQuery } from "react-query";
import { findSheareById } from "../../../services/post";
import useAuthStore from "../../../stores/auth-store";

const useGetAllShearePostQuery = ({ postId }: { postId?: string }) => {
    const {authLoading} = useAuthStore()

    return useQuery([SHEARE.ALL, postId], async () => await findSheareById(postId), {
        refetchOnReconnect: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled:!authLoading
    });
};

export default useGetAllShearePostQuery;
