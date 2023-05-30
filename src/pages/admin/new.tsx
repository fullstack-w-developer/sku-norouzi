import { useEffect, useState } from "react";
import Layout from "../../components/admin/layout/Layout";
import { Table as TableAnt } from "antd";
import { BiSearch } from "react-icons/bi";
import { GetServerSideProps } from "next";
import { useRecoilValue } from "recoil";
import { addNewUserModalState, editModalAdminState, waitingUsersState } from "../../recoil/atom";
import { setRecoil } from "recoil-nexus";
import { columns, columnsNewUser } from "../../utils/dataTable";
import { optionQuery } from "../../utils/data";
import { useQuery } from "react-query";
import { getWaitingUsers } from "../../utils/fetch/requests";
import Edit from "../../components/admin/Edit";
import Head from "next/head";

const New = ({ users }: any) => {
    const modal = useRecoilValue(editModalAdminState);
    const open = useRecoilValue(addNewUserModalState);
    const [url, setUrl] = useState("/requests/waiting?");
    const [dataTable, setDataTable] = useState(users);
    const [search, setSearch] = useState("");
    const [skip, setSkip] = useState(1);
    useEffect(() => {
        setRecoil(waitingUsersState, users);
    }, []);

    const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await setSearch(e.target.value);
        refetch();
    };

    const { refetch, isLoading, isFetching } = useQuery(
        ["stduentList", url, skip, search],
        () =>
            getWaitingUsers({
                url: `${url}&skip=${skip}&q=${search}`,
            }),
        {
            ...optionQuery,
            enabled: false,
            onSuccess: ({ data }) => {
                setDataTable({
                    users: data.data[0].paginatedResults,
                    total: data.data[0].totalCount[0]?.Total,
                });
            },
        }
    );

    const onChangePagination = async (count: number) => {
        await setSkip(count);
        refetch();
    };
    return (
        <Layout>
            <Head>
                <title>دانشگاه شهر کرد | کاربران جدید</title>
            </Head>
            <div className="pt-10 lg:pt-20 px-5">
                <div className="flex justify-between items-center mb-20">
                    <h1 className="font-ExtraBold text-gray-800">درخواست های جدید</h1>
                </div>
                <div>
                    <div className="flex lg:max-w-[50%] h-10 rounded-lg overflow-hidden border mb-12">
                        <input
                            value={search}
                            onChange={onChangeSearch}
                            className="w-full text-xs px-2 outline-none"
                            placeholder="بر اساس ایمیل، نام، نام‌خانوادگی جستجو کنید"
                        />
                        <div className="bg-blue-500 px-3 text-white flex justify-center items-center">
                            <BiSearch size={24} />
                        </div>
                    </div>
                    <TableAnt
                        loading={isLoading || isFetching}
                        locale={{
                            emptyText: <p className="py-10 ">لیست خالی است</p>,
                        }}
                        columns={columnsNewUser}
                        // @ts-ignore
                        dataSource={dataTable.users}
                        pagination={{
                            pageSize: 8,
                            total: dataTable.total,
                            current: skip,
                            onChange: onChangePagination,
                        }}
                        className={`${modal.open || open ? "!max-w-[0px]" : "!w-full"} !overflow-auto`}
                    />
                    {modal.open && <Edit refetch={refetch} />}
                </div>
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
    const res = await fetch(`${process.env.BASEURL}/requests/waiting?skip=1`, {
        headers: {
            Authorization: token!,
        },
    });
    const result = await res.json();
    return {
        props: {
            users: {
                users: result.data[0].paginatedResults,
                total: result.data[0]?.totalCount,
            },
        },
    };
};

export default New;
