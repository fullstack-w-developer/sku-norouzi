import { withAuth } from "../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import connectDB from "../../../utils/connectDB";

type Data = {
    message: string;
    data?: {};
};

connectDB();

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        // @ts-ignore
        if (req.user.role !== "ADMIN") return res.status(403).json({ message: "access denied" });
        const count = await User.find({
            status: "waiting",
        }).count();

        res.status(200).json({ message: "success", data: { count } });
    } else {
        res.status(403).json({ message: "method not supported" });
    }
}

export default withAuth(handler);
