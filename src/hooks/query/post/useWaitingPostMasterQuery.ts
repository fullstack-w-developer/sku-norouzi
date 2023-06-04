import { POST } from "../../../helpers/constants/query-keys";
import { useQuery } from "react-query";
import {  getWaitingPostMaster } from "../../../services/post";
import usePostStore from "../../../stores/post-store";
import useAuthStore from "../../../stores/auth-store";
interface useWaitingPostMasterQueryProps {
    page: number;
}
const useWaitingPostMasterQuery = ({page}:useWaitingPostMasterQueryProps) => {
    const {authLoading} = useAuthStore()
    const { setPosts } = usePostStore();
    return useQuery([POST.WAITING_MASTER,page], async () => await getWaitingPostMaster(page), {
        refetchOnReconnect: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        onSuccess({ data }) {
            const posts = {
                posts: data[0].paginatedResults,
                total: data[0].totalCount[0]?.Total,
            };
            setPosts(posts);
        },
        enabled:!authLoading
    });
};

export default useWaitingPostMasterQuery;
