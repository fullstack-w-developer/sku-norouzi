import { getRoute } from "../helpers/utils/services";
import client from "./utils/client";
import routes from "../helpers/routes/apiRoutes";
import { GetAllMasterRecponse } from "../types/Master/GetAllMasterRecponse";
import { GetAllTechnologyRecponse } from "../types/Technology/GetAllTechnologyRecponse";



export const getTechnologyList = async () => {
    const url = getRoute({ route: `${routes.technology.all}` });
    return await client<GetAllTechnologyRecponse>({ url });
};
