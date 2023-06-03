import { Image, Modal, Spin } from "antd";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { Post } from "../../types/Post";
import useGlobalStroe from "../../stores/global-store";
import useGetAllUserQuery from "../../hooks/data/useGetAllUserQuery";
import useSharepostActionMuation from "../../hooks/mutation/actions/useSharepostActionMuation";
import useGetAllShearePostQuery from "../../hooks/query/post/useGetAllShearePostQuery";

interface Props {
    post: Post;
}
const SherePost = ({ post }: Props) => {
    const { shareModal, toggleShare } = useGlobalStroe();
    const [select, setSelect] = useState<any>([]);
    const [search, setSearch] = useState("");
    const { data, isLoading } = useGetAllUserQuery(search);
    const { mutate: shareAction, isLoading: loadingshare } = useSharepostActionMuation();
    const { data: sheare, isLoading: loadigSheare } = useGetAllShearePostQuery({ postId: post._id });

    const onChange = (_: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(_.target.value);
    };

    const clickSelect = (user: {}) => {
        if (select.includes(user)) {
            const arr = select.filter((item: any) => item !== user);
            setSelect(arr);
        } else {
            setSelect([...select, user]);
        }
    };

    const sharePosts: any = sheare?.data.map((sh) => sh.reciveUsers);

    return (
        <>
            <Modal
                centered
                footer={false}
                open={shareModal}
                onCancel={toggleShare}
                closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
            >
                <div className="max-h-[500px] overflow-auto">
                    <p className="text-center font-yekanBold text-gray-700 text-xl">
                        لیست کاربران {isLoading || loadigSheare ? <Spin size="small" /> : null}
                    </p>
                    {select.length !== 0 && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => shareAction({ postId: post._id, reciveUsers: select })}
                                className=" bg-[#0096f5] px-4 py-2  rounded-xl text-xs text-white font-yekanBold"
                            >
                                {loadingshare ? "در حال ارسال..." : `ارسال به ${select.length} کاربر`}
                            </button>
                        </div>
                    )}
                    <div className="flex border my-5 mt-10 items-center py-3 px-2 lg:p-2 rounded-xl">
                        <input
                            value={search}
                            onChange={onChange}
                            className="w-full font-yekanBold text-xs outline-none"
                            placeholder="جستجوی کاربر"
                        />
                        <BiSearch size={20} />
                    </div>
                    <div className="flex flex-col gap-4">
                        {!loadigSheare &&
                            data?.data.users.map((user: any, index: number) => (
                                <div key={user._id} className="border-b pb-2 flex justify-between items-center">
                                    <div className="flex items-center gap-1 ">
                                        <Image
                                            src={user.profile.url}
                                            alt=""
                                            className=" rounded-full !w-11 !h-11 lg:!w-10 lg:!h-10"
                                        />
                                        <div className="text-xs space-y-2">
                                            <p className="font-ExtraBold">{user.full_name}</p>
                                            <p className="font-yekanBold">{user.role === "USER" ? "دانشجو" : "استاد"}</p>
                                        </div>
                                    </div>
                                    <button
                                        disabled={sharePosts?.includes(user._id) ? true : false}
                                        onClick={() => clickSelect(user)}
                                        className={`  px-2 py-2 rounded-xl text-[10px] text-white font-yekanBold ${
                                            sharePosts?.includes(user._id) ? "bg-gray-300" : "bg-[#0096f5]"
                                        }`}
                                    >
                                        {select.includes(user) ? (
                                            <div className="flex  items-center">
                                                <BsCheck size={20} />
                                                <p>انتخاب شد</p>
                                            </div>
                                        ) : sharePosts?.includes(user._id) ? (
                                            "فرستاده شده"
                                        ) : (
                                            "انتخاب"
                                        )}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SherePost;
