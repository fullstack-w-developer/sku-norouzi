// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Posts from "../../../models/post";
import User from "../../../models/user";
import connectDB from "../../../utils/connectDB";

type Data = {
    message?: string;
    status?: false;
    data?: any;
};

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        getPosts(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}
const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
    const q: any = req.query?.q;
    try {
        const users = await User.aggregate([
            {
                $sort: { createdAt: -1 },
            },
            {
                $match: {
                    $or: [
                        { first_name: RegExp(q) },
                        { last_name: RegExp(q) },
                        { full_name: RegExp(q) },
                        { student_number: RegExp(q) },
                    ],
                },
            },
            {
                $project: {
                    password: 0,
                    student_number: 0,
                    email: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    status: 0,
                },
            },
        ]);

        res.status(200).json({ status: true, data: users });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
