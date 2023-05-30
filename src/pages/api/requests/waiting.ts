// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import { withAuth } from "../../../../middleware/withProtect";
import User from "../../../../models/user";
import connectDB from "../../../utils/connectDB";
import { NextApiReq } from "../../../types/common";

type Data = {
    message: string;
};
connectDB();

function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        getRequests(req, res);
    } else {
        res.status(403).json({ message: "method not supported" });
    }
}

export default withAuth(handler);

const getRequests = async (req: NextApiReq, res: NextApiResponse) => {
    const skip = req.query.skip;
    const q: any = req.query?.q;

    try {
        const users = await User.aggregate([
            {
                $sort: { created: -1 },
            },
            {
                $match: { status: "waiting" },
            },
            {
                $project: { password: 0 },
            },
            {
                $match: {
                    $or: [{ email: RegExp(q) }, { first_name: RegExp(q) }, { last_name: RegExp(q) }],
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

        res.status(200).json({ status: true, data: users });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
