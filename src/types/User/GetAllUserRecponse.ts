import { AuthResponseShape, User } from "../common";

export interface GetAllUserRecponse extends AuthResponseShape {
    data: {
        users: User[];
    };
}
