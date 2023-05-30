import { withAuth } from "../../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import Posts from "../../../../models/post";
import connectDB from "../../../utils/connectDB";
import { NextApiReq } from "../../../types/common";

type Data = {
    message: string;
    status?: boolean;
};

connectDB();

function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        getMyPosts(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}
export default withAuth(handler);
const getMyPosts = async (req: any, res: NextApiResponse) => {
    let query: any = {};
    const skip = req.query.skip;
    const status = req.query?.status;

    if (status === "waiting") {
        query = {
            $or: [{ status: "waiting" }, { status: "editing" }],
            userId: req.user._id,
        };
    } else if (status === "myStudent") {
        query = {
            $and: [{ masterId: req.user._id }, { student: true }],
        };
    } else if (status === "success") {
        query["status"] = "success";
        query["masterId"] = req.user._id;
        query["student"] = false;
    } else {
        query = {
            $or: [{ masterId: req.user._id }, { userId: req.user._id }],
        };
    }

    try {
        const posts = await Posts.aggregate([
            {
                $sort: { createdAt: -1 },
            },
            {
                $match: query,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
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
            status: false,
        });
    }
};
