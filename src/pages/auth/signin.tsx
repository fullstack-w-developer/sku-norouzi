import { message, Spin } from "antd";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { setRecoil } from "recoil-nexus";
import ForgetPass from "../../components/user/ForgetPass";
import Input from "../../components/user/Input";
import Logo from "../../components/user/Logo";
import { userState } from "../../recoil/atom";
import fetchClient from "../../utils/fetchClient";
import { signInSchema, signInValues } from "../../utils/validation";
import { typeSignInAccount } from "../../../tying";

const Signin = () => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [showForgetPass, setShowForgetPass] = useState(false);
    const router = useRouter();
    const formik = useFormik({
        initialValues: signInValues,
        validationSchema: signInSchema,
        onSubmit: async (values: typeSignInAccount) => {
            try {
                setLoading(true);
                const { data } = await fetchClient.post("auth/signin", values);
                if (data.status) {
                    Cookies.set("token", data.token);
                    messageApi.open({
                        type: "success",
                        duration: 5,
                        content: "با موفقیت وارد شدید",
                        className: "fixed left-0 top-[10vh] font-yekanBold !text-xs !py-4",
                    });
                    setRecoil(userState, data.data.user);
                }
                setLoading(false);
                if (data.data.user.role === "USER" || data.data.user.role === "MASTER") {
                    router.push("/");
                } else {
                    router.push("/admin");
                }
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
                <title>دانشگاه شهر کرد | ورود</title>
            </Head>
            {contextHolder}
            <div className="flex flex-col mt-20 lg:mt-0 lg:justify-between lg:flex-row items-center lg:h-screen mx-auto w-full lg:!w-[70%]">
                <Logo />
                <div className=" lg:min-w-[450px] mt-10 lg:mt-10">
                    <h1 className="text-center text-xl text-gray-700 font-artinBlack">ورود به سیستم</h1>
                    <p className="text-xs  text-center pt-2 pb-10 lg:pb-0">
                        جهت ورود به سیستم نام کاربری و رمز عبور خود را وارد نمایید.
                    </p>
                    <Spin spinning={loading}>
                        <form onSubmit={formik.handleSubmit} className="container_auth w-full">
                            <Input
                                onChange={formik.handleChange}
                                title="نام کاربری"
                                name="student_number"
                                value={formik.values.student_number}
                                suffix={<MdEmail className="text-gray-400" size={22} />}
                                input_ltr="input_ltr"
                                status={formik.touched.student_number && formik.errors.student_number ? "error" : ""}
                                error={formik.touched.student_number && formik.errors.student_number}
                            />
                            <Input
                                type="password"
                                onChange={formik.handleChange}
                                title="رمز عبور"
                                name="password"
                                value={formik.values.password}
                                suffix={<BsLockFill className="text-gray-400" size={22} />}
                                input_ltr="input_ltr"
                                status={formik.touched.password && formik.errors.password ? "error" : ""}
                                error={formik.touched.password && formik.errors.password}
                            />

                            <div className="flex flex-col">
                                <div className="flex justify-between items-center mt-6 lg:mt-0 w-full">
                                    <button
                                        type="submit"
                                        className="bg-sku text-white font-yekanBold text-xs w-[100px] py-3 lg:w-[70px] lg:py-2 rounded-lg mt-4"
                                    >
                                        ورود
                                    </button>
                                    <button
                                        onClick={() => setShowForgetPass(true)}
                                        type="button"
                                        className="text-xs font-yekanBold text-blue-500 hover:text-blue-600"
                                    >
                                        فراموش کردن رمز عبور؟
                                    </button>
                                </div>
                                <Link
                                    className="font-yekanBold mt-8 lg:mt-0 flex items-center text-xs pt-5 text-gray-500 hover:text-gray-500"
                                    href={"/auth/signup"}
                                >
                                    آیا تاکنون ثبت نام نکرده اید؟ <span className="text-[#0095f6] underline">ثبت نام</span>
                                </Link>
                            </div>
                        </form>
                    </Spin>
                </div>
                <ForgetPass showForgetPass={showForgetPass} setShowForgetPass={setShowForgetPass} />
            </div>
        </>
    );
};

export default Signin;
