import { withAuth } from "./../../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../utils/connectDB";
import Technology from "../../../../models/technology";
type Data = {
    message: string;
    status?: boolean;
};

connectDB();

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        // @ts-ignore
        if (req.user.role === "USER") return res.status(403).json({ message: "access denied" });
        createTechnologyList(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);

const createTechnologyList = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (
            // @ts-ignore
            req.user.role === "USER"
        )
            res.status(400).json({
                message: "شما دسترسی به این بخش را ندارید",
            });

        const { name } = req.body;

        const list = new Technology({ name });

        await list.save();
        res.status(201).json({
            message: "با موفقیت ایجاد شد",
            status: true,
            data: list,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
