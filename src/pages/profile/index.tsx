import Head from "next/head";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import EditImageUser from "../../components/user/EditImageUser";
import SideBarMenu from "../../components/user/Layout/SideBarMenu";
import { userState } from "../../recoil/atom";
import Posts from "../../components/user/Posts";
import { itemsTab } from "../../helpers/utils/data";
import usePostStore from "../../stores/post-store";
import useGetMyProject from "../../hooks/query/myproject/useGetMyProject";

const Profile = () => {
    const { posts } = usePostStore()
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [select, setSelect] = useState(1);
    const userInfo = useRecoilValue(userState);
    const { isLoading, isFetching } = useGetMyProject({ page, status })

    const selectTab = (item: any) => {
        if (select === item.id) return false
        setStatus(item.status)
        setSelect(item.id)
    }
    return (
        <SideBarMenu>
            <Head>
                <title>دانشگاه شهر کرد | پروفایل کاربری</title>
            </Head>
            <div className="my-10 ">
                <div className="flex justify-between items-center w-[90%] mx-auto">
                    <div className="flex items-center gap-2 ">
                        <div className="w-4 h-4 bg-sku rounded-full"></div>
                        <p className="font-ExtraBold">پروفایل کاربری</p>
                    </div>

                    <button onClick={() => setOpen(!open)} className="bg-sku text-white text-xs px-3 py-2 rounded-lg">
                        تغیر عکس پروفایل
                    </button>
                </div>
                <div className="mt-20 !z-[99999]">
                    <div className="flex items-center gap-4 border-b w-[90%] mx-auto">
                        {itemsTab.map((item, index: number) => {
                            if (index === 4 && userInfo.role !== "USER") return;
                            if (index === 3 && userInfo.role === "USER") return true;
                            return (
                                <button
                                    onClick={() => selectTab(item)}
                                    className={`flex items-center cursor-pointer text-xs gap-1 pb-2 ${select === item.id ? "text-blue-500 border-b border-blue-500 " : "text-gray-500"
                                        }`}
                                    key={index}
                                >
                                    <item.icon size={14} />
                                    <p>{item.name}</p>
                                </button>
                            );
                        })}
                    </div>
                    <Posts fetchMoreData={() => { }} hasMore={true} isLoading={isLoading || isFetching} posts={posts} />
                </div>
            </div>
            {open && <EditImageUser open={open} setOpen={setOpen} />}
        </SideBarMenu>
    );
};



export default Profile;
