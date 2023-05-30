import { Spin } from "antd";
import { useState, useEffect } from "react";
import useFetchMoreInfinteScroll from "../../hooks/useFetchMoreInfinteScroll";
import CardPostProfile from "./CardPostProfile";
import InfiniteScroll from "./InfiniteScroll";
interface Props {
    posts: any;
    setDataProject: any;
    status: string;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    loadPosts: boolean;
}
const PostsProfile = ({ posts, setDataProject, status, page, setPage, loadPosts }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isToken, setIsToken] = useState<string | number>("");
    const { fetchMoreData } = useFetchMoreInfinteScroll({
        page,
        posts,
        setHasMore,
        setIsLoading,
        setPage,
        setPosts: setDataProject,
        status,
        url: "/myproject?",
    });
    // const fetchMoreData = async () => {
    //     if (posts.posts.length === posts.total) {
    //         setHasMore(false);
    //         return;
    //     }
    //     await setPage((prev: any) => prev + 1);
    //     try {
    //         setIsLoading(true);
    //         const { data } = await fetchClient.get(`/myproject?skip=${page}&status=${status}`);
    //         setIsLoading(false);
    //         if (data.status) {
    //             setDataProject({
    //                 ...posts,
    //                 posts: [...posts.posts, ...data.data[0].paginatedResults],
    //             });
    //         }
    //     } catch (error) {
    //         setIsLoading(false);
    //     }
    // };

    return (
        <>
            {loadPosts ? (
                <div className="flex justify-center items-center mt-14">
                    <Spin size="large" />{" "}
                </div>
            ) : posts.posts.length === 0 ? (
                <p className="text-center text-md text-gray-600 mt-20 font-ExtraBold">پستی وجود ندارد</p>
            ) : (
                <InfiniteScroll dataLength={posts.total} next={fetchMoreData} hasMore={hasMore}>
                    <Spin spinning={isLoading}>
                        <div
                            className={`grid lg:grid-cols-2 gap-10 mx-auto mt-10 ${
                                isToken ? "w-full lg:[90%]" : "w-full lg:[90%]"
                            }`}
                        >
                            {posts.posts.map((post: any, index: number) => (
                                <CardPostProfile
                                    page={page}
                                    status={status}
                                    posts={posts}
                                    post={post}
                                    key={index}
                                    setDataProject={setDataProject}
                                />
                            ))}
                        </div>
                    </Spin>
                </InfiniteScroll>
            )}
        </>
    );
};

export default PostsProfile;
