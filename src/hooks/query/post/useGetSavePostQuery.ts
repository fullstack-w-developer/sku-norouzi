import { POST } from "../../../helpers/constants/query-keys";
import { useQuery } from "react-query";
import { getSavePost } from "../../../services/post";
import useAuthStore from "../../../stores/auth-store";
import usePostStore from "../../../stores/post-store";

const useGetSavePostQuery = ({page}:{page:number}) => {
    const { authLoading } = useAuthStore()
    const { setPosts } = usePostStore();

    return useQuery([POST.SAVEPOST,page], async () => await getSavePost(page), {
        refetchOnReconnect: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: !authLoading,
        onSuccess({ data }) {
            const posts = {
                posts: data[0].paginatedResults,
                total: data[0].totalCount[0]?.Total,
            };
            setPosts(posts);
        },
    });
};

export default useGetSavePostQuery;
