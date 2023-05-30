import { NextApiResponse } from "next";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { NextApiReq, User as UserType } from "../src/types/common";

export const findProtect = (f: any) => async (req: NextApiReq, res: NextApiResponse) => {
    const token = req.headers.authorization || req.cookies?.token;
    if (token) {
        try {
            const decoded: any = await jwt.verify(token, process.env.JWT_KEY!);
            const user = await User.findById(decoded.id).select("-password");
            if (user) {
                req.user = user;
                return f(req, res);
            }
        } catch (error: any) {
            return f(req, res);
        }
    }
    return f(req, res);
};
