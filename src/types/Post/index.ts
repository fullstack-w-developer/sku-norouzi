import { Comment, User } from "../common";

export type Post = {
    comments: Comment[];
    createdAt: string;
    description: string;
    file: { url: string; id: string; type: "image" | "video" };
    liked: [];
    masterId: string;
    isLiked: boolean;
    saves: [];
    status: "success" | "waiting" | "failed";
    student: boolean;
    isBookmark: boolean;
    technologies: [];
    title: string;
    updatedAt: string;
    user: User;
    userId: string;
    zip: { url: string; id: string };
    _id: string;
};



export type AddPost = {
    file: null | File,
    title: string,
    technologies: {name:string,id:string}[],
    zip: null | File,
    master: string,
    description: string,
}