import { SHEARE } from "../../../helpers/constants/query-keys";
import { useQuery } from "react-query";
import { findSheareById } from "../../../services/post";

const useGetAllShearePostQuery = ({ postId }: { postId?: string }) => {
    return useQuery([SHEARE.ALL, postId], async () => await findSheareById(postId), {
        refetchOnReconnect: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });
};

export default useGetAllShearePostQuery;
