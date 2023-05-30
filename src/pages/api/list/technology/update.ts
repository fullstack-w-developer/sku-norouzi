import { withAuth } from "./../../../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import connectDB from "../../../../utils/connectDB";
import Technology from "../../../../../models/technology";
import { NextApiReq } from "../../../../types/common";
type Data = {
    message: string;
    status?: boolean;
};

connectDB();

function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "PUT") {
        // @ts-ignore
        if (req.user.role === "USER") return res.status(403).json({ message: "access denied" });
        updateTechnology(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);

const updateTechnology = async (req: NextApiReq, res: NextApiResponse) => {
    try {
        const { name } = req.body;
        const { id } = req.query;
        const updateName = await Technology.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                name,
            },
            {
                new: true,
            }
        );

        if (!updateName) res.status(400).json({ message: "مشخصات یافت نشد" });
        res.status(200).json({
            status: true,
            message: "با موفقیت انجام شد",
            data: updateName,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
