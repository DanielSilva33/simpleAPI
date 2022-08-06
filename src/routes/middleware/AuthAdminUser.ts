import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../../model/Admin";

export class AuthAdminUser {
    async execute(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers.authorization;
        // const { email } = request.body;
        // const verifyAdmin = await Admin.findOne({ email });

        // if (verifyAdmin.isAdmin === false) {
        //     return response.status(401).json({ error: "unauthorized" });
        // }

        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return response.status(401).json({ error: "token is missing" });
        }

        try {
            const secret = process.env.SECRET_KEY_ADMIN_USER;

            jwt.verify(token, secret);

            next();
        } catch (error) {
            return response.status(401).json({ error: "invalid token!" });
        }
    }
}
