import { message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { setRecoil } from "recoil-nexus";
import { userState } from "../../recoil/atom";
import fetchClient from "../../utils/fetchClient";
import CropEasy from "../admin/crop";
import UploadImage from "../UploadImage";
interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditImageUser = ({ open: openModal, setOpen: setOpenModal }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const userInfo = useRecoilValue(userState);
    const [imgSrc, setImgSrc] = useState<any>(null);
    const [file, setFile] = useState<File>();
    const [blobFile, setBlobFile] = useState<any>();

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files?.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (imgSrc) {
            setOpen(true);
        }
    }, [imgSrc]);

    const onClose = () => setOpenModal(!openModal);
    const handleChange = async () => {
        if (!blobFile) return;
        setIsLoading(true);
        try {
            const formdata = new FormData();
            formdata.append("id", userInfo._id);
            formdata.append("file", blobFile!);
            formdata.append("profileId", userInfo.profile.id);
            const { data } = await fetchClient.post("/user/update", formdata);
            setIsLoading(false);

            if (data.status) {
                setRecoil(userState, data.data);
                messageApi.open({
                    type: "success",
                    duration: 5,
                    content: "عکس پروفایل با موفقیت تغیر یافت",
                    className: " font-yekanBold !text-xs !py-4",
                });
                onClose();
            }
        } catch (error: any) {
            setIsLoading(false);
            messageApi.open({
                type: "error",
                duration: 5,
                content: error.response.data.message!,
                className: " font-yekanBold !text-xs !py-4",
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                onCancel={onClose}
                centered
                footer={false}
                open={openModal}
                closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
            >
                <UploadImage file={file} onSelectFile={onSelectFile} profile={userInfo.profile?.url} />

                <div className="flex justify-center gap-10 items-center  font-yekanBold mt-6">
                    <button onClick={handleChange} className=" w-[150px] py-2 bg-sku loding_white  rounded-xl">
                        {isLoading ? <Spin /> : "تغیر عکس"}
                    </button>
                    <button onClick={onClose} className="w-[150px] py-2 border rounded-xl">
                        انصراف
                    </button>
                </div>

                <CropEasy
                    openCrop={open}
                    setFile={setFile}
                    imgSrc={imgSrc}
                    setOpenCrop={setOpen}
                    setImgSrc={setImgSrc}
                    setBlobFile={setBlobFile}
                />
            </Modal>
        </>
    );
};

export default EditImageUser;
