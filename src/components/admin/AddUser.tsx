import { useState } from "react";
import { message, Modal, Spin } from "antd";
import { addNewUserModalState } from "../../recoil/atom";
import { useRecoilValue } from "recoil";
import { setRecoil } from "recoil-nexus";
import { useFormik } from "formik";
import fetchClient from "../../utils/fetchClient";
import FeildSignUp from "../FeildSignUp";
import { MdOutlineClose } from "react-icons/md";
import { signUpSchema } from "../../utils/validation";

interface Props {
    role?: string;
    title?: string;
    refetch?: any;
}
const AddUser = ({ role, title, refetch }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const open = useRecoilValue(addNewUserModalState);
    const [messageApi, contextHolder] = message.useMessage();
    const onClose = () => {
        setRecoil(addNewUserModalState, !open);
    };
    const initialValues = {
        first_name: "",
        last_name: "",
        student_number: "",
        email: "",
        password: "",
        repPassword: "",
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {
            try {
                setIsLoading(true);
                const dataUser = { ...values, role };
                const { data } = await fetchClient.post("/auth/addUserByAdmin", dataUser);
                setIsLoading(false);
                if (data.status) {
                    actions.resetForm();
                    refetch();
                    messageApi.open({
                        type: "success",
                        duration: 5,
                        content: " کاربر با موفقیت ثبت شد",
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

    return (
        <>
            {contextHolder}
            <Modal
                onCancel={onClose}
                centered
                footer={false}
                open={open}
                closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
            >
                <Spin spinning={isLoading}>
                    <>
                        <h1 className="text-center text-gray-700 font-ExtraBold text-lg">{title}</h1>
                        <form className="pt-8" onSubmit={formik.handleSubmit}>
                            <div className="container_auth !grid lg:grid-cols-2  !mt-0">
                                <FeildSignUp showpass={true} formik={formik} />
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
            </Modal>
        </>
    );
};

export default AddUser;
