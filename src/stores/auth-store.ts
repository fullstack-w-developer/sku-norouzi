import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { User } from "../types/common";

interface AuthStore {
    user: User | null;
    setUser: ({ user }: { user: User }) => void;
    removeUser: () => void;
    authLoading: boolean;
    setAuthLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthStore>()(
    devtools(
        immer((set) => ({
            user: null,
            authLoading: false,
            setUser: ({ user }) => {
                set(
                    (state) => {
                        state.user = user;
                    },
                    false,
                    "auth-store/set-user"
                );
            },
            removeUser: () => {
                set(
                    (state) => {
                        state.user = null;
                    },
                    false,
                    "auth-store/remove-user"
                );
            },
            setAuthLoading: (loading) => {
                set(
                    (state) => {
                        state.authLoading = loading;
                    },
                    false,
                    "auth-store/set-auth-loading"
                );
            },
        }))
    )
);

export default useAuthStore;
