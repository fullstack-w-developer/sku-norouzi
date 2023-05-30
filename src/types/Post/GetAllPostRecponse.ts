import { Post } from ".";
import { AuthResponseShape } from "../common";

export interface GetAllPostRecponse extends AuthResponseShape {
    data: [
        {
            paginatedResults: Post[],
            totalCount: [
               {
                Total: number
               }
            ]
        }

    ]
}
