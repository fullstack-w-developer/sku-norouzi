import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { setRecoil } from "recoil-nexus";
import Layout from "../../components/admin/layout/Layout";
import TabPanel from "../../components/admin/TabPnael";
import { addNewUserModalState } from "../../recoil/atom";
import { typeUser } from "../../tying";

interface Props {
    countRequestWaiting: number;
    users: typeUser[];
}
const Professors = ({ countRequestWaiting, users }: Props) => {
    const [url, setUrl] = useState("/requests/professors?");
    const [dataTable, setDataTable] = useState(users);

    const itemsProfessors = [
        {
            name: <span className="font-yekanBold text-xs">لیست اساتید</span>,
            icon: FaUser,
            data: dataTable,
            url: "/requests/professors?",
            key: "all",
        },
    ];

    return (
        <Layout countRequestWaiting={countRequestWaiting}>
            <Head>
                <title>دانشگاه شهر کرد | لیست اساتید </title>
            </Head>
            <div className="pt-10 lg:pt-20 px-5">
                <div className="flex justify-between items-center mb-20">
                    <h1 className="font-ExtraBold text-gray-800">لیست اساتید</h1>
                    <button
                        onClick={() => setRecoil(addNewUserModalState, true)}
                        className="text-xs bg-sku text-white p-2 rounded-lg"
                    >
                        افزودن استاد
                    </button>
                </div>

                <TabPanel
                    role="MASTER"
                    title="افزودن استاد جدید"
                    itemsTab={itemsProfessors}
                    dataTable={dataTable}
                    setDataTable={setDataTable}
                    url={url}
                    setUrl={setUrl}
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
    const res = await fetch(`${process.env.BASEURL}/requests/professors?skip=1`, {
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
export default Professors;
