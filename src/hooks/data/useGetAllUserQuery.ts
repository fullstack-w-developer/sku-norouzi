import { USER } from "../../helpers/constants/query-keys";
import { useQuery } from "react-query";
import usePostStore from "../../stores/post-store";
import { getAllUser } from "../../services/user";

const useGetAllUserQuery = (search: string) => {
    return useQuery([USER.ALL_USER, search], async () => await getAllUser(search), {
        refetchOnReconnect: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        onSuccess({ data }) {
            // const posts = {
            //     posts: data[0].paginatedResults,
            //     total: data[0].totalCount[0].Total
            // }
            // setPosts(posts)
        },
    });
};

export default useGetAllUserQuery;
