import { Table as TableAnt } from "antd";
import Head from "next/head";
import { useState } from "react";
import EditWaitingProject from "../components/user/EditPost";
import SideBarMenu from "../components/user/Layout/SideBarMenu";
import { columnswaitigProject } from "../utils/dataTable";
import useWaitingPostMasterQuery from "../hooks/query/post/useWaitingPostMasterQuery";
import usePostStore from "../stores/post-store";

const WaitingPost = () => {
    const [skip, setSkip] = useState(1);
    const {isLoading, isFetching} = useWaitingPostMasterQuery({page:skip})
    const {posts,editPost_mater} = usePostStore()
    const onChangePagination = async (count: number) => {
         setSkip(count);
    };

 
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
                    loading={isLoading || isFetching}
                    dataSource={posts.posts}
                    rowKey="_id"
                    className={`!overflow-auto`}
                    pagination={{
                        pageSize: 8,
                        total:posts.total,
                        current: skip,
                        onChange: onChangePagination,
                    }}
                />
            </div>
            {editPost_mater.open && <EditWaitingProject  />}
        </SideBarMenu>
    );
};


export default WaitingPost;
