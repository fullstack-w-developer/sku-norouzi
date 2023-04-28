import fetchClient from "../fetchClient";

export const getWaitingUser = async () => {
    try {
        const { data: project } = await fetchClient.get("/requests/waiting");
    } catch (error) {}
};

export const getWaitingUsers = ({ url = "/requests/waiting" }: { url?: string }) => {
    return fetchClient.get(url);
};
export const getStudents = ({ url = "/requests" }: { url?: string }) => {
    return fetchClient.get(url);
};

export const getPostUserProfile = ({ url }: { url: string }) => fetchClient.get(url);

export const waitMystudentsProject = (skip: number) => fetchClient.get(`/masters/waitpost?skip=${skip}`);

export const editPostApi = async (dataUpload: any) => await fetchClient.put(`/masters/verifypost`, dataUpload);
