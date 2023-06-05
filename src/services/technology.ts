import { getRoute } from "../helpers/utils/services";
import client from "./utils/client";
import routes from "../helpers/routes/apiRoutes";
import { GetAllMasterRecponse } from "../types/Master/GetAllMasterRecponse";
import { GetAllTechnologyRecponse } from "../types/Technology/GetAllTechnologyRecponse";
import { Technology } from "../types/Technology";
import { NewAddTechnologyRecponse } from "../types/Technology/NewAddTechnologyRecponse";



export const getTechnologyList = async () => {
    const url = getRoute({ route: `${routes.technology.all}` });
    return await client<GetAllTechnologyRecponse>({ url });
};
export const addTechology = async (data:Technology) => {
    const url = getRoute({ route: `${routes.technology.add}` });
    return await client<NewAddTechnologyRecponse>({ url,method:"POST", data });
};

export const deleteTechnology = async (id?: string) => {
    const url = getRoute({ route: `${routes.technology.delete}?id=${id}` });
    return await client<NewAddTechnologyRecponse>({ url, method:"DELETE" });
};
export const updateTechnology = async ({id,data}:{id:string | undefined,data:Technology}) => {
    const url = getRoute({ route: `${routes.technology.update}?id=${id}` });
    return await client<NewAddTechnologyRecponse>({ url, method:"PUT", data });
};