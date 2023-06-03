import { withAuth } from "../../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import Sharepost from "../../../../models/sharepost";
import connectDB from "../../../utils/connectDB";
import { NextApiReq } from "../../../types/common";

type Data = {
    message: string;
    status: boolean;
    data?: [];
};
connectDB();
function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        getShare(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);
const getShare = async (req: NextApiReq, res: NextApiResponse) => {
    try {
        const sharePost = await Sharepost.find({ postId: req.query.id, senderId: req.user._id });
        res.status(200).json({
            message: "با موفقیت ارسال شد",
            data: sharePost,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
