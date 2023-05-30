import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const editModalAdminState = atom({
    key: "editModalAdminState",
    default: {
        open: false,
        page: "",
        data: {} as any,
    },
});

export const addNewUserModalState = atom({
    key: "addNewUserModalState",
    default: false,
});
export const filterSearchrModalState = atom({
    key: "filterSearchrModalState",
    default: false,
});
export const modalSidebarMobileState = atom({
    key: "modalSidebarMobileState",
    default: false,
});
export const userState = atom({
    key: "userState",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export const waitingUsersState = atom({
    key: "waitingUsersState",
    default: [],
});

export const editWaitingProperties = atom({
    key: "editWaitingProperties",
    default: {
        open: false,
        projectWaitingStudent: [],
        data: {
            file: { url: "", id: "", type: "" },
            zip: { url: "", id: "" },
            technologies: [],
            title: "",
            description: "",
            status: "",
            _id: "",
            user: {
                profile: {
                    url: "",
                    id: "",
                },
                first_name: "",
                last_name: "",
            },
        },
        posts: [
            {
                user: {
                    profile: "",
                    first_name: "",
                    last_name: "",
                },
                createdAt: new Date(),
                file: { data: "", type: "" },
                zip: "",
                technologies: [],
                title: "",
                description: "",
                status: "",
                _id: "",
            },
        ],
        total: 0,
    },
});
