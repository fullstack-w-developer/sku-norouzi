// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Posts from "../../../models/post";
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
    const skip = req?.query?.skip;
    const q: any = req.query?.q;
    try {
        const posts = await Posts.aggregate([
            {
                $sort: { created: -1 },
            },
            {
                $match: { status: "success" },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    pipeline: [{ $project: { password: 0 } }],
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $match: {
                    $or: [
                        { title: RegExp(q) },
                        { technologies: RegExp(q) },
                        { "user.first_name": RegExp(q) },
                        { "user.last_name": RegExp(q) },
                    ],
                },
            },
            {
                $project: { password: 0 },
            },
            {
                $facet: {
                    paginatedResults: [{ $skip: 8 * (Number(skip) - 1) }, { $limit: 8 }],
                    totalCount: [
                        {
                            $count: "Total",
                        },
                    ],
                },
            },
        ]);

        res.status(200).json({ status: true, data: posts });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
