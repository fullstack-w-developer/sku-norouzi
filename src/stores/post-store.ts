import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Post } from "../types/Post";

interface PostStore {
    posts: {
        posts: Post[];
        total: number;
    };
    setPosts: (posts: { posts: Post[]; total: number }) => void;
}

const usePostStore = create<PostStore>()(
    devtools(
        immer((set) => ({
            posts: {
                posts: [],
                total: 0,
            },

            setPosts: (posts: { posts: Post[]; total: number }) => {
                set((state) => {
                    state.posts = posts;
                }, false);
            },
        }))
    )
);

export default usePostStore;
