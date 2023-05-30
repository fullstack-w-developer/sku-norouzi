import { Dropdown, message, Image } from "antd";
import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import InputEmoji from "react-input-emoji";
import { BsBookmark, BsBookmarkFill, BsHeartFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import ShowComment from "./ShowComment";
import { typePost, typeUser } from "../../../tying";
import FileSaver from "file-saver";
import { useRouter } from "next/router";
import fetchClient from "../../utils/fetchClient";
import SherePost from "./SherePost";
import Poster from "../../assets/image/videoposter.png";
import ProfileInfo from "./ProfileInfo";
import { Post } from "../../types/Post";
import useAuthStore from "../../stores/auth-store";
import useLikeActionMutation from "../../hooks/mutation/actions/useLikeActionMutation";
import useBookmarkActionMuation from "../../hooks/mutation/actions/useBookmarkActionMuation";
interface Props {
    post: Post;
}
const items = [
    {
        key: "1",
        label: <p className="font-yekanBold txet-gray-800">دانلود پست</p>,
    },
];
const CardPost = ({ post }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [comments, setComments] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [isBookmark, setIsBookmark] = useState(post.isBookmark);
    const [text, setText] = useState("");
    const { user } = useAuthStore()
    const router = useRouter();
    const [like, setLike] = useState({
        isLike:post.isLiked,
        count: post.liked.length
    })
    const {mutate: likeAction,isLoading:loadingLike} = useLikeActionMutation({like,setState:setLike})
    const {mutate: bookmakAction,isLoading:loadingBookmark} = useBookmarkActionMuation({isBookmark,setState:setIsBookmark})

    async function handleOnEnter(text: any) {
        try {
            const { data } = await fetchClient.put("/post/addcomment", { comment: text, postId: post._id });
            if (data.status) {
                setComments(data.data.comments);
            }
        } catch (error) { }
    }
    const onClick = ({ key }: any, post: typePost) => {
        if (!user) return router.push("/auth/signin");

        if (Number(key) === 1) {
            FileSaver.saveAs(post.zip.url, post.zip.url.split("uploads/")[1]);
        }
    };

    const actionLike = (id:string)=>{
        if(!user) return router.push("/auth/signin")
         if(loadingLike) return
        likeAction(id)
    }
    const actionBookmark = (id:string)=>{
        if(!user) return router.push("/auth/signin")
         if(loadingBookmark) return
        bookmakAction(id)
    }

   
    useEffect(() => {
        setComments(post.comments);
    }, []);

    const sharePostForUser = () => {
        if (!user) return router.push("/auth/signin");
        // setShowSheare(!showSheare);
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
                        {/* {sender && (
                            <Link className="text-[10px] flex gap-2 items-center font-yekanBold" href={`/profile/${sender._id}`}>
                                <span> ارسال شده از:</span>
                                <Tag color="volcano" className="font-yekanBold">
                                    {" "}
                                    {sender.full_name}
                                </Tag>
                            </Link>
                        )} */}
                        {isBookmark ? (
                            <BsBookmarkFill
                                className="cursor-pointer text-gray-800"
                                onClick={() => actionBookmark(post._id)}
                                size={18}
                            />
                        ) : (
                            <BsBookmark className="cursor-pointer" onClick={() => actionBookmark(post._id)} size={17} />
                        )}

                        <Dropdown
                            menu={{
                                items,
                                // @ts-ignore
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
                        {like.isLike ? (
                            <BsHeartFill
                                onClick={() => actionLike(post._id)}
                                className="cursor-pointer text-red-500"
                                size={20}
                            />
                        ) : (
                            <AiOutlineHeart
                                onClick={() => actionLike(post._id)}
                                className="cursor-pointer text-gray-500"
                                size={20}
                            />
                        )}
                        <span>تعداد لایک</span>
                        <span className="px-2">{like.count}</span>
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
                <p className="font-yekanBold text-gray-500 text-[12px] pt-3">عنوان : {post.title}</p>
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

                {user && (
                    <div className="flex gap-2 items-center pt-4">
                        <div>
                            <Image alt="" className="rounded-full" width={40} height={40} src={user.profile.url} />
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
            {false && <SherePost showSheare={false} setShowSheare={() => { }} post={post} />}
        </>
    );
};

export default CardPost;
