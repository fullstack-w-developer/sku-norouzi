import { AiOutlineQuestion } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
export const itemsTab = [
    {
        name: "همه",
        icon: FaUser,
        status: "",
        role: "",
        id:1,
    },
    {
        name: "پست‌های تائید شده",
        icon: GiCheckMark,
        status: "success",
        role: "",
        id:2,
    },
    {
        name: "پست‌های در حال انتظار ",
        icon: AiOutlineQuestion,
        status: "waiting",
        role: "",
        id:3,
    },
    {
        name: "پست‌های دانشجوی‌های من",
        icon: AiOutlineQuestion,
        status: "myStudent",
        role: "MASTER",
        id:4,
    },
    {
        name: "پست‌های رد شده",
        icon: AiOutlineQuestion,
        status: "faild",
        role: "USER",
        id:5,
    },
];