import * as Yup from "yup";

export const signupValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repPassword: "",
    student_number: "",
};
export const signInValues = {
    student_number: "",
    password: "",
};
export const forgetPassValues = {
    email: "",
};
export const changePassValues = {
    password: "",
    repPassword: "",
};
export const signUpSchema = Yup.object({
    first_name: Yup.string()
        .required("لطفا نام خود را وارد کنید")
        .matches(/^[\u0600-\u06FF\s]+$/, "لطفا نام خود را به فارسی وارد کنید"),
    last_name: Yup.string()
        .required("لطفا نام‌خانوادگی خود را وارد کنید")
        .matches(/^[\u0600-\u06FF\s]+$/, "لطفا نام‌خانوادگی خود را به فارسی وارد کنید"),
    student_number: Yup.number().required("لطفا شماره دانشجویی خود را وارد کنید"),

    email: Yup.string().email("فرمت ایمیل صحیح نیست").required("لطفا ایمیل خود را وارد کنید"),
    password: Yup.string()
        .required("لطفا رمز عبور خود را وارد کنید")
        .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, " رمز عبور باید حداقل 8 کاراکتر، انگلیسی و شامل حروف و اعداد باشد"),
    repPassword: Yup.string()
        .required("لطفا تکرار رمز عبور خود را وارد کنید")
        .oneOf([Yup.ref("password"), null], "رمز عبور با تکرار آن مطابقت ندارد"),
});

export const signInSchema = Yup.object({
    student_number: Yup.number().required("لطفا شماره دانشجویی خود را وارد کنید"),
    password: Yup.string().required("لطفا رمز عبور خود را وارد کنید"),
});
export const forgetPassSchema = Yup.object({
    email: Yup.string().email("فرمت ایمیل صحیح نیست").required("لطفا ایمیل خود را وارد کنید"),
});
export const changepassSchema = Yup.object({
    password: Yup.string()
        .required("لطفا رمز عبور خود را وارد کنید")
        .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, " رمز عبور باید حداقل 8 کاراکتر، انگلیسی و شامل حروف و اعداد باشد"),
    repPassword: Yup.string()
        .required("لطفا تکرار رمز عبور خود را وارد کنید")
        .oneOf([Yup.ref("password"), null], "رمز عبور با تکرار آن مطابقت ندارد"),
});
export const ListMasterSchema = Yup.object({
    first_name: Yup.string()
        .required("لطفا نام خود را وارد کنید")
        .matches(/^[\u0600-\u06FF\s]+$/, "لطفا نام خود را به فارسی وارد کنید"),
    last_name: Yup.string()
        .required("لطفا نام‌خانوادگی خود را وارد کنید")
        .matches(/^[\u0600-\u06FF\s]+$/, "لطفا نام‌خانوادگی خود را به فارسی وارد کنید"),
});
