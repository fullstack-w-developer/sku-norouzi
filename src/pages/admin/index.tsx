import { useState } from "react";
import Layout from "../../components/admin/layout/Layout";
import TabPanel from "../../components/admin/TabPnael";
import { GetServerSideProps } from "next";
import { typeUser } from "../../tying";
import { FaUser } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { useRecoilState } from "recoil";
import { addNewUserModalState } from "../../recoil/atom";
import Head from "next/head";

interface Props {
    countRequestWaiting: number;
    users: typeUser[];
}
const Admin = ({ countRequestWaiting, users }: Props) => {
    const [url, setUrl] = useState("/requests?");
    const [usersTable, setUsersTable] = useState<any>(users);
    const [open, setOpen] = useRecoilState(addNewUserModalState);
    const itemsProfessors = [
        {
            name: <span className="font-yekanBold text-xs">همه</span>,
            icon: FaUser,
            data: usersTable,
            url: "/requests?",
            key: "all",
        },
        {
            name: <span className="font-yekanBold text-xs">تائید شده</span>,
            icon: GiCheckMark,
            data: usersTable,
            url: "/requests?status=success",
            key: "success",
        },
        {
            name: <span className="font-yekanBold text-xs m-0">رد شده</span>,
            icon: MdOutlineClose,
            data: usersTable,
            url: "/requests?status=failed",
            key: "faild",
        },
    ];
    return (
        <Layout countRequestWaiting={countRequestWaiting}>
            <Head>
                <title>دانشگاه شهر کرد | لیست دانشجویان</title>
            </Head>
            <div className="pt-10 lg:pt-20 w-[95%] mx-auto lg:px-5">
                <div className="flex justify-between items-center mb-20">
                    <h1 className="font-ExtraBold text-gray-800">لیست دانشجویان</h1>
                    <button onClick={() => setOpen(!open)} className="text-xs bg-sku text-white p-2 rounded-lg">
                        افزودن دانشجو
                    </button>
                </div>

                <TabPanel
                    key="_id"
                    itemsTab={itemsProfessors}
                    dataTable={usersTable}
                    setDataTable={setUsersTable}
                    url={url}
                    setUrl={setUrl}
                    role="USER"
                    title="افزودن دانشجوی جدید"
                />
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = ctx.req.cookies["token"];
    if (!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const res = await fetch(`${process.env.BASEURL}/requests?skip=1`, {
        headers: {
            Authorization: token!,
        },
    });
    const countWaitingUsers = await fetch(`${process.env.BASEURL}/requests/countwaiting`, {
        headers: {
            Authorization: token!,
        },
    });

    const count = await countWaitingUsers.json();
    const result = await res.json();

    return {
        props: {
            users: {
                users: result?.data ? result?.data[0]?.paginatedResults : [],
                total: result?.data ? result?.data[0]?.totalCount : 0,
            },
            countRequestWaiting: count?.data?.count ?? 0,
        },
    };
};
export default Admin;
