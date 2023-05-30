import { getRoute } from "../helpers/utils/services";
import client from "./utils/client";
import routes from "../helpers/routes/apiRoutes";
import { MeReceiveResponse } from "../types/Auth/MeReceiveResponse";
import { SignInFormData, SignUpFormData } from "../types/Auth/Form";
import { RegisterReceiveResponse } from "../types/Auth/RegisterReceiveResponse";
import { SignInReceiveResponse } from "../types/Auth/SignInReceiveResponse";

export const getUser = async () => {
    const url = getRoute({ route: routes.auth.user });
    return await client<MeReceiveResponse>({ url });
};

export const signUp = async (data: SignUpFormData) => {
    const url = getRoute({ route: routes.auth.signUp });
    return await client<RegisterReceiveResponse>({ url, method: "POST", data });
};
export const signIn = async (data: SignInFormData) => {
    const url = getRoute({ route: routes.auth.signIn });
    return await client<SignInReceiveResponse>({ url, method: "POST", data });
};
