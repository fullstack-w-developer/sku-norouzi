import { withAuth } from "../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Shearepost from "../../../models/sharepost";
import connectDB from "../../../utils/connectDB";

type Data = {
    message: string;
    status: boolean;
};

connectDB();

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
const addShearePost = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { postId, reciveUsers } = req.body;
        const findSender: any = await Shearepost.findOne({
            // @ts-ignore
            senderId: req.user._id,
        });

        if (findSender) {
            await Shearepost.updateOne(
                { _id: findSender._id },
                {
                    $addToSet: {
                        reciveUsers: JSON.parse(reciveUsers),
                        postId,
                    },
                }
            );
            res.status(201).json({
                message: "با موفقیت انجام شد",
                status: true,
            });
            return;
        }
        const sheare = new Shearepost({
            postId,
            reciveUsers: JSON.parse(reciveUsers),
            //   @ts-ignore
            senderId: req.user._id,
        });
        await sheare.save();

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
