import { withAuth } from "./../../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import multer from "multer";
import Posts from "../../../../models/post";
import connectDB from "../../../utils/connectDB";
import { NextApiReq } from "../../../types/common";
import { baseServer } from "../../../helpers/constants/env-variables";
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
        addNewPost(req, res);
    } else {
        res.status(403).json({
            message: "method not supported",
            status: false,
        });
    }
}

export default withAuth(handler);
const maxSize = 100 * 1024 * 1024; // 10MB

const addNewPost = async (req: any, res: any) => {
    try {
        const storage = multer.diskStorage({
            destination: "public/uploads",
            filename: function (req, file, cb) {
                const uniqueSuffix = `${Date.now() + "-" + Math.round(Math.random() * 1e9)}${file.originalname}`;
                cb(null, file.fieldname + "-" + uniqueSuffix);
            },
        });
        const upload = multer({ storage: storage, limits: { fileSize: maxSize } }).fields([{ name: "file" }, { name: "zip" }]);
      
        await upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    message: err,
                    status: false,
                });
            }

            const post = new Posts({
                file: {
                    url: `${baseServer}/uploads/${req.files.file[0].filename}`,
                    id: "1",
                    type: req.files.file[0].mimetype.split("/")[0] === "image" ? "image" : "video",
                },
                zip: {
                    url: `${baseServer}/uploads/${req.files.zip[0].filename}`,
                    id: "1",
                },
                ...req.body,
                technologies: JSON.parse(req.body.technologies),
                masterId: req.body.master,
                userId: req.user._id,
                status: "waiting",
            });
            await post.save();
            res.status(200).json({
                status: true,
                message: "پست با موفقیت ایجاد شد",
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
