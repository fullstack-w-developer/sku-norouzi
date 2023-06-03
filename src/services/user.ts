import routes from "../helpers/routes/apiRoutes";
import { getRoute } from "../helpers/utils/services";
import { GetAllUserRecponse } from "../types/User/GetAllUserRecponse";
import client from "./utils/client";

export const getAllUser = async (search: string) => {
    const url = getRoute({ route: `${routes.user.allUser}?q=${search}` });
    return await client<GetAllUserRecponse>({ url });
};
