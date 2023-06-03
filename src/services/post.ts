import { getRoute } from "../helpers/utils/services";
import client from "./utils/client";
import routes from "../helpers/routes/apiRoutes";
import { GetAllPostRecponse } from "../types/Post/GetAllPostRecponse";
import { GetShearePostRecponse } from "../types/Post/GetShearePostRecponse";
import { GetShearePostByIdRecponse } from "../types/Post/GetShearePostByIdRecponse";

export const getAllPost = async () => {
    const url = getRoute({ route: routes.post.all });
    return await client<GetAllPostRecponse>({ url });
};

export const getGetAllSheare = async (postId?: string) => {
    const url = getRoute({ route: `${routes.sheare.id}?id=${postId}` });
    return await client<GetShearePostRecponse>({ url });
};
export const findSheareById = async (postId?: string) => {
    const url = getRoute({ route: `${routes.sheare.id}?id=${postId}` });
    return await client<GetShearePostByIdRecponse>({ url });
};
