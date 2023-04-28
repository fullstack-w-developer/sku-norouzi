import { useRouter } from "next/router";
import React from "react";
import { BsLockFill } from "react-icons/bs";
import { FaUserAlt, FaUserGraduate } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Input from "./user/Input";
interface Props {
    formik: any;
    showpass?: boolean;
}
const FeildSignUp = ({ formik, showpass }: Props) => {
    const router = useRouter();
    return (
        <>
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
                title="کد پرسنلی"
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
            {showpass && (
                <>
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
                </>
            )}
        </>
    );
};

export default FeildSignUp;
