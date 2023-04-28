import { message, Modal, Spin } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import { MdEmail, MdOutlineClose } from "react-icons/md";
import { typeForgetPassAccount } from "../../tying";
import fetchClient from "../../utils/fetchClient";
import { forgetPassSchema, forgetPassValues } from "../../utils/validation";
import Input from "./Input";

interface Props {
    showForgetPass: boolean;
    setShowForgetPass: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgetPass = ({ setShowForgetPass, showForgetPass }: Props) => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const formik = useFormik({
        initialValues: forgetPassValues,
        validationSchema: forgetPassSchema,
        onSubmit: async (values: typeForgetPassAccount) => {
            try {
                setLoading(true);
                const { data } = await fetchClient.post("auth/forgetpass", values);
                if (data.status) {
                    messageApi.open({
                        type: "success",
                        duration: 5,
                        content: " لینک  تغیر رمز عبور، به ایمیل وارد شده ارسال شد.",
                        className: "fixed left-0 top-[10vh] font-yekanBold !text-xs !py-4",
                    });
                }
                setShowForgetPass(false);
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
                setShowForgetPass(false);
                messageApi.open({
                    type: "error",
                    duration: 5,
                    content: error.response.data.message!,
                    className: "fixed left-0 top-[10vh] font-yekanBold !text-xs !py-4",
                });
            }
        },
    });
    return (
        <Modal
            centered
            footer={false}
            open={showForgetPass}
            onCancel={() => setShowForgetPass(false)}
            closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
        >
            {contextHolder}

            <div>
                <h1 className="text-center text-xl font-ExtraBold text-gray-700">فراموش کردن رمز عبور</h1>
                <Spin spinning={loading}>
                    <form onSubmit={formik.handleSubmit} className="container_auth !mt-3">
                        <Input
                            onChange={formik.handleChange}
                            title="ایمیل"
                            name="email"
                            value={formik.values.email}
                            suffix={<MdEmail className="text-gray-400" size={22} />}
                            input_ltr="input_ltr"
                            status={formik.touched.email && formik.errors.email ? "error" : ""}
                        />
                        <button className="bg-sku text-white py-3 rounded-lg text-xs font-yekanBold mt-3">ارسال</button>
                    </form>
                </Spin>
            </div>
        </Modal>
    );
};

export default ForgetPass;
