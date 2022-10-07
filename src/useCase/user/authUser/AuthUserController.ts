import { Request, Response } from "express";
import { AuthUserUseCase } from "./AuthUserUseCase";

export class AuthUserController {
    async handle(request: Request, response: Response) {
        const authUserUseCase = new AuthUserUseCase();
        const { email, password } = request.body;
        const authUser = await authUserUseCase.execute({ email, password });

        return response.json(authUser);
    }
}
