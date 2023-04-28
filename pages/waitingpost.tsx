import { Table as TableAnt } from "antd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { setRecoil } from "recoil-nexus";
import EditWaitingProject from "../components/user/EditPost";
import SideBarMenu from "../components/user/Layout/SideBarMenu";
import { editWaitingProperties } from "../recoil/atom";
import { optionQuery } from "../utils/data";
import { columnswaitigProject } from "../utils/dataTable";
import { waitMystudentsProject } from "../utils/fetch/requests";

const WaitingPost = ({ posts }: any) => {
    const [skip, setSkip] = useState(1);
    const data = useRecoilValue(editWaitingProperties);
    useEffect(() => {
        setRecoil(editWaitingProperties, {
            ...data,
            posts: posts.posts,
            total: posts.total,
        });
    }, []);
    const onChangePagination = async (count: number) => {
        await setSkip(count);
        refetch();
    };

    const { refetch } = useQuery(["waitingProject", skip], () => waitMystudentsProject(skip), {
        ...optionQuery,
        enabled: false,
        onSuccess: ({ data }) => {
            setRecoil(editWaitingProperties, {
                ...data,
                posts: data.data[0].paginatedResults,
                total: data.data[0]?.totalCount[0]?.Total,
            });
        },
    });

    return (
        <SideBarMenu>
            <Head>
                <title>دانشگاه شهر کرد | پست های نیاز به تائید</title>
            </Head>
            <div className="w-[90%] mx-auto mt-10">
                <TableAnt
                    locale={{
                        emptyText: <p className="py-10 ">لیست خالی است</p>,
                    }}
                    // @ts-ignore
                    columns={columnswaitigProject()}
                    dataSource={data.posts}
                    rowKey="_id"
                    className={`!overflow-auto`}
                    pagination={{
                        pageSize: 8,
                        total: data.total,
                        current: skip,
                        onChange: onChangePagination,
                    }}
                />
            </div>
            {data.open && <EditWaitingProject page={skip} />}
        </SideBarMenu>
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

    const res = await fetch(`${process.env.BASEURL}/masters/waitpost?skip=1`, {
        headers: {
            Authorization: token!,
        },
    });
    const result = await res.json();
    return {
        props: {
            posts: {
                posts: result.data[0].paginatedResults,
                total: result?.data[0]?.totalCount[0]?.Total ?? 0,
            },
        },
    };
};
export default WaitingPost;
