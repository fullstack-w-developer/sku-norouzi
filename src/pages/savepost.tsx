import { GetServerSideProps } from "next";
import React, { useState } from "react";
import CardPost from "../components/user/CardPostProfile";
import SideBarMenu from "../components/user/Layout/SideBarMenu";
import fetchClient from "../utils/fetchClient";
import Head from "next/head";
import InfiniteScroll from "../components/user/InfiniteScroll";
import useFetchMoreInfinteScroll from "../hooks/useFetchMoreInfinteScroll";
import { Spin } from "antd";

const SavePost = ({ posts }: any) => {
    const [dataProject, setDataProject] = useState(posts);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(2);

    const { fetchMoreData } = useFetchMoreInfinteScroll({
        page,
        posts,
        setHasMore,
        setPage,
        setIsLoading,
        setPosts: setDataProject,
        url: "myproject",
        status,
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
        <SideBarMenu>
            <Head>
                <title>دانشگاه شهر کرد | پست های دریافتی</title>
            </Head>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <Spin />
                </div>
            ) : (
                <InfiniteScroll dataLength={posts.total} next={fetchMoreData} hasMore={hasMore}>
                    {dataProject.posts.length === 0 ? (
                        <p className="text-center text-md text-gray-600 mt-20 font-ExtraBold">پست ذخیره شده‌ای وجود ندارد</p>
                    ) : (
                        <div className="grid lg:grid-cols-2 w-[90%] gap-10 mx-auto mt-10 pb-10">
                            {dataProject.posts.map((post: any, index: number) => {
                                if (post.status === "failed") return;
                                return <CardPost key={index} posts={dataProject.posts} post={post} />;
                            })}
                        </div>
                    )}
                </InfiniteScroll>
            )}
        </SideBarMenu>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = ctx.req.cookies["token"];
    if (!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const res = await fetch(`${process.env.BASEURL}/post/savepost?skip=1`, {
        headers: {
            Authorization: token!,
        },
    });
    const result = await res.json();
    return {
        props: {
            posts: {
                posts: result.data[0].paginatedResults,
                total: result.data[0]?.totalCount[0]?.Total ?? 0,
            },
        },
    };
};
export default SavePost;
