import { withAuth } from "../../../../middleware/withProtect";
import type { NextApiResponse } from "next";
import multer from "multer";
import connectDB from "../../../utils/connectDB";
import drive, { bufferToStream, getUrl } from "../../../utils/drive";
import Posts from "../../../../models/post";
import { NextApiReq } from "../../../types/common";

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
        let fileAdress: any = {};
        const storage = multer.memoryStorage();
        const upload = multer({
            storage: storage,
            limits: { fileSize: maxSize },
        }).fields([{ name: "file" }, { name: "zip" }]);

        await upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    message: err,
                    status: false,
                });
            }

            if (req?.files?.file) {
                await drive.files.delete({
                    fileId: req.body.fileId,
                });
                const createFile = await drive.files.create({
                    requestBody: {
                        name: req.files?.file[0].originalname,
                        mimeType: req?.files?.file[0].mimetype!,
                        parents: ["12_LODZQ5udDSexdO1jTfqfhlPHJRaNSU"],
                    },
                    media: {
                        mimeType: req?.files?.file[0].mimetype,
                        body: bufferToStream(req?.files?.file[0].buffer),
                    },
                });
                const link = await getUrl(createFile.data.id!);
                fileAdress["file"] = {
                    url: link.data.webContentLink,
                    id: createFile.data.id!,
                    type: createFile.data.mimeType?.split("/")[0],
                };
            }
            if (req?.files?.zip) {
                await drive.files.delete({
                    fileId: req.body.zipId,
                });

                const createFile = await drive.files.create({
                    requestBody: {
                        name: req.files?.zip[0].originalname!,
                        mimeType: req?.files?.zip[0].mimetype!,
                        parents: ["12_LODZQ5udDSexdO1jTfqfhlPHJRaNSU"],
                    },
                    media: {
                        mimeType: req?.files?.zip[0].mimetype,
                        body: bufferToStream(req?.files?.zip[0].buffer),
                    },
                });

                const link = await getUrl(createFile.data.id!);
                fileAdress["zip"] = {
                    url: link.data.webContentLink,
                    id: createFile.data.id!,
                };
            }

            const post = await Posts.findByIdAndUpdate(
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
            );

            res.status(200).json({
                status: true,
                message: "پست با موفقیت اپدیت شد",
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
