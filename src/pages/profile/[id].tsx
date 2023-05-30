import { Image } from "antd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import CardPost from "../../components/user/CardPost";
import SideBarMenu from "../../components/user/Layout/SideBarMenu";
import { typePost, typeUser } from "../../tying";
import PN from "persian-number";

interface Props {
    posts: typePost[];
    user: typeUser;
}
const Id = ({ posts, user }: Props) => {
    const router = useRouter();
    return (
        <SideBarMenu user={user}>
            <Head>
                <title>دانشگاه شهر کرد | {user.full_name}</title>
            </Head>
            <div className="w-[90%] mt-10 mx-auto">
                <div className="mt-3 flex justify-between">
                    <>
                        <div className="flex gap-2 items-center lg:hidden p-3">
                            <div className="relative border w-16 h-16 overflow-hidden rounded-full">
                                <Image src={user?.profile?.url} alt="" />
                            </div>
                            <div className="flex flex-col gap-3 text-[12px]">
                                <p className="flex gap-1">{user?.full_name}</p>
                                <p className="flex gap-2">
                                    نام کاربری:
                                    <span className="pt-[3px] block text-gray-500">{PN.convertEnToPe(user?.student_number)}</span>
                                </p>
                            </div>
                        </div>
                    </>
                    <button onClick={() => router.push("/")} className="flex items-center text-xs text-blue-500 gap-1">
                        <span>بازگشت</span>
                        <IoIosArrowBack />
                    </button>
                </div>

                {posts.length === 0 ? (
                    <p className="text-md font-ExtraBold text-gray-600 text-center mt-14">پستی وجود ندارد</p>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-10 mt-10 pb-10">
                        {posts.map((post) => (
                            <CardPost key={post._id} post={post} posts={posts} />
                        ))}
                    </div>
                )}
            </div>
        </SideBarMenu>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const userId = ctx.query.id;
    const result = await fetch(`${process.env.BASEURL}/post/postByUserId?userId=${userId}`).then((response) => response.json());
    return {
        props: {
            user: result.data.user,
            posts: result.data.posts.map((post: any) => {
                return { ...post, user: post.userId };
            }),
        },
    };
};

export default Id;
