import { message, Modal, Spin } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSignLanguage } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { typePropsTechnology } from "../../tying";
import fetchClient from "../../utils/fetchClient";
import Input from "../user/Input";

const CreateTechnology = ({ show, setShow, itemstechnology, setItemstechnology, info, setinfo }: typePropsTechnology) => {
    const listMasterValues = {
        name: info?.name ? info?.name : "",
    };
    const [loading, setloading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const formik = useFormik({
        initialValues: listMasterValues,
        enableReinitialize: true,
        onSubmit: async (values: any, actions) => {
            const filterList = itemstechnology && itemstechnology.filter((item) => item._id !== info._id);
            try {
                setloading(true);
                if (info?.name) {
                    const { data } = await fetchClient.put(`/list/technology/update?id=${info._id}`, values);
                    if (data.status && setItemstechnology && filterList) {
                        actions.resetForm();
                        setItemstechnology([data.data, ...filterList]);
                        messageApi.open({
                            type: "success",
                            duration: 5,
                            content: "با موفقیت ویرایش شد",
                            className: "font-yekanBold text-gray-700",
                        });
                    }
                } else {
                    const { data } = await fetchClient.post("/list/technology/add", values);
                    actions.resetForm();
                    messageApi.open({
                        type: "success",
                        duration: 5,
                        content: "با موفقیت ایجاد شد",
                        className: "font-yekanBold text-gray-700",
                    });
                    if (data.status && setItemstechnology && itemstechnology && setinfo) {
                        setItemstechnology([data.data, ...itemstechnology]);
                        setinfo({ name: "" });
                    }
                }
                setShow(false);
                setloading(false);
            } catch (error: any) {
                setloading(false);
                messageApi.open({
                    type: "error",
                    duration: 5,
                    content: error.response.data.message!,
                    className: "font-yekanBold text-gray-700",
                });
            }
        },
    });
    const onClose = () => {
        if (setinfo) {
            setinfo({});
        }
        setShow(false);
    };
    return (
        <>
            {contextHolder}
            <Modal
                onCancel={onClose}
                footer={false}
                centered
                open={show}
                closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
            >
                <div>
                    <h1 className="text-center text-gray-700 font-yekanBold text-lg pt-5">
                        {info?.first_name ? "ویرایش نام تکنولوژی" : "لطفا نام تکنولوژی را وارد کنید"}
                    </h1>
                    <Spin spinning={loading}>
                        <form onSubmit={formik.handleSubmit} className="container_auth !mt-5">
                            <Input
                                input_ltr="ltr"
                                onChange={formik.handleChange}
                                title="نام تکنولوژی"
                                name="name"
                                value={formik.values.name}
                                suffix={<FaSignLanguage className="text-gray-400" size={22} />}
                                status={formik.touched.name && formik.errors.name ? "error" : ""}
                            />

                            <div className="flex justify-end w-[200px] gap-4 mt-8">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="border border-gray-200 font-yekanBold w-full py-2 text-xs rounded-lg"
                                >
                                    انصراف
                                </button>
                                <button
                                    disabled={loading ? true : false}
                                    className="bg-blue-500 font-yekanBold text-white text-xs w-full py-2 rounded-lg"
                                >
                                    تائید
                                </button>
                            </div>
                        </form>
                    </Spin>
                </div>
            </Modal>
        </>
    );
};

export default CreateTechnology;
