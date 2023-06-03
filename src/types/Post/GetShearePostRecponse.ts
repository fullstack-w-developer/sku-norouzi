import { Post } from ".";
import { AuthResponseShape } from "../common";

export interface GetShearePostRecponse extends AuthResponseShape {
    data: [
        {
            paginatedResults: Post[];
            totalCount: [
                {
                    Total: number;
                }
            ];
        }
    ];
}
