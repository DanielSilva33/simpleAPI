import { Request, Response } from "express";
import { AuthAdminUserUseCase } from "./AuthAdminUserUseCase";

export class AuthAdminUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const authAdminUserController = new AuthAdminUserUseCase();
        const result = await authAdminUserController.execute({
            email,
            password,
        });
        return response.status(200).json(result);
    }
}
