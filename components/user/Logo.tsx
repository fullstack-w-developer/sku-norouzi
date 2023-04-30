import Image from "next/image";
import React from "react";
import { RiShieldKeyholeFill } from "react-icons/ri";
import Sku from "../../public/image/sku.jpg";
const Logo = () => {
    return (
        <div className="flex flex-col items-center justify-around">
            <div className="relative w-[350px] h-[70px] lg:h-[100px]">
                <Image src={Sku} alt="" fill />
            </div>
            <h1 className="text-lg hidden lg:block text-center text-gray-600 pt-5 font-ExtraBold">وبسایت مدیریت پروژه‌های دانشجویان دانشگاه شهرکرد</h1>
            <div className="pt-14 hidden lg:flex flex-col justify-center items-center">
                <p className="text-xs pt-2 text-gray-400">تمامی حقوق این وبسایت متعلق به <span className="text-blue-500">دانشگاه شهرکرد</span>است</p>
            </div>
        </div>
    );
};

export default Logo;
