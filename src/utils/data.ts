import { FaUserGraduate, FaToolbox, FaUser } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { HiUsers } from "react-icons/hi";
export const menuItemsAdmin = [
    {
        id: 1,
        name: "لیست دانشجویان",
        icon: FaUserGraduate,
        route: "/admin",
        count: 0,
    },
    {
        id: 2,
        name: "لیست استاد ها",
        icon: GiTeacher,
        route: "/admin/professors",
        count: 0,
    },
    {
        id: 3,
        name: "درخواست‌های جدید",
        icon: FaToolbox,
        route: "/admin/new",
        count: 0,
    },
    {
        id: 4,
        name: "تعریف فناوری",
        icon: FaToolbox,
        route: "/admin/technology",
        count: 0,
    },
];

export const publicMenu = [
    {
        id: 1,
        icon: AiFillHome,
        name: "خانه",
        route: "/",
    },
    {
        id: 2,
        icon: FaUser,
        name: "پروفایل کاربری",
        route: "/profile",
    },
    {
        id: 3,
        icon: TiPlus,
        name: "پست جدید",
        route: "/newpost",
    },
    {
        id: 4,
        icon: BsFillBookmarkFill,
        name: "پست‌ های ذخیره",
        route: "/savepost",
    },
    {
        id: 4,
        icon: HiUsers,
        name: "پست‌ های دریافتی",
        route: "/recive",
    },
];

export const statusUsers = [
    {
        value: "waiting",
        label: "در حال انتظار",
    },
    {
        value: "success",
        label: "تائید کردن",
    },
    {
        value: "failed",
        label: "رد کردن",
    },
];

export const roleUsers = [
    {
        value: "USER",
        label: "دانشجو",
    },
    {
        value: "MASTER",
        label: "استاد",
    },
    {
        value: "ADMIN",
        label: "آدمین",
    },
];

export const optionQuery = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
};
