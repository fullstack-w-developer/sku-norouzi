import { getRoute } from "../helpers/utils/services";
import client from "./utils/client";
import routes from "../helpers/routes/apiRoutes";
import { GetAllPostRecponse } from "../types/Post/GetAllPostRecponse";

export const getAllPost = async () => {
    const url = getRoute({ route: routes.post.all });
    return await client<GetAllPostRecponse>({ url });
};
