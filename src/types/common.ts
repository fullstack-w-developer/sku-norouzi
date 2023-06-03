import { NextApiRequest } from "next";
import { Post } from "./Post";

export type User = {
    _id: string;
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
    role: "ADMIN" | "MASTER" | "USER";
};

export type NextApiReq = NextApiRequest & { user: User };

export interface AuthResponseShape {
    status: boolean;
    message: string;
}

export type Posts = {
    posts: Post[];
    total: number;
};

export interface PostEmptyResponseShape {
    status: boolean;
    message: string;
    data: Post;
}

export type Comment = {
    comment: string;
    full_name: string;
    profile: string;
    role: "MASTER" | "USER" | "ADMIN";
    _id: string;
};

export type typeShareMuation = {
    postId: string;
    reciveUsers: string[];
};
