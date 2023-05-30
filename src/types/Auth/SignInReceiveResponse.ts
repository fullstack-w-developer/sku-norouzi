import { AuthResponseShape, User } from "./../common";
export interface SignInReceiveResponse extends AuthResponseShape {
    data: {
        refresh_token: string;
        access_token: string;
        expires_in: number;
        user: User;
    };
}
