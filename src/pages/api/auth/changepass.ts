import { message } from "antd";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "../../../utils/connectDB";
import User from "../../../../models/user";
import bcrypt from "bcrypt";
import { NextApiReq } from "../../../types/common";

type Data = {
    message: string;
};

connectDB();
export default function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        changePass(req, res);
    } else {
        res.status(403).json({ message: "method not supported" });
    }
}

const changePass = async (req: NextApiReq, res: NextApiResponse) => {
    try {
        const token = req.cookies["change"];

        if (!token) {
            res.status(400).json({
                message: "کاربر یافت نشد",
                status: false,
            });
        }
        const decoded: any = jwt.verify(token!, process.env.CHANGE_PASS_KEY!);

        if (!decoded) {
            res.status(400).json({
                message: "زمان شما برای تغیر رمز به پایان رسیده است",
            });
        }
        const _id = decoded.data.id;
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const user = await User.findByIdAndUpdate(
            _id,
            {
                $set: { password: hash },
            },
            { new: true }
        );

        if (!user) return res.status(400).json({ message: "کاربری با این مشخصات پیدا نشد" });
        res.status(200).json({
            message: "رمز عبور با موفقیت تغیر یافت",
            status: true,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
            status: false,
        });
    }
};
