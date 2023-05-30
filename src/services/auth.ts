import { getRoute } from "../helpers/utils/services";
import client from "./utils/client";
import routes from "../helpers/routes/apiRoutes";
import { MeReceiveResponse } from "../types/Auth/MeReceiveResponse";

export const getUser = async () => {
    const url = getRoute({ route: routes.auth.user });
    return await client<MeReceiveResponse>({ url });
};
export const signUp = async () => {
    const url = getRoute({ route: routes.auth.signUp });
    return await client<MeReceiveResponse>({ url });
};
