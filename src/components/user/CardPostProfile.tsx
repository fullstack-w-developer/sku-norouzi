import { Dropdown, message, Tag, Image } from "antd";
import React, { useState, useEffect } from "react";
import { AiOutlineDownload, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsHeartFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import ShowComment from "./ShowComment";
import FileSaver from "file-saver";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atom";
import { Router, useRouter } from "next/router";
import fetchClient from "../../utils/fetchClient";
import { RiEdit2Fill } from "react-icons/ri";
import EditPostUser from "./EditPostUser";
import Poster from "../../public/image/videoposter.png";
import ProfileInfo from "./ProfileInfo";
import { Post } from "../../types/Post";

interface Props {
    post: Post;
    posts: [any];
    status?: string;
    page?: number;
    setDataProject?: any;
}

const CardPostProfile = ({ post, page, status, setDataProject }: Props) => {
    const [selectPost, setSelectPost] = useState<Post | any>({});
    const router = useRouter();

    const [openEditPost, setOpenEditPost] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [comments, setComments] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState<null | number>(null);
    const [isToken, setIsToken] = useState<string | number>("");

    const userInfo = useRecoilValue(userState);

    const items = [
        {
            key: "1",
            label: (
                <div className="flex items-center gap-1 text-gray-800">
                    <AiOutlineDownload size={18} />
                    <p className="font-yekanBold text-xs ">دانلود پست</p>
                </div>
            ),
        },
        {
            key: "2",
            label: (
                <div className={` items-center gap-1 text-gray-800 ${router.pathname === "/savepost" ? "hidden" : "flex"}`}>
                    <RiEdit2Fill />
                    <p className="font-yekanBold text-xs ">ویرایش پست</p>
                </div>
            ),
        },
    ];
    const onClick = ({ key }: any, post: Post) => {
        if (!isToken) return router.push("/auth/signin");

        if (Number(key) === 1) {
            FileSaver.saveAs(post.zip.url, post.zip.url.split("uploads/")[1]);
        }
        if (Number(key) === 2) {
            setSelectPost(post);
            setOpenEditPost(!openEditPost);
        }
    };

    const likePost = async (postId: string) => {
        if (post.status === "waiting") return;
        if (!isToken) return router.push("/auth/signin");
        try {
            setIsLike(true);
            const { data } = await fetchClient.put("/post/likepost", { postId });
            if (data.status) {
                setLikeCount(data.data.liked.length);
            }
        } catch (error: any) {
            messageApi.open({
                type: "error",
                duration: 5,
                content: error?.response?.data?.message!,
                className: "font-yekanBold !text-xs !py-4",
            });
            setIsLike(false);
        }
    };
    const deleteLikePost = async (postId: string) => {
        if (!isToken) return router.push("/auth/signin");
        try {
            setIsLike(false);
            const { data } = await fetchClient.put("/post/deletelike", { postId });
            if (data.status) {
                setLikeCount(data.data.liked.length);
            }
        } catch (error: any) {
            messageApi.open({
                type: "error",
                duration: 5,
                content: error?.response?.data?.message!,
                className: "font-yekanBold !text-xs !py-4",
            });
            setIsLike(true);
        }
    };
    const addBookmark = async (postId: string) => {
        if (post.status === "waiting") return;
        if (!isToken) return router.push("/auth/signin");
        try {
            setIsBookmark(true);
            const { data } = await fetchClient.put("/post/addsave", { postId });
        } catch (error: any) {
            messageApi.open({
                type: "error",
                duration: 5,
                content: error?.response?.data?.message!,
                className: "font-yekanBold !text-xs !py-4",
            });
            setIsBookmark(false);
        }
    };
    const deleteBookmark = async (postId: string) => {
        try {
            setIsBookmark(false);
            const { data } = await fetchClient.put("/post/deletesavepost", { postId });
        } catch (error: any) {
            messageApi.open({
                type: "error",
                duration: 5,
                content: error?.response?.data?.message!,
                className: "font-yekanBold !text-xs !py-4",
            });
            setIsBookmark(true);
        }
    };

    useEffect(() => {
        const isBookmark = post.saves.find((save: string) => save === userInfo._id);
        const isLike = post.liked.find((like: string) => like === userInfo._id);

        if (isBookmark) {
            setIsBookmark(true);
        }
        if (isLike) {
            setIsLike(true);
        }
    }, []);

    useEffect(() => {
        setComments(post.comments);
        setLikeCount(post.liked.length);
    }, []);

    return (
        <>
            {contextHolder}
            {/* <div className="!bg-white p-1 h-fit shadow-md border w-full overflow-hidden border-gray-100 rounded-lg">
                <div className="flex justify-between items-center">
                    <ProfileInfo
                        image={post.user.profile.url}
                        full_name={post.user.full_name}
                        role={post.user.role}
                        userId={post.userId}
                    />
                    <div className="flex items-center gap-2">
                        {router.pathname === "/profile" && (
                            <Tag
                                className="font-yekanBold"
                                color={
                                    post.status === "waiting" || post.status === "editing"
                                        ? "gold"
                                        : post.status === "success"
                                        ? "green"
                                        : "red"
                                }
                            >
                                {post.status === "waiting" || post.status === "editing"
                                    ? "در حال انتظار"
                                    : post.status === "success"
                                    ? "تائید شده"
                                    : "رد شده"}
                            </Tag>
                        )}
                        {post.status !== "waiting" && post.status !== "editing" ? (
                            isBookmark ? (
                                <BsBookmarkFill
                                    className="cursor-pointer text-gray-800"
                                    onClick={() => deleteBookmark(post._id)}
                                    size={18}
                                />
                            ) : (
                                <BsBookmark className="cursor-pointer" onClick={() => addBookmark(post._id)} size={17} />
                            )
                        ) : null}

                        <Dropdown
                            menu={{
                                items,
                                onClick: (key) => onClick(key, post),
                            }}
                            placement="bottomLeft"
                            trigger={["click"]}
                            arrow
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <MdMoreVert className="cursor-pointer" size={20} />
                            </a>
                        </Dropdown>
                    </div>
                </div>

                <div className="w-full relative h-[250px] mt-2 bg-black/25 overflow-hidden">
                    {post.file.type === "video" ? (
                        <video controls disablePictureInPicture controlsList="nodownload" poster={Poster.src}>
                            <source src={post.file.url} type="video/mp4" />
                            <source src={post.file.url} type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <Image loading="eager" width="100%" height="100%" alt="" className="object-contain" src={post.file.url} />
                    )}
                </div>

                <div className="flex justify-between border-b py-3 font-yekanBold">
                    <p className="flex items-center text-[10px]  gap-1">
                        {isLike ? (
                            <BsHeartFill
                                onClick={() => deleteLikePost(post._id)}
                                className="cursor-pointer text-red-500"
                                size={20}
                            />
                        ) : (
                            <AiOutlineHeart
                                onClick={() => likePost(post._id)}
                                className="cursor-pointer text-gray-500"
                                size={20}
                            />
                        )}
                        <span>تعداد لایک</span>
                        <span className="px-2">{likeCount}</span>
                    </p>
                    <p
                        onClick={() => setOpen(!open)}
                        className="flex cursor-pointer items-center text-[10px] text-gray-500 gap-1"
                    >
                        <FaRegCommentDots size={20} />
                        <span>تعداد کامنت‌ها</span>
                        <span className="px-2">{comments.length}</span>
                    </p>
                    <p className="flex items-center text-[10px] text-gray-500 gap-1">
                        <IoIosShareAlt size={22} />
                        <span>فرستادن</span>
                    </p>
                </div>
                <div onClick={() => setOpen(!open)} className="text-xs flex gap-2 py-2">
                    <p className="text-gray-500 font-yekanBold">توضیحات:</p>
                    <p className="whitespace-nowrap !w-[80%] overflow-hidden text-ellipsis font-yekanBold">{post.description} </p>
                </div>
                <div className="flex gap-2 whitespace-nowrap overflow-ellipsis">
                    {post?.technologies.map((item: any, index: number) => (
                        <p className="text-blue-500 text-xs" key={index}>
                            {item.name}#
                        </p>
                    ))}
                </div>
            </div> */}
            {openEditPost && (
                <EditPostUser
                    open={openEditPost}
                    setOpen={setOpenEditPost}
                    post={selectPost}
                    status={status ?? ""}
                    setDataProject={setDataProject}
                />
            )}
            {open && <ShowComment description={post.description} comments={comments} open={open} setOpen={setOpen} />}
        </>
    );
};

export default CardPostProfile;
