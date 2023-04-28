import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import connectDB from "../../../utils/connectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type Data = {
    status?: boolean;
    message: string;
    data?: {
        token: string;
        user: {};
    };
};

connectDB();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        signupUser(req, res);
    } else {
        res.status(403).json({ message: "method not supported" });
    }
}

const signupUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email, password, first_name, last_name, student_number } = req.body;
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                message: "ایمیل وارد شده، قبلا ثبت شده است. لطفا ایمیل دیگری را وارد کنید",
            });
        }

        const checkUser_name = await User.findOne({
            student_number,
        });

        if (checkUser_name) {
            return res.status(400).json({
                message: "شماره دانشجویی وارد شده قبلا ثبت شده است.",
            });
        }

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
            role: "USER",
            status: "waiting",
        });

        await user.save();

        res.status(201).json({
            status: true,
            message: "ثبت نام شما با موفقیت انجام شد، لطفا منتظر تائید حساب کاربری خود باشید",
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
