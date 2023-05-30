import { withAuth } from "./../../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import multer from "multer";
import User from "../../../../models/user";
import connectDB from "../../../utils/connectDB";
import { NextApiReq } from "../../../types/common";

// Important for NextJS!
export const config = {
    api: {
        bodyParser: false,
    },
};
type Data = {
    message: string;
    status: boolean;
};

connectDB();

function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        updateProfile(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);

const updateProfile = async (req: any, res: any) => {
    try {
        const storage = multer.diskStorage({
            destination: "public/uploads",
            filename: function (req, file, cb) {
                const uniqueSuffix = `${Date.now() + "-" + Math.round(Math.random() * 1e9)}${file.originalname}`;
                cb(null, file.fieldname + "-" + uniqueSuffix);
            },
        });
        const upload = multer({ storage: storage }).single("file");

        await upload(req, res, async (err) => {
            const { id } = req.body;

            if (err || !id) {
                return res.status(400).json({
                    message: "کاربری با این مشخصات پیدا نشد",
                    status: false,
                });
            }

            if (req.file) {
                req.file = {
                    profile: {
                        url: `${process.env.BASESERVER}/uploads/${req.file.filename}`,
                        id: "1",
                    },
                };
            }

            const user = await User.findByIdAndUpdate(
                { _id: id },
                {
                    ...req.file,
                    ...req.body,
                },
                { new: true }
            ).select({ password: 0 });

            res.status(200).json({
                status: true,
                data: user,
                message: "اطلاعات با موفقیت اپدیت شد",
            });
        });
    } catch (error: any) {
        res.status(500).json({
            message: "مشکل سمت سرور، لطفا بعدا تلاش کنید",
            error: error.message,

            status: false,
        });
    }
};
