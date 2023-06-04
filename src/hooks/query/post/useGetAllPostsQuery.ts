import { POST } from "../../../helpers/constants/query-keys";
import { useQuery } from "react-query";
import { getAllPost } from "../../../services/post";
import usePostStore from "../../../stores/post-store";
import useAuthStore from "../../../stores/auth-store";

const useGetAllPostsQuery = () => {
    const {authLoading} = useAuthStore()
    const { setPosts } = usePostStore();
    return useQuery([POST.ALL_POST], async () => await getAllPost(), {
        refetchOnReconnect: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        onSuccess({ data }) {
            const posts = {
                posts: data[0].paginatedResults,
                total: data[0].totalCount[0].Total,
            };
            setPosts(posts);
        },
        enabled:!authLoading
    });
};

export default useGetAllPostsQuery;
