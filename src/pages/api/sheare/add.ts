import { withAuth } from "../../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import Shearepost from "../../../../models/sharepost";
import connectDB from "../../../utils/connectDB";
import { NextApiReq, User } from "../../../types/common";

type Data = {
    message: string;
    status: boolean;
};

connectDB();

function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        addShearePost(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);
const addShearePost = async (req: NextApiReq, res: NextApiResponse) => {
    try {
        const { postId, reciveUsers } = req.body;

        reciveUsers.map(async (recive: User) => {
            const sheare = new Shearepost({
                postId,
                reciveUsers: recive,
                senderId: req.user._id,
            });

            await sheare.save();
        });

        res.status(201).json({
            message: "با موفقیت انجام شد",
            status: true,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: err.message,
            status: false,
        });
    }
};
