import { withAuth } from "./../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Sharepost from "../../../models/sharepost";
import connectDB from "../../../utils/connectDB";

type Data = {
    message: string;
    status: boolean;
    data?: [];
};
connectDB();
function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
const getShare = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const skip = req.query?.skip;
        const sharePost = await Sharepost.aggregate([
            {
                $sort: { createdAt: -1 },
            },
            {
                // @ts-ignore
                $match: { reciveUsers: req.user._id },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "senderId",
                    pipeline: [{ $project: { password: 0 } }],
                    foreignField: "_id",
                    as: "sender",
                },
            },
            {
                $unwind: {
                    path: "$sender",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "postId",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "userId",
                                foreignField: "_id",
                                pipeline: [{ $project: { password: 0 } }],
                                as: "user",
                            },
                        },
                        {
                            $unwind: {
                                path: "$user",
                                preserveNullAndEmptyArrays: false,
                            },
                        },
                    ],
                    as: "posts",
                },
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
