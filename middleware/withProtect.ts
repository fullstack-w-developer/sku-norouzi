import { NextApiHandler } from "next";
import { NextApiResponse } from "next";
import User from "../models/user";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiReq, User as UserType } from "../src/types/common";

export const withAuth = (f: any) => async (req: NextApiReq, res: NextApiResponse) => {
    const token = req.headers.authorization || req.cookies?.token;
    if (!token) return res.status(401).send("access denied");
    try {
        const decoded: any = await jwt.verify(token, process.env.JWT_KEY!);

        const user = await User.findById(decoded.id);
        if (user) {
            req.user = user;
            return f(req, res);
        }
    } catch (error: any) {
        return res.status(403).send("Forbidden");
    }
};
