let inDevEnvironment = false;

if (process) {
    if (process.env.NODE_ENV === "development") {
        inDevEnvironment = true;
    }
}

const mainUrl = process.env.NEXT_PUBLIC_BASE_SERVER_API_URL as string;
const mongodb_uri = process.env.MONGODB_URI as string;
const baseServer = process.env.BASESERVER as string;
const jwt_key = process.env.JWT_KEY as string;
const change_pass_key = process.env.CHANGE_PASS_KEY as string;
const refresh_token = process.env.REFERSH_TOKEN as string;

export { inDevEnvironment, mainUrl, mongodb_uri, baseServer, jwt_key, change_pass_key, refresh_token };
