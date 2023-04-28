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
        update(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);

const update = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { comment, postId } = req.body;
        const update = await Posts.findByIdAndUpdate(
            { _id: postId },
            {
                $push: {
                    comments: {
                        $each: [
                            {
                                // @ts-ignore
                                full_name: req.user.full_name,
                                // @ts-ignore
                                profile: req.user.profile.url,
                                // @ts-ignore
                                role: req.user.role,
                                comment,
                            },
                        ],
                    },
                },
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
            data: update,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message!,
        });
    }
};
