import { User } from "../common";

export type Post = {
    comments: [];
    createdAt: string;
    description: string;
    file: { url: string; id: string; type: "image" | "video" };
    liked: [];
    masterId: string;
    isLiked:boolean;
    saves: [];
    status: "success";
    student: boolean;
    isBookmark:boolean;
    technologies: [];
    title: string;
    updatedAt: string;
    user: User;
    userId: string;
    zip: { url: string; id: string };
    _id: string;
};
