// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import User from "../../../../models/user";
import connectDB from "../../../utils/connectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiReq } from "../../../types/common";

type Data = {
    status?: boolean;
    message: string;
    data?: {
        token: string;
        user: {};
    };
};
connectDB();
export default function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        signInUser(req, res);
    } else {
        res.status(403).json({ message: "method not supported" });
    }
}

const signInUser = async (req: NextApiReq, res: NextApiResponse) => {
    try {
        let user = await User.findOne({
            student_number: req.body.student_number,
        });

        if (!user)
            return res.status(400).json({
                message: "نام کاربری یا رمز عبور اشتباه هست",
            });

        const checkpassword = await bcrypt.compare(req.body.password, user.password);

        if (!checkpassword)
            return res.status(400).json({
                message: "نام کاربری یا رمز عبور اشتباه هست",
            });

        if (user.status === "waiting")
            return res.status(400).json({
                message: "حساب کاربری شما تائید نشده است، لطفا بعدا تلاش کنید",
            });

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY!, {
            expiresIn: "24h",
        });

        res.status(200).json({
            status: true,
            token,
            message: "با موفقیت وارد شدید",
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    full_name: user.full_name,
                    role: user.role,
                    profile: {
                        url: user.profile.url,
                        id: user.profile.id,
                    },
                    student_number: user.student_number,
                },
            },
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
