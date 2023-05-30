import { useFormik } from "formik";
import Input from "../../components/user/Input";
import { signUpSchema, signupValues } from "../../utils/validation";
import { FaUserAlt, FaUserGraduate } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import { Spin } from "antd";
import Link from "next/link";
import Logo from "../../components/user/Logo";
import { useRouter } from "next/router";
import Head from "next/head";
import { SignUpFormData } from "../../types/Auth/Form";
import useSignUpMutation from "../../hooks/mutation/auth/useSignupMutation";

const Signup = () => {
    const { isLoading, mutate } = useSignUpMutation();
    const formik = useFormik<SignUpFormData>({
        initialValues: signupValues,
        validationSchema: signUpSchema,
        onSubmit: async (values) => {
            mutate(values);
        },
    });
    return (
        <div className="flex flex-col lg:flex-row pt-10 lg:pt-0 lg:items-center lg:justify-between min-h-screen lg:!w-[70%] mx-auto">
            <Head>
                <title>دانشگاه شهر کرد | ثبت نام</title>
            </Head>
            <Logo />
            <div className="w-[90%] mx-auto lg:mx-0 mt-14 lg:mt-0  lg:w-[450px]">
                <h1 className="text-center text-xl text-gray-700 font-artinBlack">ثبت نام</h1>
                <p className="text-xs text-center pt-2">جهت ثبت نام، مشخصات زیر را پر کنید</p>
                <Spin spinning={isLoading}>
                    <form onSubmit={formik.handleSubmit} className="container_auth">
                        <Input
                            onChange={formik.handleChange}
                            title="نام"
                            name="first_name"
                            value={formik.values.first_name}
                            suffix={<FaUserAlt className="text-gray-400" size={18} />}
                            status={formik.touched.first_name && formik.errors.first_name ? "error" : ""}
                            error={formik.touched.first_name && formik.errors.first_name}
                        />
                        <Input
                            onChange={formik.handleChange}
                            title="نام‌خانوادگی"
                            name="last_name"
                            value={formik.values.last_name}
                            suffix={<FaUserAlt className="text-gray-400" size={18} />}
                            status={formik.touched.last_name && formik.errors.last_name ? "error" : ""}
                            error={formik.touched.last_name && formik.errors.last_name}
                        />
                        <Input
                            onChange={formik.handleChange}
                            title="شماره دانشجویی"
                            name="student_number"
                            input_ltr="input_ltr"
                            value={formik.values.student_number}
                            suffix={<FaUserGraduate className="text-gray-400" size={18} />}
                            status={formik.touched.student_number && formik.errors.student_number ? "error" : ""}
                            error={formik.touched.student_number && formik.errors.student_number}
                        />
                        <Input
                            onChange={formik.handleChange}
                            title="ایمیل"
                            name="email"
                            value={formik.values.email}
                            suffix={<MdEmail className="text-gray-400" size={22} />}
                            input_ltr="input_ltr"
                            status={formik.touched.email && formik.errors.email ? "error" : ""}
                            error={formik.touched.email && formik.errors.email}
                        />
                        <Input
                            type="password"
                            onChange={formik.handleChange}
                            title="رمز"
                            name="password"
                            value={formik.values.password}
                            suffix={<BsLockFill className="text-gray-400" size={22} />}
                            input_ltr="input_ltr"
                            status={formik.touched.password && formik.errors.password ? "error" : ""}
                            error={formik.touched.password && formik.errors.password}
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
                            error={formik.touched.repPassword && formik.errors.repPassword}
                        />

                        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                            <button
                                type="submit"
                                className="bg-sku text-white font-yekanBold text-xs w-[70px] py-2 rounded-lg mt-4"
                            >
                                ثبت نام
                            </button>
                            <Link className="font-yekanBold text-xs lg:self-center py-4 flex lg:items-center" href="/auth/signin">
                                <span className="text-gray-500 hover:text-gray-500">آیا قبلا ثبت نام کرده‌اید؟</span>
                                <span className="text-[#0096f5] underline">ورود</span>
                            </Link>
                        </div>
                    </form>
                </Spin>
            </div>
        </div>
    );
};

export default Signup;
