import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import sku from "../../../public/image/sku.jpg";
import Search from "../Search";
import Cookies from "js-cookie";
import { BiSearch } from "react-icons/bi";
import { IoIosMenu } from "react-icons/io";
import { setRecoil } from "recoil-nexus";
import { useRecoilValue } from "recoil";
import { modalSidebarMobileState, userState } from "../../../recoil/atom";
import { useRouter } from "next/router";
const Header = () => {
    const router = useRouter();
    const userInfo = useRecoilValue(userState);
    const [isToken, setIsToken] = useState("");
    useEffect(() => {
        const token = Cookies.get("token");
        setIsToken(token!);
        if (userInfo.role === "ADMIN") {
            router.push("/admin");
        }
    }, []);
    const openSideBarMobile = useRecoilValue(modalSidebarMobileState);
    return (
        <div className="w-full flex items-center bg-white z-50 justify-between sticky top-0 px-4 lg:px-10 h-[70px] lg:h-[90px] shadow-sm">
            <div className="flex gap-3 items-center lg:flex-[2]">
                <IoIosMenu
                    onClick={() => setRecoil(modalSidebarMobileState, !openSideBarMobile)}
                    size={29}
                    className="lg:hidden cursor-pointer"
                />
                <div className="w-32 h-10 lg:!w-44 lg:!h-14 relative ml-10">
                    <Image fill src={sku} alt="" />
                </div>
                <div className="hidden lg:block w-full">
                    <Search />
                </div>
            </div>
            <div className="flex-1 flex gap-2 items-center justify-end">
                <Link
                    href="/search"
                    className="w-9 h-9 text-white bg-sku rounded-full lg:hidden flex justify-center items-center"
                >
                    <BiSearch size={20} />
                </Link>
                {!isToken && (
                    <Link
                        href="/auth/signin"
                        className="text-xs bg-sku  gap-1 w-9 h-9 flex justify-center items-center lg:w-fit lg:px-3 lg:py-2 rounded-full lg:rounded-lg text-white"
                    >
                        <FaUser size={17} />
                        <span className="hidden lg:block">ثبت‌نام/ ورود</span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
