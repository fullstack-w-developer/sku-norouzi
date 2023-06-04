import { AuthResponseShape, User } from "../common";
type Technology = {
    id:string;
    name:string;
}
export interface GetAllTechnologyRecponse extends AuthResponseShape {
    data:  Technology[];
}
