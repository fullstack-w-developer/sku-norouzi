import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const progress = new ProgressBar({
    size: 4,
    className: "z-50",
    color: "#096EA4",
    delay: 100,
});

Router.events.on("routeChangeStart", () => progress.start());
Router.events.on("routeChangeComplete", () => progress.finish());
Router.events.on("routeChangeError", () => progress.finish());

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <RecoilNexus />
                <Component {...pageProps} />
            </RecoilRoot>
        </QueryClientProvider>
    );
}
