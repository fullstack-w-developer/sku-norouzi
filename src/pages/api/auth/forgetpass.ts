// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import nodemailer from "nodemailer";
import User from "../../../../models/user";
import connectDB from "../../../utils/connectDB";
import jwt from "jsonwebtoken";
import { NextApiReq } from "../../../types/common";

type Data = {
    error?: string;
    message: string;
};

connectDB();

export default function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        forgetPass(req, res);
    } else {
        res.status(403).json({ message: "method not supported" });
    }
}

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "mahdilove279@gmail.com",
        pass: "m1a2h3d4i5279",
    },
});

const forgetPass = async (req: NextApiReq, res: NextApiResponse) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        const token = jwt.sign(
            {
                data: { id: user._id },
            },
            process.env.CHANGE_PASS_KEY!,
            { expiresIn: "1h" }
        );

        if (!user)
            return res.status(400).json({
                message: "ایمیل وارد شده، تاکنون ثبت نشده است",
            });

        const options = {
            from: "mahdilove279@gmail.com",
            to: req.body.email,
            subject: "دانشگاه شهر کرد",
            html: `
      <div style="text-align: center;">
      <div style="padding-bottom:5px;">
      <p>برای تغیر رمز عبور خود روی لینک زیر کلیک فرمایید</p>
      </div>
      <a href='${process.env.BASEURL}/auth/changepass?token=${token}'>تغیر رمز عبور</a>
      </div>
      `,
        };

        transporter.sendMail(options, (err: any, info: any) => {
            if (err) {
                res.status(500).json({
                    message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
                    error: err.message,
                    status: false,
                });
                return;
            }

            res.status(200).json({
                message: "لینک تغیر رمز عبور به ایمیل شما فرستاده شد",
                status: true,
            });
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
            status: false,
        });
    }
};
