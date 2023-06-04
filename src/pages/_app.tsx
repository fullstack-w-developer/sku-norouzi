import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import GlobalContextProvider from "../context/GlobalContextProvider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <GlobalContextProvider>
            <RecoilRoot>
                <RecoilNexus />
                <Component {...pageProps} />
            </RecoilRoot>
        </GlobalContextProvider>
    );
}
