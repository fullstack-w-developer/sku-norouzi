import { Image } from "antd";
import Link from "next/link";
import React from "react";

interface Props {
    image: string;
    userId: string;
    full_name: string;
    role: "USER" | "MASTER" | string;
}
const ProfileInfo = ({ full_name, role, image, userId }: Props) => {
    return (
        <div className="flex items-center gap-2 ">
            <Image loading="eager" src={image} alt="" className="rounded-full !w-11 !h-11 lg:!w-10 lg:!h-10" />
            <Link href={`/profile/${userId}`} className="text-xs flex flex-col gap-2 font-yekanBold">
                <p className="text-[13px] text-gray-700">{full_name}</p>
                <p className="text-gray-600">{role === "USER" ? "دانشجو" : "استاد"}</p>
            </Link>
        </div>
    );
};

export default ProfileInfo;
