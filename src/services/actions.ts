import routes from "../helpers/routes/apiRoutes";
import { getRoute } from "../helpers/utils/services";
import { PostEmptyResponseShape, typeShareMuation } from "../types/common";
import client from "./utils/client";

export const likePost = async (id: string) => {
    const url = getRoute({ route: routes.post.action.like, id });
    const data = { postId: id };
    return await client<PostEmptyResponseShape>({ url, method: "PUT", data });
};

export const disLikePost = async (id: string) => {
    const url = getRoute({ route: routes.post.action.unlike });
    const data = { postId: id };
    return await client<PostEmptyResponseShape>({ url, method: "PUT", data });
};
export const addBookmark = async (id: string) => {
    const url = getRoute({ route: routes.post.action.bookmark });
    const data = { postId: id };
    return await client<PostEmptyResponseShape>({ url, method: "PUT", data });
};
export const UnBookmark = async (id: string) => {
    const url = getRoute({ route: routes.post.action.unBookmark });
    const data = { postId: id };
    return await client<PostEmptyResponseShape>({ url, method: "PUT", data });
};

export const addComment = async (data: { postId: string; comment: string }) => {
    const url = getRoute({ route: routes.post.action.comment });
    return await client<PostEmptyResponseShape>({ url, method: "PUT", data });
};

export const addSharePost = async (data: typeShareMuation) => {
    const url = getRoute({ route: routes.sheare.add });
    return await client<PostEmptyResponseShape>({ url, method: "POST", data });
};
