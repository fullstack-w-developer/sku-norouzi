import SideBarMenu from "../components/user/Layout/SideBarMenu";
import Posts from "../components/user/Posts";
import { GetServerSideProps } from "next";
import { typePost } from "../tying";
import Head from "next/head";
import { routing } from "../utils/routing";
import { notification } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface Props {
    posts: {
        posts: typePost[];
        total: number;
    };
}
export default function Home({ posts }: Props) {
    return (
        <>
            <SideBarMenu>
                <Head>
                    <title>دانشگاه شهر کرد</title>
                </Head>
                <div className="w-[98%] mx-auto ">
                    <Posts url="/post?" posts={posts} />
                </div>
            </SideBarMenu>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const result = await fetch(`${process.env.BASEURL}${routing.user.getAllProject}`)
        .then((response) => response.json())
        .catch((err) => console.log(err));
        console.log(result)
    return {
        props: {
            posts: {
                posts: result?.data[0]?.paginatedResults,
                total: result?.data[0]?.totalCount[0]?.Total ?? 0,
            },
        },
    };
};
