// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Posts from "../../../models/post";
import User from "../../../models/user";
import connectDB from "../../../utils/connectDB";

type Data = {
    message: string;
    status: boolean;
};

connectDB();
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        getPostById(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

const getPostById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const userId = req.query.userId;
        const user = await User.findById(userId);
        const posts = await Posts.find({
            userId,
            status: "success",
        }).populate(
            "userId",
            ["createdAt", "email", "first_name", "last_name", "profile", "role", "status", "student_number", "updatedAt", "_id"],
            "user"
        );
        res.status(200).json({
            message: "با موفقیت ارسال شد",
            status: true,
            data: { posts, user },
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message!,
        });
    }
};
