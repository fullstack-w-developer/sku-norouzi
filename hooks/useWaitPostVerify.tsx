import React from "react";
import { useQuery } from "react-query";
import { setRecoil } from "recoil-nexus";
import { editWaitingProperties } from "../recoil/atom";
import { waitMystudentsProject } from "../utils/fetch/requests";

interface props {
    page: number;
}
const useWaitPostVerify = ({ page }: props) => {
    const { refetch } = useQuery(["request_wait_post"], () => waitMystudentsProject(page), {
        enabled: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 2,
        onSuccess: ({ data }) => {
            setRecoil(editWaitingProperties, {
                ...data,
                posts: data?.data[0]?.paginatedResults,
                total: data?.data[0]?.totalCount[0]?.Total,
            });
        },
    });
    return { refetch };
};

export default useWaitPostVerify;
