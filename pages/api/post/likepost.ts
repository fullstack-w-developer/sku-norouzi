import { withAuth } from "../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Posts from "../../../models/post";
import connectDB from "../../../utils/connectDB";

type Data = {
    message?: string;
    status?: boolean;
    error?: string;
    data?: any;
};

connectDB();

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "PUT") {
        updateLike(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);

const updateLike = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const updateLike = await Posts.findByIdAndUpdate(
            { _id: req.body.postId },
            {
                // @ts-ignore
                $push: { liked: req.user._id },
            },

            { new: true }
        ).populate("userId", [
            "createdAt",
            "email",
            "first_name",
            "last_name",
            "profile",
            "role",
            "status",
            "student_number",
            "updatedAt",
            "_id",
        ]);

        res.status(200).json({
            message: "با موفقیت انجام شد",
            status: true,
            data: updateLike,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message!,
        });
    }
};
