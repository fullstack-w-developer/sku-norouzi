import { MASTER } from "../../../helpers/constants/query-keys";
import { useQuery } from "react-query";
import useAuthStore from "../../../stores/auth-store";
import { getMasterList } from "../../../services/masters";

const useGetAllMasterQuery = () => {
    const { authLoading } = useAuthStore()

    return useQuery([MASTER.ALL], async () => await getMasterList(), {
        refetchOnReconnect: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: !authLoading
    });
};

export default useGetAllMasterQuery;
