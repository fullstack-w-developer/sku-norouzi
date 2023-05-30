import { NextApiRequest } from "next";

export type User = {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    student_number: string;
    status: "success" | "faild" | "warning";
    profile: {
        url: string;
        id: string;
    };
    role: "ADMIN" | "TEACHER" | "USER";
};

export type NextApiReq = NextApiRequest & { user: User };
