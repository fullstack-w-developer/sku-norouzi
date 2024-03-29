import type { NextApiResponse } from "next";
import User from "../../../../models/user";
import connectDB from "../../../utils/connectDB";
import { NextApiReq } from "../../../types/common";

type Data = {
    message: string;
    data?: {};
    status: boolean;
};

connectDB();

async function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        const masters = await User.find({
            role: "MASTER",
        }).select({ password: 0 });

        res.status(200).json({
            message: "success",
            status: true,
            data: masters ,
        });
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default handler;
