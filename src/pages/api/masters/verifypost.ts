import { withAuth } from "../../../../middleware/withProtect";
import type { NextApiResponse } from "next";
import multer from "multer";
import connectDB from "../../../utils/connectDB";
import Posts from "../../../../models/post";
import { NextApiReq } from "../../../types/common";
import { baseServer } from "../../../helpers/constants/env-variables";
import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export const config = {
    api: {
        bodyParser: false,
    },
};
type Data = {
    message: string;
    data?: {};
};
connectDB();

async function handler(req: NextApiReq, res: NextApiResponse<Data>) {
    if (req.method === "PUT") {
        updatePost(req, res);
    } else {
        res.status(403).json({ message: "method not supported" });
    }
}

export default withAuth(handler);




const updatePost = async (req: any, res: any) => {
    const maxSize = 100 * 1024 * 1024; // 10MB

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
            let fileAdress: any = {};
            const findPost = await Posts.findById(req.body.id)
              
            if (err) {
                return res.status(400).json({
                    message: err,
                    status: false,
                });
            }

            if (req?.files?.zip) {
                fs.unlinkSync(`./public/uploads${findPost.zip.url.split("/uploads")[1]}`)
                fileAdress["zip"] = {
                    url: `${baseServer}/uploads/${req.files.zip[0].filename}`,
                }

            }
            if (req?.files?.file) {
                fs.unlinkSync(`./public/uploads${findPost.file.url.split("/uploads")[1]}`)
                fileAdress["file"] = {
                    url: `${baseServer}/uploads/${req.files.file[0].filename}`,
                    type: req.files.file[0].mimetype.split("/")[0] === "image" ? "image" : "video",
                }
            }




            await Posts.findByIdAndUpdate(
                {
                    _id: req.body.id,
                },
                {
                    ...fileAdress,
                    ...req.body,
                    technologies: JSON.parse(req.body.technologies),
                },
                {
                    new: true,
                }
            )



            // await fs.unlinkSync(`${baseServer}/`)

            // const post = new Posts({
            //     file: {
            //         url: `${baseServer}/uploads/${req.files.file[0].filename}`,
            //         id: "1",
            //         type: req.files.file[0].mimetype.split("/")[0] === "image" ? "image" : "video",
            //     },
            //     zip: {
            //         url: `${baseServer}/uploads/${req.files.zip[0].filename}`,
            //         id: "1",
            //     },
            //     ...req.body,
            //     technologies: JSON.parse(req.body.technologies),
            //     masterId: req.body.master,
            //     userId: req.user._id,
            //     status: "waiting",
            // });
            // await post.save();
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