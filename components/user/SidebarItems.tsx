import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Divider, Image } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import PN from "persian-number";
import Link from "next/link";
import { GrProjects } from "react-icons/gr";
import { publicMenu } from "../../utils/data";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atom";
import { routing } from "../../utils/routing";
import { typeUser } from "../../tying";

const SidebarItems = () => {
    const router = useRouter();
    const user = useRecoilValue(userState);
    const [userInfo, setUserInfo] = useState<any>({});
    useEffect(() => {
        setUserInfo(user);
    }, []);

    const logout = () => {
        Cookies.remove("token");
        localStorage.clear();
        router.push(routing.auth.login);
    };

    return (
        <div className="flex flex-col">
            {publicMenu.map((menu, index) => {
                return (
                    <Link key={index} href={menu.route}>
                        <div
                            className={`flex items-center text-[14px] hover:bg-gray-50 py-4 cursor-pointer justify-between px-3 ${
                                router.pathname === menu.route ? "text-sku bg-[#F9F9F9]" : "text-gray-700"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <menu.icon size={18} />
                                <p>{menu.name}</p>
                            </div>
                            <IoIosArrowBack size={20} />
                        </div>
                    </Link>
                );
            })}
            {userInfo.role === "MASTER" && (
                <Link href="/waitingpost">
                    <div
                        className={`flex items-center text-[14px] hover:bg-gray-50 py-4 cursor-pointer justify-between px-3 ${
                            router.pathname === "/waitingpost" ? "text-sku bg-[#F9F9F9]" : "text-gray-700"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <GrProjects size={18} />
                            <p>پست ‌های نیاز به تائید</p>
                        </div>
                        <IoIosArrowBack size={20} />
                    </div>
                </Link>
            )}

            <div
                onClick={() => logout()}
                className={`flex items-center text-[14px] hover:bg-gray-50 py-4 cursor-pointer justify-between px-3`}
            >
                <div className="flex items-center gap-2">
                    <AiOutlineLogout size={20} />
                    <p>خروج</p>
                </div>
                <IoIosArrowBack size={20} />
            </div>
        </div>
    );
};

export default SidebarItems;
