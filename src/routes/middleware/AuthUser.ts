import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthUser {
    async execute(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers.authorization;

        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return response.status(401).json({ error: "token is missing" });
        }

        try {
            const secret = process.env.SECRET_KEY_USER;

            jwt.verify(token, secret);

            next();
        } catch (error) {
            return response.status(401).json({ error: "token invalid!" });
        }
    }
}
