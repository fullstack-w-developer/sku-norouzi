import { withAuth } from "./../../../middleware/withProtect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import User from "../../../models/user";
import connectDB from "../../../utils/connectDB";
import fs from "fs";
import drive, { bufferToStream, getUrl } from "../../../utils/drive";

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

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
        let fileAdress: any = {};
        const storage = multer.memoryStorage();
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
                const createFile = await drive.files.create({
                    requestBody: {
                        name: req.file.originalname!,
                        mimeType: req?.file.mimetype!,
                        parents: ["12_LODZQ5udDSexdO1jTfqfhlPHJRaNSU"],
                    },
                    media: {
                        mimeType: req?.file.mimetype,
                        body: bufferToStream(req?.file.buffer),
                    },
                });

                const link = await getUrl(createFile.data.id!);
                fileAdress["profile"] = {
                    url: link.data.webContentLink,
                    id: createFile.data.id!,
                };
            }

            if (req.body.profileId) {
                await drive.files.delete({
                    fileId: req.body.profileId,
                });
            }

            const user = await User.findByIdAndUpdate(
                { _id: id },
                {
                    ...fileAdress,
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
