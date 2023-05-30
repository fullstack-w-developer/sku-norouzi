import useConfigureQueryClient from "../hooks/common/useConfigureQueryClient";
import useHandleCookies from "../hooks/common/useHandleCookies";
import { ToastContainer } from "react-toast";
import { QueryClientProvider } from "react-query";
import useVerifyAuth from "../hooks/global/useVerifyAuth";
interface GlobalContextProviderProps {
    children: React.ReactNode;
}
const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
    const queryClient = useConfigureQueryClient();
    useVerifyAuth();
    // useHandleCookies();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ToastContainer position="top-left" delay={9000} />
        </QueryClientProvider>
    );
};

export default GlobalContextProvider;
