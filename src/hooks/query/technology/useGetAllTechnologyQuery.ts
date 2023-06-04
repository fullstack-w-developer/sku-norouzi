import { TECHNOLOGY } from "../../../helpers/constants/query-keys";
import { useQuery } from "react-query";
import useAuthStore from "../../../stores/auth-store";
import { getTechnologyList } from "../../../services/technology";

const useGetAllTechnologyQuery = () => {
    const {authLoading} = useAuthStore()

    return useQuery([TECHNOLOGY.ALL], async () => await getTechnologyList(), {
        refetchOnReconnect: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled:!authLoading
    });
};

export default useGetAllTechnologyQuery;
