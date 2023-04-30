import { withAuth } from "./../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/user";
import Sharepost from "../../../models/sharepost";

type Data = {
    message: string;
    status: boolean;
    data: [];
};

connectDB();

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        getAll(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
            data: [],
        });
    }
}

export default withAuth(handler);
const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const q: any = req.query?.q;
        const sharePosts = await Sharepost.find();
        const users = await User.aggregate([
            {
                $sort: { createdAt: -1 },
            },
            {

                $match: {
                    $or: [
                        { first_name: RegExp(q!) },
                        { last_name: RegExp(q) },
                        { full_name: RegExp(q) },
                        { student_number: RegExp(q) },
                    ],
                    status: "success"
                },
            },
            {
                $project: {
                    password: 0,
                },
            },
        ]);
        res.status(200).json({
            message: "با موفقیت ارسال شد",
            data: { users, sharePosts },
            status: true,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: err.message,
            status: false,
        });
    }
};
