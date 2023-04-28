// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../middleware/withProtect";
import User from "../../../models/user";
import connectDB from "../../../utils/connectDB";

type Data = {
    message: string;
};
connectDB();

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        // @ts-ignore
        if (req.user.role !== "ADMIN") return res.status(403).json({ message: "access denied" });
        getMasters(req, res);
    } else {
        res.status(403).json({ message: "method not supported" });
    }
}

export default withAuth(handler);

const getMasters = async (req: NextApiRequest, res: NextApiResponse) => {
    const skip = req.query.skip;
    const status = req.query?.status;
    const q: any = req.query?.q;
    //   @ts-ignore
    const option = status
        ? { status }
        : {
              $or: [{ status: "success" }, { status: "failed" }],
          };

    try {
        const users = await User.aggregate([
            {
                $sort: { created: -1 },
            },
            {
                $match: { role: "MASTER", ...option },
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
