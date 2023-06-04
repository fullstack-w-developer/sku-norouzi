import { POST } from "../../../helpers/constants/query-keys";
import { useQuery } from "react-query";
import { getMyProject } from "../../../services/post";
import usePostStore from "../../../stores/post-store";
import useAuthStore from "../../../stores/auth-store";
interface Props {
    status: string;
    page:number;
}
const useGetMyProject = ({status,page}:Props) => {
    const {authLoading} = useAuthStore()
    const { setPosts } = usePostStore();
    return useQuery([POST.MY_PROJECT,status,page], async () => await getMyProject(status,page), {
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

export default useGetMyProject;
