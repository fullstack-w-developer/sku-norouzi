import { Dropdown, message, Tag, Image } from "antd";
import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import InputEmoji from "react-input-emoji";
import { BsBookmark, BsBookmarkFill, BsHeartFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import ShowComment from "./ShowComment";
import { typePost, typeUser } from "../../tying";
import FileSaver from "file-saver";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atom";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import fetchClient from "../../utils/fetchClient";
import Link from "next/link";
import SherePost from "./SherePost";
import Poster from "../../public/image/videoposter.png";
import ProfileInfo from "./ProfileInfo";
interface Props {
    post: typePost;
    posts: typePost[];
    sender?: typeUser;
}
const items = [
    {
        key: "1",
        label: <p className="font-yekanBold txet-gray-800">دانلود پست</p>,
    },
];
const CardPost = ({ post, posts, sender }: Props) => {
    const [showSheare, setShowSheare] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [comments, setComments] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState<null | number>(null);
    const [isToken, setIsToken] = useState<string | number>("");
    const [text, setText] = useState("");

    const userInfo = useRecoilValue(userState);
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get("token");
        setIsToken(token!);
    }, []);
    async function handleOnEnter(text: any) {
        try {
            const { data } = await fetchClient.put("/post/addcomment", { comment: text, postId: post._id });
            if (data.status) {
                setComments(data.data.comments);
            }
        } catch (error) {}
    }
    const onClick = ({ key }: any, post: typePost) => {
        if (!isToken) return router.push("/auth/signin");

        if (Number(key) === 1) {
            FileSaver.saveAs(post.zip.url, post.zip.url.split("uploads/")[1]);
        }
    };

    const likePost = async (postId: string) => {
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

    const sharePostForUser = () => {
        if (!isToken) return router.push("/auth/signin");
        setShowSheare(!showSheare);
    };

    return (
        <>
            {contextHolder}
            <div className="!bg-white p-1 h-fit shadow-md border overflow-hidden border-gray-100 rounded-lg w-full">
                <div className="flex justify-between items-center">
                    <ProfileInfo
                        image={post.user.profile.url}
                        full_name={post.user.full_name}
                        role={post.user.role}
                        userId={post.userId}
                    />

                    <div className="flex items-center gap-2">
                        {sender && (
                            <Link className="text-[10px] flex gap-2 items-center font-yekanBold" href={`/profile/${sender._id}`}>
                                <span> ارسال شده از:</span>
                                <Tag color="volcano" className="font-yekanBold">
                                    {" "}
                                    {sender.full_name}
                                </Tag>
                            </Link>
                        )}
                        {isBookmark ? (
                            <BsBookmarkFill
                                className="cursor-pointer text-gray-800"
                                onClick={() => deleteBookmark(post._id)}
                                size={18}
                            />
                        ) : (
                            <BsBookmark className="cursor-pointer" onClick={() => addBookmark(post._id)} size={17} />
                        )}

                        <Dropdown
                            menu={{
                                items,
                                onClick: (key) => onClick(key, post),
                            }}
                            placement="bottomLeft"
                            arrow
                        >
                            <MdMoreVert className="cursor-pointer" size={20} />
                        </Dropdown>
                    </div>
                </div>

                <div className="w-full relative h-[250px] mt-2 bg-black/25 overflow-hidden ">
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
                    <p onClick={sharePostForUser} className="flex items-center cursor-pointer text-[10px] text-gray-500 gap-1">
                        <IoIosShareAlt size={22} />
                        <span>فرستادن</span>
                    </p>
                </div>
                <div onClick={() => setOpen(!open)} className="text-xs flex gap-2 py-2 font-yekanBold">
                    <p className="text-gray-500">توضیحات:</p>
                    <p className="whitespace-nowrap !w-[80%] overflow-hidden text-ellipsis">{post.description} </p>
                </div>
                <div className="flex gap-2 whitespace-nowrap overflow-ellipsis">
                    {post?.technologies.map((item: any, index: number) => (
                        <p className="text-blue-500 text-xs" key={index}>
                            {item.name}#
                        </p>
                    ))}
                </div>

                {isToken && (
                    <div className="flex gap-2 items-center pt-4">
                        <div>
                            <Image alt="" className="rounded-full" width={40} height={40} src={userInfo.profile.url} />
                        </div>
                        <InputEmoji
                            value={text}
                            onChange={setText}
                            cleanOnEnter
                            onEnter={handleOnEnter}
                            placeholder="نوشتن متن"
                        />
                    </div>
                )}
            </div>
            {open && <ShowComment description={post.description} comments={comments} open={open} setOpen={setOpen} />}
            {showSheare && <SherePost showSheare={showSheare} setShowSheare={setShowSheare} post={post} />}
        </>
    );
};

export default CardPost;
