import React, { useState, useEffect } from "react";
import { message, Modal, Select, Spin } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { editModalAdminState, waitingUsersState } from "../../recoil/atom";
import UploadImage from "../UploadImage";
import { setRecoil } from "recoil-nexus";
import { useFormik } from "formik";
import CropEasy from "../admin/crop/index";
import FeildSignUp from "../FeildSignUp";
import { roleUsers, statusUsers } from "../../utils/data";
import fetchClient from "../../utils/fetchClient";
import { MdOutlineClose } from "react-icons/md";
interface Props {
    refetch?: any;
}
const Edit = ({ refetch }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [modal] = useRecoilState(editModalAdminState);
    const { first_name, last_name, student_number, email, profile, status, role } = modal?.data;
    const initialValues = {
        first_name,
        last_name,
        student_number,
        email,
        profile,
        status: status,
        role,
    };

    const [open, setOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState<any>(null);
    const [file, setFile] = useState<File>();
    const [blobFile, setBlobFile] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    const onClose = () => {
        setRecoil(editModalAdminState, {
            page: "",
            data: {},
            open: false,
        });
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: async ({ first_name, last_name, email, status, student_number, role }) => {
            try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append("id", modal.data._id);
                formData.append("file", blobFile!);
                formData.append("first_name", first_name);
                formData.append("last_name", last_name);
                formData.append("email", email);
                formData.append("status", status);
                formData.append("student_number", student_number);
                formData.append("role", role);
                const { data } = await fetchClient.post("/user/update", formData);
                setIsLoading(false);
                if (data.status) {
                    refetch();
                    messageApi.open({
                        type: "success",
                        duration: 5,
                        content: "ویرایش کاربر با موفقیت انجام شد",
                        className: "font-yekanBold text-md text-gray-700",
                    });
                    onClose();
                }
            } catch (error: any) {
                messageApi.open({
                    type: "error",
                    duration: 5,
                    content: error.response.data.message!,
                    className: "font-yekanBold text-md text-gray-700",
                });
                setIsLoading(false);
            }
        },
    });
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

    return (
        <div>
            {contextHolder}
            <Modal
                centered
                footer={false}
                onCancel={() =>
                    // @ts-ignore
                    setRecoil(editModalAdminState, modal.open)
                }
                open={modal.open}
                closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
            >
                <Spin spinning={isLoading}>
                    <>
                        <UploadImage file={file} onSelectFile={onSelectFile} profile={modal.data.profile.url} />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container_auth !grid grid-cols-2  !mt-0">
                                <FeildSignUp formik={formik} />
                                <div className="w-full container_edit_select">
                                    <label>تغیر وضعیت</label>
                                    <Select
                                        dropdownRender={(menu) => <div className="text-gray-500 font-yekanBold">{menu}</div>}
                                        size="large"
                                        placeholder="تغیر وضعیت"
                                        optionFilterProp="children"
                                        value={formik.values.status}
                                        className="font-yekanBold w-full"
                                        onChange={(value) => formik.setFieldValue("status", value)}
                                    >
                                        {statusUsers.map((role) => (
                                            <Select.Option key={role.value}>
                                                <span className="text-xs"> {role.label}</span>
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="w-full container_edit_select">
                                    <label>تعین نقش</label>
                                    <Select
                                        dropdownRender={(menu) => <div className="text-gray-500 font-yekanBold">{menu}</div>}
                                        size="large"
                                        placeholder="تعین نفش"
                                        optionFilterProp="children"
                                        value={formik.values.role}
                                        className="font-yekanBold w-full"
                                        onChange={(value) => formik.setFieldValue("role", value)}
                                    >
                                        {roleUsers.map((role) => (
                                            <Select.Option key={role.value}>
                                                <span className="text-xs"> {role.label}</span>
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end w-[200px] gap-4 mt-8">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="border border-gray-200 font-yekanBold w-full py-2 text-xs rounded-lg"
                                >
                                    انصراف
                                </button>
                                <button className="bg-blue-500 font-yekanBold text-white text-xs w-full py-2 rounded-lg">
                                    تائید
                                </button>
                            </div>
                        </form>
                    </>
                </Spin>

                <CropEasy
                    openCrop={open}
                    setFile={setFile}
                    imgSrc={imgSrc}
                    setOpenCrop={setOpen}
                    setImgSrc={setImgSrc}
                    setBlobFile={setBlobFile}
                />
            </Modal>
        </div>
    );
};

export default Edit;
