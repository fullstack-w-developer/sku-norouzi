// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import { NextApiReq, User } from "../../../types/common";
import { withAuth } from "../../../../middleware/withProtect";

type Data = {
    message: string;
    user?: User;
    status: boolean;
};

connectDB();
function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        res.status(200).json({ status: true, user: req.user, message: "اطلاعات کاربر با موفقیت ارسال شد" });
    } else {
        res.status(403).json({ message: "method not supported", status: false });
    }
}

export default withAuth(handler);
