import React from "react";
import { typePost } from "../tying";
import fetchClient from "../utils/fetchClient";

interface Props {
    posts: any;
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPosts: any;
    url: string;
    page: number;
    status?: string;
}
const useFetchMoreInfinteScroll = ({ posts, setHasMore, setPage, setIsLoading, setPosts, url, page = 1, status = "" }: Props) => {
    const fetchMoreData = async () => {
        if (posts.posts.length === posts.total) {
            setHasMore(false);
            return;
        }
        await setPage((prev: any) => prev + 1);
        try {
            setIsLoading(true);

            const { data } = await fetchClient.get(`skip=${page}&status=${status}`);
            //  fetchClient.get(`/myproject?skip=${page}&status=${status}`);
            setIsLoading(false);
            if (data.status) {
                setPosts({
                    ...posts,
                    posts: [...posts.posts, ...data.data[0].paginatedResults],
                });
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    // const fetchMoreData = async () => {
    //     if (posts.posts.length === posts.total) {
    //         setHasMore(false);
    //         return;
    //     }
    //     setPage((prev: any) => prev + 1);
    //     try {
    //         setIsLoading(true);
    //         const { data } = await fetchClient.get(`${url}=${page}`);
    //         setIsLoading(false);
    //         if (data.status) {
    //             setPosts({
    //                 ...allPosts,
    //                 posts: [...allPosts.posts, ...data.data[0].paginatedResults],
    //             });
    //         }
    //     } catch (error) {
    //         setIsLoading(false);
    //     }
    // };

    return { fetchMoreData };
};

export default useFetchMoreInfinteScroll;
