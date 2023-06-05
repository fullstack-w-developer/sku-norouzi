import React, { useState } from "react";
import SideBarMenu from "../components/user/Layout/SideBarMenu";
import Head from "next/head";
import usePostStore from "../stores/post-store";
import useGetSavePostQuery from "../hooks/query/post/useGetSavePostQuery";
import Posts from "../components/user/Posts";

const SavePost = () => {
    const [page, setPage] = useState(1);
    const {isLoading} = useGetSavePostQuery({page})
    const {posts} = usePostStore()
    const [hasMore, setHasMore] = useState(true);

    // const { fetchMoreData } = useFetchMoreInfinteScroll({
    //     page,
    //     posts,
    //     setHasMore,
    //     setPage,
    //     setIsLoading,
    //     setPosts: setDataProject,
    //     url: "myproject",
    //     status,
    // });
    
    return (
        <SideBarMenu>
            <Head>
                <title>دانشگاه شهر کرد | پست های دریافتی</title>
            </Head>
            <Posts fetchMoreData={() => { }} hasMore={true} isLoading={isLoading} posts={posts} />
        </SideBarMenu>
    );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const token = ctx.req.cookies["token"];
//     if (!token) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false,
//             },
//         };
//     }
//     const res = await fetch(`${process.env.BASEURL}/post/savepost?skip=1`, {
//         headers: {
//             Authorization: token!,
//         },
//     });
//     const result = await res.json();
//     return {
//         props: {
//             posts: {
//                 posts: result.data[0].paginatedResults,
//                 total: result.data[0]?.totalCount[0]?.Total ?? 0,
//             },
//         },
//     };
// };
export default SavePost;
