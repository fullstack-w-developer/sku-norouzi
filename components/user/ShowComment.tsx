import { Modal } from "antd";
import Image from "next/image";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    comments: [any];
    description: string;
}
const ShowComment = ({ open, setOpen, comments, description }: Props) => {
    const onClose = () => setOpen(false);

    return (
        <Modal
            onCancel={onClose}
            centered
            footer={false}
            open={open}
            closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
        >
            <div className="min-h-[500px] max-h-[500px] overflow-auto coustom_scroll_bar">
                <p className="font-yekanBold pl-5 text-justify border-b pb-4">
                    <span className="font-ExtraBold"> توضیحات:</span>
                    <span className="text-xs px-1">{description}</span>
                </p>
                {/* @ts-ignore */}
                {comments.length === 0 ? (
                    <p className="font-yekanBold text-center pt-3 text-gray-500">کامنتی ثبت نشده است</p>
                ) : (
                    comments.map((comment: any) => (
                        <div key={comment._id} className="border-b pb-2">
                            <div className="flex items-center gap-2 mt-3">
                                <Image width={40} height={40} className="rounded-full" alt="" src={comment.profile} />
                                <div className="text-xs space-y-1">
                                    <p className="font-ExtraBold flex gap-1">
                                        <span>{comment.full_name}</span>
                                    </p>
                                    <p className="font-yekanBold">{comment.role === "USER" ? "دانشجو" : "استاد"}</p>
                                </div>
                            </div>
                            <p className="font-yekanBold text-xs pt-2">{comment.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </Modal>
    );
};

export default ShowComment;
