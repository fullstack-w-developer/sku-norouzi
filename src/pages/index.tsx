import SideBarMenu from "../components/user/Layout/SideBarMenu";
import Posts from "../components/user/Posts";
import Head from "next/head";
import useGetAllPostsQuery from "../hooks/query/post/useGetAllPostsQuery"
import usePostStore from "../stores/post-store";
import { Spin } from "antd";
export default function Home() {
    const { posts } = usePostStore()
    const { isLoading } = useGetAllPostsQuery()
    return (
        <>
            <SideBarMenu>
                <Head>
                    <title>دانشگاه شهر کرد</title>
                </Head>
                <div className="w-[98%] mx-auto ">
                    {
                        isLoading ? <Spin size="large" className="flex justify-center items-center h-[80vh] " /> :
                            <Posts fetchMoreData={() => { }} hasMore={true} isLoading={false} posts={posts} />
                    }
                </div>
            </SideBarMenu>
        </>
    );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const result = await fetch(`${process.env.BASEURL}${routing.user.getAllProject}`)
//         .then((response) => response.json())
//         .catch((err) => console.log(err));
//     return {
//         props: {
//             posts: {
//                 posts: result?.data[0]?.paginatedResults,
//                 total: result?.data[0]?.totalCount[0]?.Total ?? 0,
//             },
//         },
//     };
// };
