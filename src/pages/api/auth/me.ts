// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import { NextApiReq, User } from "../../../types/common";

type Data = {
    message: string;
    user?: User;
    status: boolean;
};

connectDB();
export default function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        res.status(200).json({ status: true, user: req.user, message: "اطلاعات کاربر با موفقیت ارسال شد" });
    } else {
        res.status(403).json({ message: "method not supported", status: false });
    }
}
