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
            <h1 className="text-2xl hidden lg:block text-center text-gray-600 pt-5 font-ExtraBold">دانشگاه شهر کرد</h1>
            <div className="pt-14 hidden lg:flex flex-col justify-center items-center">
                <RiShieldKeyholeFill size={62} className="text-gray-800" />
                <p className="text-xs pt-2 text-gray-400">توضیه میگردد رمز عبور خود را به طور متناوب تعیر دهید</p>
            </div>
        </div>
    );
};

export default Logo;
