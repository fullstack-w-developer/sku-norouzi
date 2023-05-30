import React, { useEffect, useState } from "react";
import { Avatar, Divider, Image } from "antd";
import { menuItemsAdmin } from "../../../utils/data";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atom";

interface Props {
    countRequestWaiting?: number;
}
const SidebarMenu = ({ countRequestWaiting }: Props) => {
    const userInfo = useRecoilValue(userState);
    const [user, setUser] = useState({
        profile: { url: "" },
    });
    const { pathname, push } = useRouter();

    useEffect(() => {
        setUser(userInfo);
    }, []);

    const logout = () => {
        deleteCookie("token");
        localStorage.clear();
        push("/auth/signin");
    };
    return (
        <div className="lg:min-w-[300px] lg:block pt-5 lg:border-l min-h-full">
            <div className="flex justify-center">
                <Avatar size={100} src={user?.profile?.url} />
            </div>
            <Divider />
            <div className="space-y-1">
                {menuItemsAdmin.map((menu, inx) => {
                    if (menu.route === "/admin/new") menu.count = countRequestWaiting!;
                    return (
                        <Link
                            href={menu.route}
                            className={`text-[12px] relative text-[#2c3e50] flex justify-between items-center  py-4 px-3 group hover:bg-gray-50 cursor-pointer ${
                                pathname === menu.route && "bg-gray-100/70"
                            }`}
                            key={menu.id}
                        >
                            <p className="flex gap-3 items-center ">
                                <menu.icon className={pathname === menu.route ? "text-[#096EA4]" : "text-gray-400"} size={24} />

                                <span className="font-yekanBold">{menu.name}</span>
                            </p>
                            {menu.count !== 0 && menu.count !== undefined && (
                                <span className="w-4 h-4 absolute top-2 text-[9px]  left-3 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                                    {menu.count}
                                </span>
                            )}
                            <IoIosArrowBack size={22} />
                        </Link>
                    );
                })}
                <div
                    onClick={() => logout()}
                    className={`text-[12px] text-[#2c3e50] flex justify-between items-center  py-4 px-3 group hover:bg-gray-50 cursor-pointer`}
                >
                    <p className="flex gap-3 items-center">
                        <AiOutlineLogout className="text-gray-400" size={24} />
                        <span className="font-yekanBold">خروج از حساب</span>
                    </p>
                    <IoIosArrowBack size={22} />
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;
