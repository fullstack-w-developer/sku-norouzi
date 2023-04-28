import jwt from "jsonwebtoken";
export async function verify(token: string): Promise<any> {
    const decoded = await jwt.verify(token, process.env.JWT_KEY!);
    // run some checks on the returned payload, perhaps you expect some specific values

    // if its all good, return it, or perhaps just return a boolean
    return decoded;
}
