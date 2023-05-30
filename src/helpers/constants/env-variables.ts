let inDevEnvironment = false;

if (process) {
    if (process.env.NODE_ENV === "development") {
        inDevEnvironment = true;
    }
}

const mainUrl = process.env.NEXT_PUBLIC_BASE_SERVER_API_URL as string;

export { inDevEnvironment, mainUrl };
