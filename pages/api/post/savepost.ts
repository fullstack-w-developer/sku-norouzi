import { withAuth } from "./../../../middleware/withProtect";
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

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        getPosts(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);
const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
    const skip = req.query.skip;
    try {
        const posts = await Posts.aggregate([
            {
                $sort: { created: -1 },
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
                // @ts-ignore
                $match: { saves: req.user._id },
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
