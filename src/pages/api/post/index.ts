// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import Posts from "../../../../models/post";
import connectDB from "../../../utils/connectDB";
import { NextApiReq } from "../../../types/common";
import { findProtect } from "../../../../middleware/findProtect";

type Data = {
    message?: string;
    status?: false;
    data?: any;
};

connectDB();

function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        getPosts(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

const getPosts = async (req: NextApiReq, res: NextApiResponse) => {
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
                $addFields: {
                    isLiked: {
                        $cond: [{ $in: [req.user?._id, "$liked"] }, true, false],
                    },
                    isBookmark: {
                        $cond: [{ $in: [req.user?._id, "$saves"] }, true, false],
                    },
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

export default findProtect(handler);
