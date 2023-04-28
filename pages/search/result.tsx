import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import SideBarMenu from "../../components/user/Layout/SideBarMenu";
import Posts from "../../components/user/Posts";
import { typePost } from "../../tying";
interface Props {
    posts: {
        posts: typePost[];
        total: number;
    };
    search: {};
}
const Result = ({ posts, search }: Props) => {
    return (
        <SideBarMenu>
            <Head>
                <title>دانشگاه شهر کرد | جستجو</title>
            </Head>
            <Posts url={``} posts={posts} />
        </SideBarMenu>
    );
};

export default Result;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const query: any = ctx.query.search;
    const search = JSON.parse(query);
    const result = await fetch(
        `${process.env.BASEURL}/post/filter?skip=1&from=${search?.from}&to=${search?.to}&technologies=${search.technologies}&masterId=${search.masterId}`
    ).then((res) => res.json());
    return {
        props: {
            search,
            posts: {
                posts: result.data[0].paginatedResults,
                total: result.data[0]?.totalCount[0]?.Total ?? 0,
            },
        },
    };
};
