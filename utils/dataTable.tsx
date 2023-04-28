import type { ColumnsType } from "antd/es/table";
import { Tag, Image, Avatar } from "antd";
import PN from "persian-number";
import { setRecoil } from "recoil-nexus";
import { editModalAdminState, editWaitingProperties } from "../recoil/atom";
import moment from "jalali-moment";
import { useRecoilValue } from "recoil";
import { typeUser } from "../tying";

export const columns: ColumnsType<typeUser> = [
    {
        key: "full_name",
        title: "نام نام‌خانوادگی",
        dataIndex: "full_name",
        render: (_, data) => (
            <div className="cointainer_first_name">
                <div>
                    <Avatar className="w-full h-full" src={data.profile.url} alt="" />
                </div>
                <p>{data.full_name}</p>
            </div>
        ),
    },
    {
        key: "student_number",
        title: "کد پرسنلی",
        dataIndex: "student_number",
        render: (student_number) => (
            <>
                <p>{student_number}</p>
            </>
        ),
    },
    {
        key: "createdAt",
        title: "تاریخ ثبت نام",
        dataIndex: "createdAt",
        render: (createdAt) => (
            <span className="!whitespace-nowrap">
                {" "}
                {PN.convertEnToPe(moment(createdAt, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD"))}
            </span>
        ),
    },
    {
        title: "تعداد پروژه ها",
        key: "count_project",
        dataIndex: "count_project",
        render: (text) => (
            <Tag color="purple" className="font-ExtraBold !whitespace-nowrap">
                {PN.convertEnToPe(text)}
            </Tag>
        ),
    },
    {
        title: "وضعیت",
        key: "status",
        dataIndex: "status",
        render: (status) => (
            <Tag color={status === "success" ? "success" : "error"} className="font-ExtraBold">
                {status === "success" ? "تائید شده" : "رد شده"}
            </Tag>
        ),
    },
    {
        title: "جزئیات",
        key: "action",
        render: (_, record) => (
            <>
                <button
                    onClick={() =>
                        setRecoil(editModalAdminState, {
                            open: true,
                            data: record,
                            page: "/",
                        })
                    }
                >
                    ویرایش
                </button>
            </>
        ),
    },
];

export const columnsNewUser: ColumnsType<typeUser> = [
    {
        key: "full_name",
        title: "نام نام‌خانوادگی",
        dataIndex: "full_name",
        render: (_, data) => (
            <div className="cointainer_first_name">
                <div>
                    <Avatar className="w-full h-full" src={data.profile.url} alt="" />
                </div>
                <p>{data.full_name}</p>
            </div>
        ),
    },
    {
        key: "student_number",
        title: "شماره دانشجویی",
        dataIndex: "student_number",
        render: (student_number) => (
            <>
                <p>{student_number}</p>
            </>
        ),
    },
    {
        key: "createdAt",
        title: "تاریخ ثبت نام",
        dataIndex: "createdAt",
        render: (createdAt) => (
            <span className="!whitespace-nowrap">
                {PN.convertEnToPe(moment(createdAt, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD"))}
            </span>
        ),
    },
    {
        title: "وضعیت",
        key: "status",
        dataIndex: "status",
        render: (status) => (
            <Tag color={"warning"} className="font-ExtraBold">
                در حال انتظار
            </Tag>
        ),
    },
    {
        title: "جزئیات",
        key: "action",
        render: (_, record) => (
            <>
                <button
                    onClick={() =>
                        setRecoil(editModalAdminState, {
                            open: true,
                            // @ts-ignore
                            data: record,
                            page: "/admin/new",
                        })
                    }
                >
                    ویرایش
                </button>
            </>
        ),
    },
];
export const columnswaitigProject: ColumnsType<
    typeUser
    // @ts-ignore
> = () => {
    const data = useRecoilValue(editWaitingProperties);

    return [
        {
            key: "full_name",
            title: "نام نام‌خانوادگی",
            dataIndex: "full_name",
            render: (_: any, data: any) => (
                <div className="cointainer_first_name">
                    <div>
                        <Image src={data.user.profile.url} alt="" />
                    </div>
                    <p>{data.user.full_name}</p>
                </div>
            ),
        },
        {
            key: "student_number",
            title: "کد پرسنلی",
            dataIndex: "student_number",
            render: (_: any, user: any) => {
                return (
                    <>
                        <p>{user.user.student_number}</p>
                    </>
                );
            },
        },
        {
            key: "title",
            title: "عنوان پروژه",
            dataIndex: "فهفمث",
            render: (_: any, user: any) => {
                return (
                    <>
                        <p>{user.title}</p>
                    </>
                );
            },
        },
        {
            key: "createdAt",
            title: "تاریخ  ایجاد",
            dataIndex: "createdAt",
            render: (createdAt: any) => (
                <p className="!whitespace-nowrap">
                    {PN.convertEnToPe(moment(createdAt, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD"))}
                </p>
            ),
        },
        {
            title: "وضعیت",
            key: "status",
            dataIndex: "status",
            render: (status: any) => (
                <Tag color={"warning"} className="font-ExtraBold">
                    {status === "waiting" ? " در حال انتظار" : status === "editing" ? "ویرایش شده" : ""}
                </Tag>
            ),
        },
        {
            title: "جزئیات",
            key: "action",
            render: (_: any, record: any) => (
                <>
                    <button
                        onClick={() =>
                            setRecoil(editWaitingProperties, {
                                ...data,
                                open: true,
                                // @ts-ignore
                                data: record,
                            })
                        }
                    >
                        دیدن و ویرایش
                    </button>
                </>
            ),
        },
    ];
};
