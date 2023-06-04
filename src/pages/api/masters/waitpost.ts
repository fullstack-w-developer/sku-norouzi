import { withAuth } from "./../../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import Posts from "../../../../models/post";
import { NextApiReq } from "../../../types/common";

type Data = {
    message: string;
    status: boolean;
    data?: [];
};
connectDB();
function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "GET" && req.user.role === "MASTER") {
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
        const skip = req.query.skip;
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
                $match: {
                    $or: [{ status: "waiting" }, { status: "editing" }],
                    // @ts-ignore
                    masterId: req.user._id,
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
            data: posts,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
