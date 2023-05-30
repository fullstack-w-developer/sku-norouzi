import { message, Spin } from "antd";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsLockFill } from "react-icons/bs";
import Input from "../../components/user/Input";
import { changePassAccount } from "../../tying";
import fetchClient from "../../utils/fetchClient";
import { changepassSchema, changePassValues } from "../../utils/validation";
import { setCookies } from "cookies-next";
import Head from "next/head";

const Changepass = () => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const formik = useFormik({
        initialValues: changePassValues,
        validationSchema: changepassSchema,
        onSubmit: async (values: changePassAccount) => {
            try {
                setLoading(true);
                const { data } = await fetchClient.post("/auth/changepass", values);

                if (data.status) {
                    router.push("/auth/signin");
                    messageApi.open({
                        type: "success",
                        duration: 5,
                        content: data.message,
                        className: "fixed left-0 top-[10vh] font-yekanBold !text-xs !py-4",
                    });
                }
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
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
        <>
            <Head>
                <title>دانشگاه شهر کرد | تغیر رمز عبور</title>
            </Head>
            {contextHolder}
            <div className="flex justify-center items-center h-screen ">
                <div className=" min-w-[450px] max-w-[450px]">
                    <h1 className="text-center text-xl text-gray-700 font-ExtraBold">تغیر رمز عبور</h1>
                    <p className="text-xs text-center pt-2">
                        رمز عبور خود را 8 رقمی و ترکیبی از اعداد و کاراکتر ها انتخاب نمایید.
                    </p>
                    <Spin spinning={loading}>
                        <form onSubmit={formik.handleSubmit} className="container_auth">
                            <Input
                                type="password"
                                onChange={formik.handleChange}
                                title="رمز"
                                name="password"
                                value={formik.values.password}
                                suffix={<BsLockFill className="text-gray-400" size={22} />}
                                input_ltr="input_ltr"
                                status={formik.touched.password && formik.errors.password ? "error" : ""}
                            />
                            <Input
                                type="password"
                                onChange={formik.handleChange}
                                title="تکرار رمز"
                                name="repPassword"
                                value={formik.values.repPassword}
                                suffix={<BsLockFill className="text-gray-400" size={22} />}
                                input_ltr="input_ltr"
                                status={formik.touched.repPassword && formik.errors.repPassword ? "error" : ""}
                            />

                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    className="bg-sku text-white font-yekanBold text-xs w-[70px] py-2 rounded-lg mt-4"
                                >
                                    تغیر رمز
                                </button>
                            </div>
                        </form>
                    </Spin>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
    const token = query.token;
    if (!token) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
        };
    }
    setCookies("change", token, { req, res });
    return {
        props: {},
    };
};
export default Changepass;
