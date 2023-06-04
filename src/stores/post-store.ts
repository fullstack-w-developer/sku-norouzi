import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Post } from "../types/Post";

interface PostStore {
    posts: {
        posts: Post[];
        total: number;

    };
    editPost_mater: {
        open: boolean;
        post: Post | null
    }
    setPosts: (posts: { posts: Post[]; total: number }) => void;
    setEditPost_master: (editPost: { post: Post | null; open: boolean }) => void;
}

const usePostStore = create<PostStore>()(
    devtools(
        immer((set) => ({
            posts: {

                posts: [],
                total: 0,
            },
            editPost_mater: {
                open: false,
                post: null
            },
            setPosts: (posts: { posts: Post[]; total: number }) => {
                set((state) => {
                    state.posts = posts;
                }, false);
            },
            setEditPost_master: (editPost: { post: Post | null; open: boolean }) => {
                set((state) => {
                    state.editPost_mater.open = editPost.open;
                    state.editPost_mater.post = editPost.post;
                }, false);
            },
        }))
    )
);

export default usePostStore;
