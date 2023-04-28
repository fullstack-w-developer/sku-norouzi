import { Spin } from "antd";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import useFetchMoreInfinteScroll from "../../hooks/useFetchMoreInfinteScroll";
import { typePost } from "../../tying";
import fetchClient from "../../utils/fetchClient";
import CardPost from "./CardPost";
import InfiniteScroll from "./InfiniteScroll";
interface Props {
    posts:
        | {
              posts: typePost[];
              total: number;
          }
        | any;
    url: string;
}
const Posts = ({ posts: allPosts, url }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState(allPosts);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [isToken, setIsToken] = useState<string | number>("");
    const { fetchMoreData } = useFetchMoreInfinteScroll({ page, posts, setHasMore, setIsLoading, setPage, setPosts, url });
    // const fetchMoreData = async () => {
    //     if (allPosts.posts.length === allPosts.total) {
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

    useEffect(() => {
        const token = Cookies.get("token");
        setIsToken(token!);
    }, []);
    return (
        <InfiniteScroll dataLength={posts?.total} next={fetchMoreData} hasMore={hasMore}>
            <Spin spinning={isLoading}>
                <div
                    className={`grid  gap-10 mx-auto mt-10 pb-10 ${
                        isToken ? "w-[90%] grid-cols-1 lg:grid-cols-2" : "w-[95%] grid-cols-1 lg:grid-cols-3"
                    }`}
                >
                    {[...(posts?.posts[0]?.posts || posts?.posts)].map((post: any, index: number) => (
                        <CardPost posts={posts.posts} sender={posts?.posts[0]?.sender} post={post} key={index} />
                    ))}
                </div>
            </Spin>
        </InfiniteScroll>
    );
};

export default Posts;
