import SideBarMenu from "../components/user/Layout/SideBarMenu";
import Posts from "../components/user/Posts";
import Head from "next/head";
import useGetAllPostsQuery from "../hooks/query/post/useGetAllPostsQuery";
import usePostStore from "../stores/post-store";


export default function Home() {
    const { posts } = usePostStore();
    const { isLoading } = useGetAllPostsQuery();
    return (
        <>
            <SideBarMenu>
                <Head>
                    <title>دانشگاه شهر کرد</title>
                </Head>
                <Posts fetchMoreData={() => { }} hasMore={true} isLoading={isLoading} posts={posts} />
            </SideBarMenu>
        </>
    );
}
