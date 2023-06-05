import { Technology } from './../types/Technology/index';
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Post } from "../types/Post";

type TechnologyStore = {
    show: boolean;
    info: Technology | null
}
interface GlobalStore {
    menu: boolean;
    toggleMenu: () => void;
    shareModal: boolean;
    toggleShare: () => void;
    createTechnology: TechnologyStore,
    setCreateTechnology: ({ show, info }: TechnologyStore) => void

}

const useGlobalStroe = create<GlobalStore>()(
    devtools(
        immer((set) => ({
            menu: false,
            shareModal: false,
            createTechnology: {
                info: null,
                show: false
            },
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
            setCreateTechnology: ({ info, show }) => {
                set((state) => {
                    state.createTechnology.show = show;
                    state.createTechnology.info = info;
                }, false);
            },
        }))
    )
);

export default useGlobalStroe;
