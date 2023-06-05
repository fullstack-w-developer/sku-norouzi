import { generateFormData, generateFormDataEditPost, getRoute } from "../helpers/utils/services";
import client from "./utils/client";
import routes from "../helpers/routes/apiRoutes";
import { GetAllPostRecponse } from "../types/Post/GetAllPostRecponse";
import { GetShearePostRecponse } from "../types/Post/GetShearePostRecponse";
import { GetShearePostByIdRecponse } from "../types/Post/GetShearePostByIdRecponse";
import { AddPost, Post } from "../types/Post";

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
export const getMyProject = async (status:string,page:number) => {
    const url = getRoute({ route: `${routes.post.my_project}?skip=${page}&status=${status}` });
    return await client<GetAllPostRecponse>({ url });
};
export const getWaitingPostMaster = async (page:number) => {
    const url = getRoute({ route: `${routes.post.post_waitong_master}?skip=${page}` });
    return await client<GetAllPostRecponse>({ url });
};
export const addNewPost = async (data:AddPost) => {
    const url = getRoute({ route: `${routes.post.add}` });
    const formData = generateFormData(data);
    return await client<GetAllPostRecponse>({ url, method:'POST', ...formData });
};
export const editPost_by_master = async (data:Post) => {
    const url = getRoute({ route: `${routes.post.editPost_by_master}` });
    const formData = generateFormDataEditPost(data);
    return await client<GetAllPostRecponse>({ url, method:'PUT', ...formData });
};

export const getSavePost = async (page:number) => {
    const url = getRoute({ route: `${routes.post.save_post}?skip=${page}` });
    return await client<GetShearePostRecponse>({ url });
};