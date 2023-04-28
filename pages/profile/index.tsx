import { Tabs } from "antd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { AiOutlineQuestion } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineClose, MdOutlineError } from "react-icons/md";
import { TbUserExclamation } from "react-icons/tb";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import EditImageUser from "../../components/user/EditImageUser";
import SideBarMenu from "../../components/user/Layout/SideBarMenu";
import PostsProfile from "../../components/user/PostsProfile";
import { userState } from "../../recoil/atom";
import { optionQuery } from "../../utils/data";
import { getPostUserProfile } from "../../utils/fetch/requests";

const Profile = ({ posts }: any) => {
    const [open, setOpen] = useState(false);
    const [dataProject, setDataProject] = useState(posts);
    const [page, setPage] = useState(2);
    const [status, setStatus] = useState("");
    const [select, setSelect] = useState(0);
    const userInfo = useRecoilValue(userState);
    const itemsTab = [
        {
            name: "همه",
            icon: FaUser,
            status: "",
            role: "",
        },
        {
            name: "پست‌های تائید شده",
            icon: GiCheckMark,
            status: "success",
            role: "",
        },
        {
            name: "پست‌های در حال انتظار ",
            icon: AiOutlineQuestion,
            status: "waiting",
            role: "",
        },
        {
            name: "پست‌های دانشجوی‌های من",
            icon: AiOutlineQuestion,
            status: "myStudent",
            role: "MASTER",
        },
        {
            name: "پست‌های رد شده",
            icon: AiOutlineQuestion,
            status: "faild",
            role: "USER",
        },
    ];

    const refetchAgain = async (status: string, index: number) => {
        if (select === index) return;
        setPage(2);
        setSelect(index);
        setDataProject({ posts: [], total: 0 });
        await setStatus(status);
        refetch();
    };

    const { refetch, isLoading, isFetching } = useQuery(
        ["postsProfile_", status],
        () =>
            getPostUserProfile({
                url: `/myproject?skip=1&status=${status}`,
            }),
        {
            ...optionQuery,
            enabled: false,
            onSuccess: async ({ data }) => {
                setDataProject({
                    posts: data?.data[0]?.paginatedResults,
                    total: data?.data[0]?.totalCount[0]?.Total,
                });
            },
        }
    );

    return (
        <SideBarMenu>
            <Head>
                <title>دانشگاه شهر کرد | پروفایل کاربری</title>
            </Head>
            <div className="my-10 px-5 lg:m-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 ">
                        <div className="w-4 h-4 bg-sku rounded-full"></div>
                        <p className="font-ExtraBold">پروفایل کاربری</p>
                    </div>

                    <button onClick={() => setOpen(!open)} className="bg-sku text-white text-xs px-3 py-2 rounded-lg">
                        تغیر عکس پروفایل
                    </button>
                </div>
                <div className="mt-20 !z-[99999]">
                    <div className="flex items-center gap-4 border-b ">
                        {itemsTab.map((item, index: number) => {
                            if (index === 4 && userInfo.role !== "USER") return;
                            if (index === 3 && userInfo.role === "USER") return true;
                            return (
                                <button
                                    onClick={() => refetchAgain(item.status, index)}
                                    className={`flex items-center cursor-pointer text-xs gap-1 pb-2 ${
                                        select === index ? "text-blue-500 border-b border-blue-500 " : "text-gray-500"
                                    }`}
                                    key={index}
                                >
                                    <item.icon size={14} />
                                    <p>{item.name}</p>
                                </button>
                            );
                        })}
                    </div>
                    <PostsProfile
                        page={page}
                        setPage={setPage}
                        status={status}
                        setDataProject={setDataProject}
                        posts={dataProject}
                        loadPosts={isLoading || isFetching}
                    />
                </div>
            </div>
            <EditImageUser open={open} setOpen={setOpen} />
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
    const result = await fetch(`${process.env.BASEURL}/myproject?skip=1`, {
        headers: {
            Authorization: token!,
        },
    }).then((response) => response.json());

    return {
        props: {
            posts: {
                posts: result.data[0].paginatedResults,
                total: result.data[0]?.totalCount[0]?.Total ?? 0,
            },
        },
    };
};

export default Profile;
