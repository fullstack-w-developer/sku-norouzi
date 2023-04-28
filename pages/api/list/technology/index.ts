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
    if (req.method === "GET") {
        getListTechnology(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default handler;

const getListTechnology = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const list = await Technology.find();
        res.status(200).json({
            message: "با موفقیت ارسال شد",
            data: { list },
            status: true,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,
        });
    }
};
