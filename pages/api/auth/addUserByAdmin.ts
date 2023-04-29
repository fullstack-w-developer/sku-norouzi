import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import connectDB from "../../../utils/connectDB";
import bcrypt from "bcrypt";
import { withAuth } from "../../../middleware/withProtect";

type Data = {
    status?: boolean;
    message: string;
    data?: {
        token: string;
        user: {};
    };
};

connectDB();

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        signupUser(req, res);
    } else {
        res.status(403).json({ message: "method not supported" });
    }
}

const signupUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email, password, first_name, last_name, student_number, role } = req.body;

        // @ts-ignore
        if (req.user.role !== "ADMIN")
            res.status(403).json({
                message: "شما اجازه دسترسی به این قسمت را ندارید",
            });

        const studentNumber = await User.findOne({ student_number });
        if (studentNumber)
            return res.status(400).json({
                message: "کد دانشجویی قبلا ثبت شده است"
            });

        const isUser = await User.findOne({ email });

        if (isUser)
            return res.status(400).json({
                message: "ایمیل وارد شده، قبلا ثبت شده است. لطفا ایمیل دیگری را وارد کنید",
            });



        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = new User({
            email,
            password: hash,
            first_name,
            last_name,
            full_name: `${first_name} ${last_name}`,
            student_number,
            role,
            status: "success",
        });

        await user.save();

        res.status(201).json({
            status: true,
            message: "ثبت نام کاربر توسط ادمین با موفیت انجام شد",
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};

export default withAuth(handler);
