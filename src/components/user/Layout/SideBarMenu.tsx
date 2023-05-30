import { useState, useEffect } from "react";
import { Divider, Image } from "antd";
import { publicMenu } from "../../../utils/data";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import { modalSidebarMobileState, userState } from "../../../recoil/atom";
import Header from "./Header";
import PN from "persian-number";
import Link from "next/link";
import { MdPostAdd } from "react-icons/md";
import { typePost } from "../../../tying";
import DreawrMenuMobile from "../DreawrMenuMobile";
import { routing } from "../../../utils/routing";
import SidebarItems from "../SidebarItems";
import NotfiSignup from "../NotfiSignup";

interface Props {
    children: React.ReactNode;
    user?: typePost | any;
}
const SideBarMenu = ({ user: userProfile, children }: Props) => {
    const [isToken, setIsToken] = useState("");
    const openSideBarMobile = useRecoilValue(modalSidebarMobileState);
    const user = useRecoilValue(userState);
    const [userInfo, setUserInfo] = useState<any>({});
    useEffect(() => {
        setUserInfo(user);
    }, []);
    useEffect(() => {
        const token = Cookies.get("token");
        setIsToken(token!);
    }, []);
    return (
        <>
            <Header />
            <div className="flex ">
                {isToken && (
                    <div className="w-[300px] hidden lg:block h-screen sticky top-0 border-l bg-white">
                        <div className="flex gap-2 items-center mt-3 p-3">
                            <div className="relative border w-16 h-16 overflow-hidden rounded-full">
                                <Image
                                    loading="eager"
                                    src={userProfile ? userProfile?.profile?.url : `${userInfo?.profile?.url}`}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-[12px]">
                                <p className="flex gap-1">{userProfile ? userProfile?.full_name : userInfo?.full_name}</p>
                                <p className="flex gap-2">
                                    نام کاربری:
                                    <span className="pt-[3px] block text-gray-500">
                                        {PN.convertEnToPe(userProfile ? userProfile?.student_number : userInfo?.student_number)}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <Divider className="mt-2" />
                        <SidebarItems />
                    </div>
                )}
                <div className="flex-1 w-full">{children}</div>
            </div>
            {openSideBarMobile && <DreawrMenuMobile />}
            <NotfiSignup />
        </>
    );
};

export default SideBarMenu;
