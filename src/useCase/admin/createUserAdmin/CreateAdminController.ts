import { Request, Response } from "express";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

export class CreateAdminController {
    async handle(request: Request, response: Response) {
        const { name, email, password, isAdmin } = request.body;
        const createAdminUseCase = new CreateAdminUseCase();
        await createAdminUseCase.execute({
            name,
            email,
            password,
            isAdmin,
        });
        const result = { name, email };
        return response.status(201).json(result);
    }
}
