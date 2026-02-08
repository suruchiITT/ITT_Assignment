import jwt from "jsonwebtoken";


export const authenticateRequest = (request: any, response: any, next: any) => {
const authorizationHeader = request.headers.authorization;
const accessToken = authorizationHeader?.split(" ")[1];


if (!accessToken) return response.status(401).json({ message: "Unauthorized" });


const decodedPayload: any = jwt.verify(accessToken, process.env.JWT_SECRET as string);
request.userIdentifier = decodedPayload.id;
next();
};