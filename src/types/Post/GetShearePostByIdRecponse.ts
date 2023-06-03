import { Post } from ".";
import { AuthResponseShape } from "../common";
type Sheare = {
    senderId: string;
    postId: string;
    reciveUsers: string;
};
export interface GetShearePostByIdRecponse extends AuthResponseShape {
    data: Sheare[];
}
