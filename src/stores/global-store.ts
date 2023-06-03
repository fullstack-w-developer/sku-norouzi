import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Post } from "../types/Post";

interface GlobalStore {
    menu: boolean;
    toggleMenu: () => void;
    shareModal: boolean;
    toggleShare: () => void;
}

const useGlobalStroe = create<GlobalStore>()(
    devtools(
        immer((set) => ({
            menu: false,
            shareModal: false,
            toggleMenu: () => {
                set((state) => {
                    state.menu = !state.menu;
                }, false);
            },
            toggleShare: () => {
                set((state) => {
                    state.shareModal = !state.shareModal;
                }, false);
            },
        }))
    )
);

export default useGlobalStroe;
