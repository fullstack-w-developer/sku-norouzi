// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import type { NextApiResponse } from "next";
import Posts from "../../../../models/post";
import connectDB from "../../../utils/connectDB";
import { NextApiReq } from "../../../types/common";

type Data = {
    message?: string;
    status?: false;
    data?: any;
};

connectDB();

export default async function handler(req: NextApiReq, res: NextApiResponse<Data>) {
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
    const query: any = {};
    const skip = req?.query?.skip;
    const ObjectId = mongoose.Types.ObjectId;
    const from: any = req.query?.from;
    const to: any = req.query?.to;
    const masterId: any = req.query?.masterId;
    const technologies: any = req.query?.technologies;

    if (from && to) {
        query["createdAt"] = {
            $gte: new Date(from),
            $lte: new Date(to),
        };
    } else if (from) {
        query["createdAt"] = {
            $gte: new Date(from),
        };
    } else if (to) {
        query["createdAt"] = {
            $lte: new Date(to),
        };
    }

    if (masterId) {
        query["masterId"] = new ObjectId(masterId);
    }

    if (technologies) {
        query["technologies.name"] = technologies;
    }
    try {
        const posts = await Posts.aggregate([
            {
                $match: { ...query, status: "success" },
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
                $sort: { createdAt: -1 },
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
