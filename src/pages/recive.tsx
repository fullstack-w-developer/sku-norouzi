import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import SideBarMenu from "../components/user/Layout/SideBarMenu";
import Posts from "../components/user/Posts";
import { typePost } from "../tying";
interface Props {
    posts: {
        posts: typePost[];
        total: number;
    };
}
const Recive = ({ posts }: Props) => {
    return (
        <SideBarMenu>
            <Head>
                <title>دانشگاه شهر کرد | پست های دریافتی</title>
            </Head>
            {posts.total === 0 ? (
                <p className="text-center pt-14 font-yekanBold">پست دریافتی ندارید</p>
            ) : (
                <Posts url="/share?" posts={posts} />
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
    const result = await fetch(`${process.env.BASEURL}/share?skip=1`, {
        headers: {
            Authorization: token!,
        },
    }).then((res) => res.json());
    return {
        props: {
            posts: {
                posts: result.data[0].paginatedResults,
                total: result.data[0]?.totalCount[0]?.Total ?? 0,
            },
        },
    };
};

export default Recive;
