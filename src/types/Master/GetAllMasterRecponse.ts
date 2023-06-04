import { AuthResponseShape, User } from "../common";

export interface GetAllMasterRecponse extends AuthResponseShape {
    data: User[]
}