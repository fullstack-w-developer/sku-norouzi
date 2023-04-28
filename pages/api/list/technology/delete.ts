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
    if (req.method === "DELETE") {
        // @ts-ignore
        if (req.user.role === "USER") return res.status(403).json({ message: "access denied" });
        deleteTechnology(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);

const deleteTechnology = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const deleteMaster = await Technology.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "با موفقیت انجام شد",
            data: {},
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
