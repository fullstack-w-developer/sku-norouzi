import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Post } from "../types/Post";

interface GlobalStore {
    menu: boolean,
    toggleMenu: () => void
}

const useGlobalStroe = create<GlobalStore>()(
    devtools(
        immer((set) => ({
            menu: false,
            toggleMenu: () => {
                set(
                    (state) => {
                        state.menu = !state.menu;
                    },
                    false,
                );
            },
        }))
    )
);

export default useGlobalStroe;
