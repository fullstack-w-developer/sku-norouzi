import { getRoute } from "../helpers/utils/services";
import client from "./utils/client";
import routes from "../helpers/routes/apiRoutes";
import { GetAllMasterRecponse } from "../types/Master/GetAllMasterRecponse";



export const getMasterList = async () => {
    const url = getRoute({ route: `${routes.masters.get_master}` });
    return await client<GetAllMasterRecponse>({ url });
};
