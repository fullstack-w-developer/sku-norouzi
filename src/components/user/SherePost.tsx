import { Image, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atom";
import { typePost, typeUser } from "../../tying";
import fetchClient from "../../utils/fetchClient";

interface Props {
    showSheare: boolean;
    setShowSheare: React.Dispatch<React.SetStateAction<boolean>>;
    post: typePost;
}
const SherePost = ({ showSheare, setShowSheare, post }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [users, setUsers] = useState([]);
    const [sharePosts, setsharePosts] = useState<any>([]);
    const [select, setSelect] = useState<any>([]);
    const [search, setSearch] = useState("");
    const userInfo = useRecoilValue(userState);
    const getAllUser = async () => await fetchClient.get(`/user/all?q=${search}`);
    const shareUsers = async () => {
        const users = select.map((user: typeUser) => user._id);
        return await fetchClient.post("/share/add", {
            reciveUsers: JSON.stringify(users),
            postId: post._id,
        });
    };

    const fetchUser = useQuery(["all_users", search], () => getAllUser(), {
        onSuccess: ({ data }) => {
            setUsers(data.data.users);
            setsharePosts(data.data.sharePosts);
        },
        refetchOnWindowFocus: false,
    });

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
    const mutate = useMutation(() => shareUsers(), {
        onSuccess: async () => {
            setShowSheare(!shareUsers);
        },
        onError: () => {
            messageApi.open({
                type: "error",
                duration: 5,
                content: "مشکلی در ارسال وجود دارد، لطفا بعدا تلاش کنید ",
                className: "font-yekanBold !text-xs !py-4",
            });
        },
    });

    return (
        <>
            <Modal
                centered
                footer={false}
                open={showSheare}
                onCancel={() => setShowSheare(false)}
                closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
            >
                {fetchUser.isLoading || fetchUser.isFetching ? (
                    <div className="flex justify-center  mt-10">
                        <Spin />
                    </div>
                ) : fetchUser.isError ? (
                    <p className="text-center text-gray-700  font-yekanBold mt-10">
                        مشکلی در گرفتن کاربران پیش آمده است، لطفا بعدا تلاش کنید
                    </p>
                ) : (
                    ""
                )}
                <div>
                    <p className="text-center font-yekanBold text-gray-700 text-xl">لیست کاربران</p>
                    {select.length !== 0 && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => mutate.mutate()}
                                className=" bg-[#0096f5] px-4 py-2 rounded-xl text-xs text-white font-yekanBold"
                            >
                                {mutate.isLoading ? (
                                    <Spin className="sharePost" size="small" />
                                ) : (
                                    `ارسال به ${select.length} کاربر`
                                )}
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
                        {users
                            .filter((user: any) => user._id !== userInfo._id && user._id !== post.user._id)
                            .map((user: any, index: number) => (
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
                                        // disabled={sharePosts[0]?.reciveUsers.includes(user._id) ? true : false}
                                        onClick={() => clickSelect(user)}
                                        className=" bg-[#0096f5]  px-2 py-2 rounded-xl text-[10px] text-white font-yekanBold"
                                    >
                                        {select.includes(user) ? (
                                            <div className="flex  items-center">
                                                <BsCheck size={20} />
                                                <p>انتخاب شد</p>
                                            </div>
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
